import { useState } from 'react';

export default function FAQSection({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="space-y-2">
      <h2 className="section-title mb-8">Perguntas frequentes</h2>
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden transition-all duration-200"
          style={{
            background: open === i ? 'rgba(255,255,255,0.03)' : 'transparent',
            border: `1px solid ${open === i ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-sm font-medium pr-4" style={{ color: 'var(--text-1)' }}>{item.q}</span>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background: open === i ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${open === i ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <svg
                className="w-3 h-3 transition-transform duration-200"
                style={{
                  color: open === i ? '#22d3ee' : 'var(--text-3)',
                  transform: open === i ? 'rotate(180deg)' : 'none',
                }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {open === i && (
            <div className="px-5 pb-5 animate-float-in">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
