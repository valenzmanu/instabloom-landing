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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="border-b border-espresso/10 bg-rose/40">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.35em] text-espresso/70 md:justify-between md:px-10">
            <span>Atención exclusiva: 1 evento por día</span>
            <span className="hidden h-1 w-1 rounded-full bg-champagne md:inline-block" />
            <span>Bodas high-end en Guatemala</span>
            <span className="hidden h-1 w-1 rounded-full bg-champagne md:inline-block" />
            <span>Respuesta &lt; 24h</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}images/instabloom-logo.png`}
              alt="InstaBloom"
              className="h-8 w-auto"
              loading="lazy"
            />
            <div className="hidden text-sm uppercase tracking-[0.4em] text-espresso/70 md:block">
              InstaBloom
            </div>
          </div>
          <Button href="#bloquear-fecha">Bloquear fecha</Button>
        </div>
      </header>

      <main>
        <Section>
          <div className="space-y-10">
            <div className="space-y-4 reveal">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/60">
                Bodas high-end en Guatemala
              </p>
              <h1 className="font-serif text-4xl leading-tight text-espresso md:text-6xl">
                No es un photobooth, es el highlight de tu fiesta.
              </h1>
            </div>
            <div className="relative reveal">
              <ImagePlaceholder
                label="Imagen Hero — Fotografía editorial B/N del Insta-Booth + impresiones"
                imageSrc={`${import.meta.env.BASE_URL}images/hero-bw.png`}
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
                  Prepárate para los cumplidos. Esta experiencia será el detalle
                  del que todos tus invitados hablarán.
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
                  "Experiencia alineada a bodas high-end",
                ]}
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href="#bloquear-fecha">Bloquear fecha</Button>
                <a
                  href="#el-problema"
                  className="text-sm uppercase tracking-[0.3em] text-espresso/70 transition hover:text-espresso"
                >
                  Ver por qué es diferente
                </a>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-espresso/60">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>
        </Section>

        <Section id="el-problema" className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder label="Imagen — Escena elegante de boda" className="reveal" />
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
              className="reveal"
            />
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Presentación protagonista del Insta-Booth"
              className="reveal"
            />
            <div className="space-y-6 reveal">
              <div className="space-y-3">
                <p className={badgeClass}>The Royal Studio</p>
                <h2 className="font-serif text-3xl md:text-5xl">
                  Insta-Booth: The Royal Studio
                </h2>
              </div>
              {uspCopy}
              <div className="rounded-2xl border border-champagne/40 bg-paper px-6 py-6 text-lg font-semibold text-espresso shadow-soft">
                InstaBloom monta estudios editoriales que producen fotografías
                impresas de calidad de colección.
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
                  <ImagePlaceholder label={block.image} />
                  <BulletList items={block.bullets} />
                  <p className="text-base text-espresso/80">{block.closing}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="space-y-6 reveal">
            <h2 className="font-serif text-3xl md:text-5xl">Esto es para ti si:</h2>
            <BulletList
              items={[
                "Estás organizando una boda high-end en Guatemala",
                "Valoras la estética editorial y el diseño",
                "Entiendes la fotografía impresa como un objeto de legado",
                "Prefieres pocos proveedores, ejecutados a la perfección",
              ]}
            />
            <div className="border-t border-espresso/20 pt-6 text-lg text-espresso/80">
              No es para bodas donde el precio es el único criterio. Es para
              anfitriones que cuidan cada decisión.
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Detalle elegante del Insta-Booth B/N"
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
              <Button href="#bloquear-fecha">Bloquear fecha</Button>
            </div>
            <ImagePlaceholder label="Imagen — Cierre editorial emocional" className="reveal" />
          </div>
        </Section>

        <Section id="bloquear-fecha" className="border-t border-espresso/10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Bloquear fecha</h2>
              <p className="text-lg text-espresso/80">
                Cuéntanos lo esencial y te respondemos con disponibilidad.
              </p>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-6 text-sm text-espresso/70">
                <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                  Bodas de alto nivel
                </p>
                <p className="mt-3">Guatemala</p>
              </div>
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
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  WhatsApp
                </label>
                <input
                  required
                  type="tel"
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
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  Venue (Ciudad de Guatemala / Antigua / Otro)
                </label>
                <select
                  required
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
                  Mensaje
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Solicitar disponibilidad
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
