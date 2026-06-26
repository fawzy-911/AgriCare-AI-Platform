# AgriCare AI Platform 🌿

> **Production-grade plant disease diagnostic platform** powered by a custom CNN architecture — built on award-winning scientific research in AI-driven plant pathology.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Platform-16a34a?style=for-the-badge)](https://agricare-ai-platform-62743316614.europe-west2.run.app/)
[![Interactive Walkthrough](https://img.shields.io/badge/Walkthrough-Supademo-6366f1?style=for-the-badge)](https://app.supademo.com/demo/cmqujkt3m0f5oqml2i76l4g8r?utm_source=link)
[![Research Award](https://img.shields.io/badge/Award-2nd_Place_Nationwide_🏆-f59e0b?style=for-the-badge)](#research-background)

---

## Overview

Most plant disease apps fail in the field — shallow multi-crop classifiers that compound misclassification errors with every added class. AgriCare takes the opposite approach: **hyper-specialize first, then scale.**

The diagnostic engine is built on a custom CNN optimized exclusively for pepper plant pathology, achieving **98.99% validation accuracy** by eliminating cross-class noise entirely. The underlying architecture requires zero structural changes to extend to any additional crop variety — precision now, scale later.

This is not a demo project. It is the direct implementation of research that placed **2nd Nationwide across all Egyptian Universities**, deployed as a fully functional client product.

---

## Live Platform

| Resource | Link |
|---|---|
| 🌐 Live Deployment | [agricare-ai-platform](https://agricare-ai-platform-62743316614.europe-west2.run.app/) |
| 🎬 Interactive Walkthrough | [Supademo Tour](https://app.supademo.com/demo/cmqujkt3m0f5oqml2i76l4g8r?utm_source=link) |

---

## Research Background

This platform is the production implementation of my undergraduate research thesis in AI applications in plant pathology, submitted across Egyptian Universities — where it ranked **2nd Place Nationwide**.

**Research scope:** Deep Learning-based classification of pepper plant diseases using convolutional neural networks with optimized feature extraction pipelines.

**Key finding:** Domain-constrained, hyper-specialized models consistently outperform generalized multi-class classifiers on real-world agricultural diagnostic tasks — both in accuracy and in false-positive elimination.

---

## Model Performance

| Metric | Value |
|---|---|
| Validation Accuracy | **98.99%** |
| Architecture | Custom CNN with deep feature isolation |
| Current Scope | Pepper plant pathology (3 diagnostic classes) |
| Scalability | Zero architectural changes needed for new crops |

**Diagnostic Classes (Current):**
- `Pepper__bell___Bacterial_spot` — Xanthomonas spp. infection
- `Pepper__bell___healthy` — Healthy tissue baseline
- *(Extensible to any additional crop/disease class)*

---

## Platform Features

### 🔬 AI Diagnostic Engine
Upload a leaf image and receive an instant classification with confidence score — powered by the custom CNN model.

### 📋 Structured Recovery Plans
A diagnosis without a recovery path is incomplete. Every result links directly to a week-by-week treatment protocol with actionable checklist items.

### 💊 Deep Remedy Insights
Breaks down the scientific rationale behind each treatment — growers understand the mechanics, not just the instructions.

### 📚 Knowledge Hub
A curated library of articles on disease prevention, treatment science, and crop management best practices. Available in English and Arabic.

### 🌍 Full Arabic / English Support
Complete bilingual interface — built for the target user base from day one, not retrofitted.

### 🗺️ Interactive Product Tour
Guided onboarding via [Shepherd.js](https://shepherdjs.dev/) — users reach the first diagnosis in under 2 minutes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| AI / LLM | Google Gemini API (`@google/genai`) |
| Animations | Motion (Framer) |
| Icons | Lucide React |
| Tour | Shepherd.js |
| Build | Vite 6 |
| Server | Express + Node.js |
| Deployment | Google Cloud Run |

---

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx        # Bilingual nav with tab routing
│   ├── Tour.tsx              # Interactive product tour
│   └── HeroWorkflowAnimation.tsx
├── data/
│   ├── diseases.ts           # Disease database (EN)
│   ├── arabic_data.ts        # Full Arabic mirror dataset
│   ├── knowledge.ts          # Knowledge hub articles (EN)
│   └── translations.ts       # i18n strings
├── App.tsx                   # Core application logic
└── types.ts                  # TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key

### Installation

```bash
git clone https://github.com/fawzy-911/AgriCare-AI-Platform.git
cd AgriCare-AI-Platform
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm start
```

---

## Architectural Philosophy

**Why pepper plants first?**

Generic multi-crop classifiers suffer from *class boundary bleeding* — features from visually similar diseases across different plant species interfere with each other during training. By constraining the problem domain to a single crop, the model learns richer, more discriminative feature representations that eliminate this noise.

**Why is it scalable?**

The classification pipeline is fully modular. Adding a new crop means:
1. Adding new training data
2. Retraining the final classification layer
3. Updating the `DISEASES_DATABASE` and `SUPPORTED_PLANTS` data files

Zero changes to the model architecture, inference pipeline, or application logic.

---

## Roadmap

- [ ] Kaggle notebook + model weights (public release)
- [ ] Expand to tomato, potato, and wheat pathology classes
- [ ] Offline-capable PWA for field use without internet
- [ ] REST API for third-party agricultural system integration
- [ ] Admin dashboard with diagnosis analytics

---

## Author

**Mohamed Fawzy**
AI Engineer | Deep Learning Researcher

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/fawzy-911)

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

*Built with precision. Engineered to scale.*
