// components/VisionCard.tsx
import React from 'react'
import { VisionItem } from '../types'
import './VisionCard.css'

interface VisionCardProps {
  item: VisionItem
}

const VisionCard: React.FC<VisionCardProps> = ({ item }) => {
  return (
    <div className="vision-card">
      <div className="card-image">
        <img src={item.imageUrl} alt={item.title} />
        <span className="category-badge">{item.category}</span>
      </div>
      <div className="card-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{item.progress}%</span>
        </div>
      </div>
    </div>
  )
}

export default VisionCard