import { useEffect, useMemo, useState } from "react";
import Section from "./components/Section";
import Button from "./components/Button";
import ImagePlaceholder from "./components/ImagePlaceholder";
import BulletList from "./components/BulletList";

const blocks = [
  {
    number: "01",
    title: "Tecnología de estudio profesional",
    image: "Imagen — Equipo de cámara e iluminación",
    imageSrc: `${import.meta.env.BASE_URL}images/guac-tech-showoff.png`,
    bullets: [
      "Cámara profesional DSLR",
      "Iluminación y flash de estudio calibrados para tu evento",
      "Aro de luz integrado",
      "Impresora térmica industrial para impresiones duraderas",
      "Sistema de respaldo para máxima confiabilidad",
    ],
    closing:
      "El resultado: fotografías con calidad editorial, no simples snapshots.",
  },
  {
    number: "02",
    title: "Escenario editorial de impacto",
    image: "Imagen — Flowerwall premium con invitados",
    imageSrc: `${import.meta.env.BASE_URL}images/flowerwall-showoff.jpg`,
    bullets: [
      "Flowerwall premium blanco (2.40 × 2.40 m)",
      "Rótulo neón a elección",
      "Mobiliario limpio y elegante",
      "Experiencia de atención tipo VIP",
    ],
    closing: "Todo está diseñado para verse impecable en tu recepción.",
  },
  {
    number: "03",
    title: "El highlight de la celebración",
    image: "Imagen — Invitados interactuando con el estudio",
    imageSrc: `${import.meta.env.BASE_URL}images/guests-showoff.jpg`,
    imageClassName: "object-[center_10%]",
    bullets: [
      "Marco digital personalizado a la estética de tu boda",
      "Galería virtual para tus invitados",
      "Compartir inmediato por AirDrop",
      "Hosts InstaBloom cuidando el flujo y la experiencia",
    ],
    closing: "Prepárate para los cumplidos.",
  },
  {
    number: "04",
    title: "Impresiones ilimitadas",
    image: "Imagen — Impresiones sobre fondo floral",
    imageSrc: `${import.meta.env.BASE_URL}images/prints-closeup.png`,
    bullets: [
      "Ilimitadas durante el servicio",
      "Calidad que no se decolora con el tiempo",
      "Un recuerdo físico que realmente vale la pena conservar",
    ],
    closing: "Esto es lo que tus invitados se llevan a casa.",
  },
];

const badgeClass =
  "inline-flex items-center rounded-full border border-champagne/40 bg-rose/50 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-espresso";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      "Hola InstaBloom, me gustaria bloquear fecha.",
      "",
      `Nombre: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Telefono: ${phone || "-"}`,
      `Fecha del evento: ${eventDate || "-"}`,
      `Venue: ${venue || "-"}`,
      `Perfil: ${role || "-"}`,
      message ? `Mensaje: ${message}` : null,
    ].filter(Boolean);
    const encoded = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/50242911090?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const uspCopy = useMemo(
    () => (
      <div className="space-y-6 text-lg text-espresso/80 reveal">
        <p>
          Un estudio editorial diseñado para integrarse a la estética de tu boda y
          elevarla.
        </p>
        <p>
          Cada elemento —desde la iluminación hasta las impresiones— está pensado
          para crear fotografías con presencia, elegancia y permanencia.
        </p>
      </div>
    ),
    []
  );

  const ctaContent = (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M20.52 3.48A11.96 11.96 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.56 4.2 1.64 6.04L0 24l6.08-1.6a12.1 12.1 0 0 0 5.96 1.52h.01c6.64 0 12.04-5.4 12.04-12.04 0-3.21-1.25-6.22-3.57-8.4ZM12.05 21.5h-.01a9.96 9.96 0 0 1-5.08-1.4l-.37-.22-3.6.94.96-3.5-.24-.36A9.9 9.9 0 0 1 2.1 12.04C2.1 6.6 6.62 2.1 12.04 2.1c2.64 0 5.12 1.03 6.99 2.91a9.85 9.85 0 0 1 2.91 6.99c0 5.43-4.46 9.9-9.89 9.9Zm5.46-7.44c-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.16-.68.16-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.06-.3-.16-1.28-.48-2.44-1.52-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.14-.62.14-.14.3-.36.46-.54.16-.18.2-.3.3-.5.1-.2.04-.38-.02-.54-.06-.16-.68-1.64-.94-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 2.98 1.26 3.18c.16.2 2.16 3.3 5.24 4.62.74.32 1.32.5 1.78.64.74.24 1.42.2 1.96.12.6-.1 1.78-.72 2.02-1.4.24-.7.24-1.3.18-1.4-.06-.12-.26-.2-.56-.36Z" />
      </svg>
      Reservar
    </>
  );
  const ctaButtonClass = "relative overflow-hidden cta-glow";

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="border-b border-espresso/10 bg-rose/40">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.35em] text-espresso/70 md:justify-between md:px-10">
            <span>Atención exclusiva: 1 evento por día</span>
            <span className="hidden h-1 w-1 rounded-full bg-champagne md:inline-block" />
            <span>Bodas de alto nivel en Guatemala</span>
            <span className="hidden h-1 w-1 rounded-full bg-champagne md:inline-block" />
            <span>Respuesta en 24h</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}images/instabloom-logo.png`}
              alt="InstaBloom"
              className="h-12 w-auto md:h-14"
              loading="lazy"
            />
          </div>
          <Button href="#bloquear-fecha" className={ctaButtonClass}>
            {ctaContent}
          </Button>
        </div>
      </header>

      <main>
        <Section>
          <div className="space-y-10">
            <div className="space-y-4 reveal">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/60">
                Para parejas y wedding planners que curan cada detalle en Guatemala
              </p>
              <h1 className="font-serif text-4xl leading-tight text-espresso md:text-6xl">
                No es un photobooth: es el estudio editorial que convierte tu boda en
                un recuerdo de colección.
              </h1>
            </div>
            <div className="relative reveal">
              <ImagePlaceholder
                label="Imagen Hero — Fotografía editorial B/N del Insta-Booth + impresiones"
                imageSrc={`${import.meta.env.BASE_URL}images/service-showoff.jpg`}
                className="aspect-[16/9] w-full rounded-[36px] border border-champagne/40 bg-espresso/80 text-cream/70 md:aspect-[21/9]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 top-6 hidden h-24 w-24 rounded-full border border-champagne/40 md:block"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-10 top-20 hidden h-3 w-3 rounded-full bg-champagne/60 md:block"
              />
            </div>
            <div className="space-y-8 rounded-[28px] border border-espresso/15 bg-paper/85 p-8 shadow-soft backdrop-blur-md md:p-10 reveal">
              <div className="space-y-6">
                <p className="text-lg text-espresso/80 md:text-xl">
                  Prepárate para los cumplidos. Tus invitados se llevan impresiones
                  con calidad editorial y una experiencia VIP integrada a la
                  estética del evento.
                </p>
                <p className="text-base uppercase tracking-[0.25em] text-espresso/60">
                  Diseñado para bodas que se recuerdan y se comentan.
                </p>
                <div className="inline-flex items-center rounded-full border border-champagne/50 bg-rose/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-espresso">
                  Atención exclusiva: solo 1 evento por día
                </div>
              </div>
              <BulletList
                items={[
                  "Fotografía de estudio, no cabina",
                  "Impresiones que no se desvanecen con el tiempo",
                  "Experiencia alineada a bodas de alto nivel",
                ]}
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href="#bloquear-fecha" className={ctaButtonClass}>
                  {ctaContent}
                </Button>
                <Button
                  href="#el-problema"
                  className="border-espresso/40 bg-cream text-espresso hover:bg-cream/80"
                >
                  Ver por qué es diferente
                </Button>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-espresso/60">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>
        </Section>

        <Section id="el-problema" className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Escena elegante de boda"
              imageSrc={`${import.meta.env.BASE_URL}images/venue-image.jpg`}
              className="reveal"
            />
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                Cuando todo es impecable, un photobooth común simplemente no
                encaja.
              </h2>
              <p className="text-lg text-espresso/80">
                Has invertido tiempo, energía y presupuesto en un venue
                extraordinario, en flores, música y diseño cuidadosamente curado.
              </p>
              <BulletList
                items={[
                  "Rompen la estética del evento",
                  "Se sienten genéricos o improvisados",
                  "Entregan recuerdos que terminan olvidados",
                ]}
              />
              <p className="text-lg text-espresso/80">
                Para una boda de alto nivel, eso no es suficiente.
              </p>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                <span className="block">
                  Tu boda no necesita más entretenimiento.
                </span>
                <span className="block">
                  Necesita un recuerdo tangible que trascienda el evento.
                </span>
              </h2>
              <p className="text-lg text-espresso/80">
                Las fotografías impresas viven más allá del día de la boda.
                Permanecen en álbumes, en hogares y en conversaciones futuras.
              </p>
              <div className="space-y-3 text-lg font-semibold text-espresso">
                <p>Por eso en InstaBloom no instalamos cabinas.</p>
                <p>Creamos recuerdos físicos con intención y legado.</p>
              </div>
            </div>
            <ImagePlaceholder
              label="Imagen — Close-up de manos sosteniendo impresiones"
              imageSrc={`${import.meta.env.BASE_URL}images/prints-closeup.png`}
              className="reveal min-h-[220px]"
            />
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3 reveal lg:hidden">
              <p className={badgeClass}>The Royal Studio</p>
              <h2 className="font-serif text-3xl md:text-5xl">
                Insta-Booth: The Royal Studio
              </h2>
            </div>
            <div className="reveal overflow-hidden rounded-2xl border border-espresso/15 bg-rose/40">
              <video
                className="h-full w-full object-cover"
                poster={`${import.meta.env.BASE_URL}images/hero-bw.png`}
                preload="auto"
                playsInline
                muted
                loop
                autoPlay
                aria-label="Presentación protagonista del Insta-Booth"
              >
                <source
                  src={`${import.meta.env.BASE_URL}videos/booth-showoff-720p.mp4`}
                  type="video/mp4"
                />
                Tu navegador no soporta video en HTML5.
              </video>
            </div>
            <div className="space-y-6 reveal">
              <div className="hidden space-y-3 lg:block">
                <p className={badgeClass}>The Royal Studio</p>
                <h2 className="font-serif text-3xl md:text-5xl">
                  Insta-Booth: The Royal Studio
                </h2>
              </div>
              {uspCopy}
              <div className="rounded-2xl border border-champagne/40 bg-paper px-6 py-6 text-lg font-semibold text-espresso shadow-soft">
                InstaBloom monta estudios editoriales que producen fotografías
                impresas de calidad de colección, con dirección de pose y
                experiencia VIP.
              </div>
              <p className="text-lg text-espresso/80">
                No es un servicio adicional. Es una decisión estética.
              </p>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="space-y-10">
            <h2 className="font-serif text-3xl md:text-5xl reveal">
              Por qué es diferente
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              {blocks.map((block, index) => (
                <div
                  key={block.title}
                  className={`space-y-6 rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft transition duration-300 hover:-translate-y-1 ${
                    index % 2 === 1 ? "md:translate-y-6" : ""
                  } reveal`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm uppercase tracking-[0.3em] text-champagne">
                      {block.number}
                    </span>
                    <h3 className="font-serif text-2xl">{block.title}</h3>
                  </div>
                  <ImagePlaceholder
                    label={block.image}
                    imageSrc={block.imageSrc}
                    imageClassName={block.imageClassName}
                    className="aspect-[4/3]"
                  />
                  <BulletList items={block.bullets} />
                  <p className="text-base text-espresso/80">{block.closing}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4 reveal">
              <p className={badgeClass}>Cómo funciona</p>
              <h2 className="font-serif text-3xl md:text-5xl">
                De la estética al recuerdo, sin fricciones.
              </h2>
              <p className="text-lg text-espresso/80">
                Un proceso claro para que todo se vea impecable y fluya durante la
                fiesta.
              </p>
            </div>
            <div className="space-y-6 rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                Paso 01
              </p>
              <h3 className="font-serif text-2xl">Cuidamos la estetica</h3>
              <p className="text-base text-espresso/80">
                Alineamos el set, la iluminación y el marco digital con el mood de
                tu boda.
              </p>
            </div>
            <div className="space-y-6 rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                Paso 02
              </p>
              <h3 className="font-serif text-2xl">Dirección editorial</h3>
              <p className="text-base text-espresso/80">
                Hosts InstaBloom guían a tus invitados para lograr fotos con
                presencia editorial.
              </p>
            </div>
            <div className="space-y-6 rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                Paso 03
              </p>
              <h3 className="font-serif text-2xl">Impresión instantánea</h3>
              <p className="text-base text-espresso/80">
                Cada invitado se lleva impresiones al momento, con acabado premium.
              </p>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="space-y-6 reveal">
            <h2 className="font-serif text-3xl md:text-5xl">Esto es para ti si:</h2>
            <BulletList
              items={[
                "Estás organizando una boda de alto nivel en Guatemala",
                "Valoras la estética editorial y el diseño",
                "Entiendes la fotografía impresa como un objeto de legado",
                "Prefieres pocos proveedores, ejecutados a la perfección",
              ]}
            />
            <div className="border-t border-espresso/20 pt-6 text-lg text-espresso/80">
              No es para bodas donde el precio es el único criterio. Es para
              anfitriones que buscan recuerdos de colección.
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Detalle elegante del Insta-Booth B/N"
              imageSrc={`${import.meta.env.BASE_URL}images/service-showoff.jpg`}
              className="reveal"
            />
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Inversión</h2>
              <p className="font-serif text-5xl text-espresso md:text-6xl">Q7,800</p>
              <div className="space-y-2 text-base text-espresso/80">
                <p>10% anticipo — Q780 (bloquea la fecha)</p>
                <p>40% confirmación — Q3,120 (1 mes antes)</p>
                <p>50% pago final — Q3,900 (1 día antes del evento)</p>
              </div>
              <div className="space-y-2 text-base text-espresso/80">
                <p>Transferencias bancarias</p>
                <p>Tarjetas de débito y crédito</p>
                <p>VisaCuotas hasta 12 meses</p>
              </div>
              <div className="rounded-2xl border border-champagne/40 bg-rose/40 px-6 py-4 text-base text-espresso">
                Por exclusividad, atendemos solo 1 evento por día.
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">
                Las fechas se asignan por orden de confirmación.
              </h2>
              <p className="text-lg text-espresso/80">
                Si esta experiencia resuena contigo, probablemente eres
                exactamente el tipo de anfitrión para el que fue creada.
              </p>
              <Button href="#bloquear-fecha" className={ctaButtonClass}>
                {ctaContent}
              </Button>
            </div>
            <ImagePlaceholder
              label="Imagen — Cierre editorial emocional"
              imageSrc={`${import.meta.env.BASE_URL}images/closing-image.jpg`}
              className="reveal"
            />
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Preguntas frecuentes</h2>
              <p className="text-lg text-espresso/80">
                Resolvemos las dudas típicas para que puedas decidir con claridad.
              </p>
            </div>
            <div className="space-y-6 reveal">
              <div className="rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Cuánto tiempo antes llegan y cuánto dura el montaje?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  Llegamos con antelación para montar el set sin interrumpir la
                  recepción; el montaje es discreto y eficiente.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Cuántas horas de servicio incluye?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  El paquete base contempla el tiempo clave de la recepción. Si
                  necesitas más horas, lo ajustamos.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Qué pasa si el evento es fuera de Antigua o Ciudad?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  Cubrimos destinos en Guatemala; solo se agregan viáticos según la
                  locación.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Pueden personalizar el marco y el set?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  Sí, el marco digital y la estética se alinean con tu moodboard.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="bloquear-fecha" className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Bloquear fecha</h2>
              <p className="text-lg text-espresso/80">
                Cuéntanos lo esencial y te respondemos con disponibilidad en 24h.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-espresso/10 bg-paper p-6 reveal"
            >
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Nombre
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Teléfono
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Fecha del evento
                </label>
                <input
                  required
                  type="date"
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Soy
                </label>
                <select
                  required
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option>Planner de bodas</option>
                  <option>Novia</option>
                  <option>Novio</option>
                  <option>Pareja</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Venue (Ciudad de Guatemala / Antigua / Otro)
                </label>
                <select
                  required
                  value={venue}
                  onChange={(event) => setVenue(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option>Ciudad de Guatemala</option>
                  <option>Antigua</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Mensaje (opcional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit" className={`w-full ${ctaButtonClass}`}>
                  {ctaContent}
                </Button>
                {submitted && (
                  <p className="text-sm text-champagne">
                    Gracias — te responderemos pronto.
                  </p>
                )}
              </div>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-espresso/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-sm uppercase tracking-[0.3em] text-espresso/60 md:flex-row md:items-center md:justify-between md:px-10">
          <span>InstaBloom</span>
          <span>Bodas de alto nivel en Guatemala</span>
          <span>Guatemala</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
