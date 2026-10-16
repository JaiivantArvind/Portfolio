import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import type { ToastMessage } from "../utils/toast";

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      const newToast = customEvent.detail;
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener("portfolio-toast", handleToast);
    return () => window.removeEventListener("portfolio-toast", handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border border-border/80 shadow-2xl backdrop-blur-xl bg-surface-2/95 text-text min-w-[280px] max-w-sm"
            style={{
              borderColor: "var(--color-border)",
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(197, 163, 93, 0.2)",
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-accent shrink-0" />
            ) : (
              <Info size={18} className="text-muted shrink-0" />
            )}
            <span className="text-xs font-medium tracking-wide flex-1 leading-snug">
              {toast.text}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted hover:text-text transition-colors p-1 -mr-1"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
