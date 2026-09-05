import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, FileText, ShieldCheck, X } from 'lucide-react'
import type { Certificate } from '../data/portfolio'

interface CertificateModalProps {
  certificate: Certificate | null
  onClose: () => void
}

/** Full-screen lightbox for viewing a certificate. */
export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  // Close on Escape + lock scroll while open
  useEffect(() => {
    if (!certificate) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [certificate, onClose])

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${certificate.name}`}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-3xl overflow-hidden p-0"
          >
            <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4 dark:border-white/10">
              <div className="min-w-0">
                <h3 className="font-display truncate font-semibold text-slate-900 dark:text-white">
                  {certificate.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {certificate.organization} · {certificate.date}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate view"
                className="glass-card flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10">
              {certificate.image ? (
                <img
                  src={certificate.image}
                  alt={`${certificate.name} certificate`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 p-10 text-center">
                  <ShieldCheck className="size-12 text-indigo-400" aria-hidden />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Certificate image goes here — drop it in{' '}
                    <code className="rounded bg-slate-900/10 px-1.5 py-0.5 text-xs dark:bg-white/10">
                      public/images/certificates/
                    </code>{' '}
                    and set the{' '}
                    <code className="rounded bg-slate-900/10 px-1.5 py-0.5 text-xs dark:bg-white/10">
                      image
                    </code>{' '}
                    field in the data file.
                  </p>
                  {certificate.credentialId && (
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Credential ID: {certificate.credentialId}
                    </p>
                  )}
                </div>
              )}
            </div>

            {(certificate.verifyUrl || certificate.pdfUrl) && (
              <div className="flex justify-end gap-3 border-t border-slate-900/10 px-5 py-3 dark:border-white/10">
                {certificate.pdfUrl && (
                  <a
                    href={certificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
                  >
                    <FileText className="size-4" aria-hidden /> View PDF
                  </a>
                )}
                {certificate.verifyUrl && (
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    Verify Certificate <ExternalLink className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
