import React, { useState, useEffect } from 'react';
import './App.css';

const MOTIVATIONAL_QUOTES = [
  "Your only limit is you. Make 2026 legendary!",
  "Dream big. Work hard. Stay focused. 2026 is yours!",
  "Every day is a chance to get closer to your goals.",
  "The best time to start was yesterday. The next best time is now.",
  "Success is the sum of small efforts repeated day in and day out.",
];

const PLACEHOLDER_IMAGES = {
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  career: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  finance: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  relationships: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  personal: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
  creative: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
};

interface VisionGoal {
  id: number;
  title: string;
  category: string;
  description: string;
  targetDate: string;
  imageUrl: string;
  date: string;
}

interface JournalEntry {
  id: number;
  title: string;
  mood: string;
  content: string;
  wins: string;
  challenges: string;
  tomorrow: string;
  date: string;
  winsList: string[];
}

interface Exercise {
  id: number;
  type: string;
  duration: string;
  calories: string;
  notes: string;
  date: string;
}

interface ProgressItem {
  id: number;
  goal: string;
  progress: number;
  status: string;
  lastUpdated: string;
}

export default function VisionBoard2026() {
  const [activeTab, setActiveTab] = useState('vision');
  const [currentQuote] = useState(
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  );

  // Initialize with saved data or defaults
  const [visionGoals, setVisionGoals] = useState<VisionGoal[]>(() => {
    const saved = localStorage.getItem('visionGoals');
    return saved ? JSON.parse(saved) : [];
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('exercises');
    return saved ? JSON.parse(saved) : [];
  });

  const [progressItems, setProgressItems] = useState<ProgressItem[]>(() => {
    const saved = localStorage.getItem('progressItems');
    if (saved) return JSON.parse(saved);
    // Default progress items if nothing saved
    return [
      { id: 1, goal: 'Fitness Goals', progress: 0, status: 'not-started', lastUpdated: new Date().toLocaleDateString() },
      { id: 2, goal: 'Career Growth', progress: 0, status: 'not-started', lastUpdated: new Date().toLocaleDateString() },
      { id: 3, goal: 'Financial Goals', progress: 0, status: 'not-started', lastUpdated: new Date().toLocaleDateString() },
      { id: 4, goal: 'Personal Development', progress: 0, status: 'not-started', lastUpdated: new Date().toLocaleDateString() },
    ];
  });

  const [visionForm, setVisionForm] = useState({
    title: '',
    category: '',
    description: '',
    targetDate: '',
    imageUrl: ''
  });

  const [journalForm, setJournalForm] = useState({
    title: '',
    mood: '',
    content: '',
    wins: '',
    challenges: '',
    tomorrow: ''
  });

  const [exerciseForm, setExerciseForm] = useState({
    type: '',
    duration: '',
    calories: '',
    notes: ''
  });

  /* =======================
     SAVE DATA TO LOCALSTORAGE
  ======================== */
  useEffect(() => {
    localStorage.setItem('visionGoals', JSON.stringify(visionGoals));
  }, [visionGoals]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('progressItems', JSON.stringify(progressItems));
  }, [progressItems]);

  /* =======================
     HANDLER FUNCTIONS (FIXED FOR IMAGE URL ISSUE)
  ======================== */
  const handleVisionSubmit = () => {
    if (visionForm.title && visionForm.category) {
      // ALWAYS use the user's image URL if provided, otherwise use default
      const finalImageUrl = visionForm.imageUrl && visionForm.imageUrl.trim() !== '' 
        ? visionForm.imageUrl 
        : PLACEHOLDER_IMAGES[visionForm.category as keyof typeof PLACEHOLDER_IMAGES] || PLACEHOLDER_IMAGES.personal;

      const newGoal: VisionGoal = {
        id: Date.now(),
        ...visionForm,
        imageUrl: finalImageUrl, // Use the determined URL
        date: new Date().toLocaleDateString()
      };

      console.log('Adding new goal with image:', finalImageUrl);
      
      setVisionGoals([newGoal, ...visionGoals]);
      setVisionForm({ title: '', category: '', description: '', targetDate: '', imageUrl: '' });
    }
  };

  const deleteVisionGoal = (id: number) => {
    setVisionGoals(visionGoals.filter(g => g.id !== id));
  };

  const handleJournalSubmit = () => {
    if (journalForm.title && journalForm.content) {
      const newEntry: JournalEntry = {
        id: Date.now(),
        ...journalForm,
        date: new Date().toLocaleDateString(),
        winsList: journalForm.wins.split('\n').filter(w => w.trim())
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setJournalForm({ title: '', mood: '', content: '', wins: '', challenges: '', tomorrow: '' });
    }
  };

  const deleteJournalEntry = (id: number) => {
    setJournalEntries(journalEntries.filter(e => e.id !== id));
  };

  const handleExerciseSubmit = () => {
    if (exerciseForm.type && exerciseForm.duration) {
      const newExercise: Exercise = {
        id: Date.now(),
        ...exerciseForm,
        date: new Date().toLocaleDateString()
      };
      setExercises([newExercise, ...exercises]);
      setExerciseForm({ type: '', duration: '', calories: '', notes: '' });
    }
  };

  const deleteExercise = (id: number) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  const updateProgress = (id: number, progress: number) => {
    setProgressItems(items =>
      items.map(item =>
        item.id === id
          ? {
            ...item,
            progress,
            status: progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress',
            lastUpdated: new Date().toLocaleDateString()
          }
          : item
      )
    );
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      amazing: '🤩',
      great: '😊',
      good: '🙂',
      okay: '😐',
      tired: '😴',
      stressed: '😰'
    };
    return emojis[mood] || '😊';
  };

  /* =======================
     JSX (COMPLETE VERSION)
  ======================== */
  return (
    <div className="App">
      <div className="header">
        <h1>🎯 My Vision Board 2026</h1>
        <p>Dream it. Plan it. Achieve it.</p>
      </div>

      <div className="tabs">
        <button className={activeTab === 'vision' ? 'active' : ''} onClick={() => setActiveTab('vision')}>
          🎯 Vision Board
        </button>
        <button className={activeTab === 'journal' ? 'active' : ''} onClick={() => setActiveTab('journal')}>
          📝 Journal
        </button>
        <button className={activeTab === 'exercise' ? 'active' : ''} onClick={() => setActiveTab('exercise')}>
          💪 Exercise
        </button>
        <button className={activeTab === 'progress' ? 'active' : ''} onClick={() => setActiveTab('progress')}>
          📊 Progress
        </button>
      </div>

      {activeTab === 'vision' && (
        <>
          <div className="card-section">
            <h2>Add Your 2026 Goals</h2>
            <p className="subtitle">Visualize your dreams with images!</p>
            <div>
              <div className="form-grid">
                <input 
                  type="text" 
                  className="input"
                  placeholder="Goal title (e.g., Run a marathon)"
                  value={visionForm.title}
                  onChange={(e) => setVisionForm({...visionForm, title: e.target.value})}
                />
                <select 
                  className="input"
                  value={visionForm.category}
                  onChange={(e) => setVisionForm({...visionForm, category: e.target.value})}
                >
                  <option value="">Select category...</option>
                  <option value="fitness">💪 Fitness</option>
                  <option value="career">💼 Career</option>
                  <option value="finance">💰 Finance</option>
                  <option value="education">📚 Education</option>
                  <option value="travel">✈️ Travel</option>
                  <option value="relationships">❤️ Relationships</option>
                  <option value="personal">🌟 Personal Growth</option>
                  <option value="creative">🎨 Creative</option>
                </select>
              </div>

              <input 
                type="text" 
                className="input"
                placeholder="Image URL (optional - we'll use a default if empty)"
                value={visionForm.imageUrl}
                onChange={(e) => setVisionForm({...visionForm, imageUrl: e.target.value})}
              />
              
              {/* Image Preview Hint */}
              {visionForm.imageUrl && visionForm.imageUrl.trim() !== '' && (
                <div style={{ 
                  marginBottom: '15px', 
                  padding: '10px', 
                  backgroundColor: '#1f1f1f', 
                  borderRadius: '8px',
                  border: '1px solid #58cc02'
                }}>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '0.9em', 
                    color: '#58cc02',
                    textAlign: 'center'
                  }}>
                    ✓ Custom image URL will be used
                  </p>
                </div>
              )}

              <textarea 
                className="textarea"
                placeholder="Describe your goal in detail..."
                value={visionForm.description}
                onChange={(e) => setVisionForm({...visionForm, description: e.target.value})}
              />

              <input 
                type="date" 
                className="input"
                value={visionForm.targetDate}
                onChange={(e) => setVisionForm({...visionForm, targetDate: e.target.value})}
              />

              <button onClick={handleVisionSubmit} className="primary-btn">Add to Vision Board</button>
            </div>
          </div>

          <div className="masonry-grid">
            {visionGoals.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#b0b0b0',
                fontStyle: 'italic',
                gridColumn: '1 / -1'
              }}>
                <p>No vision goals yet. Add your first goal above!</p>
              </div>
            ) : (
              visionGoals.map(goal => (
                <div key={goal.id} className="vision-card">
                  <button 
                    onClick={() => deleteVisionGoal(goal.id)}
                    className="delete-btn"
                    title="Delete goal"
                  >
                    ×
                  </button>
                  <div className="vision-image">
                    <img 
                      src={goal.imageUrl} 
                      alt={goal.title} 
                      onError={(e) => {
                        // If custom image fails to load, use placeholder
                        const defaultImage = PLACEHOLDER_IMAGES[goal.category as keyof typeof PLACEHOLDER_IMAGES] || 
                                           PLACEHOLDER_IMAGES.personal;
                        e.currentTarget.src = defaultImage;
                        console.log('Image failed to load, using placeholder:', goal.imageUrl);
                      }}
                    />
                    <div className="vision-overlay">
                      <span className={`category-badge category-${goal.category}`}>
                        {goal.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="vision-content">
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                    {goal.targetDate && (
                      <div className="target-date">
                        🎯 {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'journal' && (
        <>
          <div className="card-section">
            <h2>Daily Journal</h2>
            <p className="subtitle">Reflect on your day and track your progress</p>
            <div>
              <div className="form-grid">
                <input 
                  type="text" 
                  className="input"
                  placeholder="Entry title"
                  value={journalForm.title}
                  onChange={(e) => setJournalForm({...journalForm, title: e.target.value})}
                />
                <select 
                  className="input"
                  value={journalForm.mood}
                  onChange={(e) => setJournalForm({...journalForm, mood: e.target.value})}
                >
                  <option value="">How are you feeling?</option>
                  <option value="amazing">🤩 Amazing</option>
                  <option value="great">😊 Great</option>
                  <option value="good">🙂 Good</option>
                  <option value="okay">😐 Okay</option>
                  <option value="tired">😴 Tired</option>
                  <option value="stressed">😰 Stressed</option>
                </select>
              </div>

              <textarea 
                className="textarea"
                placeholder="What happened today?"
                value={journalForm.content}
                onChange={(e) => setJournalForm({...journalForm, content: e.target.value})}
              />

              <div className="list-section">
                <label>Today's Wins 🎉 (One per line)</label>
                <textarea 
                  className="textarea"
                  placeholder="• Completed morning workout&#10;• Finished project"
                  value={journalForm.wins}
                  onChange={(e) => setJournalForm({...journalForm, wins: e.target.value})}
                  style={{ minHeight: '80px' }}
                />
              </div>

              <textarea 
                className="textarea"
                placeholder="Challenges I faced..."
                value={journalForm.challenges}
                onChange={(e) => setJournalForm({...journalForm, challenges: e.target.value})}
                style={{ minHeight: '80px' }}
              />

              <textarea 
                className="textarea"
                placeholder="Tomorrow I will..."
                value={journalForm.tomorrow}
                onChange={(e) => setJournalForm({...journalForm, tomorrow: e.target.value})}
                style={{ minHeight: '80px' }}
              />

              <button onClick={handleJournalSubmit} className="primary-btn">Save Entry</button>
            </div>
          </div>

          <div className="grid">
            {journalEntries.map(entry => (
              <div key={entry.id} className="card">
                <button 
                  onClick={() => deleteJournalEntry(entry.id)}
                  className="delete-btn"
                >
                  ×
                </button>
                <div className="card-body">
                  <div className="mood-display">
                    <h3>{entry.title}</h3>
                    <span style={{ fontSize: '2em' }}>{getMoodEmoji(entry.mood)}</span>
                  </div>
                  <p className="date-text">{entry.date}</p>
                  
                  <p className="content-text">{entry.content}</p>
                  
                  {entry.winsList.length > 0 && (
                    <div className="wins-box">
                      <strong>🎉 Wins:</strong>
                      <ul>
                        {entry.winsList.map((win, idx) => (
                          <li key={idx}>{win}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {entry.challenges && (
                    <div className="challenges-box">
                      <strong>💪 Challenges:</strong>
                      <p>{entry.challenges}</p>
                    </div>
                  )}

                  {entry.tomorrow && (
                    <div className="tomorrow-box">
                      <strong>🎯 Tomorrow:</strong>
                      <p>{entry.tomorrow}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'exercise' && (
        <>
          <div className="card-section">
            <h2>Exercise Log</h2>
            <p className="subtitle">Track your workouts and stay consistent!</p>
            <div>
              <div className="form-grid">
                <select 
                  className="input"
                  value={exerciseForm.type}
                  onChange={(e) => setExerciseForm({...exerciseForm, type: e.target.value})}
                >
                  <option value="">Exercise type...</option>
                  <option value="running">🏃 Running</option>
                  <option value="gym">🏋️ Gym</option>
                  <option value="yoga">🧘 Yoga</option>
                  <option value="cycling">🚴 Cycling</option>
                  <option value="swimming">🏊 Swimming</option>
                  <option value="walking">🚶 Walking</option>
                  <option value="sports">⚽ Sports</option>
                  <option value="hiit">🔥 HIIT</option>
                </select>
                <input 
                  type="text" 
                  className="input"
                  placeholder="Duration (e.g., 45 mins)"
                  value={exerciseForm.duration}
                  onChange={(e) => setExerciseForm({...exerciseForm, duration: e.target.value})}
                />
              </div>

              <input 
                type="text" 
                className="input"
                placeholder="Calories burned"
                value={exerciseForm.calories}
                onChange={(e) => setExerciseForm({...exerciseForm, calories: e.target.value})}
              />

              <textarea 
                className="textarea"
                placeholder="Notes..."
                value={exerciseForm.notes}
                onChange={(e) => setExerciseForm({...exerciseForm, notes: e.target.value})}
              />

              <button onClick={handleExerciseSubmit} className="primary-btn">Log Exercise</button>
            </div>
          </div>

          <div className="grid">
            {exercises.map(exercise => (
              <div key={exercise.id} className="card">
                <button 
                  onClick={() => deleteExercise(exercise.id)}
                  className="delete-btn"
                >
                  ×
                </button>
                <div className="card-body">
                  <div className="category-badge category-fitness">{exercise.type.toUpperCase()}</div>
                  <p className="date-text">{exercise.date}</p>
                  
                  <div className="exercise-stats">
                    <div className="stat">
                      <span className="stat-icon">⏱️</span>
                      <span>{exercise.duration}</span>
                    </div>
                    {exercise.calories && (
                      <div className="stat">
                        <span className="stat-icon">🔥</span>
                        <span>{exercise.calories} cal</span>
                      </div>
                    )}
                  </div>
                  
                  {exercise.notes && (
                    <p className="content-text">{exercise.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'progress' && (
        <div className="card-section">
          <h2>Goal Progress Tracker</h2>
          <p className="subtitle">Monitor your progress!</p>
          
          <div className="progress-grid">
            {progressItems.map(item => (
              <div key={item.id} className="progress-card">
                <div className="progress-header">
                  <h3>{item.goal}</h3>
                  <span className="status-badge">
                    {item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '⏳' : '🎯'}
                  </span>
                </div>
                
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${item.progress}%` }}></div>
                </div>
                
                <div className="progress-info">
                  <span className="progress-percentage">{item.progress}%</span>
                  <span className="progress-date">{item.lastUpdated}</span>
                </div>
                
                <div className="progress-controls">
                  <button 
                    onClick={() => updateProgress(item.id, Math.max(0, item.progress - 10))}
                    className="progress-btn"
                  >
                    -10%
                  </button>
                  <button 
                    onClick={() => updateProgress(item.id, Math.min(100, item.progress + 10))}
                    className="progress-btn"
                  >
                    +10%
                  </button>
                  <button 
                    onClick={() => updateProgress(item.id, 100)}
                    className="progress-btn complete-btn"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-overview">
            <h3>Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{progressItems.filter(i => i.status === 'completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{progressItems.filter(i => i.status === 'in-progress').length}</div>
                <div className="stat-label">In Progress</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {Math.round(progressItems.reduce((acc, item) => acc + item.progress, 0) / progressItems.length)}%
                </div>
                <div className="stat-label">Average</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        <p className="quote">"{currentQuote}"</p>
      </div>
    </div>
  );
}