import { Logo } from "@/components/common/Logo";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderOverlay } from "@/components/common/Loaders/LoaderOverlay";
function LeftHero() {
  return (
    <div className="relative h-full w-full p-6 md:p-10 flex items-center  ">
      {/* Ilustración y texto en columna */}
      <div className="z-10  mb-16 md:mb-24 max-w-[680px]  ">
        {/* Badges / chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="size-4 rounded-full bg-primary/80 aspect-square"></span>
          <span className="size-4 rounded-full bg-primary/80 aspect-square"></span>
          <span className="size-4 rounded-full bg-primary/80 aspect-square"></span>
        </div>

        {/* Headline con “etiquetas” blancas estilo Deel */}
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-black/90 ">
          Gestioná las cuotas de manera
          <span className="bg-primary text-white px-2 -rotate-1 inline-block">
            secilla
          </span>{" "}
          y con{" "}
          <span className="bg-primary text-white px-2 rotate-1 inline-block">
            mejor control
          </span>
        </h1>

        <p className="mt-4 md:mt-5 text-sm md:text-base text-black/70 max-w-[540px]">
          Mi Pelícano es la plataforma creada para gestionar las cuotas de la
          comunidad guía-scout Santa Juana de Arco y San Pío X.
        </p>

        {/* CTA liviano (opcional) */}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex justify-start pointer-events-none "
        aria-hidden="true"
      >
        <DeskSceneSVG className="w-[520px] md:w-[640px] xl:w-[720px] opacity-95 translate-y-6" />
      </div>

      <div className="pointer-events-none absolute -right-12 -bottom-10 w-[420px] h-[420px] rotate-12 bg-white/10 rounded-[24%]" />
      <div className="pointer-events-none absolute -left-10 top-10 w-[300px] h-[300px] -rotate-6 bg-white/10 rounded-[28%]" />
    </div>
  );
}

function DeskSceneSVG({ className = "" }: { className?: string }) {
  // Colores (heredan tu paleta: amarillo protagonista + violetas)
  const yellow = "#FFD85A"; // similar a “primary yellow”
  const purple = "#7C5BC4"; // acento
  const dark = "#2D2D2D";

  return (
    <svg
      className={className}
      viewBox="0 0 900 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* círculo de fondo */}
      <circle cx="260" cy="250" r="180" fill={purple} opacity="0.18" />
      {/* escritorio */}
      <rect x="80" y="280" width="520" height="22" rx="4" fill={dark} />
      <rect x="100" y="302" width="12" height="120" rx="3" fill={dark} />
      <rect x="548" y="302" width="12" height="120" rx="3" fill={dark} />
      {/* silla */}
      <path
        d="M340 230c0-36 24-62 58-62s58 26 58 62v18c0 8-6 14-14 14H354c-8 0-14-6-14-14v-18Z"
        fill={yellow}
      />
      <rect x="350" y="262" width="96" height="18" rx="4" fill={yellow} />
      <circle cx="398" cy="348" r="8" fill={dark} />
      <path d="M398 348L368 402" stroke={dark} strokeWidth="6" />
      <path d="M398 348L428 402" stroke={dark} strokeWidth="6" />
      <rect x="352" y="402" width="92" height="10" rx="3" fill={dark} />
      {/* lámpara */}
      <rect x="180" y="246" width="12" height="36" rx="3" fill={purple} />
      <circle cx="186" cy="230" r="24" fill={yellow} />
      <rect x="172" y="262" width="28" height="10" rx="2" fill={purple} />
      {/* “stickers”/badges negros simulando partners */}

      {/* sombra base */}
      <ellipse cx="330" cy="468" rx="240" ry="18" fill="#000" opacity=".07" />
    </svg>
  );
}

export function LoginPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  // Cuando el form empieza a hacer submit
  const handleLoginStart = () => {
    setShowOverlay(true); // mostramos blur + spinner
  };

  // Cuando el form validó OK y nos pasa a dónde vamos
  const handleLoginSuccess = (url: string) => {
    setIsExiting(true); // dispara exit del card
    // Navegamos al terminar la animación de salida
    setTimeout(() => {
      location.replace(url);
    }, 450); // debe coincidir con la duración del exit
  };

  const handleLoginError = () => {
    // si falló, ocultamos overlay
    setShowOverlay(false);
  };
  return (
    <div className="h-screen w-screen overflow-hidden relative grid place-items-center ">
      {/* Top bar */}
      <section className="absolute w-full h-16 top-0 z-10 flex items-center justify-between px-4 md:px-6">
        <Logo />
      </section>

      {/* Shapes de fondo (tus capas existentes) */}
      <section className="flex items-center max-md:items-end size-full absolute  ">
        <div className="flex h-full w-2/3 overflow-hidden " />
        <div className="flex h-full w-1/2 max-md:h-2/3 rounded-tl-[90%]  overflow-hidden bg-primary-2" />
      </section>

      {/* Panel izquierdo con hero */}
      <section className="h-full w-1/2 absolute left-0 grid place-items-center max-md:hidden">
        <LeftHero />
      </section>

      <section className="h-full w-1/2  max-md:w-full max-md:h-1/2 absolute right-0 grid place-items-center">
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              key="login-card"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-5/6 lg:max-w-[800px] max-md:h-full  mx-auto z-10 bg-white md:px-10 md:py-20 py-8 px-4 grid place-items-center rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
            >
              <LoginForm
                onLoginStart={handleLoginStart}
                onLoginSuccess={handleLoginSuccess}
                onLoginError={handleLoginError}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Overlay de carga (blur + spinner) */}
      <AnimatePresence>
        {showOverlay && (
          <LoaderOverlay
          // si querés mostrar un check antes de navegar, activá:
          // showCheck={true}
          // onCheckDone={() => {/* opcional */}}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
