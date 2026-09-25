export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-container">
      <h3>Generation Failed</h3>
      <p>{message || 'An unexpected error or malformed response occurred.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-danger">
          Retry Request
        </button>
      )}
    </div>
  );
}