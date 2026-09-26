import { useCallback, useEffect, useRef, useState } from 'react';
import { initPlatform, loadSavedProgress, saveProgress } from '../lib/platform.js';
import { defaultProgress } from '../lib/srs.js';
import { todayStr } from '../lib/utils.js';

// Loads the learner's progress once, then saves it (debounced) whenever it changes.
// `update(draft => { ... })` hands you a copy to mutate, so progress logic can stay simple.
export function useProgress() {
  const [progress, setProgress] = useState(null);
  const dirty = useRef(false); // true once the learner has changed something worth saving

  useEffect(() => {
    (async () => {
      await initPlatform();
      const loaded = { ...defaultProgress(), ...((await loadSavedProgress()) || {}) };
      loaded.cards ||= {};
      loaded.history ||= [];
      loaded.passagesRead ||= [];
      if (loaded.onboarded && !loaded.startDate) loaded.startDate = todayStr();
      setProgress(loaded);
    })();
  }, []);

  const update = useCallback((mutate) => {
    dirty.current = true;
    setProgress((prev) => {
      const draft = structuredClone(prev);
      mutate(draft);
      return draft;
    });
  }, []);

  useEffect(() => {
    if (!dirty.current) return;
    const timer = setTimeout(() => saveProgress(progress), 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return [progress, update];
}
