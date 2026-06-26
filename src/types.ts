export interface Article {
  id: string;
  title: string;
  category: 'Disease' | 'Prevention' | 'Treatment' | 'Resources';
  summary: string;
  content: string;
  author: string;
  readTime: string;
  tags: string[];
  publishedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface PlantType {
  id: string;
  name: string;
  scientificName: string;
  icon: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  plantId: string;
  description: string;
  symptoms: string[];
  causes: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  spreadMechanism: string;
  recommendations: string[];
  preventionMethods: string[];
  recoveryExpectations: string;
  bestPractices: string[];
}

export interface DiagnosisRecord {
  id: string;
  date: string;
  cropType: string;
  diseaseName: string;
  confidence: number;
  imageUrl: string;
  status: 'Critical' | 'Treating' | 'Recovered';
  notes?: string;
}

export interface TrackerItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface RecoveryPlan {
  id: string;
  cropName: string;
  diseaseName: string;
  startDate: string;
  estimatedWeeks: number;
  progress: number; // 0 to 100
  status: 'In Progress' | 'Recovered' | 'On Hold';
  checklist: TrackerItem[];
  notes: string;
  timeline: {
    week: number;
    activity: string;
    completed: boolean;
  }[];
}
