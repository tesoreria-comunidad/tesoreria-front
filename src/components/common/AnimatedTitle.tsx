import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      repeat: Infinity, // 🔁 bucle infinito
      repeatDelay: 5, // pausa entre loops
    },
  },
};

const letter: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "keyframes",
      stiffness: 1200,
      damping: 40,
      repeat: Infinity,
      repeatDelay: 1.5,
    },
  },
};

export function AnimatedTitle({ text = "Mi Pelícano" }: { text?: string }) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-xl md:text-3xl font-semibold text-gray-900 flex flex-wrap justify-center  select-none"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letter}
          className={`inline-block ${char === " " ? "w-3" : ""}`}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
