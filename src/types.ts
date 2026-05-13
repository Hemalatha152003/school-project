export type ExperimentCategory = 'Physics' | 'Chemistry' | 'Biology' | 'Math';
export type ClassLevel = 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
export type Subject = 'Science' | 'Mathematics';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  classLevel: ClassLevel;
  subject: Subject;
  chapter: string;
  category: ExperimentCategory;
  thumbnail: string;
  shortDescription: string;
  aim: string;
  materials: string[];
  procedure: string[];
  observation: string;
  results: string;
  realWorldApps: string[];
  quiz: QuizQuestion[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
