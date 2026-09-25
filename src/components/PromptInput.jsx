import { useState } from 'react';

export default function PromptInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <textarea
        className="prompt-textarea"
        placeholder="Paste your study notes, textbook excerpt, or topic description here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !text.trim()} className="btn-primary">
        {isLoading ? 'Processing...' : 'Generate Study Materials'}
      </button>
    </form>
  );
}