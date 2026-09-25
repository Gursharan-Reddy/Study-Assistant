import { parseAndValidateResult } from './validateResult';

export async function callBackendApi(prompt) {
  const response = await fetch('http://localhost:5000/api/generate', {
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