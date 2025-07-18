import { useToast } from 'vue-toastification';

let toastInstance;

export const initToast = () => {
  toastInstance = useToast();
};

/**
 * Show a toast message globally using vue-toastification.
 *
 * @param {string} message - The text message to display in the toast.
 * @param {'success' | 'error' | 'info' | 'warning'} [type='info'] - Optional toast type.
 *    - 'success': green success message
 *    - 'error': red error message
 *    - 'info': blue neutral message (default)
 *    - 'warning': yellow warning message
 * @param {number} [timeout=3000] - Optional timeout in milliseconds.
 */
export const showToast = (type = 'info', message, timeout = 3000) => {
  if (toastInstance) toastInstance[type](message, { timeout });
};
