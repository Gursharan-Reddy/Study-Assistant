import { useState, useRef } from 'react';
import PromptInput from './components/PromptInput';
import ResultView from './components/ResultView';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { callBackendApi } from './lib/api';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const requestIdRef = useRef(0);

  const handleGenerate = async (promptText) => {
    const currentId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const data = await callBackendApi(promptText);
      if (currentId !== requestIdRef.current) return;
      setResult(data);
    } catch (err) {
      if (currentId !== requestIdRef.current) return;
      setError(err.message || 'Failed to process request.');
    } finally {
      if (currentId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="header">
          <h1>Project Assistant</h1>
          <p>Transform notes into interactive study decks and quizzes instantly.</p>
        </header>

        <PromptInput onSubmit={handleGenerate} isLoading={loading} />

        {loading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={() => setError(null)} />}
        {!loading && !error && result && <ResultView data={result} />}
      </div>
    </div>
  );
}