import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/sections/navbar";
import { Footer } from "@/components/marketing/sections/footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de la plataforma conagentes.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Última actualización: 9 de julio de 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
            <Section title="1. Aceptación de los Términos">
              <p>
                Al acceder o utilizar la plataforma{" "}
                <strong>conagentes</strong> (en adelante, &quot;la
                Plataforma&quot;), operada por{" "}
                <strong>Evolutiva IA S.A.S.</strong> (en adelante, &quot;la
                Empresa&quot;), usted acepta quedar vinculado por estos
                Términos y Condiciones, nuestra{" "}
                <a href="/privacidad" className="text-neon-deep underline">
                  Política de Privacidad
                </a>
                , y todas las leyes y regulaciones aplicables.
              </p>
              <p>
                Si usted no está de acuerdo con alguno de estos términos, no
                deberá utilizar la Plataforma. Estos términos constituyen un
                acuerdo legal vinculante entre usted y Evolutiva IA S.A.S.
              </p>
            </Section>

            <Section title="2. Descripción del Servicio">
              <p>
                conagentes es una plataforma de gestión de relaciones con
                clientes (CRM) impulsada por inteligencia artificial que
                proporciona:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Chatbot de IA para atención automatizada por WhatsApp e
                  Instagram
                </li>
                <li>
                  Agentes de voz con IA para atención telefónica (según
                  disponibilidad del plan)
                </li>
                <li>
                  Gestión de conversaciones, contactos, leads y pipeline de
                  ventas
                </li>
                <li>Calendario y agendamiento de citas</li>
                <li>Gestión de documentos y validación</li>
                <li>Análisis e inteligencia de negocio</li>
                <li>Catálogo de productos y cotizaciones</li>
                <li>
                  Procesamiento de pagos y facturación electrónica
                </li>
                <li>Gestión de equipos con roles y permisos</li>
                <li>
                  Integración con WhatsApp Business Platform e Instagram
                  Messaging
                </li>
              </ul>
              <p>
                La Plataforma opera como proveedor tecnológico (Tech Provider)
                de la Plataforma de Negocios de WhatsApp de Meta Platforms,
                Inc., facilitando el acceso de negocios clientes a los
                servicios de mensajería de WhatsApp Business.
              </p>
            </Section>

            <Section title="3. Registro y Cuentas">
              <p>Para utilizar la Plataforma, usted debe:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Ser mayor de 18 años y tener capacidad legal para contratar
                </li>
                <li>
                  Proporcionar información precisa, completa y actualizada
                  durante el registro
                </li>
                <li>
                  Mantener la confidencialidad de sus credenciales de acceso
                </li>
                <li>
                  Notificarnos inmediatamente sobre cualquier uso no autorizado
                  de su cuenta
                </li>
                <li>
                  Ser responsable de todas las actividades que ocurran bajo su
                  cuenta
                </li>
              </ul>
              <p>
                Nos reservamos el derecho de suspender o cancelar cuentas que
                proporcionen información falsa o que violen estos términos.
              </p>
            </Section>

            <Section title="4. Términos de WhatsApp Business">
              <p>
                Al utilizar las funcionalidades de WhatsApp a través de la
                Plataforma, usted acepta cumplir con:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Los{" "}
                  <a
                    href="https://www.whatsapp.com/legal/business-solution-terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-deep underline"
                  >
                    Términos de la Solución de WhatsApp Business
                  </a>
                </li>
                <li>
                  Los{" "}
                  <a
                    href="https://www.whatsapp.com/legal/meta-terms-whatsapp-business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-deep underline"
                  >
                    Términos de Meta para WhatsApp Business
                  </a>
                </li>
                <li>
                  La{" "}
                  <a
                    href="https://whatsappbusiness.com/policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-deep underline"
                  >
                    Política de Mensajería de Negocios de WhatsApp
                  </a>
                </li>
              </ul>
              <p>
                Usted es el único responsable de asegurar que su uso de
                WhatsApp a través de la Plataforma cumpla con los términos de
                Meta y con todas las leyes aplicables. Las violaciones a los
                términos de Meta pueden resultar en la suspensión de su acceso
                a la API de WhatsApp.
              </p>
            </Section>

            <Section title="5. Obligaciones del Usuario">
              <h3 className="font-semibold text-foreground mt-4">
                5.1. Consentimiento y Opt-In
              </h3>
              <p>
                Usted es responsable de obtener el consentimiento previo,
                expreso e informado de sus clientes finales antes de
                contactarlos a través de WhatsApp. Este consentimiento debe:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Ser obtenido de forma activa (las casillas premarcadas no
                  constituyen consentimiento válido)
                </li>
                <li>
                  Informar claramente qué tipo de mensajes recibirá el cliente
                  final
                </li>
                <li>
                  Ofrecer un mecanismo claro y sencillo para revocar el
                  consentimiento en cualquier momento
                </li>
                <li>
                  Cumplir con los requisitos de opt-in de Meta y con la Ley
                  1581 de 2012
                </li>
                <li>
                  Si utiliza funcionalidades de contacto telefónico o de voz,
                  cumplir además con la Ley 2300 de 2023 (canales y horarios
                  de contacto autorizados) y respetar toda solicitud del
                  cliente final de no volver a ser contactado
                </li>
              </ul>

              <h3 className="font-semibold text-foreground mt-4">
                5.2. Uso Aceptable
              </h3>
              <p>Al usar la Plataforma, usted se compromete a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  No enviar spam, mensajes no solicitados ni contenido masivo
                  sin consentimiento
                </li>
                <li>
                  No enviar contenido ilegal, ofensivo, difamatorio, amenazante
                  o discriminatorio
                </li>
                <li>
                  No enviar contenido relacionado con tabaco, alcohol, armas,
                  apuestas, contenido para adultos o sustancias controladas
                </li>
                <li>
                  No solicitar datos sensibles (números de tarjeta de crédito,
                  contraseñas, documentos de identidad) a través de mensajes de
                  WhatsApp
                </li>
                <li>
                  No suplantar identidades ni hacer afirmaciones engañosas
                </li>
                <li>
                  No intentar acceder a datos de otros negocios clientes
                </li>
                <li>
                  No utilizar la Plataforma para actividades que violen leyes
                  colombianas o internacionales
                </li>
                <li>
                  No realizar ingeniería inversa, descompilar ni intentar
                  extraer el código fuente de la Plataforma
                </li>
              </ul>

              <h3 className="font-semibold text-foreground mt-4">
                5.3. Calidad de Mensajes
              </h3>
              <p>
                Meta monitorea continuamente la calidad de los mensajes
                enviados. Usted es responsable de mantener altos estándares de
                calidad, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Bajas tasas de bloqueo y reporte de spam
                </li>
                <li>
                  Mensajes relevantes y de valor para el destinatario
                </li>
                <li>
                  Respeto de las ventanas de mensajería (24 horas para mensajes
                  de formato libre)
                </li>
                <li>
                  Uso adecuado de plantillas aprobadas fuera de la ventana de
                  24 horas
                </li>
              </ul>
              <p>
                La degradación en la calidad de los mensajes puede resultar en
                la reducción de límites de envío, la pausa de plantillas, o la
                restricción de su cuenta de WhatsApp Business por parte de
                Meta.
              </p>
            </Section>

            <Section title="6. Inteligencia Artificial">
              <p>
                La Plataforma utiliza modelos de inteligencia artificial para
                generar respuestas automatizadas en conversaciones con clientes
                finales. En relación con el uso de IA:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Las respuestas generadas por IA son orientativas y no
                  constituyen asesoría legal, médica, financiera ni profesional
                  de ningún tipo
                </li>
                <li>
                  Usted es el único responsable de supervisar, revisar y
                  aprobar el comportamiento del chatbot de IA y las respuestas
                  que este genera en nombre de su negocio
                </li>
                <li>
                  Usted puede configurar el sistema de IA, incluyendo el prompt
                  de sistema, las herramientas disponibles, y los límites de
                  automatización
                </li>
                <li>
                  La Empresa no garantiza que las respuestas de la IA sean
                  precisas, completas o libres de errores en todas las
                  circunstancias
                </li>
                <li>
                  La Empresa no utiliza los datos de las conversaciones para
                  entrenar modelos de IA propios
                </li>
              </ul>
            </Section>

            <Section title="7. Tarifas y Pagos">
              <h3 className="font-semibold text-foreground mt-4">
                7.1. Suscripciones
              </h3>
              <p>
                La Plataforma opera bajo un modelo de suscripción. Los
                precios, planes y funcionalidades disponibles se publican en
                nuestro sitio web y pueden ser actualizados periódicamente con
                previo aviso.
              </p>

              <h3 className="font-semibold text-foreground mt-4">
                7.2. Costos de WhatsApp
              </h3>
              <p>
                Los costos de conversación de WhatsApp son cobrados
                directamente por Meta a través de su cuenta de WhatsApp
                Business. Estos costos son independientes de la suscripción a
                conagentes y están sujetos a las tarifas publicadas por Meta.
              </p>

              <h3 className="font-semibold text-foreground mt-4">
                7.3. Facturación
              </h3>
              <p>
                Las facturas se emiten en pesos colombianos (COP) e incluyen
                el IVA aplicable. Los pagos se procesan a través de pasarelas
                de pago autorizadas. El incumplimiento en el pago puede
                resultar en la suspensión del servicio.
              </p>
            </Section>

            <Section title="8. Propiedad Intelectual">
              <p>
                Todos los derechos de propiedad intelectual sobre la
                Plataforma, incluyendo pero no limitado a código fuente,
                diseño, interfaces, logotipos, marcas, documentación y
                contenido, son propiedad exclusiva de Evolutiva IA S.A.S. o de
                sus licenciantes.
              </p>
              <p>
                Usted conserva todos los derechos sobre los datos y contenidos
                que cargue o genere a través de la Plataforma. Al utilizar el
                servicio, usted nos otorga una licencia limitada, no exclusiva
                y revocable para procesar, almacenar y transmitir dichos datos
                únicamente con el fin de prestar el servicio.
              </p>
            </Section>

            <Section title="9. Disponibilidad del Servicio">
              <p>
                Nos esforzamos por mantener la Plataforma disponible de forma
                continua. Sin embargo, no garantizamos una disponibilidad del
                100% y no seremos responsables por:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Interrupciones programadas para mantenimiento (las cuales
                  serán notificadas con antelación cuando sea posible)
                </li>
                <li>
                  Interrupciones causadas por terceros (Meta, proveedores de
                  infraestructura, pasarelas de pago)
                </li>
                <li>Eventos de fuerza mayor</li>
                <li>Fallas en la conectividad del usuario</li>
              </ul>
            </Section>

            <Section title="10. Limitación de Responsabilidad">
              <p>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY COLOMBIANA:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  La Plataforma se proporciona &quot;TAL CUAL&quot; y
                  &quot;SEGÚN DISPONIBILIDAD&quot;, sin garantías de ningún
                  tipo, expresas o implícitas
                </li>
                <li>
                  La Empresa no será responsable por daños indirectos,
                  incidentales, especiales, consecuenciales o punitivos,
                  incluyendo pérdida de ingresos, datos, oportunidades de
                  negocio o beneficios
                </li>
                <li>
                  La responsabilidad total acumulada de la Empresa por
                  cualquier reclamo no excederá el monto total pagado por usted
                  en los 12 meses anteriores al evento que dio lugar al reclamo
                </li>
                <li>
                  La Empresa no es responsable de las acciones de Meta,
                  incluyendo la suspensión de cuentas de WhatsApp Business,
                  rechazo de plantillas de mensajes, o cambios en los términos
                  de servicio de WhatsApp
                </li>
                <li>
                  La Empresa no es responsable por las respuestas generadas por
                  la inteligencia artificial ni por las decisiones comerciales
                  tomadas con base en dichas respuestas
                </li>
              </ul>
            </Section>

            <Section title="11. Indemnización">
              <p>
                Usted acepta defender, indemnizar y mantener indemne a
                Evolutiva IA S.A.S., sus directores, empleados y agentes, frente
                a cualquier reclamación, daño, pérdida, responsabilidad y
                gasto (incluyendo honorarios de abogados) que surjan de:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Su uso de la Plataforma</li>
                <li>
                  La violación de estos Términos o de los términos de Meta
                </li>
                <li>
                  El envío de mensajes no autorizados o sin consentimiento
                  adecuado
                </li>
                <li>
                  El contenido de los mensajes enviados a través de la
                  Plataforma
                </li>
                <li>
                  Cualquier reclamación de terceros relacionada con su uso del
                  servicio
                </li>
              </ul>
            </Section>

            <Section title="12. Suspensión y Terminación">
              <p>
                Podemos suspender o terminar su acceso a la Plataforma, con o
                sin previo aviso, en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Violación de estos Términos o de los términos de Meta
                </li>
                <li>
                  Uso de la Plataforma para actividades ilegales o fraudulentas
                </li>
                <li>
                  Incumplimiento en el pago de las tarifas del servicio
                </li>
                <li>Solicitud de autoridades competentes</li>
                <li>
                  Conducta que pueda dañar la reputación o la infraestructura
                  de la Plataforma
                </li>
              </ul>
              <p>
                Usted puede cancelar su cuenta en cualquier momento
                contactando a nuestro equipo de soporte. Tras la cancelación,
                sus datos serán tratados conforme a nuestra Política de
                Privacidad.
              </p>
            </Section>

            <Section title="13. Ley Aplicable y Resolución de Controversias">
              <p>
                Estos Términos se rigen por las leyes de la República de
                Colombia. Cualquier controversia derivada de o relacionada con
                estos Términos será sometida a la jurisdicción de los
                tribunales competentes de la ciudad de Medellín, Colombia.
              </p>
              <p>
                Antes de iniciar cualquier acción legal, las partes se
                comprometen a intentar resolver la controversia de buena fe
                mediante negociación directa durante un periodo mínimo de 30
                días.
              </p>
            </Section>

            <Section title="14. Disposiciones Generales">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Modificaciones:</strong> nos reservamos el derecho de
                  modificar estos Términos en cualquier momento. Los cambios
                  entrarán en vigencia al ser publicados en esta página.
                  Notificaremos a los usuarios registrados sobre cambios
                  sustanciales por correo electrónico con al menos 15 días de
                  antelación
                </li>
                <li>
                  <strong>Divisibilidad:</strong> si alguna disposición de
                  estos Términos es declarada inválida o inaplicable, las demás
                  disposiciones permanecerán en pleno vigor y efecto
                </li>
                <li>
                  <strong>Cesión:</strong> usted no podrá ceder ni transferir
                  sus derechos u obligaciones bajo estos Términos sin nuestro
                  consentimiento previo por escrito
                </li>
                <li>
                  <strong>Acuerdo completo:</strong> estos Términos, junto con
                  la Política de Privacidad, constituyen el acuerdo completo
                  entre las partes con respecto al uso de la Plataforma
                </li>
                <li>
                  <strong>Renuncia:</strong> la falta de ejercicio de cualquier
                  derecho bajo estos Términos no constituirá renuncia a dicho
                  derecho
                </li>
              </ul>
            </Section>

            <Section title="15. Contacto">
              <p>
                Para consultas sobre estos Términos y Condiciones:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>
                  <strong>Empresa:</strong> Evolutiva IA S.A.S.
                </li>
                <li>
                  <strong>Correo:</strong>{" "}
                  <a
                    href="mailto:legal@conagentes.com"
                    className="text-neon-deep underline"
                  >
                    legal@conagentes.com
                  </a>
                </li>
                <li>
                  <strong>Sitio web:</strong>{" "}
                  <a href="https://conagentes.com" className="underline">
                    conagentes.com
                  </a>
                </li>
                <li>
                  <strong>Ciudad:</strong> Medellín, Colombia
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
