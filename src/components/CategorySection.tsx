// components/CategorySection.tsx
import React from 'react'
import { VisionItem } from '../types'
import VisionCard from './VisionCard'
import './CategorySection.css'

interface CategorySectionProps {
  title: string
  category: string
  items: VisionItem[]
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, category, items }) => {
  return (
    <div className="category-section">
      <div className="category-header">
        <h2>{title}</h2>
        <span className="category-count">{items.length} items</span>
      </div>
      {items.length > 0 ? (
        <div className="category-items">
          {items.map((item) => (
            <VisionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="empty-message">No items in this category yet. Add some!</p>
      )}
    </div>
  )
}

export default CategorySection