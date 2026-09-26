// Optional Claude Artifact capabilities. When the app runs as a Claude Artifact it gets account-synced
// storage (db + user) and live AI replies (sample). Everywhere else these are null and the app
// falls back to localStorage and hides the AI chat.

const LOCAL_KEY = 'rootedArabicState_v1';

let db = null;
let uid = null;
let sample = null;

export async function initPlatform() {
  try {
    if (window.claude && window.claude.use) {
      db = await window.claude.use('db');
      const user = await window.claude.use('user');
      sample = await window.claude.use('sample');
      if (db && user) uid = await user.id();
    }
  } catch {
    /* not running as an artifact */
  }
}

export function hasAiChat() {
  return Boolean(sample);
}

export function askClaude(turns) {
  return sample(turns, { modelTier: 'quick' });
}

export async function loadSavedProgress() {
  if (db && uid) {
    try {
      const snap = await db.doc('data/users/' + uid + '/state').get();
      if (snap.exists) return snap.data();
    } catch {
      /* fall through to local copy */
    }
  }
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* storage unavailable */
  }
  return null;
}

export async function saveProgress(progress) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(progress));
  } catch {
    /* storage unavailable */
  }
  if (db && uid) {
    try {
      await db.doc('data/users/' + uid + '/state').set(progress);
    } catch {
      /* keep the local copy */
    }
  }
}
