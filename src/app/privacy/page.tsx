import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/sections/navbar";
import { Footer } from "@/components/marketing/sections/footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y tratamiento de datos personales de conagentes.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Política de Privacidad
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Última actualización: 25 de mayo de 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-foreground">
            <section>
              <h2 className="text-lg font-semibold mb-3">
                1. Responsable del Tratamiento
              </h2>
              <p>
                <strong>NeuralOps S.A.S.</strong> (en adelante
                &quot;conagentes&quot;), identificada con NIT pendiente de
                registro, con domicilio en Medellín, Colombia, es responsable del
                tratamiento de los datos personales recopilados a través de la
                plataforma <strong>conagentes</strong> y sus canales integrados
                (WhatsApp Business API, Instagram, correo electrónico y sitio
                web).
              </p>
              <p className="mt-2">
                Correo de contacto:{" "}
                <a
                  href="mailto:privacidad@conagentes.com"
                  className="underline"
                >
                  privacidad@conagentes.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                2. Datos que Recopilamos
              </h2>
              <p>Recopilamos los siguientes tipos de datos personales:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Datos de contacto:</strong> nombre, número de teléfono
                  (WhatsApp), correo electrónico.
                </li>
                <li>
                  <strong>Datos de conversación:</strong> mensajes enviados y
                  recibidos a través de WhatsApp e Instagram para brindar
                  atención al cliente mediante inteligencia artificial.
                </li>
                <li>
                  <strong>Datos de uso:</strong> interacciones con la plataforma,
                  productos consultados, cotizaciones solicitadas.
                </li>
                <li>
                  <strong>Datos de cuenta (usuarios del dashboard):</strong>{" "}
                  nombre, correo electrónico, rol dentro de la organización.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> dirección IP, tipo de
                  navegador, información del dispositivo (recopilados
                  automáticamente).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                3. Finalidad del Tratamiento
              </h2>
              <p>Utilizamos sus datos personales para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Prestar servicios de atención al cliente automatizada mediante
                  agentes de inteligencia artificial a través de WhatsApp e
                  Instagram.
                </li>
                <li>
                  Gestionar relaciones comerciales (CRM): leads, pipeline de
                  ventas, agendamiento de citas.
                </li>
                <li>
                  Enviar cotizaciones, información de productos y respuestas a
                  consultas.
                </li>
                <li>
                  Procesar pagos y generar enlaces de pago cuando el usuario lo
                  solicite.
                </li>
                <li>Mejorar nuestros servicios y la experiencia del usuario.</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Base Legal</h2>
              <p>
                El tratamiento de datos se realiza conforme a la{" "}
                <strong>Ley 1581 de 2012</strong> (Ley de Protección de Datos
                Personales de Colombia) y el{" "}
                <strong>Decreto 1377 de 2013</strong>, bajo las siguientes bases
                legales:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Consentimiento:</strong> al iniciar una conversación
                  por WhatsApp o Instagram con nuestro agente de IA.
                </li>
                <li>
                  <strong>Ejecución contractual:</strong> para la prestación de
                  los servicios contratados por nuestros clientes empresariales.
                </li>
                <li>
                  <strong>Interés legítimo:</strong> para mejorar nuestros
                  servicios y prevenir fraudes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                5. Inteligencia Artificial y Procesamiento Automatizado
              </h2>
              <p>
                conagentes utiliza modelos de inteligencia artificial (OpenAI GPT)
                para procesar y responder mensajes de forma automatizada. Esto
                implica que:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Los mensajes son procesados por modelos de IA para generar
                  respuestas relevantes.
                </li>
                <li>
                  La información de productos y servicios se consulta en tiempo
                  real desde la base de datos de cada negocio.
                </li>
                <li>
                  En caso de que la IA no pueda resolver una consulta, esta se
                  escala a un agente humano.
                </li>
                <li>
                  No se toman decisiones automatizadas con efectos legales
                  significativos sin intervención humana.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                6. Compartición de Datos
              </h2>
              <p>Sus datos pueden ser compartidos con:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Meta Platforms (WhatsApp/Instagram):</strong> como
                  plataforma de mensajería para la entrega de mensajes.
                </li>
                <li>
                  <strong>OpenAI:</strong> para el procesamiento de mensajes
                  mediante inteligencia artificial. Los datos se envían de forma
                  segura y no se utilizan para entrenar modelos.
                </li>
                <li>
                  <strong>Supabase:</strong> como proveedor de infraestructura de
                  base de datos (servidores en EE.UU.).
                </li>
                <li>
                  <strong>Procesadores de pago (Wompi/ePayco):</strong> cuando se
                  realizan transacciones de pago.
                </li>
                <li>
                  <strong>El negocio cliente:</strong> los datos de las
                  conversaciones y leads son accesibles para el negocio que usted
                  contacta a través de nuestros agentes.
                </li>
              </ul>
              <p className="mt-2">
                No vendemos ni alquilamos datos personales a terceros.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                7. Transferencia Internacional de Datos
              </h2>
              <p>
                Sus datos pueden ser transferidos y almacenados en servidores
                ubicados en Estados Unidos (Supabase, OpenAI, Meta). Estas
                transferencias se realizan con medidas de seguridad adecuadas y en
                cumplimiento de la normativa colombiana de protección de datos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                8. Retención de Datos
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Conversaciones:</strong> se conservan mientras la
                  relación comercial esté activa, con un mínimo de 6 meses para
                  soporte.
                </li>
                <li>
                  <strong>Datos de leads/contactos:</strong> se conservan mientras
                  el negocio cliente mantenga su cuenta activa.
                </li>
                <li>
                  <strong>Datos de cuenta:</strong> se conservan hasta la
                  eliminación de la cuenta por parte del usuario.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                9. Derechos del Titular
              </h2>
              <p>
                De acuerdo con la Ley 1581 de 2012, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Conocer:</strong> acceder a sus datos personales que
                  obren en nuestras bases de datos.
                </li>
                <li>
                  <strong>Actualizar:</strong> solicitar la corrección de datos
                  inexactos o incompletos.
                </li>
                <li>
                  <strong>Rectificar:</strong> corregir información errónea.
                </li>
                <li>
                  <strong>Suprimir:</strong> solicitar la eliminación de sus datos
                  cuando no exista obligación legal de conservarlos.
                </li>
                <li>
                  <strong>Revocar:</strong> revocar la autorización otorgada para
                  el tratamiento de datos.
                </li>
              </ul>
              <p className="mt-2">
                Para ejercer estos derechos, escriba a{" "}
                <a
                  href="mailto:privacidad@conagentes.com"
                  className="underline"
                >
                  privacidad@conagentes.com
                </a>
                . Responderemos en un plazo máximo de 15 días hábiles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Seguridad</h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger sus
                datos, incluyendo: cifrado en tránsito (TLS/HTTPS), control de
                acceso basado en roles (RLS), aislamiento multi-tenant por
                institución y verificación de firmas en webhooks.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">11. Cookies</h2>
              <p>
                Utilizamos cookies estrictamente necesarias para el funcionamiento
                de la plataforma (autenticación de sesión). No utilizamos cookies
                de seguimiento ni publicidad.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">
                12. Cambios a esta Política
              </h2>
              <p>
                Nos reservamos el derecho de modificar esta política en cualquier
                momento. Los cambios serán publicados en esta página con la fecha
                de actualización. El uso continuado de nuestros servicios
                constituye aceptación de los cambios.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">13. Contacto</h2>
              <p>
                Si tiene preguntas sobre esta política de privacidad o sobre el
                tratamiento de sus datos personales:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>
                  Correo:{" "}
                  <a
                    href="mailto:privacidad@conagentes.com"
                    className="underline"
                  >
                    privacidad@conagentes.com
                  </a>
                </li>
                <li>
                  Sitio web:{" "}
                  <a href="https://conagentes.com" className="underline">
                    conagentes.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
