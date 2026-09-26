# Rooted Arabic

A personal Arabic learning app built on research-backed language-acquisition methods instead of gamified drilling: spaced repetition, root-and-pattern vocabulary, comprehensible-input reading, and pronunciation shadowing — with real Levantine-dialect neural voice recordings, not browser text-to-speech.

Tuned for Levantine Arabic alongside Modern Standard Arabic (MSA), with onboarding paths for heritage speakers (understand spoken Arabic, can't read the script yet), complete beginners, and learners with some formal study already.

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
python3 tools/build_audio_data.py    # bundles them into assets/audio-data.js
```

`tools/content.py` is the single source of truth for what gets voiced — if you add vocabulary to the app's JS data, add it there too and regenerate.

## The AI conversation partner

The Speaking tab includes a live chat with an AI Levantine conversation partner, powered by calling Claude directly from the page (the `sample` capability of the Claude Artifacts platform). This only works when the page is opened as a Claude Artifact — it requires the Claude platform to function, so it's intentionally the one feature this standalone GitHub Pages copy can't replicate.

## Running it

`index.html` is self-contained — no build step needed to run it. Open it directly in a browser, or serve the folder with any static file server. It's also set up for GitHub Pages (see the repo's **Settings → Pages**).

Progress is saved to your browser's local storage. (The Claude Artifact version additionally syncs progress to your account across devices.)

## Stack

Vanilla HTML/CSS/JS, no frameworks. Arabic typography via Amiri, Noto Naskh Arabic, and Noto Sans Arabic (Google Fonts). Audio generation pipeline in Python (`edge-tts`). Live conversation practice via the Claude Artifacts `sample` capability.
