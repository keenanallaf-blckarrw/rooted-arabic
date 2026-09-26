# Rooted Arabic

A personal Arabic learning app built on research-backed language-acquisition methods instead of gamified drilling: spaced repetition, root-and-pattern vocabulary, comprehensible-input reading, and pronunciation shadowing.

Tuned for Levantine Arabic alongside Modern Standard Arabic (MSA), with onboarding paths for heritage speakers (understand spoken Arabic, can't read the script yet), complete beginners, and learners with some formal study already.

## Features

- **Script Lab** — the full alphabet with initial/medial/final connecting forms, sound guides, an ungraded tracing pad, and a "Letter Match" listening game
- **Roots** — vocabulary organized by Arabic's triliteral root system, so learning one root (e.g. ك-ت-ب, "writing") unlocks a whole family of related words
- **Reading** — short graded passages with tap-to-reveal glosses
- **Speaking** — minimal-pair drills for sounds English doesn't have, with normal/slow/repeat playback for shadowing practice
- **Reviews** — spaced repetition (SM-2-style) across all decks, presented as multiple choice so you're never blocked on being able to read the script yet
- **A realistic roadmap** — a phased path to holding basic conversations, paced to your starting point

## Running it

This is a single self-contained `index.html` — no build step, no dependencies to install. Open it directly in a browser, or serve the folder with any static file server. It's also set up for GitHub Pages (see the repo's **Settings → Pages**).

Progress is saved to your browser's local storage. (A version of this app published as a Claude Artifact can additionally sync progress to your account across devices — this standalone copy does not have that.)

## Stack

Vanilla HTML/CSS/JS. No frameworks, no build tooling. Arabic typography via Amiri, Noto Naskh Arabic, and Noto Sans Arabic (Google Fonts); audio via the browser's built-in Web Speech API.
