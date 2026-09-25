import { parseAndValidateResult } from './validateResult';

const API_URL = import.meta.env.VITE_API_URL || 'https://study-assistant-sxf3.onrender.com';

export async function callBackendApi(prompt) {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Server returned status ' + response.status);
  }

  const json = await response.json();
  const validated = parseAndValidateResult(json);
  if (!validated) {
    throw new Error('Invalid data shape received from model');
  }
  return validated;
}