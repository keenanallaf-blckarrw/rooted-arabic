"""
Generates real Levantine-dialect neural TTS audio for every playable
string in Rooted Arabic, using Microsoft Edge's neural voices via
edge-tts. Run: python3 tools/generate_audio.py
"""
import asyncio
import os
import sys

import edge_tts

sys.path.insert(0, os.path.dirname(__file__))
from content import build_manifest

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "audio")
CONCURRENCY = 8


async def gen_one(sem, audio_id, text, voice, rate):
    path = os.path.join(OUT_DIR, f"{audio_id}.mp3")
    async with sem:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, voice, rate=rate)
                await communicate.save(path)
                size = os.path.getsize(path)
                if size < 500:
                    raise RuntimeError(f"suspiciously small output ({size} bytes)")
                print(f"  ok   {audio_id:28s} {size:>7,} bytes  [{voice}]")
                return
            except Exception as e:
                print(f"  retry({attempt}) {audio_id}: {e}")
                await asyncio.sleep(1.5)
        print(f"  FAIL {audio_id}: giving up")


async def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = build_manifest()
    print(f"Generating {len(manifest)} audio clips into {OUT_DIR}/ ...")
    sem = asyncio.Semaphore(CONCURRENCY)
    await asyncio.gather(*[gen_one(sem, *item) for item in manifest])
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
