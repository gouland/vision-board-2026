// components/GoalTracker.tsx
import React from 'react'
import { VisionItem } from '../types'
import './GoalTracker.css'

interface GoalTrackerProps {
  items: VisionItem[]
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ items }) => {
  const totalProgress = items.reduce((sum, item) => sum + item.progress, 0) / items.length
  
  return (
    <div className="goal-tracker">
      <h2>Overall Progress</h2>
      <div className="progress-circle">
        <div className="circle-background"></div>
        <div 
          className="circle-progress"
          style={{ 
            background: `conic-gradient(#667eea ${totalProgress * 3.6}deg, #e0e0e0 0deg)`
          }}
        ></div>
        <div className="circle-text">
          <span className="percentage">{Math.round(totalProgress)}%</span>
          <span className="label">Complete</span>
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <span className="stat-value">{items.length}</span>
          <span className="stat-label">Goals</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {items.filter(item => item.progress === 100).length}
          </span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </div>
  )
}

export default GoalTracker