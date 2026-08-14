import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-110 hover:bg-primary/90"
        >
          <ChevronUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
