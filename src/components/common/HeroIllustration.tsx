import React from 'react';
import { ShieldCheck, HeartPulse, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Decorative backdrop glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#159A9C]/20 via-[#EAF3FA] to-[#17365D]/15 rounded-3xl blur-2xl -z-10" />

      {/* Main card illustration container */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-white via-slate-50 to-[#EAF3FA]/60 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#159A9C_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* Floating badge 1: Vaccination Up to date */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-emerald-200 shadow-md flex items-center gap-2 z-20 animate-bounce duration-1000">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Vaccine Registry</p>
            <p className="text-xs font-bold text-emerald-700">100% Up to Date</p>
          </div>
        </div>

        {/* Floating badge 2: Active Health Records */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#159A9C]/30 shadow-md flex items-center gap-2 z-20">
          <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-[#159A9C] flex items-center justify-center">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Longitudinal Record</p>
            <p className="text-xs font-bold text-[#17365D]">Birth to 18 Years</p>
          </div>
        </div>

        {/* Vector SVG Composition */}
        <svg viewBox="0 0 460 340" className="w-full h-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base platform */}
          <ellipse cx="230" cy="300" rx="200" ry="24" fill="#E2E8F0" opacity="0.6" />
          <ellipse cx="230" cy="296" rx="170" ry="16" fill="#CBD5E1" opacity="0.5" />

          {/* Doctor (Right side, female pediatrician in white coat, stethoscope, bindi) */}
          <g id="doctor-figure">
            {/* Body / Coat */}
            <path d="M295 190 C295 160 375 160 375 190 L385 290 L285 290 Z" fill="#17365D" />
            <path d="M305 190 C305 165 365 165 365 190 L370 290 L300 290 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Teal medical scrub shirt collar */}
            <path d="M325 180 L335 205 L345 180 Z" fill="#159A9C" />
            
            {/* Stethoscope */}
            <path d="M318 190 C318 225 352 225 352 190" stroke="#64748B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="335" cy="225" r="5" fill="#159A9C" stroke="#475569" strokeWidth="2" />

            {/* Doctor Head & Hair */}
            <circle cx="335" cy="140" r="32" fill="#8D5B4C" />
            <ellipse cx="335" cy="145" rx="24" ry="26" fill="#D49B7B" />
            {/* Neat hair bun */}
            <circle cx="335" cy="112" r="16" fill="#2D211E" />
            <path d="M312 135 C312 120 358 120 358 135 C345 125 325 125 312 135 Z" fill="#2D211E" />
            {/* Subtle bindi */}
            <circle cx="335" cy="138" r="1.8" fill="#C53D4B" />
            {/* Friendly smile & eyes */}
            <path d="M328 155 Q335 162 342 155" stroke="#7C4A3A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="327" cy="146" r="2.2" fill="#2D211E" />
            <circle cx="343" cy="146" r="2.2" fill="#2D211E" />

            {/* Doctor Holding Digital Tablet */}
            <rect x="260" y="210" width="55" height="70" rx="8" fill="#1E293B" transform="rotate(-10 260 210)" />
            <rect x="264" y="214" width="47" height="62" rx="5" fill="#EAF3FA" transform="rotate(-10 264 214)" />
            {/* Mini chart lines on tablet */}
            <path d="M270 240 Q280 230 290 235 T305 220" stroke="#159A9C" strokeWidth="2.5" fill="none" />
            <circle cx="305" cy="220" r="3" fill="#23865B" />
            <rect x="270" y="252" width="28" height="3" rx="1.5" fill="#94A3B8" />
            <rect x="270" y="258" width="20" height="3" rx="1.5" fill="#CBD5E1" />
          </g>

          {/* Mother (Left side, Indian saree/kurta in teal & gold, caring expression) */}
          <g id="mother-figure">
            {/* Garment / Saree drape */}
            <path d="M85 200 C85 165 170 165 170 200 L180 290 L75 290 Z" fill="#159A9C" />
            <path d="M100 190 Q130 220 165 290" stroke="#D99119" strokeWidth="3" fill="none" />
            
            {/* Mother Head & Long braided hair */}
            <ellipse cx="128" cy="135" rx="28" ry="32" fill="#3D261E" />
            <ellipse cx="128" cy="140" rx="23" ry="25" fill="#C68A68" />
            <path d="M106 130 C106 115 150 115 150 130 C138 122 118 122 106 130 Z" fill="#261612" />
            <circle cx="128" cy="133" r="1.8" fill="#C53D4B" />
            {/* Smile & eyes */}
            <path d="M122 150 Q128 156 134 150" stroke="#663B29" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="121" cy="141" r="2.2" fill="#261612" />
            <circle cx="135" cy="141" r="2.2" fill="#261612" />
            {/* Small earring */}
            <circle cx="106" cy="143" r="2.5" fill="#D99119" />
          </g>

          {/* Child (Center, cheerful toddler being held, yellow kurta) */}
          <g id="child-figure">
            <path d="M175 230 C175 210 230 210 230 230 L235 290 L170 290 Z" fill="#F59E0B" />
            {/* Child Head */}
            <ellipse cx="202" cy="180" rx="21" ry="22" fill="#D9A07E" />
            {/* Soft hair */}
            <path d="M185 174 C185 160 219 160 219 174 C210 166 195 166 185 174 Z" fill="#332219" />
            {/* Big happy eyes & toothy grin */}
            <ellipse cx="196" cy="178" rx="2.2" ry="2.5" fill="#1F1511" />
            <ellipse cx="208" cy="178" rx="2.2" ry="2.5" fill="#1F1511" />
            <path d="M197 188 Q202 195 207 188 Z" fill="#C53D4B" />
            {/* Hand wave */}
            <circle cx="236" cy="216" r="6" fill="#D9A07E" />
            <path d="M234 212 L242 206" stroke="#D9A07E" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Central digital pulse connection symbol */}
          <g id="connectivity-symbol">
            <circle cx="218" cy="115" r="22" fill="#FFFFFF" stroke="#159A9C" strokeWidth="2.5" />
            <path d="M206 115 L213 115 L217 107 L221 123 L225 115 L230 115" stroke="#159A9C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </svg>

        {/* Feature snapshot below graphic */}
        <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="text-xs font-bold text-[#17365D]">Birth to 18</span>
            <p className="text-[10px] text-slate-500">Continuous Records</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="text-xs font-bold text-[#159A9C]">Zero Paper Loss</span>
            <p className="text-[10px] text-slate-500">Universal UHID</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="text-xs font-bold text-emerald-600">6 Care Roles</span>
            <p className="text-[10px] text-slate-500">Unified System</p>
          </div>
        </div>
      </div>
    </div>
  );
};
