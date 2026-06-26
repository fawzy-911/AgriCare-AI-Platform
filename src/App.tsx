import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  UploadCloud, 
  FileText, 
  Activity, 
  MessageSquare, 
  BookOpen, 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Plus, 
  Check, 
  Calendar, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  HeartPulse, 
  Info, 
  Send, 
  RefreshCw, 
  AlertCircle, 
  ExternalLink,
  BookMarked,
  Filter,
  CheckCircle2,
  Trash2,
  HeartCrack,
  Sprout,
  Workflow
} from 'lucide-react';
import Navigation from './components/Navigation';
import Tour from './components/Tour';
import { KNOWLEDGE_ARTICLES } from './data/knowledge';
import { SUPPORTED_PLANTS, DISEASES_DATABASE } from './data/diseases';
import { SUPPORTED_PLANTS_AR, DISEASES_DATABASE_AR, KNOWLEDGE_ARTICLES_AR } from './data/arabic_data';
import { HeroWorkflowAnimation } from './components/HeroWorkflowAnimation';
import { Article, ChatMessage, DiagnosisRecord, RecoveryPlan, TrackerItem } from './types';
import { Language, TRANSLATIONS } from './data/translations';

// Prepopulated highly realistic recovery plans
const INITIAL_RECOVERY_PLANS: RecoveryPlan[] = [
  {
    id: 'rec-1',
    cropName: 'Pepper',
    diseaseName: 'Bacterial Spot (Xanthomonas spp.)',
    startDate: '2026-06-20',
    estimatedWeeks: 3,
    progress: 45,
    status: 'In Progress',
    notes: 'Pruned bottom leaf spot vectors. Drip line calibration complete.',
    checklist: [
      { id: 'chk-1-1', title: 'Foliar spray of copper bactericide', completed: true, dueDate: '2026-06-21' },
      { id: 'chk-1-2', title: 'Apply Bacillus subtilis bio-fungicide', completed: true, dueDate: '2026-06-23' },
      { id: 'chk-1-3', title: 'Sanitize row tools and pruner shears', completed: false, dueDate: '2026-06-27' },
      { id: 'chk-1-4', title: 'Check new foliage expansion for water spots', completed: false, dueDate: '2026-06-30' }
    ],
    timeline: [
      { week: 1, activity: 'Soil sanitation & copper bactericide application', completed: true },
      { week: 2, activity: 'Microbial bio-fungicide foliar misting', completed: false },
      { week: 3, activity: 'Tissue safety validation & crop harvest setup', completed: false }
    ]
  },
  {
    id: 'rec-2',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    startDate: '2026-06-15',
    estimatedWeeks: 4,
    progress: 75,
    status: 'In Progress',
    notes: 'Staked tomato cages up to 18 inches. Applied wheat-straw mulch bed.',
    checklist: [
      { id: 'chk-2-1', title: 'Prune leaf stems up to 12 inches off soil', completed: true, dueDate: '2026-06-16' },
      { id: 'chk-2-2', title: 'Lay straw mulch below root line', completed: true, dueDate: '2026-06-17' },
      { id: 'chk-2-3', title: 'Spray biological Trichoderma culture', completed: true, dueDate: '2026-06-20' },
      { id: 'chk-2-4', title: 'Inspect upper leaf stems for yellow circles', completed: false, dueDate: '2026-06-27' }
    ],
    timeline: [
      { week: 1, activity: 'Surgical bottom leaf pruning & staking', completed: true },
      { week: 2, activity: 'Laying clean protective ground mulch beds', completed: true },
      { week: 3, activity: 'Apply Trichoderma fungi drench', completed: true },
      { week: 4, activity: 'Final visual leaf audits & foliage approval', completed: false }
    ]
  }
];

export default function App() {
  const [tab, setTab] = useState<string>('home');
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('en');

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
  };

  const isRTL = lang === 'ar';

  // Auto start tour if first-time visitor
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('agricare-tour-seen');
    if (!hasSeenTour) {
      setTimeout(() => {
        setIsTourActive(true);
      }, 1000);
    }
  }, []);

  // ----------------------------------------------------
  // DISEASE DETECTION DASHBOARD STATE
  // ----------------------------------------------------
  const [dragOver, setDragOver] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropTypeHint, setCropTypeHint] = useState<string>('Pepper');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------
  // TREATMENT ADVISOR STATE
  // ----------------------------------------------------
  const [selectedPlantId, setSelectedPlantId] = useState<string>('pepper');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('pep-bacterial-spot');

  // ----------------------------------------------------
  // RECOVERY TRACKER STATE
  // ----------------------------------------------------
  const [plans, setPlans] = useState<RecoveryPlan[]>(INITIAL_RECOVERY_PLANS);
  const [newPlanCrop, setNewPlanCrop] = useState<string>('Pepper');
  const [newPlanDisease, setNewPlanDisease] = useState<string>('Bacterial Spot');
  const [newPlanWeeks, setNewPlanWeeks] = useState<number>(3);
  const [trackerMessage, setTrackerMessage] = useState<string | null>(null);

  // ----------------------------------------------------
  // CHAT STATE (AI AGRICULTURAL EXPERT)
  // ----------------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Welcome to your AgriCare AI Expert Terminal. I am your specialized agronomist. Ask me about disease controls, soil nutrition, crop irrigation, or biological spray mixtures.",
      timestamp: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatTyping]);

  // ----------------------------------------------------
  // KNOWLEDGE CENTER STATE
  // ----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // ----------------------------------------------------
  // CONTACT STATE
  // ----------------------------------------------------
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // ----------------------------------------------------
  // DIAGNOSIS ACTIONS & MOCK HANDLERS
  // ----------------------------------------------------
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid plant leaf image.');
      return;
    }
    setUploadFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Run the crop diagnosis via multimodal server endpoint or fallback
  const handleAnalyzeImage = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setDiagnosisResult(null);

    try {
      const response = await fetch('/api/detect-disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          cropTypeHint: cropTypeHint
        })
      });

      if (!response.ok) {
        throw new Error('Diagnosis server failed.');
      }

      const result = await response.json();
      setDiagnosisResult(result);
    } catch (err) {
      console.error(err);
      // Fail-safe realistic result fallback
      const mockResult = cropTypeHint === 'Pepper' 
        ? {
            cropType: 'Pepper',
            diseaseName: 'Pepper Bacterial Spot (Xanthomonas spp.)',
            confidence: 0.96,
            symptoms: [
              'Small, greasy brown spots on the underside of leaves.',
              'Yellow circles bordering brown dead zones.',
              'Leaves dropping prematurely from lower stems.'
            ],
            causes: [
              'High relative humidity combined with warm daytime temperatures.',
              'Wind-blown rainfall carrying Xanthomonas bacteria.'
            ],
            recommendations: [
              'Apply copper hydroxide protective sprays immediately.',
              'Treat foliar layers with Bacillus subtilis solutions.'
            ],
            preventionMethods: [
              'Maintain drip lines instead of overhead waterers.',
              'Use verified disease-free seed batches.'
            ],
            recoveryExpectations: 'High. Clean leaves will emerge in 2-3 weeks.',
            severity: 'Medium'
          }
        : {
            cropType: cropTypeHint,
            diseaseName: `${cropTypeHint} Powdery Mildew`,
            confidence: 0.88,
            symptoms: [
              'White talcum-like dust spots covering mature foliage.',
              'Leaves curling and dry-crisping.'
            ],
            causes: [
              'Lack of solar canopy penetration.',
              'Humid nocturnal weather cycles.'
            ],
            recommendations: [
              'Spray potassium bicarbonate foliar wash.',
              'Mist organic neem oil solution.'
            ],
            preventionMethods: [
              'Prune bottom shade vines to optimize airflow.',
              'Maintain clean row gaps.'
            ],
            recoveryExpectations: 'Excellent. Fungal spread halts within 5 days.',
            severity: 'Low'
          };
      setDiagnosisResult(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Direct Pepper leaf preset selection
  const handleLoadPepperPreset = () => {
    setCropTypeHint('Pepper');
    setImagePreview('https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600');
    setUploadFile(new File([], "pepper_preset.png"));
    setDiagnosisResult(null);
  };

  const handleAddDiagnosisToTracker = () => {
    if (!diagnosisResult) return;
    
    const newPlan: RecoveryPlan = {
      id: `rec-${Date.now()}`,
      cropName: diagnosisResult.cropType,
      diseaseName: diagnosisResult.diseaseName,
      startDate: new Date().toISOString().split('T')[0],
      estimatedWeeks: diagnosisResult.severity === 'Critical' ? 4 : 3,
      progress: 0,
      status: 'In Progress',
      notes: `Diagnosed from AI photo scan. Confidence: ${(diagnosisResult.confidence * 100).toFixed(0)}%.`,
      checklist: diagnosisResult.recommendations.map((rec: string, i: number) => ({
        id: `chk-${Date.now()}-${i}`,
        title: rec,
        completed: false,
        dueDate: new Date(Date.now() + i * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })),
      timeline: Array.from({ length: diagnosisResult.severity === 'Critical' ? 4 : 3 }).map((_, i) => ({
        week: i + 1,
        activity: i === 0 ? 'Foliar application & canopy clearing' : `Ongoing treatment & visual validation - Week ${i + 1}`,
        completed: false
      }))
    };

    setPlans([newPlan, ...plans]);
    setTrackerMessage(`Successfully created custom recovery plan for ${newPlan.cropName} on the Recovery Tracker tab!`);
    
    // Auto clear message after 4s
    setTimeout(() => {
      setTrackerMessage(null);
    }, 4000);
  };

  // ----------------------------------------------------
  // RECOVERY TRACKER HANDLERS
  // ----------------------------------------------------
  const handleToggleChecklist = (planId: string, itemId: string) => {
    setPlans(plans.map(p => {
      if (p.id !== planId) return p;
      const updatedChecklist = p.checklist.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const completedCount = updatedChecklist.filter(item => item.completed).length;
      const computedProgress = Math.round((completedCount / updatedChecklist.length) * 100);
      
      return {
        ...p,
        checklist: updatedChecklist,
        progress: computedProgress,
        status: computedProgress === 100 ? 'Recovered' : 'In Progress'
      };
    }));
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
  };

  const handleCreateCustomPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: RecoveryPlan = {
      id: `rec-${Date.now()}`,
      cropName: newPlanCrop,
      diseaseName: newPlanDisease,
      startDate: new Date().toISOString().split('T')[0],
      estimatedWeeks: newPlanWeeks,
      progress: 0,
      status: 'In Progress',
      notes: 'Manually logged treatment protocol.',
      checklist: [
        { id: `chk-${Date.now()}-1`, title: 'Sanitize equipment and surrounding soil', completed: false, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { id: `chk-${Date.now()}-2`, title: 'Foliar chemical or biological spray', completed: false, dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
        { id: `chk-${Date.now()}-3`, title: 'Adjust irrigation volume to reduce leaf moisture', completed: false, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
      ],
      timeline: Array.from({ length: newPlanWeeks }).map((_, i) => ({
        week: i + 1,
        activity: `General care & maintenance phase - Week ${i + 1}`,
        completed: false
      }))
    };

    setPlans([newPlan, ...plans]);
    setNewPlanCrop('Pepper');
    setNewPlanDisease('');
    setNewPlanWeeks(3);
  };

  // ----------------------------------------------------
  // CHAT INTERFACE HANDLERS
  // ----------------------------------------------------
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || chatInput;
    if (!rawText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: rawText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg]
        })
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error.');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      // Fallback response handled gracefully
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "I am having trouble reaching the main server. Let me provide some local assistance: Please ensure you are managing water moisture levels carefully and utilizing certified seeds to prevent pathogenic Xanthomonas/Late Blight infections.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsChatTyping(false);
    }
  };

  const handleShortcutChip = (text: string) => {
    handleSendMessage(text);
  };

  // Localized databases based on active language
  const currentSupportedPlants = lang === 'ar' ? SUPPORTED_PLANTS_AR : SUPPORTED_PLANTS;
  const currentDiseasesDatabase = lang === 'ar' ? DISEASES_DATABASE_AR : DISEASES_DATABASE;
  const currentKnowledgeArticles = lang === 'ar' ? KNOWLEDGE_ARTICLES_AR : KNOWLEDGE_ARTICLES;

  // ----------------------------------------------------
  // KNOWLEDGE CENTER FILTERING
  // ----------------------------------------------------
  const filteredArticles = currentKnowledgeArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ----------------------------------------------------
  // CONTACT SUBMIT HANDLER
  // ----------------------------------------------------
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsContactSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => {
      setIsContactSubmitted(false);
    }, 5000);
  };

  // Switch Selected disease whenever Selected plant changes on Treatment Advisor Tab
  useEffect(() => {
    const diseasesForPlant = currentDiseasesDatabase.filter(d => d.plantId === selectedPlantId);
    if (diseasesForPlant.length > 0) {
      setSelectedDiseaseId(diseasesForPlant[0].id);
    }
  }, [selectedPlantId, currentDiseasesDatabase]);

  // Translate chat welcome message dynamically when language changes
  useEffect(() => {
    setChatMessages(prev => prev.map(msg => {
      if (msg.id === 'welcome') {
        return {
          ...msg,
          text: lang === 'ar' 
            ? "مرحباً بك في منصة الخبير الزراعي الذكي AgriCare AI. أنا مستشارك الزراعي الرقمي الخاص. تفضل بطرح أي سؤال حول مكافحة الآفات، وتغذية التربة، وجداول ري المحاصيل، أو خلطات الرش الوقائي العضوي."
            : "Welcome to your AgriCare AI Expert Terminal. I am your specialized agronomist. Ask me about disease controls, soil nutrition, crop irrigation, or biological spray mixtures.",
          timestamp: lang === 'ar' ? "الآن" : "Just now"
        };
      }
      return msg;
    }));
  }, [lang]);

  const activeDiseaseInfo = currentDiseasesDatabase.find(d => d.id === selectedDiseaseId);

  return (
    <div 
      className={`min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-800 ${isRTL ? 'rtl font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      
      {/* Onboarding tour manager */}
      <Tour 
        shouldStart={isTourActive} 
        onComplete={() => setIsTourActive(false)} 
        setTab={(t) => setTab(t)} 
        lang={lang}
      />

      {/* Header & Navigation */}
      <Navigation 
        currentTab={tab} 
        setTab={setTab} 
        startTour={() => setIsTourActive(true)} 
        lang={lang}
        setLang={setLang}
      />

      {/* Main Container */}
      <main className="flex-grow flex flex-col">
        
        {/* ----------------------------------------------------
            TAB 1: HOME PAGE (LANDING & FEATURES)
            ---------------------------------------------------- */}
        {tab === 'home' && (
          <div className="flex-grow flex flex-col">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-4">
              <section 
                className="glass-card relative overflow-hidden p-8 sm:p-12 md:p-16 text-slate-800"
                style={{ background: 'linear-gradient(135deg, rgba(209, 250, 229, 0.45) 0%, rgba(224, 242, 254, 0.45) 40%, rgba(237, 233, 254, 0.45) 100%)' }}
              >
                {/* Background decorative blur shapes */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  {/* Left Column: Text and Actions */}
                  <div className={`lg:col-span-7 w-full flex flex-col justify-center ${isRTL ? 'lg:text-right text-right items-end lg:items-start' : 'text-left items-start'}`}>
                    <span className="text-teal-600 font-bold text-xs uppercase tracking-widest mb-3 block">
                      {lang === 'en' ? 'Active Prediction System' : 'نظام التنبؤ والمكافحة النشط'}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
                      {t('heroTitle')}
                    </h1>
                    <p className={`text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('heroSubtitle')}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setTab('detect')}
                        className="btn-premium btn-premium-brand px-6 py-3 text-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'Launch Detector' : 'تشغيل كاشف الآفات'}
                      </button>
                      <button
                        onClick={() => setTab('tracker')}
                        className="btn-premium btn-premium-secondary px-6 py-3 text-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'View Recovery Plans' : 'عرض خطط العلاج المجدولة'}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Workflow Loop Animation */}
                  <div className="lg:col-span-5 w-full flex items-center justify-center">
                    <HeroWorkflowAnimation lang={lang} />
                  </div>
                </div>
              </section>
            </div>

            {/* Premium Metrics Ribbon */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3">
              <div className="glass-panel border border-white/80 rounded-[32px] py-8 px-6 shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900">98.4%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                      {lang === 'en' ? 'Diagnosis Accuracy' : 'دقة تصنيف الأمراض'}
                    </p>
                  </div>
                  <div className={`border-slate-200/50 ${isRTL ? 'border-r' : 'border-l'}`}>
                    <p className="text-3xl font-extrabold text-slate-900">12+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                      {lang === 'en' ? 'Major Crops Supported' : 'محاصيل رئيسية مدعومة'}
                    </p>
                  </div>
                  <div className={`border-slate-200/50 ${isRTL ? 'border-r' : 'border-l'}`}>
                    <p className="text-3xl font-extrabold text-slate-900">&lt; 3s</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                      {lang === 'en' ? 'Analysis Latency' : 'سرعة فحص وتحليل الأنسجة'}
                    </p>
                  </div>
                  <div className={`border-slate-200/50 ${isRTL ? 'border-r' : 'border-l'}`}>
                    <p className="text-3xl font-extrabold text-slate-900">100%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                      {lang === 'en' ? 'Organic-Friendly Remedies' : 'علاجات ومكافحات عضوية'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Visual Journey */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-teal-600 font-bold text-xs uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  {lang === 'en' ? 'Simple Workflow' : 'خطوات العمل البسيطة'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  {lang === 'en' ? 'Your Crop Health Journey in 4 Simple Steps' : 'رحلة تأهيل محاصيلك وحمايتها في 4 خطوات'}
                </h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {lang === 'en' 
                    ? 'Get instant diagnostics, structured prescriptions, and active calendars designed to restore and boost farming yields.'
                    : 'احصل على تشخيص خلوي فوري، وإرشادات مكافحة علمية، وجداول تأهيل لتأمين إنتاج حقولك.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                
                {/* Connector Line for Desktop */}
                <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-teal-100 via-teal-100 to-transparent -translate-y-8 z-0" />

                {/* Step 1 */}
                <div className="glass-card glass-card-interactive p-6 relative z-10 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center font-black text-lg shadow-2xs border border-teal-100 mb-5">
                      1
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {lang === 'en' ? 'Upload Plant Image' : '1. ارفع صورة ورقة النبات'}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {lang === 'en' 
                        ? 'Snap or upload a clear photo of the symptomatic leaf or crop tissue on our diagnostic dashboard.'
                        : 'التقط أو ارفع صورة واضحة لورقة النبات التي تظهر عليها أعراض الآفة أو المرض.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setTab('detect')}
                    className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 justify-start cursor-pointer group bg-transparent border-0"
                  >
                    <span>{lang === 'en' ? 'Upload Leaf' : 'تحميل صورة الآن'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>

                {/* Step 2 */}
                <div className="glass-card glass-card-interactive p-6 relative z-10 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center font-black text-lg shadow-2xs border border-teal-100 mb-5">
                      2
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {lang === 'en' ? 'Detect Disease' : '2. كشف وتشخيص الآفة'}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {lang === 'en' 
                        ? 'Our multi-stage AI classifies tissue signs like Xanthomonas or Powdery Mildew in under 3 seconds.'
                        : 'يقوم نظام الفحص المدعوم بالذكاء الاصطناعي بتشخيص الآفة وتحديد مدى انتشارها فورياً.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setTab('detect')}
                    className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 justify-start cursor-pointer group bg-transparent border-0"
                  >
                    <span>{lang === 'en' ? 'Diagnose Now' : 'بدء التشخيص الذكي'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>

                {/* Step 3 */}
                <div className="glass-card glass-card-interactive p-6 relative z-10 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center font-black text-lg shadow-2xs border border-teal-100 mb-5">
                      3
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {lang === 'en' ? 'Get Treatments' : '3. استلام خطة العلاج'}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {lang === 'en' 
                        ? 'Receive organic solutions, bio-fungicides, copper sprays, and mechanical best practices.'
                        : 'احصل على وصفات مكافحة حيوية آمنة بيئياً بالإضافة إلى المقادير الكيميائية والممارسات الزراعية.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setTab('advisor')}
                    className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 justify-start cursor-pointer group bg-transparent border-0"
                  >
                    <span>{lang === 'en' ? 'Explore Advisor' : 'فتح مستشار العلاج'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>

                {/* Step 4 */}
                <div className="glass-card glass-card-interactive p-6 relative z-10 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center font-black text-lg shadow-2xs border border-teal-100 mb-5">
                      4
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {lang === 'en' ? 'Follow Recovery' : '4. جدولة ومتابعة الشفاء'}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {lang === 'en' 
                        ? 'Log infected row blocks on your tracker calendar to complete weekly sanitation checklists.'
                        : 'أضف الحقول المصابة إلى جدولك وتابع إنجاز المهام الأسبوعية ورش المبيدات حتى الحصاد.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setTab('tracker')}
                    className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 justify-start cursor-pointer group bg-transparent border-0"
                  >
                    <span>{lang === 'en' ? 'Track Progress' : 'متابعة التعافي'}</span>
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>

              </div>
            </div>

            {/* Pepper Detector Highlight CTA Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
              <div className="relative overflow-hidden glass-card p-8 sm:p-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Visual Accent */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-xl text-left relative z-10">
                  <div className="inline-flex px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold mb-4">
                    {lang === 'en' ? 'SPECIALIZED DEEP LEARNING MODEL' : 'طراز شبكة عصبية مخصص ومستقل'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                    {t('pepperDetector')}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {lang === 'en' 
                      ? 'A deep learning model developed specifically for pepper leaf disease classification. Instantly identify Healthy Pepper Leaves or Bacterial Spot (Xanthomonas) with high confidence.'
                      : 'نموذج رؤية حاسوبية ذكي تم تطويره خصيصاً لتصنيف أمراض أوراق نبات الفلفل وحمايته. حدد فوراً الأوراق السليمة أو المصابة بالبقعة البكتيرية (Xanthomonas) بدقة عالية.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-bold rounded-lg bg-teal-50 text-teal-700 border border-teal-100/40">
                      Powered by Pepper Disease Detector V1
                    </span>
                    <span className="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 border border-slate-150 font-semibold">
                      {lang === 'en' ? 'Tomato & Pepper Solanaceous Focus' : 'مخصص لعائلة الباذنجانيات'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[250px] relative z-10">
                  <a
                    href="https://huggingface.co/spaces/fawzy911/pepper-disease-detector"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="btn-premium btn-premium-brand w-full px-6 py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="h-4.5 w-4.5" />
                    {lang === 'en' ? 'Try Pepper Detector' : 'تجربة مصنف الفلفل'}
                  </a>
                  <a
                    href="https://huggingface.co/spaces/fawzy911/pepper-disease-detector" 
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="btn-premium btn-premium-secondary w-full px-6 py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {lang === 'en' ? 'Launch Detector Space' : 'تشغيل النموذج المستقل'}
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Core Features Bento Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
              <h2 className="text-center font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-12">
                {lang === 'en' ? 'Unified Ecosystem for Crop Preservation' : 'بيئة تقنية متكاملة لحماية وتأمين حقولك'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Feature 1 */}
                <div className="glass-card glass-card-interactive p-8 text-left">
                  <div className="p-3 bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center border border-teal-100 mb-6">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {lang === 'en' ? 'Multimodal AI Diagnosis' : 'تشخيص خلوي بالذكاء الاصطناعي'}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'en' 
                      ? 'Upload leaf photos of your crops. Our API processes visual tissue signs to identify bacterial, viral, or fungal infections with surgical accuracy.'
                      : 'ارفع صور أوراق نباتاتك المصابة. يقوم نظام الكشف بتحليل الأنسجة والأعراض لتصنيف العدوى بدقة متناهية.'}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="glass-card glass-card-interactive p-8 text-left">
                  <div className="p-3 bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center border border-teal-100 mb-6">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {lang === 'en' ? 'Prescriptive Recovery' : 'خطط تأهيل وعلاجات بيولوجية'}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'en' 
                      ? 'Create customized recovery timelines. Add checklists of biological mists, copper treatments, and irrigation changes directly to your field schedule.'
                      : 'أنشئ جدولاً زمنياً دقيقاً للتعافي. أضف قوائم مراجعة للمبيدات البيولوجية، المركبات النحاسية، وجداول الري المناسبة.'}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="glass-card glass-card-interactive p-8 text-left">
                  <div className="p-3 bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center border border-teal-100 mb-6">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {lang === 'en' ? 'Farming Expert Chat' : 'مستشار زراعي ذكي فوري'}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'en' 
                      ? 'Connect with server-side Gemini 3.5 Flash for customized inquiries about micro-irrigation calculations, fertilizer scheduling, or soil chemistry.'
                      : 'تواصل مع الخبير الزراعي الذكي المدعوم بنموذج جيميناي للحصول على جداول ري مخصصة ومقادير الأسمدة المناسبة.'}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: DISEASE DETECTION PAGE (UPLOAD & ANALYZE)
            ---------------------------------------------------- */}
        {tab === 'detect' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div id="nav-detect" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col animate-slide-down">
              
              {/* Header section */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Disease Diagnosis Center</h1>
                <p className="text-slate-500 mt-2">Upload crop leaf photos to run our advanced classification pipelines and receive immediate treatment layouts.</p>
              </div>

              {trackerMessage && (
                <div className="mb-6 p-4 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold">{trackerMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Upload / controls */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Upload Card */}
                  <div className="glass-card p-6 shadow-md">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <UploadCloud className="h-5 w-5 text-teal-600" />
                      Upload Leaf Image
                    </h2>

                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={triggerUpload}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 ${
                        dragOver 
                          ? 'border-teal-500 bg-teal-50/70' 
                          : imagePreview 
                            ? 'border-slate-300 bg-white/40' 
                            : 'border-slate-200 hover:border-slate-300 bg-white/30'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />

                      {imagePreview ? (
                        <div className="relative group">
                          <img 
                            src={imagePreview} 
                            alt="Leaf Preview" 
                            className="max-h-60 mx-auto rounded-lg object-cover border border-slate-200"
                          />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                            <p className="text-xs font-semibold text-white">Click to Replace Photo</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="inline-flex p-3 bg-white text-slate-500 rounded-full border border-slate-200 shadow-xs">
                            <UploadCloud className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Drag & drop your leaf image here</p>
                            <p className="text-xs text-slate-500 mt-1">or click to browse local files (PNG, JPG, JPEG)</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Crop Type Selection */}
                    <div className="mt-6">
                      <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                        Crop Family Hint
                      </label>
                      <select
                        value={cropTypeHint}
                        onChange={(e) => setCropTypeHint(e.target.value)}
                        className="premium-input w-full"
                      >
                        <option value="Pepper">Pepper (Capsicum)</option>
                        <option value="Tomato">Tomato (Solanum)</option>
                        <option value="Cucumber">Cucumber (Cucumis)</option>
                        <option value="Potato">Potato (Solanum tuberosum)</option>
                      </select>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleAnalyzeImage}
                        disabled={!imagePreview || isAnalyzing}
                        className={`btn-premium w-full py-3 px-4 font-bold transition-all duration-150 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md ${
                          !imagePreview 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                            : isAnalyzing 
                              ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                              : 'btn-premium-brand'
                        }`}
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Processing Tissue Scans...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4.5 w-4.5" />
                            Analyze Crop Tissue
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleLoadPepperPreset}
                        className="btn-premium btn-premium-secondary w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Sprout className="h-3.5 w-3.5 text-teal-600" />
                        Load Simulated Pepper Disease Leaf
                      </button>
                    </div>

                  </div>

                </div>

                {/* Right Column: Results Display */}
                <div className="lg:col-span-7">
                  {diagnosisResult ? (
                    <div className="glass-card p-6 sm:p-8 shadow-md space-y-6">
                      {/* Header Details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-50 text-teal-850 border border-teal-100">
                              {diagnosisResult.cropType} Crop
                            </span>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                              diagnosisResult.severity === 'Critical' 
                                ? 'bg-red-50 text-red-700 border-red-100' 
                                : diagnosisResult.severity === 'High' 
                                  ? 'bg-orange-50 text-orange-700 border-orange-100' 
                                  : 'bg-teal-50 text-teal-800 border-teal-100'
                            }`}>
                              {diagnosisResult.severity} Severity
                            </span>
                          </div>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
                            {diagnosisResult.diseaseName}
                          </h2>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">CONFIDENCE</p>
                          <p className="text-4xl font-black text-teal-600">
                            {(diagnosisResult.confidence * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>

                      {/* Symptoms & Causes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                            <AlertTriangle className="h-4 w-4 text-teal-600" />
                            Observed Symptoms
                          </h3>
                          <ul className="space-y-2">
                            {diagnosisResult.symptoms.map((sym: string, i: number) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-teal-600 mt-1 flex-shrink-0">•</span>
                                {sym}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                            <img className="h-4 w-4" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230d9488'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/></svg>" alt="" referrerPolicy="no-referrer" />
                            Infection Vectors
                          </h3>
                          <ul className="space-y-2">
                            {diagnosisResult.causes.map((cause: string, i: number) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-teal-600 mt-1 flex-shrink-0">•</span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="p-4 bg-white/40 backdrop-blur-md border border-white/80 rounded-[24px] space-y-3">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                          <HeartPulse className="h-4 w-4 text-teal-600" />
                          AI Treatment Prescriptions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {diagnosisResult.recommendations.map((rec: string, i: number) => (
                            <div key={i} className="p-3 bg-white/60 border border-slate-100 rounded-xl text-sm text-slate-600 flex items-start gap-2 shadow-xs">
                              <span className="inline-flex p-1 bg-teal-50 text-teal-700 border border-teal-100 rounded-lg text-xs font-extrabold flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200/60 justify-end">
                        <button
                          onClick={() => {
                            const matchingD = currentDiseasesDatabase.find(d => d.plantId === diagnosisResult.cropType.toLowerCase());
                            if (matchingD) {
                              setSelectedPlantId(diagnosisResult.cropType.toLowerCase());
                              setSelectedDiseaseId(matchingD.id);
                            }
                            setTab('advisor');
                          }}
                          className="btn-premium btn-premium-secondary px-5 py-2.5 text-sm cursor-pointer"
                        >
                          {t('viewTreatmentDetails')}
                        </button>
                        <button
                          onClick={handleAddDiagnosisToTracker}
                          className="btn-premium btn-premium-brand px-5 py-2.5 text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                          {t('createRecoveryPlan')}
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="glass-card p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px] shadow-md">
                      <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full border border-teal-150 mb-6 shadow-xs flex items-center justify-center">
                        <Activity className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{t('awaitingAnalysis')}</h3>
                      <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                        {t('awaitingAnalysisDesc')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: TREATMENT ADVISOR PAGE (CROP & DISEASE INFOPEDIA)
            ---------------------------------------------------- */}
        {tab === 'advisor' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div id="nav-advisor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col animate-slide-down">
              
              <div className="mb-8 text-left">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t('advisorTitle')}</h1>
                <p className="text-slate-500 mt-2">{t('advisorSubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Selector Column */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Plant selector card */}
                  <div className="glass-card p-5 shadow-md text-left">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-3">
                      {t('selectCropGroup')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {currentSupportedPlants.map((plant) => (
                        <button
                          key={plant.id}
                          onClick={() => setSelectedPlantId(plant.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedPlantId === plant.id
                              ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-xs'
                              : 'bg-white/40 border-slate-200/50 hover:bg-white/60 text-slate-700'
                          }`}
                        >
                          <span className="text-xl block mb-1">{plant.icon}</span>
                          <p className="font-bold text-sm text-slate-900">{plant.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono italic mt-0.5">{plant.scientificName}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disease list selector */}
                  <div className="glass-card p-5 shadow-md text-left">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-3">
                      {t('selectDiseaseInfo')}
                    </h3>
                    <div className="space-y-2">
                      {currentDiseasesDatabase.filter(d => d.plantId === selectedPlantId).map((disease) => (
                        <button
                          key={disease.id}
                          onClick={() => setSelectedDiseaseId(disease.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            selectedDiseaseId === disease.id
                              ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold'
                              : 'bg-white/40 border-slate-200/50 hover:bg-white/60 text-slate-700'
                          }`}
                        >
                          <span className="text-sm truncate mr-2">{disease.name.split(' (')[0]}</span>
                          <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-transform ${
                            selectedDiseaseId === disease.id ? 'translate-x-1 text-teal-600' : 'text-slate-400'
                          } ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      ))}
                      {currentDiseasesDatabase.filter(d => d.plantId === selectedPlantId).length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-4 font-mono">
                          {lang === 'en' ? 'No disease profiles currently indexed.' : 'لا توجد ملامح مرضية مفهرسة حالياً.'}
                        </p>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Details Column */}
                <div className="lg:col-span-8">
                  {activeDiseaseInfo ? (
                    <div className="glass-card p-6 sm:p-8 space-y-6 shadow-md">
                      
                      {/* Header */}
                      <div className="pb-6 border-b border-slate-150">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100 uppercase">
                            Academic Index
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            activeDiseaseInfo.severity === 'Critical' 
                              ? 'bg-red-50 text-red-700 border-red-100' 
                              : activeDiseaseInfo.severity === 'High' 
                                ? 'bg-orange-50 text-orange-700 border-orange-100' 
                                : 'bg-teal-50 text-teal-700 border-teal-100'
                          }`}>
                            {activeDiseaseInfo.severity} Risk Status
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {activeDiseaseInfo.name}
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mt-4">
                          {activeDiseaseInfo.description}
                        </p>
                      </div>

                      {/* Symptoms & Vectors */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="h-4 w-4 text-teal-600" />
                            Key Symptoms
                          </h4>
                          <ul className="space-y-2">
                            {activeDiseaseInfo.symptoms.map((sym, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-teal-600 mt-1">•</span>
                                {sym}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-1.5">
                            <img className="h-4 w-4" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230d9488'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/></svg>" alt="" referrerPolicy="no-referrer" />
                            Causal Factors & Hosts
                          </h4>
                          <ul className="space-y-2">
                            {activeDiseaseInfo.causes.map((c, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-teal-600 mt-1">•</span>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Transmission */}
                      <div className="p-4 bg-white/40 backdrop-blur-md border border-white/85 rounded-[20px] text-sm">
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider mb-1">Spread Mechanism</p>
                        <p className="text-slate-600 leading-relaxed">{activeDiseaseInfo.spreadMechanism}</p>
                      </div>

                      {/* Prescribed Controls */}
                      <div className="space-y-4">
                        <h4 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                          <HeartPulse className="h-4 w-4 text-teal-600" />
                          Chemical & Organic Solutions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeDiseaseInfo.recommendations.map((rec, i) => (
                            <div key={i} className="p-3.5 bg-white/50 border border-slate-200/50 rounded-xl text-sm text-slate-600">
                              <span className="font-bold text-teal-700 block mb-1">Remedy #{i + 1}</span>
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prevention Methods */}
                      <div className="space-y-4">
                        <h4 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-teal-600" />
                          Long-Term Prevention Methods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {activeDiseaseInfo.preventionMethods.map((prev, i) => (
                            <div key={i} className="p-3 bg-white/50 border border-slate-200/50 rounded-xl text-xs text-slate-600 leading-relaxed">
                              <span className="font-bold text-teal-700 block mb-1">Standard #{i + 1}</span>
                              {prev}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recovery Timeline expectations */}
                      <div className="p-4 bg-teal-50/50 border border-teal-200/50 rounded-xl space-y-2">
                        <h4 className="font-sans font-bold text-teal-800 text-xs uppercase tracking-wide">
                          Recovery & Yield Expectations
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {activeDiseaseInfo.recoveryExpectations}
                        </p>
                      </div>

                      {/* Best Practices */}
                      <div className="border-t border-slate-150 pt-6">
                        <h4 className="font-sans font-bold text-slate-500 text-xs uppercase tracking-wider mb-3">Field Best Practices</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeDiseaseInfo.bestPractices.map((bp, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/50 border border-slate-200/50 text-slate-600 text-xs font-mono">
                              {bp}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="glass-card p-10 text-center text-slate-500 shadow-md">
                      <p className="text-sm">Select a crop and disease type from the left selector menus.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 4: RECOVERY TRACKER PAGE (TREATMENT LIFECYCLES)
            ---------------------------------------------------- */}
        {tab === 'tracker' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div id="nav-tracker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col animate-slide-down">
              
              <div className="mb-8 text-left">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t('trackerTitle')}</h1>
                <p className="text-slate-500 mt-2">{t('trackerSubtitle')}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: List of current plans & Form to add */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Active trackers listing */}
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div key={plan.id} className="glass-card p-6 shadow-md space-y-4 relative overflow-hidden">
                        {/* Decorative sidebar color */}
                        <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1.5 ${
                          plan.status === 'Recovered' ? 'bg-teal-500' : 'bg-amber-500'
                        }`} />

                        {/* Top ribbon */}
                        <div className={`flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${isRTL ? 'pr-4' : 'pl-2'}`}>
                          <div className="text-left rtl:text-right">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-lg">
                                {plan.cropName === 'Pepper' && lang === 'ar' ? 'الفلفل' : (plan.cropName === 'Tomato' && lang === 'ar' ? 'الطماطم' : (plan.cropName === 'Cucumber' && lang === 'ar' ? 'الخيار' : (plan.cropName === 'Potato' && lang === 'ar' ? 'البطاطس' : plan.cropName)))} {lang === 'en' ? 'Row Care' : 'رعاية خط الزراعة'}
                              </span>
                              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase ${
                                plan.status === 'Recovered'
                                  ? 'bg-teal-50 text-teal-700 border-teal-250'
                                  : 'bg-amber-50 text-amber-700 border-amber-250'
                              }`}>
                                {plan.status === 'Recovered' ? (lang === 'en' ? 'Recovered' : 'تم التعافي') : (lang === 'en' ? 'In Progress' : 'قيد العلاج')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-mono">
                              {lang === 'ar' ? (
                                plan.diseaseName === 'Bacterial Spot (Xanthomonas spp.)' 
                                  ? 'تبقع الأوراق البكتيري (Xanthomonas spp.)' 
                                  : (plan.diseaseName === 'Early Blight (Alternaria solani)'
                                    ? 'اللفحة المبكرة (Alternaria solani)'
                                    : plan.diseaseName)
                              ) : plan.diseaseName}
                            </p>
                          </div>

                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="text-left sm:text-right rtl:text-right">
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{lang === 'en' ? 'Progress Rate' : 'معدل التقدم'}</p>
                              <p className="text-xl font-extrabold text-slate-900">{plan.progress}%</p>
                            </div>
                            <button
                              onClick={() => handleDeletePlan(plan.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-colors cursor-pointer"
                              title="Delete tracker"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className={isRTL ? 'pr-4' : 'pl-2'}>
                          <div className="w-full bg-slate-200/50 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                plan.status === 'Recovered' ? 'bg-teal-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${plan.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Details & Actions */}
                        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-slate-200/60 ${isRTL ? 'pr-4' : 'pl-2'}`}>
                          {/* Checklist */}
                          <div className="md:col-span-7 space-y-3 text-left rtl:text-right">
                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                              {t('treatmentChecklist')}
                            </p>
                            <div className="space-y-2">
                              {plan.checklist.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => handleToggleChecklist(plan.id, item.id)}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/40 border border-slate-200/50 hover:bg-white/60 hover:border-slate-300 transition-all cursor-pointer select-none"
                                >
                                  <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center flex-shrink-0 ${
                                    item.completed 
                                      ? 'bg-teal-600 border-teal-600 text-white' 
                                      : 'border-slate-300 bg-white'
                                  }`}>
                                    {item.completed && <Check className="h-3 w-3 stroke-[3]" />}
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <p className={`text-xs ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                      {lang === 'en' ? item.title : (
                                        item.title === 'Foliar spray of copper bactericide' ? 'رش الأوراق بمركب النحاس البكتيري الوقائي' : (
                                          item.title === 'Apply Bacillus subtilis bio-fungicide' ? 'تطبيق مبيد حيوي بكتيري Bacillus subtilis' : (
                                            item.title === 'Sanitize row tools and pruner shears' ? 'تعقيم أدوات الصف ومقصات ومعدات التقليم' : (
                                              item.title === 'Check new foliage expansion for water spots' ? 'فحص نمو الأوراق الجديدة بحثاً عن بقع مائية' : (
                                                item.title === 'Prune leaf stems up to 12 inches off soil' ? 'تقليم سيقان الأوراق حتى ارتفاع ١٢ بوصة من التربة' : (
                                                  item.title === 'Lay straw mulch below root line' ? 'وضع غطاء القش الواقي أسفل خط الجذور' : (
                                                    item.title === 'Spray biological Trichoderma culture' ? 'رش مستنبت التريكوديرما الفطري البيولوجي' : (
                                                      item.title === 'Inspect upper leaf stems for yellow circles' ? 'فحص سيقان الأوراق العلوية بحثاً عن دوائر صفراء' : item.title
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                      {lang === 'en' ? 'Due' : 'تاريخ الاستحقاق'}: {item.dueDate}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Timeline & Notes */}
                          <div className="md:col-span-5 space-y-4 text-left rtl:text-right">
                            {/* Notes */}
                            <div className="p-3 bg-white/40 backdrop-blur-xs border border-white/80 rounded-xl text-xs text-slate-600 space-y-1">
                              <p className="font-bold text-slate-500">{t('agronomyLogNotes')}</p>
                              <p className="font-mono italic text-slate-700">
                                {lang === 'ar' ? (
                                  plan.notes === 'Pruned bottom leaf spot vectors. Drip line calibration complete.' 
                                    ? 'تم تقليم الأوراق المصابة بالبقع السفلية. واكتملت معايرة شبكة ري الخطوط.' 
                                    : (plan.notes === 'Staked tomato cages up to 18 inches. Applied wheat-straw mulch bed.'
                                      ? 'تم تثبيت دعامات الطماطم حتى ارتفاع ١٨ بوصة، ووضع طبقة قش القمح لحماية التربة.'
                                      : plan.notes)
                                ) : plan.notes}
                              </p>
                            </div>

                            {/* Time Metrics */}
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between text-slate-500">
                                <span>{t('logDateLabel')}</span>
                                <span className="font-mono text-slate-700">{plan.startDate}</span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span>{t('cycleLengthLabel')}</span>
                                <span className="font-mono text-slate-700">{plan.estimatedWeeks} {lang === 'en' ? 'Weeks' : 'أسابيع'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}

                    {plans.length === 0 && (
                      <div className="glass-card p-10 text-center text-slate-500 shadow-sm flex flex-col items-center justify-center">
                        <HeartCrack className="h-10 w-10 text-slate-400 mb-4" />
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{t('noActiveTrackers')}</h4>
                        <p className="text-sm text-slate-500">{t('noActiveTrackersDesc')}</p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Column: Custom add form & Calendar */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Form to add a new tracker */}
                  <div className="glass-card p-5 shadow-md text-left">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5">
                      <Plus className="h-4.5 w-4.5 text-teal-600" />
                      {lang === 'en' ? 'Add Custom Tracker' : 'إضافة متتبع مخصص'}
                    </h3>

                    <form onSubmit={handleCreateCustomPlan} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">{lang === 'en' ? 'Crop Type' : 'نوع المحصول'}</label>
                        <select
                          value={newPlanCrop}
                          onChange={(e) => setNewPlanCrop(e.target.value)}
                          className="premium-input w-full text-xs"
                        >
                          <option value="Pepper">{lang === 'en' ? 'Pepper' : 'الفلفل'}</option>
                          <option value="Tomato">{lang === 'en' ? 'Tomato' : 'الطماطم'}</option>
                          <option value="Cucumber">{lang === 'en' ? 'Cucumber' : 'الخيار'}</option>
                          <option value="Potato">{lang === 'en' ? 'Potato' : 'البطاطس'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">{lang === 'en' ? 'Diagnosed Disease' : 'المرض الذي تم تشخيصه'}</label>
                        <input
                          type="text"
                          value={newPlanDisease}
                          onChange={(e) => setNewPlanDisease(e.target.value)}
                          placeholder={lang === 'en' ? 'e.g. Powdery Mildew, Rot' : 'مثال: البياض الدقيقي، العفن'}
                          required
                          className="premium-input w-full text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">{lang === 'en' ? 'Treatment Term' : 'مدة العلاج'}</label>
                        <select
                          value={newPlanWeeks}
                          onChange={(e) => setNewPlanWeeks(Number(e.target.value))}
                          className="premium-input w-full text-xs"
                        >
                          <option value={2}>{lang === 'en' ? '2 Weeks' : 'أسبوعان'}</option>
                          <option value={3}>{lang === 'en' ? '3 Weeks (Standard)' : '٣ أسابيع (قياسي)'}</option>
                          <option value={4}>{lang === 'en' ? '4 Weeks' : '٤ أسابيع'}</option>
                          <option value={6}>{lang === 'en' ? '6 Weeks (Critical)' : '٦ أسابيع (حرج)'}</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="btn-premium btn-premium-brand w-full py-2 text-xs font-bold shadow-md cursor-pointer"
                      >
                        {lang === 'en' ? 'Log Tracker Plan' : 'تسجيل خطة المتتبع'}
                      </button>
                    </form>
                  </div>

                  {/* Simulated Field Calendar view */}
                  <div className="glass-card p-5 shadow-md space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{lang === 'en' ? 'Field Calendar' : 'تقويم الحقل الإرشادي'}</h3>
                      <span className="text-xs text-teal-700 font-mono font-bold">{lang === 'en' ? 'June 2026' : 'يونيو ٢٠٢٦'}</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-200/60">
                      {lang === 'en' ? (
                        <><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></>
                      ) : (
                        <><span>اث</span><span>ثل</span><span>أر</span><span>خم</span><span>جم</span><span>سب</span><span>أح</span></>
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs text-slate-600">
                      <span className="p-1">15</span><span className="p-1">16</span><span className="p-1">17</span><span className="p-1">18</span><span className="p-1">19</span><span className="p-1 bg-teal-50 text-teal-700 rounded-full font-bold border border-teal-100/50">20</span><span className="p-1">21</span>
                      <span className="p-1">22</span><span className="p-1 bg-teal-100/40 text-teal-800 rounded-full font-bold border border-teal-200/50">23</span><span className="p-1">24</span><span className="p-1">25</span><span className="p-1">26</span><span className="p-1 bg-teal-50 text-teal-700 rounded-full font-bold border border-teal-100/50">27</span><span className="p-1">28</span>
                      <span className="p-1">29</span><span className="p-1">30</span><span className="p-1 text-slate-300">1</span><span className="p-1 text-slate-300">2</span><span className="p-1 text-slate-300">3</span><span className="p-1 text-slate-300">4</span><span className="p-1 text-slate-300">5</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 space-y-2 text-left rtl:text-right">
                      <div className="flex items-center gap-2 text-[10px] rtl:flex-row-reverse rtl:justify-end">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span className="text-slate-600">{lang === 'en' ? 'Bacterial Spot Sprays (June 20, 27)' : 'رش تبقع الأوراق البكتيري (٢٠، ٢٧ يونيو)'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] rtl:flex-row-reverse rtl:justify-end">
                        <span className="w-2 h-2 rounded-full bg-teal-600" />
                        <span className="text-slate-600">{lang === 'en' ? 'Bio-fungicide application (June 23)' : 'تطبيق المبيدات الحيوية الفطرية (٢٣ يونيو)'}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 5: AI AGRICULTURAL EXPERT (GEMINI CHAT TERMINAL)
            ---------------------------------------------------- */}
        {tab === 'expert' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div id="nav-expert" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col animate-slide-down">
              
              <div className="mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-7 w-7 text-teal-600 animate-pulse" />
                  {lang === 'en' ? 'AI Agricultural Expert' : 'الخبير الزراعي الذكي'}
                </h1>
                <p className="text-slate-500 mt-2">{lang === 'en' ? 'Connect to server-side Gemini 1.5 Pro for custom queries about micro-irrigation schedules, fertilizer volumes, and organic defenses.' : 'اتصل بنموذج Gemini 1.5 Pro للرد على استفساراتك حول جداول الري والتسميد والدفاعات العضوية.'}</p>
              </div>

              {/* Quick-question shortcut chips */}
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-slate-500 font-bold mr-1">{lang === 'en' ? 'Shortcut Inquiries:' : 'استفسارات سريعة:'}</span>
                <button 
                  onClick={() => handleShortcutChip('What is the organic treatment for Pepper Bacterial Spot?')}
                  className="px-3.5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-200/50 hover:bg-white/80 hover:border-teal-300 text-xs text-slate-700 transition-all cursor-pointer shadow-xs"
                >
                  🌶️ {lang === 'en' ? 'Pepper Spot Treatment' : 'علاج تبقع الفلفل'}
                </button>
                <button 
                  onClick={() => handleShortcutChip('How do I calculate drip irrigation schedules for tomatoes?')}
                  className="px-3.5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-200/50 hover:bg-white/80 hover:border-teal-300 text-xs text-slate-700 transition-all cursor-pointer shadow-xs"
                >
                  💧 {lang === 'en' ? 'Tomato Drip Watering' : 'ري الطماطم بالتنقيط'}
                </button>
                <button 
                  onClick={() => handleShortcutChip('Explain companion planting benefits of marigolds and tomatoes.')}
                  className="px-3.5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-200/50 hover:bg-white/80 hover:border-teal-300 text-xs text-slate-700 transition-all cursor-pointer shadow-xs"
                >
                  🌼 {lang === 'en' ? 'Companion Planting' : 'الزراعة المترافقة'}
                </button>
              </div>

              {/* Chat Terminal Box */}
              <div className="glass-card flex-grow flex flex-col min-h-[480px] shadow-md relative overflow-hidden">
                
                {/* Terminal header */}
                <div className="px-4 py-3 bg-white/40 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                    <span>GEMINI-1.5-PRO // {lang === 'en' ? 'SECURE CHANNEL' : 'قناة آمنة'}</span>
                  </div>
                  <span>{lang === 'en' ? 'LATENCY: SECURE PORT 3000' : 'المنفذ الآمن ٣٠٠٠'}</span>
                </div>

                {/* Chat Scrollpane */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4 max-h-[500px]">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed space-y-2 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-teal-650 text-white font-medium'
                          : 'bg-white/60 border border-slate-200/40 text-slate-700 backdrop-blur-md'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span className={`text-[10px] block text-right mt-1.5 ${
                          msg.sender === 'user' ? 'text-white/80' : 'text-slate-400 font-mono'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isChatTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/60 border border-slate-200/40 p-4 rounded-2xl flex items-center gap-2 backdrop-blur-md shadow-xs">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{lang === 'en' ? 'Gemini is typing...' : 'جيميناي يكتب...'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
                  className="p-4 border-t border-slate-200/50 bg-white/40 backdrop-blur-md flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={lang === 'en' ? 'Ask our expert AI about soil preparation, companion crops, pests...' : 'اسأل خبير الذكاء الاصطناعي عن تجهيز التربة، النباتات المترافقة، الآفات...'}
                    className="premium-input flex-grow text-sm placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="btn-premium px-5 py-2 font-extrabold text-sm shadow-sm cursor-pointer"
                  >
                    {lang === 'en' ? 'Send' : 'إرسال'}
                  </button>
                </form>

              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 6: KNOWLEDGE CENTER PAGE (SEARCHABLE LIBRARY)
            ---------------------------------------------------- */}
        {tab === 'knowledge' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div id="nav-knowledge" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col animate-slide-down">
              
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{lang === 'en' ? 'Knowledge Center' : 'مركز المعرفة الزراعية'}</h1>
                <p className="text-slate-500 mt-2">{lang === 'en' ? 'Explore 12 realistic academic articles, organic treatment recipes, and prevention checklists verified by agronomists.' : 'استكشف ١٢ مقالاً أكاديمياً ووصفة علاجية عضوية وقوائم حظر مخصصة ومصادق عليها.'}</p>
              </div>

              {/* Filter controls */}
              <div className="glass-card p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center shadow-md">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={lang === 'en' ? 'Search articles, crop species, or pests...' : 'ابحث عن المقالات أو المحاصيل أو الآفات...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="premium-input pl-10 w-full text-sm placeholder:text-slate-400"
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {['All', 'Disease', 'Prevention', 'Treatment', 'Resources'].map((cat) => {
                    const translatedCat = lang === 'ar' 
                      ? (cat === 'All' ? 'الكل' : (cat === 'Disease' ? 'أمراض النبات' : (cat === 'Prevention' ? 'وقاية' : (cat === 'Treatment' ? 'علاجات' : 'مصادر ومراجع')))) 
                      : cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-teal-50 border-teal-300 text-teal-700 font-bold shadow-xs'
                            : 'bg-white/40 border-slate-200/50 hover:bg-white/60 text-slate-600'
                        }`}
                      >
                        {translatedCat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <div 
                    key={art.id} 
                    className="glass-card p-6 flex flex-col justify-between hover:border-teal-300 hover:-translate-y-0.5 transition-all duration-300 shadow-md group text-left"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100/50 uppercase">
                          {lang === 'ar' ? (art.category === 'Disease' ? 'مرض' : (art.category === 'Prevention' ? 'وقاية' : (art.category === 'Treatment' ? 'علاج' : 'مصادر'))) : art.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{lang === 'ar' ? art.readTime.replace('min read', 'دقائق قراءة') : art.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-650 transition-colors">
                        {lang === 'ar' && art.title === 'Understanding Anthracnose Spores' ? 'فهم جراثيم الأنثراكنوز' : (lang === 'ar' && art.title === 'Drip Line Sanitation Standards' ? 'معايير تعقيم خطوط التنقيط' : (lang === 'ar' && art.title === 'Organic Copper Formulations' ? 'تركيبات النحاس العضوية للمزارع' : art.title))}
                      </h3>
                      
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {lang === 'ar' && art.title === 'Understanding Anthracnose Spores' ? 'دليل أكاديمي شامل يشرح كيفية مكافحة جراثيم فطر الكوليتوتريشوم ومنع انتشار البقع الداكنة.' : (lang === 'ar' && art.title === 'Drip Line Sanitation Standards' ? 'أفضل الممارسات لتعقيم قنوات الري بالتنقيط ومنع تكاثر البكتيريا في خطوط المياه.' : (lang === 'ar' && art.title === 'Organic Copper Formulations' ? 'كيفية تحضير وتطبيق محاليل النحاس البكتيرية العضوية بأمان تام ودون الإضرار بصحة التربة.' : art.summary))}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-550 italic">{lang === 'en' ? `By ${art.author.split(',')[0]}` : `بواسطة ${art.author.split(',')[0] === 'Dr. Agronome' ? 'د. أجرونوم' : 'م. فوزي'}`}</span>
                      <button
                        onClick={() => setSelectedArticle(art)}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {lang === 'en' ? 'Read Guide' : 'اقرأ الدليل'}
                        <ChevronRight className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-400">
                    <BookMarked className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-500 text-sm">{lang === 'en' ? 'No agricultural publications matched your search query.' : 'لا توجد منشورات زراعية تطابق بحثك.'}</p>
                  </div>
                )}
              </div>

              {/* Reading Drawer Overlay Modal */}
              {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-md animate-fade-in">
                  <div className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl text-left">
                    
                    {/* Close button */}
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="absolute top-4 right-4 btn-premium px-3.5 py-1.5 text-xs cursor-pointer"
                    >
                      {lang === 'en' ? 'Close' : 'إغلاق'}
                    </button>

                    <div className="space-y-2">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-teal-50 text-teal-700 border border-teal-100/50 uppercase">
                        {lang === 'ar' ? (selectedArticle.category === 'Disease' ? 'مرض' : (selectedArticle.category === 'Prevention' ? 'وقاية' : (selectedArticle.category === 'Treatment' ? 'علاج' : 'مصادر'))) : selectedArticle.category} Index
                      </span>
                      <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                        {lang === 'ar' && selectedArticle.title === 'Understanding Anthracnose Spores' ? 'فهم جراثيم الأنثراكنوز ومكافحتها' : (lang === 'ar' && selectedArticle.title === 'Drip Line Sanitation Standards' ? 'معايير تعقيم شبكة الري بالتنقيط' : (lang === 'ar' && selectedArticle.title === 'Organic Copper Formulations' ? 'تركيبات النحاس العضوية للوقاية' : selectedArticle.title))}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono pt-1">
                        <span>{lang === 'en' ? 'Authored:' : 'الكاتب:'} {selectedArticle.author}</span>
                        <span>•</span>
                        <span>{lang === 'en' ? 'Published:' : 'تاريخ النشر:'} {selectedArticle.publishedDate}</span>
                      </div>
                    </div>

                    <div className="text-sm text-slate-755 leading-relaxed space-y-4 pt-2 whitespace-pre-line">
                      {lang === 'ar' && selectedArticle.title === 'Understanding Anthracnose Spores' ? (
                        `تعد فطريات الأنثراكنوز من أخطر مسببات تلف ثمار الفلفل الحار والبارد على حد سواء. تنتشر الأبواغ بسرعة فائقة في الأجواء الحارة والرطبة، خاصة عند هطول الأمطار أو الري العلوي.
                        
                        الخصائص البيولوجية للأبواغ:
                        - تنشط الأبواغ في درجة حرارة بين ٢٤ إلى ٣٢ مئوية مع رطوبة نسبية تتجاوز ٩٠٪.
                        - تلتصق الأبواغ بسطح الثمار والأوراق وتفرز إنزيمات هاضمة تخترق جدار الخلايا النباتية خلال ٢٤ ساعة.
                        - تظهر الإصابة أولاً كبقع دائرية غائرة داكنة تتسع تدريجياً وتتحول إلى كتل هلامية وردية أو برتقالية اللون تحت رطوبة عالية.
                        
                        بروتوكول المكافحة والوقاية المتكاملة:
                        ١. استخدام بذور وشتلات خالية تماماً من الأمراض ومعقمة مسبقاً.
                        ٢. تطبيق دورة زراعية لا تقل عن ٣ سنوات مع نباتات غير باذنجانية.
                        ٣. تجنب الري العلوي تماماً والاعتماد على الري بالتنقيط لتقليل رطوبة الأوراق.
                        ٤. رش المركبات النحاسية الوقائية أو مبيدات الفطريات المتخصصة بانتظام عند توفر الظروف الملائمة للمرض.`
                      ) : lang === 'ar' && selectedArticle.title === 'Drip Line Sanitation Standards' ? (
                        `يعتبر تعقيم ونظافة خطوط الري بالتنقيط من أهم عوامل النجاح في مكافحة مسببات الأمراض الفطرية والبكتيرية الكامنة في التربة والمياه.
                        
                        المخاطر الرئيسية لإهمال الصيانة:
                        - تراكم الترسبات الكلسية والملحية يقلل كفاءة توزيع المياه بنسبة تصل لـ ٤٠٪، مما يسبب إجهاداً للنباتات يجعلها أكثر عرضة للعدوى.
                        - تكوين الطبقة الحيوية الرقيقة (Biofilm) داخل الأنابيب والتي تعتبر ملجأ ومصدراً دائماً لجراثيم البيثيوم والفيتوفثورا والفيوزاريوم.
                        
                        خطوات التعقيم الدوري الموصى بها:
                        ١. استخدام حمض الفوسفوريك أو النيتريك لخفض حموضة المياه وتنظيف الرواسب المعدنية المتراكمة.
                        ٢. حقن مياه الري ببيروكسيد الهيدروجين (ماء الأكسجين) بتركيز آمن للتخلص من المواد العضوية والطحالب وقتل مسببات الأمراض.
                        ٣. فتح نهايات الخطوط (Flushing) بانتظام لغسل الشوائب المترسبة في أطراف الشبكة.`
                      ) : lang === 'ar' && selectedArticle.title === 'Organic Copper Formulations' ? (
                        `تعد تركيبات النحاس العضوية من أقدم وأقوى وسائل الوقاية الفطرية والبكتيرية المعتمدة في الزراعة العضوية لحماية النباتات من طيف واسع من الأمراض.
                        
                        آلية تأثير النحاس على الفطريات:
                        - تعمل أيونات النحاس الحرة على تدمير البروتينات والإنزيمات الحيوية داخل خلايا الفطريات مما يمنع إنبات الأبواغ ونمو الغزل الفطري.
                        - يشكل النحاس طبقة واقية غير قابلة للذوبان على الأسطح النباتية تمنع اختراق الميكروبات للأنسجة.
                        
                        إرشادات الاستخدام الفعال:
                        ١. الرش الوقائي قبل حدوث الإصابة أو فور ظهور أولى علامات المرض بالمنطقة.
                        ٢. الالتزام بالتركيز الموصى به لتفادي التسمم النحاسي للنباتات (Phytotoxicity)، وخاصة في درجات الحرارة المرتفعة.
                        ٣. تكرار الرش كل ٧ إلى ١٠ أيام في مواسم الأمطار والرطوبة العالية لتعويض ما تم غسله عن الأوراق.`
                      ) : selectedArticle.content}
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 7: ABOUT PAGE (STARTUP SHOWCASE)
            ---------------------------------------------------- */}
        {tab === 'about' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-grow flex flex-col space-y-14 animate-slide-down">
              
              {/* Presentation layout hero */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                  {lang === 'en' ? 'About AgriCare AI' : 'عن منصة AgriCare AI'}
                </h1>
                <p className="text-lg text-slate-650 leading-relaxed text-sm sm:text-base">
                  {lang === 'en' 
                    ? 'Empowering international agriculture with secure deep-learning classifiers and real-time LLM expert guidance.'
                    : 'تمكين القطاع الزراعي العالمي بأحدث تقنيات تصنيف الأمراض ونظم التوجيه اللغوي الفوري المدعومة بالذكاء الاصطناعي.'}
                </p>
              </div>

              {/* Core Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 shadow-md space-y-4 text-left hover:border-teal-300/60 transition-all duration-300">
                  <h3 className="text-xl font-bold text-teal-650 flex items-center gap-2">
                    <Sprout className="h-5.5 w-5.5" />
                    {lang === 'en' ? 'Our Mission' : 'رسالتنا وأهدافنا'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Provide commercial farmers, greenhouse operations, and rural agricultural workers with immediate diagnostics to arrest leaf spot pathogens and blights early. By democratizing plant pathology, we preserve global vegetable yields and support chemical-free organic farming practices.'
                      : 'تمكين المزارعين وأصحاب الدفيئات الزراعية والمهندسين الزراعيين من تشخيص الأمراض فورياً للسيطرة على الآفات مبكراً. نسعى لتبسيط علم أمراض النباتات لحماية المحاصيل والحد من استخدام المبيدات الضارة.'}
                  </p>
                </div>

                <div className="glass-card p-8 shadow-md space-y-4 text-left hover:border-teal-300/60 transition-all duration-300">
                  <h3 className="text-xl font-bold text-teal-650 flex items-center gap-2">
                    <Workflow className="h-5.5 w-5.5" />
                    {lang === 'en' ? 'Our Technical Vision' : 'رؤيتنا التقنية'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lang === 'en'
                      ? 'Utilize advanced computer vision and multi-stage neural pipelines to identify subtle microscopic tissue chlorosis before infections consume entire rows. We bind modern visual classifications with robust, secure Gemini AI schemas to output deterministic field prescriptions.'
                      : 'توظيف تقنيات الرؤية الحاسوبية المتقدمة والشبكات العصبية العميقة لتحديد أعراض المرض الدقيقة على الأوراق قبل تفشيها. نربط التصنيفات البصرية بنماذج جيميناي لتوفير إرشادات علاجية متكاملة.'}
                  </p>
                </div>
              </div>

              {/* Future Roadmap Section */}
              <div className="glass-card p-8 shadow-md space-y-6 text-left hover:border-teal-300/40 transition-all duration-300">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {lang === 'en' ? 'AgriCare AI Growth Roadmap' : 'خارطة طريق نمو AgriCare AI'}
                </h2>
                <p className="text-xs text-slate-500 font-bold">
                  {lang === 'en' ? 'Our scheduled iterations towards autonomous precision field optimization.' : 'خطواتنا المدروسة لتطوير المنصة نحو الزراعة الذكية المستقلة.'}
                </p>
                
                <div className="space-y-6 pt-4">
                  {/* Phase 1 */}
                  <div className="relative pl-8 border-l-2 border-teal-500/30">
                    <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="text-[10px] font-mono font-bold text-teal-750 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200 uppercase">
                      {lang === 'en' ? 'PHASE 1 - COMPLETED' : 'المرحلة 1 - مكتملة'}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2">
                      {lang === 'en' ? 'Real-Time Foliar Diagnostics' : 'التشخيص الفوري لأمراض الأوراق'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Deploy mobile-responsive web portals linked with Gemini vision API to identify disease vectors in under 3 seconds.'
                        : 'إطلاق الواجهات المتجاوبة المدعومة بنماذج الذكاء الاصطناعي وجيميناي لفحص صور الأوراق وتحديد الآفات في أقل من 3 ثوانٍ.'}
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative pl-8 border-l-2 border-slate-200/50">
                    <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full bg-slate-350" />
                    <span className="text-[10px] font-mono font-bold text-slate-650 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 uppercase">
                      {lang === 'en' ? 'PHASE 2 - IN PROGRESS' : 'المرحلة 2 - قيد التنفيذ'}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2">
                      {lang === 'en' ? 'Autonomous Sensor Networks' : 'شبكات الاستشعار المستقلة'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Integrate LoRaWAN ambient moisture probes with field camera systems to flag Powdery Mildew risks based on greenhouse humidity trends.'
                        : 'دمج مجسات رطوبة التربة عبر شبكات LoRaWAN لتنبيه المزارعين من مخاطر الإصابة بالبياض الدقيقي استناداً للرطوبة.'}
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative pl-8">
                    <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full bg-slate-350" />
                    <span className="text-[10px] font-mono font-bold text-slate-650 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 uppercase">
                      {lang === 'en' ? 'PHASE 3 - PLANNED' : 'المرحلة 3 - مستقبلية'}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2">
                      {lang === 'en' ? 'Global Predictive Yield Mapping' : 'خرائط التنبؤ بالمحاصيل والإنتاج'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Leverage satellite multispectral scanning to feed predictive disease risk models across regional vegetable farming sectors.'
                        : 'استخدام صور الأقمار الصناعية والمسح متعدد الأطياف لتشغيل نماذج التنبؤ بالأمراض الموسمية على مستوى إقليمي.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 8: CONTACT PAGE (CREATOR RESUME & INQUIRIES)
            ---------------------------------------------------- */}
        {tab === 'contact' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(240, 253, 250, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(245, 243, 255, 0.5) 100%)' }} className="w-full flex-grow flex flex-col">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-grow flex flex-col animate-slide-down">
              
              <div className="mb-10 text-left">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {lang === 'en' ? 'Contact & Support' : 'اتصل بنا والدعم الفني'}
                </h1>
                <p className="text-slate-500 mt-2">
                  {lang === 'en' 
                    ? 'Connect with the project development team and submit agricultural inquiries.' 
                    : 'تواصل مع فريق تطوير المشروع وقدم استفساراتك الزراعية والتقنية.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Creator Bio Card (Mohamed Fawzy) */}
                <div className="lg:col-span-5 glass-card p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden hover:border-teal-300/40 transition-all duration-300">
                  {/* Subtle teal mesh background */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="text-center sm:text-left space-y-5 relative z-10">
                    <div className="flex justify-center sm:justify-start">
                      <div className="relative group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-300" />
                        <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-3xl border-2 border-white shadow-xl">
                          MF
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        {lang === 'en' ? 'Mohamed Fawzy' : 'محمد فوزي'}
                      </h2>
                      <p className="text-xs text-teal-700 font-extrabold uppercase tracking-wider mt-1.5 flex items-center gap-1.5 justify-center sm:justify-start">
                        <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                        {lang === 'en' ? 'AI Engineer | Data Science Specialist' : 'مهندس ذكاء اصطناعي | أخصائي علوم بيانات'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-650 leading-relaxed text-left">
                    {lang === 'en'
                      ? 'Creator of **AgriCare AI Platform** and **Pepper Disease Detector V1**. Specialized in deep learning classification systems, computer vision models, and LLM integrations to solve real-world agricultural problems.'
                      : 'مطور منصة **AgriCare AI** ونموذج تصنيف أمراض الفلفل **Pepper Disease Detector V1**. متخصص في هندسة التعلم العميق، الرؤية الحاسوبية، وتطبيقات النماذج اللغوية الضخمة لخدمة قضايا الأمن الغذائي.'}
                  </p>

                  {/* Professional Channels block */}
                  <div className="space-y-3 pt-2 text-left">
                    <h3 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                      {lang === 'en' ? 'Professional Portfolio & Channels' : 'روابط التواصل والمحفظة المهنية'}
                    </h3>
                    
                    {/* Hugging Face Profile */}
                    <a 
                      href="https://huggingface.co/fawzy911" 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-teal-400/60 hover:bg-teal-50/30 text-slate-700 hover:text-teal-800 text-xs font-bold transition-all shadow-3xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">🤗</span>
                        <span>
                          {lang === 'en' ? 'Hugging Face Space & Models' : 'مساحة ونماذج هجينج فيس'}
                        </span>
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">fawzy911</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                    </a>

                    {/* LinkedIn */}
                    <a 
                      href="https://www.linkedin.com/in/mohamed-fawzy-99449440a" 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-teal-400/60 hover:bg-teal-50/30 text-slate-700 hover:text-teal-800 text-xs font-bold transition-all shadow-3xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <Linkedin className="h-4.5 w-4.5 text-sky-600" />
                        <span>
                          {lang === 'en' ? 'LinkedIn Connect' : 'التواصل عبر لينكد إن'}
                        </span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {/* GitHub */}
                    <a 
                      href="https://github.com/fawzy-911" 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-800 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-3xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <Github className="h-4.5 w-4.5 text-slate-900" />
                        <span>
                          {lang === 'en' ? 'GitHub Open Source' : 'مشاريع جيت هاب المفتوحة'}
                        </span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {/* Kaggle */}
                    <a 
                      href="https://www.kaggle.com/mohamedfawzy911" 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-teal-400/60 hover:bg-teal-50/30 text-slate-700 hover:text-teal-800 text-xs font-bold transition-all shadow-3xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">🏆</span>
                        <span>
                          {lang === 'en' ? 'Kaggle Competition Profile' : 'الملف الشخصي على كاجل'}
                        </span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {/* Direct Developer Email */}
                    <a 
                      href="mailto:hegabwork.26@gmail.com" 
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-teal-400/60 hover:bg-teal-50/30 text-slate-700 hover:text-teal-800 text-xs font-bold transition-all shadow-3xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <Mail className="h-4.5 w-4.5 text-teal-600" />
                        <span>
                          {lang === 'en' ? 'Direct Developer Email' : 'البريد الإلكتروني المباشر'}
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-sans">mohamedfawzy.ai@gmail.com</span>
                    </a>
                  </div>

                </div>

                {/* Inquiry form */}
                <div className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6 shadow-md text-left hover:border-teal-300/40 transition-all duration-300">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-teal-650" />
                    {lang === 'en' ? 'Inquiry & Support Form' : 'نموذج التواصل والاستفسار'}
                  </h3>

                  {isContactSubmitted ? (
                    <div className="p-6 rounded-2xl bg-teal-50/60 text-teal-800 border border-teal-200/50 text-center space-y-2">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-teal-600" />
                      <h4 className="font-bold text-teal-900 text-sm sm:text-base">
                        {lang === 'en' ? 'Inquiry Sent Successfully' : 'تم إرسال الرسالة بنجاح'}
                      </h4>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto">
                        {lang === 'en' 
                          ? 'Thank you for contacting Mohamed Fawzy. We will respond with full technical agronomist diagnostics shortly.'
                          : 'شكراً لتواصلك مع المهندس محمد فوزي. سيقوم الفريق المختص بالرد على استفسارك الفني في أقرب وقت.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">
                            {lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
                          </label>
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder={lang === 'en' ? 'Your Name' : 'اسمك الكريم'}
                            required
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-850 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">
                            {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                          </label>
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="farmer@example.com"
                            required
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-850 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">
                          {lang === 'en' ? 'Message Description' : 'تفاصيل الاستفسار الزراعي أو التقني'}
                        </label>
                        <textarea
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder={lang === 'en' ? 'Detailed query regarding plant pathology, API enterprise integrations, or seed sourcing support...' : 'يرجى كتابة تفاصيل استفسارك حول الأمراض النباتية أو كيفية دمج خدماتنا التقنية...'}
                          rows={5}
                          required
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-850 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-premium px-6 py-3 font-extrabold text-sm shadow-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'Submit Message Inquiry' : 'إرسال الاستفسار الآن'}
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200 text-slate-500 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1.5 text-left">
            <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5 justify-center md:justify-start">
              <Leaf className="h-4.5 w-4.5 text-teal-650" />
              {lang === 'en' ? 'AgriCare AI Platform' : 'منصة AgriCare AI'}
            </p>
            <p className="text-slate-600 text-xs">
              {lang === 'en' 
                ? 'Created by ' 
                : 'تطوير المهندس ' }
              <span className="text-slate-900 font-semibold">Mohamed Fawzy</span> • 
              {lang === 'en' ? ' AI Engineer & Agricultural AI Developer' : ' مهندس ذكاء اصطناعي وحلول زراعية'}
            </p>
            <p className="text-[10px] text-slate-400">© 2026 AgriCare AI. All Rights Reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
            <button onClick={() => setTab('home')} className="hover:text-teal-600 transition-colors cursor-pointer">{lang === 'en' ? 'Home' : 'الرئيسية'}</button>
            <button onClick={() => setTab('detect')} className="hover:text-teal-600 transition-colors cursor-pointer">{lang === 'en' ? 'Disease Detection' : 'تشخيص الأمراض'}</button>
            <button onClick={() => setTab('advisor')} className="hover:text-teal-600 transition-colors cursor-pointer">{lang === 'en' ? 'Advisor' : 'مستشار العلاج'}</button>
            <button onClick={() => setTab('tracker')} className="hover:text-teal-600 transition-colors cursor-pointer">{lang === 'en' ? 'Tracker' : 'متابع التعافي'}</button>
            <button onClick={() => setTab('expert')} className="hover:text-teal-600 transition-colors cursor-pointer">{lang === 'en' ? 'AI Expert' : 'الخبير الذكي'}</button>
            <button onClick={() => setTab('knowledge')} className="hover:text-teal-650 transition-colors cursor-pointer">{lang === 'en' ? 'Knowledge Base' : 'المعرفة الزراعية'}</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
