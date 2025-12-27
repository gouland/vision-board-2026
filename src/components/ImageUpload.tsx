// components/ImageUpload.tsx
import React, { useState } from 'react'
import './ImageUpload.css'

const ImageUpload: React.FC = () => {
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    // Handle file upload logic here
    console.log('Files dropped:', files)
  }

  return (
    <div className="image-upload">
      <h2>Add New Vision Item</h2>
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📁</div>
        <p>Drag & drop images here</p>
        <p className="upload-subtext">or</p>
        <button className="upload-button">Browse Files</button>
        <p className="upload-note">Supports JPG, PNG up to 5MB</p>
      </div>
    </div>
  )
}

export default ImageUpload