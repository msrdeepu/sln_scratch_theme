import React, { useState } from 'react';
import { VentureData } from '../types';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  theme?: any;
  venture: VentureData;
}

export default function FaqSection({ venture }: FaqSectionProps) {
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
    <section id="faqs" className="py-20 lg:py-28 bg-[#fafaf9] border-b border-zinc-200/90 text-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header: Standardized heading without chip badge or subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Minimalist Accordions */}
        <div className="divide-y divide-zinc-200/80 border border-zinc-200/90 bg-white rounded-2xl px-6 sm:px-8 shadow-xs">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5 sm:py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                      isOpen
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 rotate-180'
                        : 'border-zinc-200 text-zinc-400 group-hover:border-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed pr-8">
                    {faq.a}
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
