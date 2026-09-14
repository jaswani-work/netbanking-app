import { useSyncExternalStore } from 'react';

// Shared store for live transaction alerts, separate from auth state.
let notifications = [];
const listeners = new Set();

export function getNotifications() {
  return notifications;
}

export function pushNotification(message, amount = 0) {
  notifications = [...notifications, { id: Date.now(), message, amount }];
  listeners.forEach((l) => l(notifications));
}

export function clearNotifications() {
  notifications = [];
  listeners.forEach((l) => l(notifications));
}

export function subscribeNotifications(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useNotifications() {
  return useSyncExternalStore(subscribeNotifications, getNotifications);
}
