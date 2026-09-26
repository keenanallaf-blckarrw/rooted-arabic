import { useEffect, useRef, useState } from 'react';
import { askClaude, hasAiChat } from '../lib/platform.js';
import { SectionTitle } from '../components/common.jsx';

const SYSTEM_PROMPT =
  'You are Rami, a warm and patient Levantine Arabic conversation partner texting with a heritage-speaker learner. They understand spoken Arabic well from family but are still building reading/writing and vocabulary, so keep sentences SHORT and natural, everyday Levantine dialect (Syrian/Jordanian-leaning), like texting a friend. Stay fully in character as a friend chatting casually — never lecture, never explain grammar unprompted. Every reply must follow this exact shape, one item per line, nothing else:\n' +
  'Line 1: your short Arabic reply (1 sentence, max 2)\n' +
  'Line 2: starts with "EN: " then a plain English translation of your reply\n' +
  'Line 3 (ONLY if their previous message had a real mistake worth a gentle nudge): starts with "TIP: " then a very short, encouraging correction — one sentence, no grammar jargon.\n' +
  'If the learner writes in English, gently keep replying in Arabic anyway to keep them immersed. If they seem stuck, ask an easy, concrete follow-up question about daily life (family, food, home, work, weather) using only common words.';

function buildTurns(messages) {
  return [{ role: 'user', content: SYSTEM_PROMPT }, { role: 'assistant', content: 'يلا، جاهز نحكي!' }, ...messages];
}

// Replies arrive as "Arabic line / EN: translation / TIP: optional correction".
function parseReply(text) {
  let ar = '';
  let en = '';
  let tip = '';
  for (const line of (text || '').split('\n').map((s) => s.trim()).filter(Boolean)) {
    if (line.startsWith('EN:')) en = line.slice(3).trim();
    else if (line.startsWith('TIP:')) tip = line.slice(4).trim();
    else if (!ar) ar = line;
  }
  return { ar: ar || text, en, tip };
}

// `messages`/`setMessages` live in App so the conversation survives switching tabs.
export function ConversationPartner({ messages, setMessages }) {
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  if (!hasAiChat()) {
    return (
      <div className="card">
        <SectionTitle title="Conversation partner (AI)" small={16} />
        <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
          This feature talks to Claude live and only runs inside the Claude app/artifact — it's not available in this standalone copy of the page.
        </p>
      </div>
    );
  }

  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    const withUser = [...messages, { role: 'user', content: text }];
    setMessages(withUser);
    setDraft('');
    setBusy(true);
    let reply;
    try {
      reply = (await askClaude(buildTurns(withUser))).text;
    } catch {
      reply = "EN: Sorry, I couldn't respond just now — try again?";
    }
    setMessages([...withUser, { role: 'assistant', content: reply }]);
    setBusy(false);
  };

  return (
    <div className="card">
      <SectionTitle title="Conversation partner (AI)" small={16} />
      <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
        Text back and forth in Arabic (or English) with a live AI partner. Short and casual — like texting a friend.
      </p>
      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && (
          <p className="muted" style={{ fontSize: 13 }}>
            Say hi to get started — try "مرحبا" or "hi".
          </p>
        )}
        {messages.map((m, i) => (m.role === 'user' ? <div key={i} className="chat-bubble user">{m.content}</div> : <AssistantBubble key={i} text={m.content} />))}
        {busy && (
          <div className="chat-bubble assistant">
            <span className="typing-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          placeholder="اكتب هون… (type here)"
          value={draft}
          disabled={busy}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="btn gold" onClick={send} disabled={busy}>
          Send
        </button>
      </div>
    </div>
  );
}

function AssistantBubble({ text }) {
  const { ar, en, tip } = parseReply(text);
  return (
    <div className="chat-bubble assistant">
      <span className="ar">{ar}</span>
      {en && <span className="en">{en}</span>}
      {tip && <span className="tip">💡 {tip}</span>}
    </div>
  );
}
