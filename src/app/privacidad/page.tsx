import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/sections/navbar";
import { Footer } from "@/components/marketing/sections/footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y tratamiento de datos personales de conagentes.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Última actualización: 6 de junio de 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
            <Section title="1. Información General">
              <p>
                <strong>conagentes</strong> (en adelante, &quot;la
                Plataforma&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;) es
                una plataforma de CRM con inteligencia artificial desarrollada y
                operada por <strong>Evolutiva IA S.A.S.</strong>, sociedad
                constituida bajo las leyes de la República de Colombia, con
                domicilio en la ciudad de Medellín, Colombia.
              </p>
              <p>
                Esta Política de Privacidad describe cómo recopilamos, usamos,
                almacenamos, protegemos y compartimos los datos personales de
                nuestros usuarios, sus clientes finales y los visitantes de
                nuestro sitio web, en cumplimiento de la{" "}
                <strong>Ley 1581 de 2012</strong> (Ley de Protección de Datos
                Personales), el <strong>Decreto 1377 de 2013</strong>, y demás
                normas concordantes de la República de Colombia, así como los
                requisitos establecidos por{" "}
                <strong>Meta Platforms, Inc.</strong> para proveedores
                tecnológicos de la Plataforma de Negocios de WhatsApp.
              </p>
              <p>
                El responsable del tratamiento de datos personales es{" "}
                <strong>Evolutiva IA S.A.S.</strong>, contactable a través de{" "}
                <a
                  href="mailto:privacidad@conagentes.com"
                  className="text-neon-deep underline"
                >
                  privacidad@conagentes.com
                </a>
                .
              </p>
            </Section>

            <Section title="2. Datos que Recopilamos">
              <p>
                Recopilamos las siguientes categorías de datos personales:
              </p>

              <h3 className="font-semibold text-foreground mt-4">
                2.1. Datos de Usuarios de la Plataforma (Negocios Clientes)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Nombre completo, correo electrónico, número de teléfono y
                  cargo
                </li>
                <li>
                  Nombre de la empresa, NIT, dirección comercial, sector o
                  industria
                </li>
                <li>
                  Credenciales de acceso (correo y contraseña cifrada)
                </li>
                <li>
                  Información de facturación y métodos de pago (procesados por
                  terceros autorizados)
                </li>
                <li>
                  Configuración de la cuenta (preferencias, zona horaria,
                  verticales)
                </li>
              </ul>

              <h3 className="font-semibold text-foreground mt-4">
                2.2. Datos de Clientes Finales (Contactos de WhatsApp e
                Instagram)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Número de teléfono de WhatsApp y/o identificador de Instagram
                </li>
                <li>
                  Nombre de perfil de WhatsApp (proporcionado por Meta)
                </li>
                <li>
                  Contenido de mensajes de texto, imágenes, documentos, audio y
                  video
                </li>
                <li>
                  Metadatos de mensajes (fecha, hora, estado de entrega y
                  lectura)
                </li>
                <li>
                  Datos proporcionados voluntariamente durante la conversación
                  (nombre, correo, preferencias de servicio)
                </li>
              </ul>

              <h3 className="font-semibold text-foreground mt-4">
                2.3. Datos de Navegación del Sitio Web
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Dirección IP, tipo de navegador, sistema operativo
                </li>
                <li>
                  Páginas visitadas, duración de la sesión, URL de referencia
                </li>
                <li>Cookies y tecnologías similares (ver sección 11)</li>
              </ul>
            </Section>

            <Section title="3. Finalidades del Tratamiento">
              <p>
                Los datos personales son tratados para las siguientes
                finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Prestación del servicio:</strong> operar la plataforma
                  CRM, gestionar conversaciones de WhatsApp e Instagram,
                  administrar contactos, leads, citas, documentos y pagos
                </li>
                <li>
                  <strong>Respuestas automatizadas con IA:</strong> procesar
                  mensajes entrantes mediante modelos de inteligencia artificial
                  para generar respuestas contextuales, gestionar reservaciones,
                  catálogo de productos, y atender consultas de clientes finales
                </li>
                <li>
                  <strong>Análisis e inteligencia de negocio:</strong> generar
                  estadísticas agregadas, reportes de rendimiento, patrones de
                  conversación y métricas de equipo para los negocios clientes
                </li>
                <li>
                  <strong>Procesamiento de pagos:</strong> facilitar
                  transacciones a través de pasarelas de pago autorizadas
                </li>
                <li>
                  <strong>Facturación electrónica:</strong> emitir facturas
                  electrónicas conforme a la normatividad de la DIAN
                </li>
                <li>
                  <strong>Comunicaciones del servicio:</strong> enviar
                  notificaciones transaccionales, alertas de escalamiento, y
                  actualizaciones del servicio
                </li>
                <li>
                  <strong>Mejora del servicio:</strong> analizar patrones de uso
                  agregados y anonimizados para mejorar la plataforma
                </li>
                <li>
                  <strong>Cumplimiento legal y seguridad:</strong> prevenir
                  fraude, verificar identidad, y cumplir obligaciones legales
                </li>
              </ul>
            </Section>

            <Section title="4. Base Legal">
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
                  por WhatsApp o Instagram con nuestro agente de IA, o al
                  registrarse en la plataforma
                </li>
                <li>
                  <strong>Ejecución contractual:</strong> para la prestación de
                  los servicios contratados por nuestros negocios clientes
                </li>
                <li>
                  <strong>Interés legítimo:</strong> para mejorar nuestros
                  servicios y prevenir fraudes
                </li>
                <li>
                  <strong>Obligación legal:</strong> para cumplir con
                  requerimientos tributarios, de facturación electrónica, y
                  demás obligaciones de ley
                </li>
              </ul>
            </Section>

            <Section title="5. Tratamiento de Datos de WhatsApp">
              <p>
                Como proveedor tecnológico autorizado de la Plataforma de
                Negocios de WhatsApp (WhatsApp Business Platform), conagentes
                opera bajo los términos establecidos por Meta Platforms, Inc. y
                cumple con las siguientes obligaciones:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>No creamos perfiles de consumidores:</strong> no
                  utilizamos los datos de la solución de WhatsApp Business para
                  rastrear, construir o enriquecer perfiles de usuarios
                  individuales de WhatsApp, excepto el contenido de los mensajes
                  necesario para prestar el servicio
                </li>
                <li>
                  <strong>No vendemos ni licenciamos datos:</strong> no
                  compartimos, transferimos, vendemos, licenciamos ni
                  distribuimos datos de la solución de WhatsApp Business a
                  terceros, excepto a los subprocesadores necesarios para la
                  prestación del servicio
                </li>
                <li>
                  <strong>No combinamos datos con fuentes externas:</strong> no
                  combinamos datos de WhatsApp con datos de terceros para
                  publicidad, marketing directo o retargeting
                </li>
                <li>
                  <strong>Procesamiento por cuenta del cliente:</strong>{" "}
                  procesamos los datos de WhatsApp únicamente por cuenta y bajo
                  las instrucciones de nuestros negocios clientes, quienes son
                  los responsables del tratamiento ante sus clientes finales
                </li>
                <li>
                  <strong>Seguridad en webhooks:</strong> verificamos la
                  autenticidad de cada mensaje entrante mediante firma
                  HMAC-SHA256 antes de procesarlo
                </li>
              </ul>
            </Section>

            <Section title="6. Inteligencia Artificial y Procesamiento Automatizado">
              <p>
                conagentes utiliza modelos de inteligencia artificial de
                terceros (OpenAI) para procesar mensajes y generar respuestas
                automatizadas. En relación con el uso de IA:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Los mensajes son enviados a la API de OpenAI para generar
                  respuestas. OpenAI no utiliza los datos enviados a través de
                  su API para entrenar sus modelos
                </li>
                <li>
                  No utilizamos datos de conversaciones de WhatsApp para crear,
                  desarrollar, entrenar o mejorar sistemas de aprendizaje
                  automático o inteligencia artificial propios
                </li>
                <li>
                  El procesamiento de IA se realiza únicamente para generar
                  respuestas en tiempo real durante la conversación activa
                </li>
                <li>
                  En caso de que la IA no pueda resolver una consulta, esta se
                  escala a un agente humano
                </li>
                <li>
                  No se toman decisiones automatizadas con efectos legales
                  significativos sin intervención humana
                </li>
                <li>
                  Los negocios clientes pueden configurar el comportamiento del
                  chatbot de IA, incluyendo el nivel de automatización y los
                  límites de respuesta
                </li>
              </ul>
            </Section>

            <Section title="7. Compartición de Datos con Terceros">
              <p>
                Compartimos datos personales únicamente con los siguientes
                terceros, bajo acuerdos de confidencialidad y procesamiento de
                datos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Meta Platforms, Inc.:</strong> envío y recepción de
                  mensajes a través de la API de WhatsApp Cloud y la API de
                  Instagram Messaging
                </li>
                <li>
                  <strong>OpenAI:</strong> procesamiento de mensajes para
                  generación de respuestas automatizadas por IA
                </li>
                <li>
                  <strong>Supabase (AWS):</strong> almacenamiento seguro de base
                  de datos y archivos
                </li>
                <li>
                  <strong>Wompi / ePayco:</strong> procesamiento de pagos (no
                  almacenamos datos de tarjetas de crédito)
                </li>
                <li>
                  <strong>Alegra:</strong> emisión de facturas electrónicas
                  (cuando el negocio cliente lo habilite)
                </li>
                <li>
                  <strong>Railway:</strong> infraestructura de hosting y
                  ejecución de servicios
                </li>
                <li>
                  <strong>El negocio cliente:</strong> los datos de las
                  conversaciones y leads son accesibles para el negocio que
                  usted contacta a través de nuestros agentes
                </li>
              </ul>
              <p>
                No vendemos, alquilamos ni comercializamos datos personales a
                terceros con fines publicitarios o de marketing.
              </p>
            </Section>

            <Section title="8. Transferencia Internacional de Datos">
              <p>
                Para la prestación del servicio, los datos personales pueden ser
                transferidos y procesados en servidores ubicados fuera de
                Colombia, incluyendo Estados Unidos (AWS a través de Supabase,
                OpenAI, Railway, Meta). Estas transferencias se realizan con
                proveedores que mantienen estándares de seguridad adecuados y
                conforme a las excepciones previstas en el artículo 26 de la
                Ley 1581 de 2012.
              </p>
              <p>
                Al utilizar la plataforma, el titular autoriza expresamente la
                transferencia internacional de datos para los fines descritos
                en esta política.
              </p>
            </Section>

            <Section title="9. Retención de Datos">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Datos de cuenta del negocio cliente:</strong>{" "}
                  retenidos mientras la cuenta esté activa y hasta 12 meses
                  después de la cancelación
                </li>
                <li>
                  <strong>Mensajes de WhatsApp e Instagram:</strong> almacenados
                  mientras el negocio cliente mantenga una cuenta activa. Los
                  negocios clientes pueden solicitar la eliminación en cualquier
                  momento
                </li>
                <li>
                  <strong>Archivos multimedia:</strong> retenidos por el periodo
                  que determine el negocio cliente, con eliminación automática
                  disponible
                </li>
                <li>
                  <strong>Datos de facturación:</strong> retenidos por el
                  periodo exigido por la legislación tributaria colombiana
                  (mínimo 5 años)
                </li>
                <li>
                  <strong>Datos de navegación:</strong> retenidos por un máximo
                  de 24 meses
                </li>
                <li>
                  <strong>Registros de auditoría:</strong> retenidos por un
                  mínimo de 12 meses después de la terminación del servicio,
                  conforme a los requisitos de Meta
                </li>
              </ul>
            </Section>

            <Section title="10. Derechos del Titular (Ley 1581 de 2012)">
              <p>
                De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de
                2013, los titulares de datos personales tienen los siguientes
                derechos:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Acceso:</strong> conocer los datos personales que
                  tenemos sobre usted
                </li>
                <li>
                  <strong>Actualización:</strong> solicitar la corrección de
                  datos inexactos, incompletos o desactualizados
                </li>
                <li>
                  <strong>Rectificación:</strong> corregir información que sea
                  errónea
                </li>
                <li>
                  <strong>Supresión:</strong> solicitar la eliminación de sus
                  datos cuando no exista obligación legal o contractual de
                  conservarlos
                </li>
                <li>
                  <strong>Revocatoria:</strong> revocar la autorización otorgada
                  para el tratamiento de datos
                </li>
                <li>
                  <strong>Consulta:</strong> consultar de forma gratuita sus
                  datos personales al menos una vez cada mes calendario
                </li>
              </ul>
              <p>
                Para ejercer estos derechos, envíe su solicitud a{" "}
                <a
                  href="mailto:privacidad@conagentes.com"
                  className="text-neon-deep underline"
                >
                  privacidad@conagentes.com
                </a>{" "}
                indicando su nombre completo, documento de identidad,
                descripción de la solicitud y datos de contacto. Responderemos
                dentro de los <strong>10 días hábiles</strong> siguientes a la
                recepción de la solicitud, conforme a la ley.
              </p>
            </Section>

            <Section title="11. Eliminación de Datos">
              <p>
                Además de los derechos descritos en la sección anterior,
                implementamos los siguientes mecanismos de eliminación:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Negocios clientes:</strong> pueden solicitar la
                  eliminación completa de su cuenta y todos los datos asociados
                  enviando un correo a{" "}
                  <a
                    href="mailto:privacidad@conagentes.com"
                    className="text-neon-deep underline"
                  >
                    privacidad@conagentes.com
                  </a>
                  . Procesaremos la solicitud dentro de 30 días
                </li>
                <li>
                  <strong>Clientes finales (contactos de WhatsApp):</strong>{" "}
                  pueden solicitar la eliminación de sus datos a través del
                  negocio que los contactó, o directamente a nosotros a través
                  del correo indicado
                </li>
                <li>
                  <strong>Solicitudes de Meta:</strong> respondemos a
                  solicitudes de eliminación de datos provenientes de Meta
                  Platforms conforme a los acuerdos vigentes
                </li>
              </ul>
              <p>
                Los datos eliminados pueden persistir en copias de seguridad
                por un periodo razonable, tras el cual serán eliminados de
                forma permanente.
              </p>
            </Section>

            <Section title="12. Cookies y Tecnologías Similares">
              <p>
                Nuestro sitio web utiliza cookies para los siguientes
                propósitos:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Cookies esenciales:</strong> necesarias para la
                  autenticación y el funcionamiento básico de la plataforma
                </li>
                <li>
                  <strong>Cookies de sesión:</strong> mantienen su sesión activa
                  mientras usa la plataforma (se eliminan al cerrar el
                  navegador)
                </li>
                <li>
                  <strong>Cookies de analítica:</strong> recopilan información
                  agregada y anonimizada sobre el uso del sitio web para mejorar
                  la experiencia
                </li>
              </ul>
              <p>
                Puede configurar su navegador para rechazar cookies, aunque
                esto puede afectar la funcionalidad de la plataforma.
              </p>
            </Section>

            <Section title="13. Seguridad de los Datos">
              <p>
                Implementamos medidas de seguridad administrativas, físicas y
                técnicas para proteger los datos personales, que incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Cifrado de datos en tránsito (TLS/SSL) y en reposo
                </li>
                <li>
                  Aislamiento de datos por institución (Row-Level Security en
                  base de datos)
                </li>
                <li>
                  Verificación criptográfica de webhooks (HMAC-SHA256) con
                  comparación segura contra ataques de tiempo
                </li>
                <li>
                  Autenticación con contraseñas cifradas y sesiones protegidas
                </li>
                <li>
                  Control de acceso basado en roles (administrador, asesor, solo
                  lectura)
                </li>
                <li>
                  Separación de credenciales por entorno (desarrollo,
                  producción)
                </li>
                <li>Monitoreo de actividad y registros de auditoría</li>
              </ul>
            </Section>

            <Section title="14. Menores de Edad">
              <p>
                conagentes no recopila intencionalmente datos personales de
                menores de 18 años. La plataforma está diseñada para uso por
                negocios y profesionales. Si tenemos conocimiento de que hemos
                recopilado datos de un menor, los eliminaremos de inmediato.
              </p>
            </Section>

            <Section title="15. Modificaciones a esta Política">
              <p>
                Nos reservamos el derecho de modificar esta Política de
                Privacidad en cualquier momento. Las modificaciones serán
                publicadas en esta página con la fecha de actualización. El uso
                continuado de la plataforma después de la publicación de cambios
                constituye aceptación de los mismos. En caso de cambios
                sustanciales, notificaremos a los negocios clientes por correo
                electrónico.
              </p>
            </Section>

            <Section title="16. Autoridad de Protección de Datos">
              <p>
                La autoridad de protección de datos en Colombia es la{" "}
                <strong>
                  Superintendencia de Industria y Comercio (SIC)
                </strong>
                . Si considera que sus derechos no han sido debidamente
                atendidos, puede presentar una queja ante la SIC a través de{" "}
                <span className="font-medium">www.sic.gov.co</span>.
              </p>
            </Section>

            <Section title="17. Contacto">
              <p>
                Para cualquier consulta, solicitud o reclamo relacionado con el
                tratamiento de sus datos personales:
              </p>
              <ul className="list-none mt-2 space-y-1">
                <li>
                  <strong>Responsable:</strong> Evolutiva IA S.A.S.
                </li>
                <li>
                  <strong>Correo:</strong>{" "}
                  <a
                    href="mailto:privacidad@conagentes.com"
                    className="text-neon-deep underline"
                  >
                    privacidad@conagentes.com
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
