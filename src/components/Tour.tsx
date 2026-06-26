import { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { Language } from '../data/translations';

interface TourProps {
  shouldStart: boolean;
  onComplete: () => void;
  setTab: (tab: string) => void;
  lang: Language;
}

export default function Tour({ shouldStart, onComplete, setTab, lang }: TourProps) {
  useEffect(() => {
    if (!shouldStart) return;

    const isAr = lang === 'ar';

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'custom-shepherd-theme bg-white border border-slate-200 text-slate-800 rounded-2xl shadow-2xl max-w-sm font-sans p-3',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true,
        },
      },
    });

    const btnSkip = isAr ? 'تخطي' : 'Skip';
    const btnNext = isAr ? 'التالي' : 'Next';
    const btnBack = isAr ? 'السابق' : 'Back';
    const btnFinish = isAr ? 'إنهاء' : 'Finish';

    // Step 1: Greeting
    tour.addStep({
      id: 'step-welcome',
      text: isAr 
        ? 'مرحباً بك في <strong>منصة AgriCare AI</strong>! لنأخذ جولة سريعة لمدة دقيقة واحدة للتعرف على كيفية حماية محاصيلك وتشخيص أمراض النباتات بالذكاء الاصطناعي.'
        : 'Welcome to <strong>AgriCare AI Platform</strong>! Let’s take a quick 1-minute tour to see how to protect your crops and diagnose diseases with advanced AI.',
      attachTo: {
        element: '#nav-bar',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnSkip,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            localStorage.setItem('agricare-tour-seen', 'true');
            tour.cancel();
          },
        },
        {
          text: btnNext,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            setTab('detect');
            setTimeout(() => tour.next(), 300);
          },
        },
      ],
    });

    // Step 2: Disease Detection
    tour.addStep({
      id: 'step-detect',
      text: isAr
        ? 'لوحة <strong>كشف أمراض النبات</strong>. ارفع صورة لورقة النبات المصابة هنا لتشغيل نموذج الرؤية الحاسوبية ومعرفة المرض والجرعة العضوية فورياً.'
        : 'This is the <strong>Disease Detection</strong> dashboard. Upload leaf images here to instantly detect conditions like <strong>Bacterial Spot</strong> using our advanced multi-stage AI model.',
      attachTo: {
        element: '#nav-detect',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnBack,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            setTab('home');
            setTimeout(() => tour.back(), 300);
          },
        },
        {
          text: btnNext,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            setTab('advisor');
            setTimeout(() => tour.next(), 300);
          },
        },
      ],
    });

    // Step 3: Treatment Advisor
    tour.addStep({
      id: 'step-advisor',
      text: isAr
        ? 'استخدم <strong>مستشار العلاج</strong> لتصفح قاموس الآفات الزراعية والبحث عن العلاجات العضوية والمكافحة الحيوية والكيميائية المناسبة لكل محصول.'
        : 'Use the <strong>Treatment Advisor</strong> to select crop varieties and look up expert agricultural prescriptions, scientific symptoms, organic cures, and chemical compounds.',
      attachTo: {
        element: '#nav-advisor',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnBack,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            setTab('detect');
            setTimeout(() => tour.back(), 300);
          },
        },
        {
          text: btnNext,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            setTab('tracker');
            setTimeout(() => tour.next(), 300);
          },
        },
      ],
    });

    // Step 4: Recovery Tracker
    tour.addStep({
      id: 'step-tracker',
      text: isAr
        ? 'تابع تعافي المحصول مع <strong>متابع التعافي</strong>. سجل الصفوف المصابة، وتاريخ البدء، وأنجز المهام والرشاشات الوقائية لمراقبة نمو المحصول حتى الحصاد.'
        : 'Track crop recovery over time with the <strong>Recovery Tracker</strong>. Log treatment start dates, complete weekly checkups, and tick off critical task lists to ensure full health restoration.',
      attachTo: {
        element: '#nav-tracker',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnBack,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            setTab('advisor');
            setTimeout(() => tour.back(), 300);
          },
        },
        {
          text: btnNext,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            setTab('expert');
            setTimeout(() => tour.next(), 300);
          },
        },
      ],
    });

    // Step 5: AI Agronomist Expert Chat
    tour.addStep({
      id: 'step-expert',
      text: isAr
        ? 'لديك أسئلة حقلية مخصصة؟ <strong>الخبير الزراعي الذكي</strong> هي محطة تواصل مع طراز جيميناي للحصول على جداول ري وتسميد ومقادير مكافحة بيولوجية دقيقة.'
        : 'Have custom farming questions? The <strong>AI Expert</strong> is a state-of-the-art chat terminal powered by server-side Gemini, giving you real-time fertilizer schedules and water optimizations.',
      attachTo: {
        element: '#nav-expert',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnBack,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            setTab('tracker');
            setTimeout(() => tour.back(), 300);
          },
        },
        {
          text: btnNext,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            setTab('knowledge');
            setTimeout(() => tour.next(), 300);
          },
        },
      ],
    });

    // Step 6: Knowledge Center
    tour.addStep({
      id: 'step-knowledge',
      text: isAr
        ? 'استكشف <strong>مركز المعرفة</strong> الشامل، الممتلئ بأبحاث زراعية ومقالات عملية ووصفات عضوية من خبراء ومهندسين زراعيين.'
        : 'Explore our comprehensive <strong>Knowledge Center</strong>, loaded with 12 extensive academic guides and organic pesticide recipes covering all major vegetable categories.',
      attachTo: {
        element: '#nav-knowledge',
        on: 'bottom',
      },
      buttons: [
        {
          text: btnBack,
          classes: 'px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all mr-2 cursor-pointer border border-transparent',
          action: () => {
            setTab('expert');
            setTimeout(() => tour.back(), 300);
          },
        },
        {
          text: btnFinish,
          classes: 'px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm',
          action: () => {
            localStorage.setItem('agricare-tour-seen', 'true');
            setTab('home');
            tour.complete();
          },
        },
      ],
    });

    tour.on('complete', onComplete);
    tour.on('cancel', onComplete);

    tour.start();

    return () => {
      tour.cancel();
    };
  }, [shouldStart]);

  return null;
}
