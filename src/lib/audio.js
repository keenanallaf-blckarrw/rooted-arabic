// Plays the pre-recorded Levantine clips; falls back to the browser's text-to-speech when a clip is missing.

let clips = null;
let currentAudio = null;
let notify = () => {};

export function setAudioNotifier(fn) {
  notify = fn;
}

// The clips are ~2.5 MB, so they load in a separate chunk after the app is on screen.
export async function loadClips() {
  const mod = await import('../audio/audioData.js');
  clips = mod.default;
  return clips;
}

function arabicVoice() {
  try {
    return (speechSynthesis.getVoices() || []).find((v) => /^ar/i.test(v.lang)) || null;
  } catch {
    return null;
  }
}

function makeUtterance(text, rate) {
  const voice = arabicVoice();
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = voice ? voice.lang : 'ar-SA';
  u.rate = rate || 0.82;
  u.onerror = (ev) => {
    if (ev.error !== 'canceled' && ev.error !== 'interrupted') notify("Audio didn't play — tap again.");
  };
  return u;
}

function speak(text, rate, times = 1) {
  try {
    if (!('speechSynthesis' in window)) {
      notify("This browser can't play audio out loud.");
      return;
    }
    speechSynthesis.resume();
    speechSynthesis.cancel();
    setTimeout(() => {
      try {
        for (let i = 0; i < times; i++) speechSynthesis.speak(makeUtterance(text, rate));
      } catch {
        /* ignore */
      }
    }, 30);
  } catch {
    /* ignore */
  }
}

export function stopAudio() {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch {
      /* ignore */
    }
    currentAudio = null;
  }
  try {
    speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

// Plays each clip in `ids` back to back, skipping any that are missing.
export function playSequence(ids) {
  stopAudio();
  let i = 0;
  const next = () => {
    if (i >= ids.length) return;
    const src = clips && clips[ids[i]];
    if (!src) {
      i++;
      next();
      return;
    }
    const a = new Audio(src);
    currentAudio = a;
    a.onended = () => {
      i++;
      next();
    };
    a.play().catch(() => {
      i++;
      next();
    });
  };
  next();
}

export function playAudio(id, fallbackText, rate) {
  stopAudio();
  const src = clips && clips[id];
  if (!src) {
    if (fallbackText) speak(fallbackText, rate);
    return;
  }
  const a = new Audio(src);
  currentAudio = a;
  a.play().catch(() => {
    if (fallbackText) speak(fallbackText, rate);
  });
}

export function playAudioRepeat(id, fallbackText, times, rate) {
  const src = clips && clips[id];
  if (!src) {
    stopAudio();
    if (fallbackText) speak(fallbackText, rate, times);
    return;
  }
  playSequence(Array(times).fill(id));
}
