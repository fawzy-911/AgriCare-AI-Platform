import React, { useState, useRef, useEffect } from 'react';
import { Leaf, HelpCircle, ChevronDown, Globe, Sparkles, ExternalLink, Activity, BookOpen, MessageSquare, AlertCircle, PhoneCall, Home, Info, Menu, X } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface NavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
  startTour: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navigation({ currentTab, setTab, startTour, lang, setLang }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
  };

  const isRTL = lang === 'ar';

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tabId: string) => {
    setTab(tabId);
    setIsMobileMenuOpen(false);
    setIsMobileFeaturesOpen(false);
    setIsFeaturesOpen(false);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const featuresList = [
    { id: 'detect', label: t('diseaseDetection'), desc: lang === 'en' ? 'Upload leaves for diagnostic scans' : 'ارفع صور الأوراق للفحص والتشخيص', icon: AlertCircle, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'advisor', label: t('treatmentAdvisor'), desc: lang === 'en' ? 'Organic treatment & database' : 'قاعدة علاجات ومكافحة عضوية متكاملة', icon: BookOpen, color: 'text-teal-600 bg-teal-50' },
    { id: 'tracker', label: t('recoveryTracker'), desc: lang === 'en' ? 'Log rows & check off treatments' : 'متابعة شفاء الصفوف وجدول الرش الكيميائي', icon: Activity, color: 'text-blue-600 bg-blue-50' },
    { id: 'expert', label: t('aiExpert'), desc: lang === 'en' ? 'Gemini AI interactive consulting' : 'استشارات حقلية فورية بنموذج جيميناي', icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
    { 
      id: 'pepper-detector-link', 
      label: t('pepperDetector'), 
      desc: lang === 'en' ? 'Developed specifically for pepper crops' : 'نموذج عميق مخصص لتشخيص نبات الفلفل بدقة', 
      icon: Sparkles, 
      color: 'text-amber-600 bg-amber-50',
      isExternal: true,
      url: 'https://huggingface.co/spaces/fawzy911/pepper-disease-detector'
    }
  ];

  return (
    <nav id="nav-bar" className="sticky top-0 z-50 bg-white/75 backdrop-blur-[24px] border-b border-white/80 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo Section */}
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={() => handleTabClick('home')}
            >
              <div className="p-2 bg-teal-600 rounded-xl text-white shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-teal-700">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-sans font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                {t('brandName')}
              </span>
            </div>
 
            {/* Desktop Navigation Link Items */}
            <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-1.5' : 'space-x-1.5'}`}>
              
              {/* Home */}
              <button
                id="nav-home"
                onClick={() => handleTabClick('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/50 shadow-2xs'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                <Home className="h-4 w-4 opacity-70" />
                {t('home')}
              </button>
 
              {/* Features Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-features-dropdown"
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  onMouseEnter={() => setIsFeaturesOpen(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    ['detect', 'advisor', 'tracker', 'expert'].includes(currentTab)
                      ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/50'
                      : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                  }`}
                >
                  <Activity className="h-4 w-4 opacity-70" />
                  {t('features')}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
 
                {/* Features Flyout Card on Desktop */}
                {isFeaturesOpen && (
                  <div 
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/80 shadow-xl p-3 z-50 grid gap-1 animate-in fade-in slide-in-from-top-3 duration-200`}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'Platform Services' : 'خدمات المنصة الزراعية'}
                    </div>
                    {featuresList.map((feat) => {
                      const IconComponent = feat.icon;
                      if (feat.isExternal) {
                        return (
                          <a
                            key={feat.id}
                            href={feat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/70 transition-colors group cursor-pointer"
                          >
                            <div className={`p-2 rounded-lg ${feat.color.replace('bg-emerald-50', 'bg-teal-50').replace('text-emerald-600', 'text-teal-600')} shrink-0`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="text-left w-full">
                              <div className="text-xs font-bold text-slate-850 flex items-center justify-between gap-1">
                                <span className={`${isRTL ? 'text-right block w-full' : ''}`}>{feat.label}</span>
                                <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                              </div>
                              <p className={`text-[11px] text-slate-500 mt-0.5 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                                {feat.desc}
                              </p>
                            </div>
                          </a>
                        );
                      }
 
                      return (
                        <button
                          key={feat.id}
                          onClick={() => handleTabClick(feat.id)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/70 transition-colors group text-left cursor-pointer w-full ${
                            currentTab === feat.id ? 'bg-teal-50/40' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${feat.color.replace('bg-emerald-50', 'bg-teal-50').replace('text-emerald-600', 'text-teal-600')} shrink-0`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="w-full">
                            <div className={`text-xs font-bold text-slate-850 ${isRTL ? 'text-right' : ''}`}>
                              {feat.label}
                            </div>
                            <p className={`text-[11px] text-slate-500 mt-0.5 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                              {feat.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
 
              {/* Knowledge Center */}
              <button
                id="nav-knowledge"
                onClick={() => handleTabClick('knowledge')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'knowledge'
                    ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/50 shadow-2xs'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4 opacity-70" />
                {t('knowledge')}
              </button>
 
              {/* About */}
              <button
                id="nav-about"
                onClick={() => handleTabClick('about')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'about'
                    ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/50 shadow-2xs'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                <Info className="h-4 w-4 opacity-70" />
                {t('about')}
              </button>
 
              {/* Contact */}
              <button
                id="nav-contact"
                onClick={() => handleTabClick('contact')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'contact'
                    ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/50 shadow-2xs'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                <PhoneCall className="h-4 w-4 opacity-70" />
                {t('contact')}
              </button>
 
            </div>
          </div>
 
          {/* Right Controls: Language Toggle & Tour Button */}
          <div className="flex items-center gap-3">
            
            {/* Language Switch Button - Always Visible */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/60 text-slate-700 hover:border-teal-500 hover:bg-teal-50/40 hover:text-teal-700 transition-all duration-200 text-xs font-bold cursor-pointer shadow-2xs"
              title={lang === 'en' ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
            >
              <Globe className="h-4 w-4 text-teal-600" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
 
            {/* Quick Tour - Desktop */}
            <button
              id="nav-tour"
              onClick={startTour}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all duration-200 cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-teal-600" />
              <span>{t('quickTour')}</span>
            </button>

            {/* Mobile Burger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none transition-all cursor-pointer border border-slate-100"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-3 pt-2 pb-5 space-y-1 sm:px-4">
            
            {/* Home Link */}
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentTab === 'home'
                  ? 'bg-teal-50 text-teal-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Home className="h-4 w-4 text-teal-600" />
              <span>{t('home')}</span>
            </button>
 
            {/* Features Accordion Toggle */}
            <button
              onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
              className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-teal-600" />
                <span>{t('features')}</span>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMobileFeaturesOpen ? 'rotate-180' : ''}`} />
            </button>
 
            {/* Expandable sub-menu features */}
            {isMobileFeaturesOpen && (
              <div className={`pl-8 pr-4 py-1.5 space-y-1 bg-slate-50/50 rounded-xl mt-1 border-l-2 border-teal-500/20 ${isRTL ? 'text-right border-l-0 border-r-2 pr-8 pl-4' : ''}`}>
                {featuresList.map((feat) => {
                  const IconComp = feat.icon;
                  if (feat.isExternal) {
                    return (
                      <a
                        key={feat.id}
                        href={feat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-650 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <IconComp className="h-3.5 w-3.5 text-amber-600" />
                          <span>{feat.label}</span>
                        </span>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </a>
                    );
                  }
                  return (
                    <button
                      key={feat.id}
                      onClick={() => handleTabClick(feat.id)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        currentTab === feat.id ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-650 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className="h-3.5 w-3.5 text-teal-600" />
                      <span className="w-full text-left truncate leading-none mt-0.5">{feat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
 
            {/* Knowledge Center */}
            <button
              onClick={() => handleTabClick('knowledge')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentTab === 'knowledge'
                  ? 'bg-teal-50 text-teal-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span>{t('knowledge')}</span>
            </button>
 
            {/* About */}
            <button
              onClick={() => handleTabClick('about')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentTab === 'about'
                  ? 'bg-teal-50 text-teal-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Info className="h-4 w-4 text-teal-600" />
              <span>{t('about')}</span>
            </button>
 
            {/* Contact */}
            <button
              onClick={() => handleTabClick('contact')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentTab === 'contact'
                  ? 'bg-teal-50 text-teal-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <PhoneCall className="h-4 w-4 text-teal-600" />
              <span>{t('contact')}</span>
            </button>
 
            {/* Tour Button on Mobile inside Drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                startTour();
              }}
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              <HelpCircle className="h-4 w-4 text-teal-600" />
              <span>{t('quickTour')}</span>
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
