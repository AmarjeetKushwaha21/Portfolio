import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { CertificateModal } from '../components/CertificateModal'
import { PlaceholderBadge } from '../components/PlaceholderBadge'
import { portfolioData } from '../data/portfolio'

export function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="certificates-heading"
        eyebrow="Certifications"
        title="Credentials & certifications"
        subtitle="Click any certificate to view it full-screen."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.certificates.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.05}>
            <button
              type="button"
              onClick={() => setSelected(cert)}
              aria-label={`View certificate: ${cert.name}`}
              className="glass-card group h-full w-full overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ShieldCheck
                    className="size-10 text-indigo-400/70 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                    {cert.name}
                  </h3>
                  {cert.placeholder && <PlaceholderBadge />}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {cert.organization} · {cert.date}
                </p>
                {cert.credentialId && (
                  <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
