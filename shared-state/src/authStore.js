// Federated pub/sub store for the signed-in user. Persisted to
// localStorage and synced across tabs via BroadcastChannel.

const CHANNEL = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mfe-auth') : null;
const STORAGE_KEY = 'mfe_demo_auth';

let state = { isAuthenticated: false, user: null };
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch (e) {
    console.warn('[shared-state] could not read persisted auth', e);
  }
}
load();

function persistAndNotify(broadcast = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((l) => l(state));
  if (broadcast && CHANNEL) CHANNEL.postMessage(state);
}

if (CHANNEL) {
  CHANNEL.onmessage = (evt) => {
    state = evt.data;
    listeners.forEach((l) => l(state));
  };
}

export function getAuthState() {
  return state;
}

export function login(user) {
  state = { isAuthenticated: true, user };
  persistAndNotify();
}

export function logout() {
  state = { isAuthenticated: false, user: null };
  persistAndNotify();
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
