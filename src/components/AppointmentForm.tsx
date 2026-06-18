import React, { useState } from "react";
import { SHOWROOMS, TIME_SLOTS } from "../data";
import { BookingDetails } from "../types";
import { CheckCircle, Calendar, Users, MapPin, Phone, Mail, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import SikarVaultDial from "./SikarVaultDial";

interface AppointmentFormProps {
  onSuccess: (booking: BookingDetails) => void;
}

export default function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<BookingDetails>>({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: TIME_SLOTS[0],
    showroom: SHOWROOMS[0].name,
    assistanceType: "Bridal Consultation",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [ticket, setTicket] = useState<BookingDetails | null>(null);

  function validate() {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName?.trim()) {
      tempErrors.fullName = "Full Name is required for imperial consultation registration.";
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email Address is required.";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please input a valid email address.";
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!formData.phone) {
      tempErrors.phone = "Mobile Number is required for SMS pass dispatch.";
    } else if (!phonePattern.test(formData.phone)) {
      tempErrors.phone = "Provide a valid 10-digit Indian mobile number (e.g., 9876543210).";
    }

    if (!formData.date) {
      tempErrors.date = "Please select a preferred visitation date.";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        tempErrors.date = "Reservation date cannot be in the past.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Mimic secure deep mechanical lock turn latency
    setTimeout(() => {
      setIsUnlocked(true);
      setIsSubmitting(false);

      // Elegant delay to showcase gold dial eruption & luxury sound chime
      setTimeout(() => {
        const confirmedTicket = formData as BookingDetails;
        setTicket(confirmedTicket);
        onSuccess(confirmedTicket);
        setIsUnlocked(false); // Reset visual state for subsequent uses
      }, 1500);
    }, 1500);
  }

  if (ticket) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-[#0A0A0A] border-2 border-[#D4AF37] p-6 md:p-8 rounded-3xl text-center space-y-6 box-gold-glow mt-8 font-sans"
      >
        <div className="mx-auto w-16 h-16 bg-gold-400/10 border border-gold-400 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gold-400" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono">VIP Showroom Access Granted</span>
          <h2 className="text-2xl font-serif text-white font-bold">Booking Confirmed</h2>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            A platinum visit pass and SMS digital invitation have been sent to {ticket.phone} and {ticket.email}.
          </p>
        </div>

        {/* The Platinum Entry Ticket */}
        <div className="p-5 rounded-2xl bg-black border border-gold-900 text-left space-y-3 font-sans relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 bg-gold-500/5 rounded-full pointer-events-none" />
          <div className="flex justify-between items-center pb-2.5 border-b border-gold-900/40">
            <h3 className="font-serif text-gold-400 font-bold uppercase text-xs sm:text-sm tracking-wide">NARAYANI VIP ENTRÉE PASS</h3>
            <span className="text-[10px] font-mono text-gold-300">TKT-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
            <div>
              <span className="text-stone-500 block">Imperial Advisor VIP Name</span>
              <span className="font-semibold text-white">{ticket.fullName}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Design consultation focus</span>
              <span className="text-amber-300 font-medium">{ticket.assistanceType}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Visitation Date & Time</span>
              <span className="text-white font-medium">{ticket.date} • {ticket.timeSlot}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Showroom Showroom Location</span>
              <span className="text-stone-300 line-clamp-1">Sikar Flagship Boutique</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setTicket(null);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              date: "",
              timeSlot: TIME_SLOTS[0],
              showroom: SHOWROOMS[0].name,
              assistanceType: "Bridal Consultation",
              message: ""
            });
          }}
          className="px-6 py-2.5 rounded-full bg-[#181116] border border-gold-900 hover:border-gold-400 text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          Book Another Appointment
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-[#0A0A0A] border border-[#D4AF37]/35 p-6 md:p-8 rounded-3xl mt-8 relative font-sans shadow-2xl">
      <div className="absolute top-0 right-0 p-12 bg-gold-400/[0.02] rounded-full pointer-events-none" />
      
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/20 text-gold-300 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Book a Royal Experience
        </div>
        <h2 className="text-3xl font-serif text-white font-bold tracking-wide">
          Book Sikar Boutique Slot
        </h2>
        <p className="text-xs sm:text-sm text-gold-100/60 max-w-lg mx-auto">
          Skip standard wait times. Book an exclusive bridal suite, get transparent evaluation slots, or customize heirloom designs with expert advisors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Traditional Booking Fields */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name & Service Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Consultation Focus Service
                </label>
                <select
                  value={formData.assistanceType}
                  onChange={(e) => setFormData({ ...formData, assistanceType: e.target.value as any })}
                  className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-stone-100 px-4 py-3 rounded-xl outline-none text-sm transition-colors cursor-pointer"
                >
                  <option value="Bridal Consultation">Bridal Consultation (Polki & Heavy Gold Sets)</option>
                  <option value="Custom Designing">Heirloom / Custom Jewelry Designing</option>
                  <option value="Gold Exchange">BIS Transparent Old Gold Exchange / Sell</option>
                  <option value="Valuation & Investment">Sovereign Coins & Gold Bars Investment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Full Name (as per ID)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Devvrat Bhuriya"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-white px-4 py-3 rounded-xl outline-none text-sm transition-colors"
                />
                {errors.fullName && <p className="text-red-400 text-xs font-sans">{errors.fullName}</p>}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Mobile Number (For Gate-Pass & SMS Alerts)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-semibold">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-white pl-14 pr-4 py-3 rounded-xl outline-none text-sm transition-colors font-mono"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs font-sans">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-white px-4 py-3 rounded-xl outline-none text-sm transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs font-sans">{errors.email}</p>}
              </div>
            </div>

            {/* Date and Time selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Visitations Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-stone-100 px-4 py-3 rounded-xl outline-none text-sm transition-colors cursor-pointer"
                />
                {errors.date && <p className="text-red-400 text-xs font-sans">{errors.date}</p>}
              </div>

              {/* Sikar Showroom location auto-selected for compliance */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  VIP Showroom Location
                </label>
                <input
                  type="text"
                  readOnly
                  value="Sikar Flagship - Opp. Kalyan Circle"
                  className="w-full bg-stone-950 border border-gold-900/20 text-stone-400 px-4 py-3 rounded-xl text-sm outline-none cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Time slots custom selector buttons */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                Select Preferred Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: slot })}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      formData.timeSlot === slot
                        ? "bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 border-gold-300 font-bold shadow-lg"
                        : "bg-stone-900 text-stone-300 border-gold-900/20 hover:border-gold-500/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Remarks / Message field */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                  Specific Design Preference, Jewel Weight, or Purity Inquiries
                </label>
                <span className="text-[10px] text-stone-400">Optional</span>
              </div>
              <textarea
                rows={3}
                placeholder="e.g. Bringing traditional Rajasthani design for custom Polki matching weight ~40g."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-900 border border-gold-900/40 focus:border-gold-400 text-white p-4 rounded-xl outline-none text-sm transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 text-center md:text-left">
              <button
                type="submit"
                id="btn-submit-appointment"
                disabled={isSubmitting || isUnlocked}
                className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold tracking-wide uppercase text-xs hover:from-gold-500 hover:to-gold-300 shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Locking Gears..." : isUnlocked ? "Unlocked!" : "Confirm & Book Sikar Slot"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sikar Luxury Interactive Safe Dial (Comes faintly from the background and rotates on type) */}
        <div id="booking-vault-container" className="lg:col-span-5 lg:sticky lg:top-24 w-full">
          <SikarVaultDial
            inputTrackValue={`${formData.fullName || ""}${formData.phone || ""}`}
            isVerifying={isSubmitting}
            isUnlocked={isUnlocked}
          />
        </div>
      </div>

      {/* Showroom Contact Card Strip */}
      <div className="mt-8 pt-6 border-t border-gold-900/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-stone-400">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Sikar Showroom</p>
            <p>Court Road, Opp. Kalyan Circle, Sikar</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Direct Line</p>
            <p className="font-mono text-stone-300">+91 1572 258800</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Award className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Guaranteed Purity</p>
            <p>100% BIS Hallmarked Jewelries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
