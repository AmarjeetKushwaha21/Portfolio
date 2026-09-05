import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Brief branded splash while the app mounts. */
export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1100)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07070f]"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-display gradient-text text-4xl font-bold"
            >
              AK
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="h-0.5 w-28 origin-left rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
