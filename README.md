# Rooted Arabic

A personal Arabic learning app built on research-backed language-acquisition methods instead of gamified drilling: spaced repetition, root-and-pattern vocabulary, comprehensible-input reading, and pronunciation shadowing — with real Levantine-dialect neural voice recordings, not browser text-to-speech.

Tuned for Levantine Arabic alongside Modern Standard Arabic (MSA), with onboarding paths for heritage speakers (understand spoken Arabic, can't read the script yet), complete beginners, and learners with some formal study already.

## Try it

**[Open the app →](https://claude.ai/artifact/DUhiL4aVyKLnUSPu8ZB4Cb)** — the full version, including the live AI conversation partner, with progress synced to your account.

No Claude account, or just want to peek at the code running live? **[Open the GitHub Pages copy →](https://keenanallaf-blckarrw.github.io/rooted-arabic/)** — same app, everything except the AI chat (see below for why), progress saved locally in your browser only.

## Features

- **Script Lab** — the full alphabet with initial/medial/final connecting forms, sound guides, an ungraded tracing pad, and a "Letter Match" listening game
- **Roots** — vocabulary organized by Arabic's triliteral root system, so learning one root (e.g. ك-ت-ب, "writing") unlocks a whole family of related words
- **Reading** — short graded passages with tap-to-reveal glosses and per-line native audio
- **Speaking** — minimal-pair drills for sounds English doesn't have, with normal/slow/repeat playback for shadowing practice, plus a live AI conversation partner (Claude Artifact version only — see below)
- **Reviews** — spaced repetition (SM-2-style) across all decks, presented as multiple choice so you're never blocked on being able to read the script yet
- **A realistic roadmap** — a phased path to holding basic conversations, paced to your starting point

## Audio pipeline

Every word, letter, phrase, and passage line is voiced by real Microsoft neural TTS voices in Syrian/Jordanian Arabic (`ar-SY-LaithNeural` / `ar-SY-AmanyNeural`), pre-generated and bundled as base64 audio — not the browser's spotty built-in speech synthesis, which is what the app fell back to before this existed.

To regenerate the audio (e.g. after editing content in `tools/content.py`):

```
pip install -r tools/requirements.txt
python3 tools/generate_audio.py      # generates audio/*.mp3 via edge-tts
python3 tools/build_audio_data.py    # bundles them into src/audio/audioData.js
```

`tools/content.py` is the single source of truth for what gets voiced — if you add vocabulary to `src/data/content.js`, add it there too and regenerate.

## The AI conversation partner

The Speaking tab includes a live chat with an AI Levantine conversation partner, powered by calling Claude directly from the page (the `sample` capability of the Claude Artifacts platform). This only works when the page is opened as a Claude Artifact — it requires the Claude platform to function, so it's intentionally the one feature this standalone GitHub Pages copy can't replicate.

## Running it

You need [Node.js](https://nodejs.org) 20.19 or newer.

```
npm install        # first time only
npm run dev        # start a local dev server with live reload
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run deploy     # build and publish to GitHub Pages
```

`npm run deploy` builds the app and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves.

Progress is saved to your browser's local storage. (The Claude Artifact version additionally syncs progress to your account across devices.)

## Project layout

```
src/
  main.jsx              entry point
  App.jsx               tabs, pop-up sheets, and app-wide state
  screens/              one component per tab or sheet (Dashboard, Script, Roots, Reading, Speaking, Review, ...)
  components/           shared UI pieces (header, sheet, toast, buttons)
  hooks/useProgress.js  loads and saves learner progress
  lib/                  spaced repetition, roadmap, audio playback, Claude platform access
  data/                 all learning content and the flashcard registry
  audio/audioData.js    generated audio clips (see Audio pipeline)
  styles.css
tools/                  Python audio generation pipeline
```

## Stack

React 19 + Vite. Arabic typography via Amiri, Noto Naskh Arabic, and Noto Sans Arabic (Google Fonts). Audio generation pipeline in Python (`edge-tts`). Live conversation practice via the Claude Artifacts `sample` capability.
