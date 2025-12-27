// src/types.ts
export interface VisionItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'spiritual' | 'service' | 'health' | 'career' | 'finance' | 'learning' | 'relationships' | 'missions'
  progress: number
  createdAt: string
  targetDate: string
  priority: 'low' | 'medium' | 'high'
  notes: string
}

export interface GoalTemplate {
  id: string
  title: string
  description: string
  category: VisionItem['category']
  suggestedDeadline: string
  tips: string[]
}

export interface ProgressHistory {
  date: string
  progress: number
  goalId: string
}