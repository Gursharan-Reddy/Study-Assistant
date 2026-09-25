import { useState } from 'react';

export default function FlashcardDeck({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flashcard-wrapper">
      <div className="card-counter">
        Card {currentIndex + 1} of {cards.length}
      </div>
      <div onClick={() => setIsFlipped(!isFlipped)} className="flashcard">
        <p>{isFlipped ? currentCard.answer : currentCard.question}</p>
      </div>
      <div className="card-actions">
        <button onClick={handlePrev} className="btn-secondary">
          Previous
        </button>
        <button onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}