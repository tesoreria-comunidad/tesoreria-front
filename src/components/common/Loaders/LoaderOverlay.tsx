// LoadingOverlayDeelish.tsx
import { motion } from "framer-motion";
import { AnimatedTitle } from "../AnimatedTitle";

type Props = {
  text?: string; // "Iniciando sesión..."
  showCheck?: boolean; // si querés mostrar check de confirmación
  onCheckDone?: () => void;
};

export function LoaderOverlay({
  text = "Mi Pelicano",
  showCheck = false,
  onCheckDone,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 overflow-hidden"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Fondo sutil con blur + gradiente */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-2/20" />

      {/* Centro: chip con barra de progreso */}
      <div className="relative h-full w-full grid place-items-center p-6">
        <div className="w-full max-w-[360px]">
          <ProgressChip text={text} />

          {/* Check final (opcional) */}
          {showCheck && (
            <div className="mt-6 flex justify-center">
              <SuccessCheck onDone={onCheckDone} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- piezas ---------- */

function ProgressChip({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl p-3">
      <div className="flex items-center gap-3">
        {/* “avatar”/logo pill */}
        <div className="flex flex-col items-center  w-full">
          <AnimatedTitle text={text || "Mi Pelícano"} />
          {/* Barra de progreso animada */}
          {/* <div className="mt-2 h-2 w-full rounded-full bg-gray-200/90 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "0%"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "100%" }}
            />
          </div> */}
        </div>
      </div>

      {/* shimmer suave en el chip */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function SuccessCheck({ onDone }: { onDone?: () => void }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className="size-10 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
      }}
      onAnimationComplete={onDone}
    >
      <motion.circle
        cx="32"
        cy="32"
        r="26"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0.6 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M18 34 L28 44 L46 24"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
          },
        }}
      />
    </motion.svg>
  );
}
