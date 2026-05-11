import { useState } from 'react';

export default function FAQSection({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="space-y-3">
      <h2 className="section-title mb-6">Perguntas Frequentes</h2>
      {items.map((item, i) => (
        <div key={i} className="border border-gray-800 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium hover:bg-gray-800/50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 py-4 border-t border-gray-800 text-gray-400 text-sm leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
