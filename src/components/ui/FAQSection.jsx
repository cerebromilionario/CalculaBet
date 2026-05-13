import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toFaqSchema } from '../../data/seoFaqs.jsx';

export default function FAQSection({
  items,
  title = 'Perguntas frequentes',
  description,
  eyebrow,
  includeSchema = false,
  className = '',
}) {
  const [open, setOpen] = useState(null);
  const schemaItems = items.map(item => ({
    question: item.question || item.q,
    answerText: item.answerText || item.answer || item.a,
  }));

  return (
    <section className={`space-y-3 ${className}`} aria-labelledby="faq-heading">
      {includeSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(toFaqSchema(schemaItems))}</script>
        </Helmet>
      )}

      <div className="mb-7">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>
            {eyebrow}
          </p>
        )}
        <h2 id="faq-heading" className="section-title mb-3">{title}</h2>
        {description && (
          <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--text-2)' }}>
            {description}
          </p>
        )}
      </div>

      <div className="grid gap-3">
        {items.map((item, i) => {
          const question = item.question || item.q;
          const answer = item.answer || item.a;
          const isOpen = open === i;
          const contentId = `faq-answer-${i}`;

          return (
            <article
              key={item.id || question || i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: isOpen
                  ? 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(255,255,255,0.025))'
                  : 'rgba(255,255,255,0.025)',
                border: `1px solid ${isOpen ? 'rgba(34,211,238,0.22)' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: isOpen ? '0 18px 45px rgba(0,0,0,0.18)' : 'none',
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                type="button"
              >
                <span className="flex items-start gap-3 min-w-0">
                  <span
                    className="mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isOpen ? 'rgba(34,211,238,0.14)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isOpen ? 'rgba(34,211,238,0.28)' : 'rgba(255,255,255,0.08)'}`,
                      color: isOpen ? '#67e8f9' : 'var(--text-3)',
                    }}
                    aria-hidden="true"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 17h.01" />
                      <path d="M9.1 9a3 3 0 1 1 5.5 1.7c-.9.8-1.6 1.3-1.6 2.8" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  <span>
                    {item.category && (
                      <span className="block text-[0.68rem] font-semibold uppercase tracking-widest mb-1" style={{ color: '#67e8f9' }}>
                        {item.category}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-semibold leading-snug" style={{ color: 'var(--text-1)' }}>
                      {question}
                    </span>
                  </span>
                </span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: isOpen ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isOpen ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  aria-hidden="true"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-200"
                    style={{ color: isOpen ? '#22d3ee' : 'var(--text-3)', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div id={contentId} className="px-5 sm:px-6 pb-5 sm:pb-6 animate-float-in">
                  <div className="pl-10 text-sm sm:text-[0.95rem] leading-relaxed space-y-3" style={{ color: 'var(--text-2)' }}>
                    {typeof answer === 'string' ? <p>{answer}</p> : answer}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
