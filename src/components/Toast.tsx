import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'

interface Toast {
  id: number
  message: string
  kind: 'success' | 'info'
}

interface ToastContextValue {
  showToast: (message: string, kind?: Toast['kind']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let nextId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, kind: Toast['kind'] = 'info') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, kind }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-[90] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="glass-card pointer-events-auto flex items-start gap-3 px-4 py-3 text-sm"
            >
              {toast.kind === 'success' ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
              ) : (
                <Info className="mt-0.5 size-4 shrink-0 text-indigo-400" aria-hidden />
              )}
              <p className="flex-1 leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="rounded-md p-0.5 text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
