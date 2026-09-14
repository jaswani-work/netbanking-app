import { useSyncExternalStore } from 'react';
import { getAuthState, subscribe } from './authStore';

// Re-renders on any login()/logout() call from any remote.
export function useAuth() {
  return useSyncExternalStore(subscribe, getAuthState);
}
