import { useState } from 'react';

export default function QuizView({ quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const handleSelect = (qIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="quiz-wrapper">
      {quiz.map((q, qIdx) => (
        <div key={qIdx} className="quiz-question-card">
          <p>
            {qIdx + 1}. {q.question}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[qIdx] === optIdx;
              const isCorrect = q.correctIndex === optIdx;
              let btnClass = 'option-btn';

              if (submitted) {
                if (isCorrect) btnClass += ' correct';
                else if (isSelected) btnClass += ' incorrect';
              } else if (isSelected) {
                btnClass += ' selected';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(qIdx, optIdx)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={() => setSubmitted(true)} className="btn-primary" style={{ backgroundColor: '#16a34a' }}>
          Submit Quiz
        </button>
      ) : (
        <div className="quiz-score-box">
          <p>
            Your Score: {calculateScore()} / {quiz.length}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedAnswers({});
            }}
            className="btn-primary"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}