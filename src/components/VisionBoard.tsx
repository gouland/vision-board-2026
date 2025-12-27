import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Upload, X, Edit2, Trash2, Target, Image as ImageIcon, Type, Plus, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { VisionItem, Category, Goal } from '../types';
import VisionCard from './VisionCard';
import CategorySection from './CategorySection';
import GoalTracker from './GoalTracker';

const VisionBoard: React.FC = () => {
  const [items, setItems] = useState<VisionItem[]>([
    {
      id: '1',
      type: 'image',
      title: 'Dream Vacation',
      content: 'Bali beaches',
      category: 'travel',
      createdAt: new Date(),
      updatedAt: new Date(),
      position: { x: 0, y: 0 },
      metadata: {
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400',
        tags: ['travel', 'vacation', 'beach']
      }
    },
    {
      id: '2',
      type: 'goal',
      title: 'Learn Spanish',
      content: 'Reach conversational level',
      category: 'learning',
      createdAt: new Date(),
      updatedAt: new Date(),
      position: { x: 100, y: 100 },
      metadata: {
        progress: 30,
        targetDate: new Date('2024-12-31')
      }
    },
    {
      id: '3',
      type: 'text',
      title: 'Daily Affirmation',
      content: 'I am capable of achieving my dreams',
      category: 'personal',
      createdAt: new Date(),
      updatedAt: new Date(),
      position: { x: 200, y: 200 }
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Save $10,000',
      description: 'Emergency fund',
      targetDate: new Date('2024-06-30'),
      progress: 65,
      category: 'finance'
    },
    {
      id: '2',
      title: 'Read 24 Books',
      description: 'Personal development',
      targetDate: new Date('2024-12-31'),
      progress: 42,
      category: 'learning'
    }
  ]);

  const categories: Category[] = [
    { id: 'career', name: 'Career', color: 'bg-blue-100 text-blue-700', icon: '💼' },
    { id: 'health', name: 'Health', color: 'bg-green-100 text-green-700', icon: '❤️' },
    { id: 'finance', name: 'Finance', color: 'bg-yellow-100 text-yellow-700', icon: '💰' },
    { id: 'travel', name: 'Travel', color: 'bg-purple-100 text-purple-700', icon: '✈️' },
    { id: 'learning', name: 'Learning', color: 'bg-indigo-100 text-indigo-700', icon: '📚' },
    { id: 'personal', name: 'Personal', color: 'bg-pink-100 text-pink-700', icon: '🌟' }
  ];

  const [newItemType, setNewItemType] = useState<VisionItem['type']>('text');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemContent, setNewItemContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: VisionItem = {
          id: Date.now().toString(),
          type: 'image',
          title: file.name,
          content: 'Uploaded image',
          category: selectedCategory,
          createdAt: new Date(),
          updatedAt: new Date(),
          position: { x: Math.random() * 300, y: Math.random() * 300 },
          metadata: {
            imageUrl: reader.result as string
          }
        };
        setItems(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  }, [selectedCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;

    const newItem: VisionItem = {
      id: Date.now().toString(),
      type: newItemType,
      title: newItemTitle,
      content: newItemContent,
      category: selectedCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
      position: { x: Math.random() * 300, y: Math.random() * 300 }
    };

    setItems(prev => [...prev, newItem]);
    setNewItemTitle('');
    setNewItemContent('');
    setIsAddingItem(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌟 My Vision Board</h1>
          <p className="text-gray-600">Visualize your dreams and track your goals</p>
        </header>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setIsAddingItem(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={20} />
                Add Item
              </button>
              
              <div {...getRootProps()} className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 cursor-pointer">
                <input {...getInputProps()} />
                <Upload size={20} />
                <span>Upload Image</span>
              </div>
            </div>

            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Item Form */}
          {isAddingItem && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex gap-4 mb-4">
                {(['text', 'image', 'goal'] as VisionItem['type'][]).map(type => (
                  <button
                    key={type}
                    onClick={() => setNewItemType(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      newItemType === type 
                        ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type === 'text' && <Type size={18} />}
                    {type === 'image' && <ImageIcon size={18} />}
                    {type === 'goal' && <Target size={18} />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description or content"
                  value={newItemContent}
                  onChange={(e) => setNewItemContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add to Board
                  </button>
                  <button
                    onClick={() => setIsAddingItem(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vision Board Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision Board</h2>
            
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
                <div className="vision-board-grid">
                  {items.map(item => (
                    <VisionCard
                      key={item.id}
                      item={item}
                      onDelete={handleDeleteItem}
                      categories={categories}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {items.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-500 mb-4">Your vision board is empty</p>
                <p className="text-gray-400">Add items using the buttons above</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals Tracker */}
            <GoalTracker goals={goals} categories={categories} />

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <CategorySection key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Board Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-bold">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images:</span>
                  <span className="font-bold">{items.filter(i => i.type === 'image').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goals:</span>
                  <span className="font-bold">{items.filter(i => i.type === 'goal').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Text Notes:</span>
                  <span className="font-bold">{items.filter(i => i.type === 'text').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;