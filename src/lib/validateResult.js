export function parseAndValidateResult(raw) {
  try {
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!data || typeof data !== 'object') return null;

    if (!Array.isArray(data.flashcards) || !Array.isArray(data.quiz)) {
      return null;
    }

    for (const card of data.flashcards) {
      if (typeof card.question !== 'string' || typeof card.answer !== 'string') {
        return null;
      }
    }

    for (const q of data.quiz) {
      if (
        typeof q.question !== 'string' ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        typeof q.correctIndex !== 'number'
      ) {
        return null;
      }
    }

    return data;
  } catch {
    return null;
  }
}