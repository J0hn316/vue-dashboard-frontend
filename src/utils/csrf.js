import axios from 'axios';

let csrfReady = false;
let csrfPromise = null;

export const ensureCsrfCookie = async () => {
  // Skip if already loaded
  if (csrfReady) return;

  // Only fetch once
  if (!csrfPromise) {
    csrfPromise = axios.get('/sanctum/csrf-cookie').then(() => {
      csrfReady = true;
    });
  }

  return csrfPromise;
};
