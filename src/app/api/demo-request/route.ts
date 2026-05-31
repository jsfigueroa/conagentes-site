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
    const { name, email, whatsapp, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
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

    const supabase = createAdminClient();

    const { error: dbError } = await supabase.from("demo_requests").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp?.trim() || null,
      source: source || "landing",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Error guardando solicitud" },
        { status: 500 }
      );
    }

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

function buildDemoEmailHtml(params: {
  name: string;
  email: string;
  whatsapp: string | null;
  source: string;
}): string {
  const { name, email, whatsapp, source } = params;

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
