import { useEffect, useRef, useState } from "react";
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
    closing: "Una experiencia fluida, guiada y memorable.",
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

const processSteps = [
  {
    number: "Paso 01",
    title: "Cuidamos la estética",
    description:
      "Alineamos el set, la iluminación y el marco digital con el mood de tu boda.",
    imageLabel: "Imagen — Moodboard y ajustes del set (placeholder)",
    imageSrc: `${import.meta.env.BASE_URL}images/mood-image.jpeg`,
    imageClassName: "object-contain",
  },
  {
    number: "Paso 02",
    title: "Dirección editorial",
    description:
      "Hosts InstaBloom guían a tus invitados para lograr fotos con presencia editorial.",
    imageLabel: "Imagen — Dirección de pose y guía editorial (placeholder)",
  },
  {
    number: "Paso 03",
    title: "Impresión instantánea",
    description:
      "Cada invitado se lleva impresiones al momento, con acabado premium.",
    imageLabel: "Imagen — Impresiones premium en mano (placeholder)",
  },
];

const badgeClass =
  "inline-flex items-center rounded-full border border-champagne/40 bg-rose/50 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-espresso";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [whyDifferentIndex, setWhyDifferentIndex] = useState(0);
  const [whyDifferentMaxHeight, setWhyDifferentMaxHeight] = useState<
    number | null
  >(null);
  const whyDifferentAutoPausedUntil = useRef(0);
  const whyDifferentDragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    isActive: boolean;
  } | null>(null);
  const whyDifferentSlideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [processIndex, setProcessIndex] = useState(0);
  const [processMaxHeight, setProcessMaxHeight] = useState<number | null>(null);
  const processDragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const processSlideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      "Hola InstaBloom, me gustaria bloquear fecha para mi boda:",
      "",
      `Nombre: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Fecha del evento: ${eventDate || "-"}`,
    ].filter(Boolean);
    const encoded = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/50242911090?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialName = params.get("name");
    const initialEmail = params.get("email");
    const initialEventDate = params.get("date");

    if (initialName) setName(initialName);
    if (initialEmail) setEmail(initialEmail);
    if (initialEventDate) setEventDate(initialEventDate);

    if (initialName || initialEmail || initialEventDate) return;

    try {
      const raw = window.localStorage.getItem("instabloom.form");
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        name?: string;
        email?: string;
        eventDate?: string;
      };
      if (saved.name) setName(saved.name);
      if (saved.email) setEmail(saved.email);
      if (saved.eventDate) setEventDate(saved.eventDate);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "instabloom.form",
        JSON.stringify({ name, email, eventDate })
      );
    } catch {
      // ignore
    }
  }, [name, email, eventDate]);

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

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 12) {
        setShowScrollHint(false);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      Asegurar mi fecha
    </>
  );
  const topCtaButtonClass = "relative overflow-hidden cta-glow cta-sparkle";

  const whyDifferentTotal = blocks.length;
  const goToWhyDifferent = (index: number) => {
    const normalized =
      ((index % whyDifferentTotal) + whyDifferentTotal) % whyDifferentTotal;
    setWhyDifferentIndex(normalized);
  };

  const processTotal = processSteps.length;
  const goToProcess = (index: number) => {
    const normalized = ((index % processTotal) + processTotal) % processTotal;
    setProcessIndex(normalized);
  };

  const pauseWhyDifferentAutoAdvance = (ms = 30_000) => {
    whyDifferentAutoPausedUntil.current = Date.now() + ms;
  };

  useEffect(() => {
    const intervalMs = 5_000;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (Date.now() < whyDifferentAutoPausedUntil.current) return;
      setWhyDifferentIndex((previous) => (previous + 1) % whyDifferentTotal);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [whyDifferentTotal]);

  useEffect(() => {
    if (!("ResizeObserver" in window)) return;

    const calculate = () => {
      const heights = whyDifferentSlideRefs.current
        .map((node) => node?.getBoundingClientRect().height ?? 0)
        .filter((height) => height > 0);
      const maxHeight = heights.length ? Math.ceil(Math.max(...heights)) : 0;
      setWhyDifferentMaxHeight((previous) =>
        previous === maxHeight || maxHeight === 0 ? previous : maxHeight
      );
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calculate);
    };

    const observer = new ResizeObserver(schedule);
    whyDifferentSlideRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!("ResizeObserver" in window)) return;

    const calculate = () => {
      const heights = processSlideRefs.current
        .map((node) => node?.getBoundingClientRect().height ?? 0)
        .filter((height) => height > 0);
      const maxHeight = heights.length ? Math.ceil(Math.max(...heights)) : 0;
      setProcessMaxHeight((previous) =>
        previous === maxHeight || maxHeight === 0 ? previous : maxHeight
      );
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calculate);
    };

    const observer = new ResizeObserver(schedule);
    processSlideRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="border-b border-espresso/10 bg-rose/40">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.35em] text-espresso/70 md:justify-between md:px-10">
            <span>Atención exclusiva</span>
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
          <Button href="#bloquear-fecha" className={topCtaButtonClass}>
            {ctaContent}
          </Button>
        </div>
      </header>

      <main>
        <Section className="pt-8 pb-12 md:pt-12 md:pb-20">
          <div className="space-y-8">
            <div className="space-y-4 reveal">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/60">
                Para parejas y wedding planners que cuidan cada detalle en Guatemala
              </p>
              <h1 className="font-serif text-4xl leading-tight text-espresso md:text-6xl">
                Convierte tu boda en una experiencia editorial de lujo con recuerdos premium al instante.
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
            <div className="space-y-6 rounded-[28px] border border-espresso/15 bg-paper/85 p-6 shadow-soft backdrop-blur-md md:p-8 reveal">
              <div className="space-y-5">
                <p className="text-lg text-espresso/80 md:text-xl">
                  Un set editorial integrado a tu boda, con fotos impresas premium al
                  instante.
                </p>
                <div className="space-y-3">
                  <BulletList
                    className="space-y-2 text-sm md:text-base"
                    items={[
                      "Respeta la estética de tu boda",
                      "Recuerdos impresos con calidad editorial",
                      "Experiencia cuidada y sin fricciones",
                      "Ejecución impecable (ideal para planners)",
                    ]}
                  />
                  <p className="text-sm uppercase tracking-[0.3em] text-espresso/60">
                    No es para bodas donde el precio es el único criterio
                  </p>
                </div>
                <div className="inline-flex items-center rounded-full border border-champagne/50 bg-rose/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-espresso">
                  Servicio VIP con atención personalizada
                </div>
              </div>
              <BulletList
                items={[
                  "Cámara e iluminación de estudio",
                  "Impresiones premium ilimitadas",
                  "Dirección editorial y set alineado",
                ]}
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href="#el-problema"
                  className="border-espresso/40 bg-cream text-espresso hover:bg-cream/80"
                >
                  Ver la propuesta
                </Button>
              </div>
              <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-espresso/60">
                <p>Explora</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    href="#royal-studio"
                    className="border-espresso/30 bg-cream text-espresso/80 hover:bg-cream/80 hover:text-espresso"
                  >
                    Royal Studio
                  </Button>
                  <Button
                    href="#por-que"
                    className="border-espresso/30 bg-cream text-espresso/80 hover:bg-cream/80 hover:text-espresso"
                  >
                    Porqué es diferente
                  </Button>
                  <Button
                    href="#inversion"
                    className="border-espresso/30 bg-cream text-espresso/80 hover:bg-cream/80 hover:text-espresso"
                  >
                    Inversión
                  </Button>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-espresso/60">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>
        </Section>

        <Section id="el-problema" className="border-t border-espresso/10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Escena elegante de boda"
              imageSrc={`${import.meta.env.BASE_URL}images/venue-image.jpg`}
              className="reveal"
            />
            <div className="space-y-5 reveal">
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                Cuando todo es impecable, un photobooth común simplemente no
                encaja.
              </h2>
              <p className="text-lg text-espresso/80">
                Has invertido tiempo, energía y presupuesto en un venue
                extraordinario, en flores, música y diseño cuidadosamente curado. Los photobooths comunes:
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

        <Section id="royal-studio" className="border-t border-espresso/10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
            <div className="space-y-5 reveal">
              <div className="hidden space-y-3 lg:block">
                <p className={badgeClass}>The Royal Studio</p>
                <h2 className="font-serif text-3xl md:text-5xl">
                  Insta-Booth: The Royal Studio
                </h2>
              </div>
              <div className="space-y-4 text-lg text-espresso/80">
                <p>
                  Un set editorial diseñado para integrarse al mood de tu boda y
                  mantener una estética impecable.
                </p>
                <p>
                  Guía de poses, atención cuidada y fotografías con carácter de
                  publicación.
                </p>
              </div>
              <div className="rounded-2xl border border-champagne/40 bg-paper px-6 py-6 text-lg font-semibold text-espresso shadow-soft">
                Fotografías impresas con calidad de colección, dirección de pose y
                experiencia VIP.
              </div>
              <p className="text-lg text-espresso/80">
                No es un servicio adicional. Es una decisión estética.
              </p>
            </div>
          </div>
        </Section>

        <Section id="por-que" className="border-t border-espresso/10">
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl reveal">
              Por qué es diferente
            </h2>
            <div
              className="space-y-5 reveal"
              role="region"
              aria-roledescription="carousel"
              aria-label="Por qué es diferente"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  pauseWhyDifferentAutoAdvance();
                  goToWhyDifferent(whyDifferentIndex - 1);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  pauseWhyDifferentAutoAdvance();
                  goToWhyDifferent(whyDifferentIndex + 1);
                }
              }}
            >
              <div
                className="touch-pan-y select-none overflow-hidden rounded-2xl transition-[height] duration-300 max-h-[78svh]"
                style={{
                  height: whyDifferentMaxHeight
                    ? `${whyDifferentMaxHeight}px`
                    : undefined,
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse" && event.button !== 0) return;
                  whyDifferentDragState.current = {
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    isActive: true,
                  };
                }}
                onPointerUp={(event) => {
                  const state = whyDifferentDragState.current;
                  if (!state || state.pointerId !== event.pointerId) return;
                  whyDifferentDragState.current = null;
                  const deltaX = event.clientX - state.startX;
                  const deltaY = event.clientY - state.startY;
                  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY))
                    return;
                  pauseWhyDifferentAutoAdvance();
                  if (deltaX > 0) goToWhyDifferent(whyDifferentIndex - 1);
                  if (deltaX < 0) goToWhyDifferent(whyDifferentIndex + 1);
                }}
                onPointerCancel={(event) => {
                  const state = whyDifferentDragState.current;
                  if (!state || state.pointerId !== event.pointerId) return;
                  whyDifferentDragState.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${whyDifferentIndex * 100}%)`,
                  }}
                >
                  {blocks.map((block, index) => (
                    <div
                      key={block.title}
                      className="h-full w-full shrink-0 px-1"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} de ${whyDifferentTotal}`}
                      aria-hidden={index !== whyDifferentIndex}
                    >
                      <div
                        ref={(node) => {
                          whyDifferentSlideRefs.current[index] = node;
                        }}
                        className="h-full overflow-y-auto overscroll-contain rounded-2xl border border-espresso/10 bg-paper p-5 shadow-soft md:p-6"
                      >
                        <div className="grid gap-5 md:grid-cols-2 md:items-start">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm uppercase tracking-[0.3em] text-champagne">
                                {block.number}
                              </span>
                              <h3 className="font-serif text-2xl">
                                {block.title}
                              </h3>
                            </div>
                            <BulletList
                              items={block.bullets}
                              className="space-y-2 text-sm md:space-y-3 md:text-base"
                            />
                            <p className="text-sm text-espresso/80 md:text-base">
                              {block.closing}
                            </p>
                          </div>
                          <ImagePlaceholder
                            label={block.image}
                            imageSrc={block.imageSrc}
                            imageClassName={block.imageClassName}
                            className="aspect-[16/10] md:aspect-[4/3]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      pauseWhyDifferentAutoAdvance();
                      goToWhyDifferent(whyDifferentIndex - 1);
                    }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 bg-cream text-espresso/80 shadow-soft transition hover:bg-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60"
                    aria-label="Anterior"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 18l-6-6 6-6"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {blocks.map((block, index) => {
                      const isActive = index === whyDifferentIndex;
                      return (
                        <button
                          key={block.title}
                          type="button"
                          onClick={() => {
                            pauseWhyDifferentAutoAdvance();
                            goToWhyDifferent(index);
                          }}
                          className={`h-2.5 w-2.5 rounded-full border transition ${
                            isActive
                              ? "border-champagne bg-champagne"
                              : "border-espresso/25 bg-cream hover:bg-cream/80"
                          }`}
                          aria-label={`Ir a ${block.number}`}
                          aria-current={isActive ? "true" : undefined}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      pauseWhyDifferentAutoAdvance();
                      goToWhyDifferent(whyDifferentIndex + 1);
                    }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 bg-cream text-espresso/80 shadow-soft transition hover:bg-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60"
                    aria-label="Siguiente"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 6l6 6-6 6"
                      />
                    </svg>
                  </button>
                </div>

                <span className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  {blocks[whyDifferentIndex]?.number} /{" "}
                  {String(whyDifferentTotal).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 reveal">
              <p className={badgeClass}>Testimonios privados</p>
              <h2 className="font-serif text-3xl md:text-5xl">
                Mensajes que recibimos después de la boda
              </h2>
              <p className="text-lg text-espresso/80">
                Notas reales de parejas y planners al terminar la celebración.
              </p>
            </div>
            <ImagePlaceholder
              label="Imagen — Testimonio en WhatsApp"
              className="reveal"
            />
          </div>
        </Section>

        <Section id="como-funciona" className="border-t border-espresso/10">
          <div className="space-y-8">
            <div className="space-y-4 reveal">
              <p className={badgeClass}>Cómo funciona</p>
              <h2 className="font-serif text-3xl md:text-5xl">
                De la estética al recuerdo.
              </h2>
              <p className="text-lg text-espresso/80">
                Un proceso claro para que todo se vea impecable y fluya durante la
                fiesta.
              </p>
            </div>
            <div
              className="space-y-5 reveal"
              role="region"
              aria-roledescription="carousel"
              aria-label="Cómo funciona"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  goToProcess(processIndex - 1);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  goToProcess(processIndex + 1);
                }
              }}
            >
              <div
                className="touch-pan-y select-none overflow-hidden rounded-2xl transition-[height] duration-300 max-h-[78svh]"
                style={{ height: processMaxHeight ? `${processMaxHeight}px` : undefined }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse" && event.button !== 0) return;
                  processDragState.current = {
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                  };
                }}
                onPointerUp={(event) => {
                  const state = processDragState.current;
                  if (!state || state.pointerId !== event.pointerId) return;
                  processDragState.current = null;
                  const deltaX = event.clientX - state.startX;
                  const deltaY = event.clientY - state.startY;
                  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY))
                    return;
                  if (deltaX > 0) goToProcess(processIndex - 1);
                  if (deltaX < 0) goToProcess(processIndex + 1);
                }}
                onPointerCancel={(event) => {
                  const state = processDragState.current;
                  if (!state || state.pointerId !== event.pointerId) return;
                  processDragState.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${processIndex * 100}%)` }}
                >
                  {processSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="h-full w-full shrink-0 px-1"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} de ${processTotal}`}
                      aria-hidden={index !== processIndex}
                    >
                      <div
                        ref={(node) => {
                          processSlideRefs.current[index] = node;
                        }}
                        className="h-full overflow-y-auto overscroll-contain rounded-2xl border border-espresso/10 bg-paper p-6 shadow-soft"
                      >
                        <div className="grid gap-5 md:grid-cols-2 md:items-start">
                          <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                              {step.number}
                            </p>
                            <h3 className="font-serif text-2xl">{step.title}</h3>
                            <p className="text-base text-espresso/80">
                              {step.description}
                            </p>
                          </div>
                          <ImagePlaceholder
                            label={step.imageLabel}
                            imageSrc={step.imageSrc}
                            imageClassName={step.imageClassName}
                            className="aspect-[16/10] md:aspect-[4/3]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => goToProcess(processIndex - 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 bg-cream text-espresso/80 shadow-soft transition hover:bg-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60"
                    aria-label="Anterior"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 18l-6-6 6-6"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {processSteps.map((step, index) => {
                      const isActive = index === processIndex;
                      return (
                        <button
                          key={step.title}
                          type="button"
                          onClick={() => goToProcess(index)}
                          className={`h-2.5 w-2.5 rounded-full border transition ${
                            isActive
                              ? "border-champagne bg-champagne"
                              : "border-espresso/25 bg-cream hover:bg-cream/80"
                          }`}
                          aria-label={`Ir a ${step.number}`}
                          aria-current={isActive ? "true" : undefined}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToProcess(processIndex + 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/20 bg-cream text-espresso/80 shadow-soft transition hover:bg-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60"
                    aria-label="Siguiente"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 6l6 6-6 6"
                      />
                    </svg>
                  </button>
                </div>

                <span className="text-xs uppercase tracking-[0.3em] text-espresso/60">
                  {String(processIndex + 1).padStart(2, "0")} /{" "}
                  {String(processTotal).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="inversion" className="border-t border-espresso/10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ImagePlaceholder
              label="Imagen — Detalle elegante del Insta-Booth B/N"
              imageSrc={`${import.meta.env.BASE_URL}images/service-showoff.jpg`}
              className="reveal"
            />
            <div className="space-y-5 reveal">
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
                Ofrecemos atención personalizada de principio a fin.
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-espresso/10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">
                Las fechas se asignan por orden de confirmación.
              </h2>
              <p className="text-lg text-espresso/80">
                Si esta experiencia resuena contigo, probablemente eres
                exactamente el tipo de anfitrión para el que fue creada.
              </p>
            </div>
            <ImagePlaceholder
              label="Imagen — Cierre editorial emocional"
              imageSrc={`${import.meta.env.BASE_URL}images/closing-image.jpg`}
              className="reveal"
            />
          </div>
        </Section>

        <Section id="faq" className="border-t border-espresso/10">
          <div className="space-y-8">
            <div className="space-y-5 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Preguntas frecuentes</h2>
              <p className="text-lg text-espresso/80">
                Resolvemos las dudas típicas para que puedas decidir con claridad.
              </p>
            </div>
            <div className="space-y-5 reveal">
              <div className="rounded-2xl border border-espresso/10 bg-paper p-5 shadow-soft md:p-6">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Cuánto tiempo antes llegan y cuánto dura el montaje?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  Llegamos con antelación para montar el set sin interrumpir la
                  recepción; el montaje es discreto y eficiente.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-5 shadow-soft md:p-6">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Cuántas horas de servicio incluye?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  El paquete base contempla el tiempo clave de la recepción. Si
                  necesitas más horas, lo ajustamos.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-5 shadow-soft md:p-6">
                <h3 className="text-base font-semibold text-espresso">
                  ¿Qué pasa si el evento es fuera de Antigua o Ciudad?
                </h3>
                <p className="mt-3 text-sm text-espresso/80">
                  Cubrimos destinos en Guatemala; solo se agregan viáticos según la
                  locación.
                </p>
              </div>
              <div className="rounded-2xl border border-espresso/10 bg-paper p-5 shadow-soft md:p-6">
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
          <div className="space-y-8">
            <div className="space-y-5 reveal">
              <h2 className="font-serif text-3xl md:text-5xl">Asegurar mi fecha</h2>
              <p className="text-lg text-espresso/80">
                Cuéntanos lo esencial y te respondemos con disponibilidad en 24h.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-espresso/10 bg-paper p-5 reveal md:p-6"
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
                  Fecha del evento
                </label>
                <input
                  required
                  type="date"
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                  className="block w-full min-w-0 max-w-full appearance-none rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-left text-espresso focus:border-champagne focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Enviar
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
      <div
        className={`scroll-hint ${showScrollHint ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Desliza para descubrir</span>
      </div>
    </div>
  );
};

export default App;
