import React, { useState } from 'react';
import { TemplateTheme, VentureData } from '../types';

interface FaqSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
}

export default function FaqSection({ theme, venture }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const curatedFaqs = [
    {
      q: 'What are the official legal and planning approvals for this venture?',
      a: 'This is a 100% sanctioned residential plotted layout with official statutory approval and clear titles. All revenue conversion orders, layout sanctions, and statutory records are on public file for immediate buyer verification.',
    },
    {
      q: 'Which banking institutions have pre-approved the project for loans?',
      a: 'Leading nationalized and private financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and LIC Housing Finance have completed thorough legal vetting and pre-approved the project for up to 75% plot purchase and composite home construction loans.',
    },
    {
      q: 'How does immediate spot registration work for prospective buyers?',
      a: 'Upon plot selection and down payment confirmation, our in-house legal team coordinates directly with the local Sub-Registrar Office to execute the registered sale deed in the buyer’s name within 7 to 10 working days, backed by a clear encumbrance certificate.',
    },
    {
      q: 'What internal infrastructure is already completed on the project ground?',
      a: 'Internal blacktop roads of 40 and 50 ft width, masonry compound walls, entrance gates with security cabins, underground stormwater drainage pipelines, electrical transformers with streetlights, and avenue plantations are fully implemented on-site.',
    },
    {
      q: 'How far is the venture from the nearest city and highway?',
      a: 'The venture is excellently connected to the nearest national highway and major urban centers, ensuring ease of daily commute and strong long-term capital appreciation.',
    },
  ];

  // Use live FAQs from CMS if available, else fall back to curated defaults
  const faqs = (venture.faqs && venture.faqs.length > 0)
    ? venture.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : curatedFaqs;

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#EAE4D9]">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
              Investor Clarifications
            </span>
            <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D]">
            Frequently Addressed Questions
          </h2>

          <p className="text-base text-[#556477] font-light leading-relaxed">
            Essential facts regarding legal titles, bank approvals, possession timelines, and
            infrastructure standards.
          </p>
        </div>

        {/* Minimalist Accordions */}
        <div className="divide-y divide-[#EAE4D9] border-y border-[#EAE4D9] bg-white rounded-sm px-6 sm:px-10 shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 sm:py-7 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left flex items-start justify-between gap-6 cursor-pointer group"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#0B1B3D] group-hover:text-[#C5A880] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border border-[#EAE4D9] flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#0B1B3D] text-white border-[#0B1B3D]' : 'bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-12 text-sm text-[#556477] font-light leading-relaxed animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
