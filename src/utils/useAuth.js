import { inject } from 'vue';

/**
 * Access the global auth store provided in main.js.
 * Must be used within components or files loaded after app starts.
 */
export const useAuth = () => inject('auth');
