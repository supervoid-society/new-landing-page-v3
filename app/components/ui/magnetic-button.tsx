import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children,...props }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // render tombol biasa di server, baru jadi motion di client
  if (!mounted) {
    return (
      <button {...props} className="rounded-full bg-white text-black px-5 py-2.5 text-sm">
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="rounded-full bg-white text-black px-5 py-2.5 text-sm"
      {...props}
    >
      {children}
    </motion.button>
  );
}