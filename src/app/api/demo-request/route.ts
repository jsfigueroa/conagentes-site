import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/server";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, source, context, attribution } = body;

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: "Nombre, email y celular son requeridos" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Require a plausible phone number (we contact the prospect by WhatsApp/phone).
    const phoneDigits = String(whatsapp).replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7) {
      return NextResponse.json(
        { error: "Ingrese un número de celular válido" },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanWhatsapp = String(whatsapp).trim();
    const cleanSource = source || "landing";
    // Free-form detail the submitting surface wants a human to see — today the
    // reservas-perdidas calculator's own figures (CON-271). It rides only in
    // the notification email: no column, no HQ contract change, and it is
    // escaped + capped before it touches the HTML.
    const cleanContext =
      typeof context === "string" && context.trim() ? context.trim().slice(0, 2000) : null;

    // CON-292 — where this person came from. Null whenever the visitor refused
    // measurement or never answered the banner, so every read of these columns
    // has to tolerate a missing snapshot; a demo request is worth having
    // either way and the form must never depend on analytics succeeding.
    const attr = attribution && typeof attribution === "object" ? attribution : null;
    const visitorId =
      attr && typeof attr.visitor_id === "string" ? attr.visitor_id.slice(0, 64) : null;

    const supabase = createAdminClient();

    const { data: inserted, error: dbError } = await supabase
      .from("demo_requests")
      .insert({
        name: cleanName,
        email: cleanEmail,
        whatsapp: cleanWhatsapp,
        source: cleanSource,
        visitor_id: visitorId,
        attribution: attr,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Error guardando solicitud" },
        { status: 500 }
      );
    }

    // Forward into the main app (Conagentes HQ) so the submission becomes a
    // conversation + funnel lead + Pendiente and the agent can engage. Shared
    // DB, but the main app owns all that machinery — so we call its webhook.
    // Awaited (Vercel may kill un-awaited work after the response) but tightly
    // timed out and fully swallowed: a downstream hiccup must never fail the form.
    await forwardToHq({
      demoRequestId: inserted?.id ?? null,
      name: cleanName,
      email: cleanEmail,
      whatsapp: cleanWhatsapp,
      source: cleanSource,
      visitorId,
      attribution: attr,
    });

    if (process.env.RESEND_API_KEY) {
      const domain = process.env.RESEND_DOMAIN || "conagentes.com";
      try {
        await getResend().emails.send({
          from: `conagentes <demos@${domain}>`,
          to: ["sebastian@conagentes.com"],
          subject: `Nueva solicitud de demo — ${name}`,
          html: buildDemoEmailHtml({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            whatsapp: whatsapp?.trim() || null,
            source: source || "landing",
            context: cleanContext,
          }),
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error procesando solicitud" },
      { status: 500 }
    );
  }
}

/**
 * Forward a demo request into the main app (Conagentes HQ) so it becomes a
 * conversation + funnel lead + Pendiente and the agent can engage the prospect.
 * Best-effort: tightly timed out, all errors swallowed (the form already
 * succeeded via the demo_requests insert + email).
 */
async function forwardToHq(payload: {
  demoRequestId: string | null;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
  /** CON-292 — carried through so the LEAD in HQ knows its origin too. */
  visitorId: string | null;
  attribution: Record<string, unknown> | null;
}): Promise<void> {
  const base = process.env.CONAGENTES_APP_URL;
  const secret = process.env.DEMO_REQUEST_WEBHOOK_SECRET;
  if (!base || !secret) {
    // Not configured yet — the submission is still stored + emailed.
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    await fetch(`${base.replace(/\/$/, "")}/api/webhooks/demo-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-secret": secret,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    console.error("[demo-request] HQ forward failed (non-fatal):", err);
  } finally {
    clearTimeout(timeout);
  }
}

function buildDemoEmailHtml(params: {
  name: string;
  email: string;
  whatsapp: string | null;
  source: string;
  context?: string | null;
}): string {
  const { name, email, whatsapp, source, context } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f7f7f7;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1a1a1a;padding:24px 32px;">
      <h1 style="color:#fff;font-size:18px;margin:0;font-weight:600;">conagentes — Nueva solicitud de demo</h1>
    </div>
    <div style="padding:32px;">
      <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 20px;">
        Un nuevo prospecto ha solicitado una demo desde el sitio web.
      </p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:0 0 24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;width:100px;">Nombre</td><td style="color:#111;font-size:14px;font-weight:600;">${escapeHtml(name)}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Email</td><td style="color:#111;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#065f46;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">WhatsApp</td><td style="color:#111;font-size:14px;">${whatsapp ? escapeHtml(whatsapp) : '<span style="color:#9ca3af;">No proporcionado</span>'}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Fuente</td><td style="color:#111;font-size:14px;">${escapeHtml(source)}</td></tr>
        </table>
      </div>
      ${
        context
          ? `<div style="background:#fffaf5;border:1px solid #f3d9c2;border-radius:8px;padding:16px;margin:0 0 24px;">
          <p style="color:#9a5b1f;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:0 0 8px;">Sus propios números</p>
          <p style="color:#1f2937;font-size:13px;line-height:1.7;margin:0;white-space:pre-line;">${escapeHtml(context)}</p>
        </div>`
          : ""
      }
      ${whatsapp ? `<a href="https://wa.me/${escapeHtml(whatsapp.replace(/[^0-9]/g, ''))}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;margin-right:12px;">Escribir por WhatsApp</a>` : ""}
      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#1a1a1a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
        Responder por email
      </a>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #f0f0f0;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">
        Notificación automática de conagentes.com — solicitud de demo.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
