import { useState } from 'react';
import FlashcardDeck from './FlashcardDeck';
import QuizView from './QuizView';

export default function ResultView({ data }) {
  const [activeTab, setActiveTab] = useState('flashcards');

  if (!data) return null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="tabs-header">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
        >
          Flashcards ({data.flashcards?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
        >
          Quiz ({data.quiz?.length || 0})
        </button>
      </div>

      {activeTab === 'flashcards' ? <FlashcardDeck cards={data.flashcards} /> : <QuizView quiz={data.quiz} />}
    </div>
  );
}