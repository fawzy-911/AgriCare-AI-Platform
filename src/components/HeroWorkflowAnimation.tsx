import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Cpu, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';

interface HeroWorkflowAnimationProps {
  lang: 'en' | 'ar';
}

export const HeroWorkflowAnimation: React.FC<HeroWorkflowAnimationProps> = ({ lang }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const autoPlayRef = useRef<boolean>(true);

  const steps = [
    {
      id: 0,
      labelEn: "Upload Leaf",
      labelAr: "رفع ورقة النبات",
      descEn: "Take or select infected foliar image",
      descAr: "التقاط أو اختيار صورة الورقة المصابة",
      icon: Upload,
      color: "emerald"
    },
    {
      id: 1,
      labelEn: "AI Analysis",
      labelAr: "فحص خلوي ذكي",
      descEn: "Neural scanners read tissue layers",
      descAr: "المسح العصبي يحلل طبقات الأنسجة",
      icon: Cpu,
      color: "teal"
    },
    {
      id: 2,
      labelEn: "Disease Detected",
      labelAr: "تشخيص المسبب",
      descEn: "Pathogen identified with high accuracy",
      descAr: "تحديد نوع المرض بدقة متناهية",
      icon: AlertTriangle,
      color: "amber"
    },
    {
      id: 3,
      labelEn: "Get Treatment",
      labelAr: "تحديد العلاج",
      descEn: "Organic remedies & spray metrics loaded",
      descAr: "تحميل بروتوكولات المكافحة العضوية",
      icon: FileText,
      color: "blue"
    },
    {
      id: 4,
      labelEn: "Track Recovery",
      labelAr: "متابعة التعافي",
      descEn: "Monitor health calendar and checklists",
      descAr: "جدولة المهام ومراقبة تحسن الصفوف",
      icon: Calendar,
      color: "purple"
    },
    {
      id: 5,
      labelEn: "Healthy Crop",
      labelAr: "محصول وفير",
      descEn: "Foliage restored, yield preserved",
      descAr: "استعادة حيوية الأوراق وحماية الإنتاج",
      icon: CheckCircle,
      color: "emerald"
    }
  ];

  // Smooth continuous looping of steps
  useEffect(() => {
    const timer = setInterval(() => {
      if (autoPlayRef.current) {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }
    }, 5000); // 5s for perfectly comfortable visual reading and transition
    return () => clearInterval(timer);
  }, []);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    autoPlayRef.current = false; // Pause autoplay on manual click so user can inspect
    // Restart autoplay after 12 seconds of inactivity
    setTimeout(() => {
      autoPlayRef.current = true;
    }, 12000);
  };

  const isRTL = lang === 'ar';

  return (
    <div className="w-full flex flex-col items-center justify-center p-1 select-none">
      
      {/* Visual Canvas Card */}
      <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden h-[340px] flex flex-col justify-between shadow-2xl">
        
        {/* Modern Premium Glow Orbs */}
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dashboard Header Bar */}
        <div className={`flex items-center justify-between border-b border-white/5 pb-3.5 relative z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
              {lang === 'en' ? 'AGRICARE WORKFLOW ENGINE' : 'محرك عمليات AgriCare الذكي'}
            </span>
          </div>
          
          <div className="flex gap-1.5 items-center">
            {steps.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="flex-grow flex items-center justify-center relative my-4 min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              
              {/* STAGE 0: UPLOAD LEAF */}
              {currentStep === 0 && (
                <div className="relative flex flex-col items-center">
                  <div className="relative p-6 bg-slate-800/40 border border-white/10 rounded-2xl shadow-inner flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <Upload className="h-12 w-12 text-emerald-400" />
                    </motion.div>
                    
                    {/* Tiny floating leaves */}
                    <motion.div 
                      className="absolute top-2 right-2 text-emerald-500/50"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                    >
                      🍁
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-2 left-2 text-emerald-500/50"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    >
                      🍃
                    </motion.div>
                  </div>
                  
                  {/* Premium upload status line */}
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>IMG_8034_FOLIAR.JPG (4.8 MB)</span>
                  </div>
                </div>
              )}

              {/* STAGE 1: AI SCANNERS */}
              {currentStep === 1 && (
                <div className="relative w-64 h-36 bg-slate-800/30 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                  
                  {/* Laser Beam Sweep */}
                  <motion.div 
                    className="absolute left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_12px_#2dd4bf] z-10"
                    animate={{ top: ['4%', '96%', '4%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />

                  {/* Neural Graph Grid Illustration */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Top Scan Metrics */}
                  <div className="flex justify-between items-center relative z-20">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-teal-400 animate-spin" style={{ animationDuration: '4s' }} />
                      <span className="text-[9px] font-mono text-teal-300 uppercase tracking-widest">{lang === 'en' ? 'NEURAL COMPUTE' : 'المعالج العصبي'}</span>
                    </div>
                    <span className="text-[10px] text-teal-400 font-mono font-bold">98.9% READY</span>
                  </div>

                  {/* Live scanning progress lines */}
                  <div className="space-y-1.5 relative z-20 mt-3">
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        className="bg-teal-400 h-full rounded-full" 
                        animate={{ width: ['20%', '85%', '40%', '95%'] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>CHLOROPLAST LEVEL</span>
                      <span>SCANNING CELLS...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: DISEASE DETECTED */}
              {currentStep === 2 && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Leaf mockup with spotted bounding boxes */}
                    <div className="p-5 rounded-2xl bg-slate-800/40 border border-amber-500/20 text-amber-400 shadow-lg relative">
                      <svg className="h-12 w-12 text-amber-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>

                      {/* Bounding Box HUD Indicators */}
                      <motion.div 
                        className="absolute top-2 right-2 border-2 border-amber-500 w-6 h-6 rounded"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <motion.div 
                        className="absolute bottom-3 left-4 border border-amber-500 w-4 h-4 rounded"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                      />
                    </div>

                    {/* Glowing Danger Pulse Ring */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/30 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-widest">
                      {lang === 'en' ? 'PATHOGEN: BACTERIAL SPOT' : 'آفة: التبقع البكتيري'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 font-mono">CONFIDENCE: 98.4% // LEVEL: SEVERE</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: GET TREATMENT */}
              {currentStep === 3 && (
                <div className="relative bg-slate-800/40 border border-white/10 rounded-2xl p-4 w-60 flex flex-col gap-3 shadow-inner">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-wider">
                        {lang === 'en' ? 'ORGANIC PRESCRIPTION' : 'روشتة مكافحة معتمدة'}
                      </span>
                    </div>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>

                  {/* List of actions fading in/out or pulsing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-1.5 bg-slate-900/30 rounded border border-white/5">
                      <span className="text-[9px] text-white/90">1. Copper Bactericide Spray</span>
                      <span className="text-[8px] font-mono text-emerald-400">0.2% METRIC</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-slate-900/30 rounded border border-white/5">
                      <span className="text-[9px] text-white/90">2. Bacillus Subtilis Biologicals</span>
                      <span className="text-[8px] font-mono text-emerald-400">ACTIVE BIO</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-slate-900/30 rounded border border-white/5">
                      <span className="text-[9px] text-white/90">3. Pruning Bottom Vectors</span>
                      <span className="text-[8px] font-mono text-amber-400">URGENT</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: TRACK RECOVERY */}
              {currentStep === 4 && (
                <div className="relative bg-slate-800/40 border border-white/10 rounded-2xl p-4 w-64 flex flex-col gap-3 shadow-inner">
                  
                  {/* Calendar/Tracker Header */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1.5 font-mono text-purple-300 uppercase">
                      <Activity className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                      {lang === 'en' ? 'ROW TRACKER STATUS' : 'متابع تعافي خط الزراعة'}
                    </span>
                    <span className="font-mono text-white">40% COMPLETE</span>
                  </div>

                  {/* Live checklist items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                      <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[8px] font-extrabold">✔</div>
                      <span className="text-[9px] text-slate-300 line-through truncate">{lang === 'en' ? 'Calibrate Row Drip Irrigation' : 'معايرة شبكة الري بالصفوف'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2.5 p-1.5 bg-slate-900/30 border border-white/5 rounded">
                      <motion.div 
                        className="h-3.5 w-3.5 rounded-full border border-purple-400 flex items-center justify-center"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <span className="text-[9px] text-white truncate">{lang === 'en' ? 'Foliar Copper Application' : 'الرش الورقي بالنحاس البكتيري'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: HEALTHY CROP */}
              {currentStep === 5 && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Perfect leaf mock with glowing ring */}
                    <div className="p-6 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-2xl relative z-10">
                      <motion.svg 
                        className="h-12 w-12 text-emerald-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </motion.svg>
                    </div>

                    {/* Pulsing neon rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping pointer-events-none" />
                    
                    {/* Floating SVG sparkles */}
                    <motion.div 
                      className="absolute -top-1 -right-1 text-amber-300"
                      animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                    >
                      <Sparkles className="h-4.5 w-4.5" />
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-1 -left-1 text-amber-300"
                      animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2.4, delay: 0.6 }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="px-3 py-1 rounded-full text-[9px] font-mono font-black text-emerald-400 tracking-wider bg-emerald-950/60 border border-emerald-900 uppercase">
                      {lang === 'en' ? 'CROP HEALTH SECURED' : 'تم استعادة حيوية المحصول بنجاح'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1.5 font-mono">{lang === 'en' ? 'ZERO PATHOGEN VECTOR REMAINING' : 'خالٍ من المسببات المرضية تماماً'}</span>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Unified Bottom Info Panel */}
        <div className={`p-3 bg-slate-850/60 border border-white/5 rounded-2xl flex items-center gap-3.5 relative z-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
          </div>
          <div className="flex-grow min-w-0 text-left">
            <h4 className={`text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
              <span>{isRTL ? steps[currentStep].labelAr : steps[currentStep].labelEn}</span>
              <ArrowRight className={`h-3 w-3 text-slate-500 ${isRTL ? 'rotate-180' : ''}`} />
            </h4>
            <p className={`text-[11px] text-slate-400 truncate mt-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? steps[currentStep].descAr : steps[currentStep].descEn}
            </p>
          </div>
        </div>

      </div>

      {/* Modern Interactive Stage Selectors */}
      <div className="flex gap-2.5 mt-5 justify-center items-center">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(idx)}
            onMouseEnter={() => setIsHovered(idx)}
            onMouseLeave={() => setIsHovered(null)}
            className={`h-2.5 rounded-full transition-all duration-300 relative cursor-pointer ${
              idx === currentStep 
                ? 'w-8 bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                : 'w-2.5 bg-white/20 hover:bg-white/45'
            }`}
          >
            {/* Hover Tooltip Popup (Premium Microinteraction) */}
            <AnimatePresence>
              {isHovered === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -28, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white font-mono text-[8px] font-bold py-1 px-2.5 rounded whitespace-nowrap z-50 shadow-md"
                >
                  {isRTL ? step.labelAr : step.labelEn}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

    </div>
  );
};
