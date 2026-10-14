import React, { useState, useEffect } from 'react';
import { TemplateTheme, VentureData } from '../types';
import { InteractiveMapPlot } from '../types/interactiveMap';
import { micrositeService } from '../services/micrositeService';
import { SITE_CONFIG } from '../siteConfig';

interface ContactFormSectionProps {
  theme?: any;
  venture: VentureData;
  onSubmitSuccess?: () => void;
  selectedPlot?: InteractiveMapPlot | null;
}

export default function ContactFormSection({
  theme,
  venture,
  onSubmitSuccess,
  selectedPlot,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plotNumber: selectedPlot?.plot_no ? String(selectedPlot.plot_no) : '',
    interestedVenture: `I am Interested in ${venture.title || 'HIGHLANDS'}`,
    bookingDate: '',
    preferredSlot: 'Morning (10:00 AM)',
    message: 'Requesting Site Visit',
  });

  useEffect(() => {
    if (selectedPlot) {
      setFormData((prev) => ({
        ...prev,
        plotNumber: selectedPlot.plot_no ? String(selectedPlot.plot_no) : '',
        message: prev.message || `I am interested in scheduling a site visit for Plot #${selectedPlot.plot_no} (${selectedPlot.facing || 'East'} Facing, ${selectedPlot.status}).`,
      }));
    }
  }, [selectedPlot]);

  useEffect(() => {
    if (venture?.title) {
      setFormData((prev) => ({
        ...prev,
        interestedVenture: `I am Interested in ${venture.title}`,
      }));
    }
  }, [venture?.title]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedInfo, setSubmittedInfo] = useState<{ fullName: string; phone: string }>({
    fullName: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await micrositeService.submitEnquiry({
        name: formData.fullName,
        mobile: formData.phone,
        email: formData.email || undefined,
        plot_number: formData.plotNumber || undefined,
        booking_date: formData.bookingDate || undefined,
        preferred_slot: formData.preferredSlot,
        venture_id: venture.ventureId || SITE_CONFIG.ventureIdentifier, // Hidden venture tracking
        venture_slug: venture.rawSections?.slug || SITE_CONFIG.ventureIdentifier || 'arjun-ventures', // Hidden microsite slug
        interested_venture: formData.interestedVenture || venture.title,
        message: formData.message || undefined,
        page: typeof window !== 'undefined' ? window.location.href : 'Microsite Theme 1', // Hidden URL tracking
        source: 'Microsite Theme 1', // Hidden source tracking
        subject: `Site Visit Request - ${venture.title || 'Venture'}${formData.plotNumber ? ` (Plot #${formData.plotNumber})` : ''}`,
      });

      if (response.success) {
        setSubmittedInfo({
          fullName: formData.fullName,
          phone: formData.phone,
        });
        // Clear the form fields upon successful booking
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          plotNumber: '',
          interestedVenture: `I am Interested in ${venture.title || 'HIGHLANDS'}`,
          bookingDate: '',
          preferredSlot: 'Morning (10:00 AM)',
          message: 'Requesting Site Visit',
        });
        setIsSubmitted(true);
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setSubmitError(response.message || 'Could not submit your request. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error while submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white border-b border-[#EAE4D9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#EAE4D9]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
                Private Concierge
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D] leading-tight">
              Schedule Your Guided Site Viewing
            </h2>
          </div>

          <p className="text-base text-[#556477] font-light leading-relaxed max-w-md">
            Experience the elevated topography, road infrastructure, and serene plotted layout in
            person with our senior land consultants.
          </p>
        </div>

        {/* Concierge Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Venture Location Map (5 cols) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <div className="bg-[#FAF8F5] border border-[#EAE4D9] p-5 sm:p-6 rounded-sm shadow-sm flex flex-col flex-1 h-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-[#0B1B3D] text-[#C5A880] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#0B1B3D]">
                      Venture Location Map
                    </h4>
                    <p className="text-[11px] text-[#556477]">
                      Interactive GPS & Access Route
                    </p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    venture.contact?.branchAddress || venture.address || venture.title || 'Tada, Andhra Pradesh'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-sm bg-white border border-[#EAE4D9] text-[#0B1B3D] hover:bg-[#C5A880] hover:border-[#C5A880] hover:text-[#0B1B3D] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-2xs"
                  title="Open in Google Maps"
                >
                  <span>Open Maps</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>

              {/* Generous High-Visibility Map Canvas */}
              <div className="w-full flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] rounded-sm overflow-hidden border border-[#EAE4D9] bg-white relative shadow-inner">
                <iframe
                  title="Venture Location Google Map"
                  src={
                    venture.contact?.googleMapsEmbedUrl ||
                    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31050.15024419996!2d80.005085!3d13.585526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d81232870197d%3A0xb35a0cfb247f082e!2sTada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000'
                  }
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#556477] pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-sm text-[#C5A880]">near_me</span>
                  <span>{venture.location || 'Prime Corridor'}</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200">
                  Live Navigation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Private Inspection Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-sm bg-[#FAF8F5] border border-[#EAE4D9] shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1B3D]">
                    Site Visit Reserved
                  </h3>
                  <p className="text-sm text-[#556477] font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0B1B3D]">{submittedInfo.fullName || formData.fullName}</strong>. Our
                    PRO team will contact you soon on{' '}
                    <strong className="text-[#0B1B3D]">{submittedInfo.phone || formData.phone}</strong> to confirm your
                    appointment and plot walkthrough.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-sm bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#162a56] cursor-pointer"
                  >
                    Schedule Another Site Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center pb-2">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D]">
                      Site Visit Request
                    </h3>
                  </div>

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] placeholder-[#8C7D6B] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email (Optional)"
                        className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] placeholder-[#8C7D6B] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Plot Number (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone"
                        className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] placeholder-[#8C7D6B] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={formData.plotNumber}
                        onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                        placeholder="Plot Number"
                        className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] placeholder-[#8C7D6B] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Interested In Venture */}
                  <div>
                    <input
                      type="text"
                      value={formData.interestedVenture}
                      onChange={(e) => setFormData({ ...formData, interestedVenture: e.target.value })}
                      placeholder={`I am Interested in ${venture.title || 'HIGHLANDS'}`}
                      className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors font-medium"
                    />
                  </div>

                  {/* Row 4: Booking Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#6B7280] font-normal block">
                      Booking Date
                    </label>
                    <input
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors"
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#6B7280] font-normal block">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['Morning (10:00 AM)', 'Afternoon (2:00 PM)', 'Evening (4:30 PM)'].map(
                        (slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                            className={`py-2.5 px-2 rounded-md border text-xs font-bold tracking-wider text-center transition-all cursor-pointer ${
                              formData.preferredSlot === slot
                                ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-xs'
                                : 'bg-white text-[#556477] border-[#D5D0C7] hover:border-[#0B1B3D]'
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Requesting Site Visit"
                      className="w-full px-4 py-3 bg-white border border-[#D5D0C7] text-[#0B1B3D] placeholder-[#8C7D6B] text-sm rounded-md focus:outline-none focus:border-[#0B1B3D] transition-colors resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2 animate-fadeIn">
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#0B1B3D] hover:bg-[#162a56] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
