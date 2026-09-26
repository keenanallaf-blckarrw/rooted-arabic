import { useCallback, useEffect, useState } from 'react';
import { Header, BottomNav } from './components/Header.jsx';
import { useToast } from './components/Toast.jsx';
import { useProgress } from './hooks/useProgress.js';
import { buildSession, gradeCard } from './lib/srs.js';
import { loadClips, setAudioNotifier } from './lib/audio.js';
import { todayStr } from './lib/utils.js';
import { Dashboard } from './screens/Dashboard.jsx';
import { Script, LetterDetail, LetterQuiz } from './screens/Script.jsx';
import { Roots, RootDetail } from './screens/Roots.jsx';
import { Reading, PassageView } from './screens/Reading.jsx';
import { Speaking, DEFAULT_SPEAK_TARGET } from './screens/Speaking.jsx';
import { Review } from './screens/Review.jsx';
import { Onboarding } from './screens/Onboarding.jsx';

export default function App() {
  const toast = useToast();
  const [progress, update] = useProgress();
  const [tab, setTab] = useState('dashboard');
  // Which pop-up sheet is open, e.g. { type: 'letter', id: 'ba' }. null means none.
  const [modal, setModal] = useState(null);
  const [speakTarget, setSpeakTarget] = useState(DEFAULT_SPEAK_TARGET);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setAudioNotifier(toast);
    loadClips().catch(() => toast('Audio clips failed to load — check your connection and reload.'));
  }, [toast]);

  const closeModal = useCallback(() => setModal(null), []);

  const startReview = () => {
    const ids = buildSession(progress);
    if (!ids.length) toast('Nothing due right now — nice work.');
    else setModal({ type: 'review', ids });
  };

  const openPassage = (id) => {
    if (!progress.passagesRead.includes(id)) update((d) => void d.passagesRead.push(id));
    setModal({ type: 'passage', id });
  };

  const choosePath = (track) =>
    update((d) => {
      d.track = track;
      d.onboarded = true;
      d.startDate ||= todayStr();
    });

  if (!progress) return null; // still loading saved progress

  return (
    <>
      <div className="shell">
        <Header tab={tab} onTab={setTab} streak={progress.streak} xp={progress.xp} />
        <main>
          {tab === 'dashboard' && <Dashboard progress={progress} onStartReview={startReview} onTab={setTab} />}
          {tab === 'script' && <Script onOpenLetter={(id) => setModal({ type: 'letter', id })} onOpenQuiz={() => setModal({ type: 'quiz' })} />}
          {tab === 'roots' && <Roots onOpenRoot={(id) => setModal({ type: 'root', id })} />}
          {tab === 'reading' && <Reading onOpenPassage={openPassage} />}
          {tab === 'speak' && (
            <Speaking target={speakTarget} onTarget={setSpeakTarget} chat={{ messages: chatMessages, setMessages: setChatMessages }} />
          )}
        </main>
      </div>
      <BottomNav tab={tab} onTab={setTab} />

      {modal?.type === 'letter' && <LetterDetail letterId={modal.id} onClose={closeModal} />}
      {modal?.type === 'quiz' && <LetterQuiz onClose={closeModal} />}
      {modal?.type === 'root' && <RootDetail rootId={modal.id} progress={progress} onClose={closeModal} />}
      {modal?.type === 'passage' && <PassageView passageId={modal.id} onClose={closeModal} />}
      {modal?.type === 'review' && (
        <Review cardIds={modal.ids} onGrade={(id, grade) => update((d) => gradeCard(d, id, grade))} onClose={closeModal} />
      )}
      {!progress.onboarded && <Onboarding onChoose={choosePath} />}
    </>
  );
}
