"""
Single source of truth for Rooted Arabic's content, and for the audio
manifest fed to generate_audio.py. Mirrors the JS data in the app —
if you change one, change the other.
"""

LETTERS = [
 {"id":"alif","example":{"ar":"كِتَاب"}},
 {"id":"ba","example":{"ar":"بَيْت"}},
 {"id":"ta","example":{"ar":"تُفَّاح"}},
 {"id":"tha","example":{"ar":"ثَعْلَب"}},
 {"id":"jim","example":{"ar":"جَمَل"}},
 {"id":"haa","example":{"ar":"حَلِيب"}},
 {"id":"khaa","example":{"ar":"خُبْز"}},
 {"id":"dal","example":{"ar":"دَار"}},
 {"id":"dhal","example":{"ar":"ذَهَب"}},
 {"id":"ra","example":{"ar":"رُزّ"}},
 {"id":"zay","example":{"ar":"زَيْت"}},
 {"id":"sin","example":{"ar":"سَمَك"}},
 {"id":"shin","example":{"ar":"شَمْس"}},
 {"id":"saad","example":{"ar":"صَبَاح"}},
 {"id":"daad","example":{"ar":"ضَوْء"}},
 {"id":"taa2","example":{"ar":"طَاوِلَة"}},
 {"id":"zaa2","example":{"ar":"ظُهْر"}},
 {"id":"ain","example":{"ar":"عَيْن"}},
 {"id":"ghain","example":{"ar":"غُرْفَة"}},
 {"id":"fa","example":{"ar":"فِيل"}},
 {"id":"qaf","example":{"ar":"قَلْب"}},
 {"id":"kaf","example":{"ar":"كِتَاب"}},
 {"id":"lam","example":{"ar":"لَيْمُون"}},
 {"id":"mim","example":{"ar":"مَاء"}},
 {"id":"nun","example":{"ar":"نَجْمَة"}},
 {"id":"ha","example":{"ar":"هَدِيَّة"}},
 {"id":"waw","example":{"ar":"وَرْد"}},
 {"id":"ya","example":{"ar":"يَد"}},
 {"id":"hamza","example":{"ar":"سُؤَال"}},
 {"id":"taMarbuta","example":{"ar":"مَدْرَسَة"}},
 {"id":"alifMaqsura","example":{"ar":"حَكَى"}},
]

ROOTS = [
 {"id":"ktb","words":["كِتَاب","مَكْتَب","مَكْتَبَة","كَاتِب","كَتَبَ"]},
 {"id":"drs","words":["دَرْس","مَدْرَسَة","دَرَسَ","مُدَرِّس"]},
 {"id":"3lm","words":["عِلْم","مُعَلِّم","عَالِم","تَعَلَّمَ"]},
 {"id":"hbb","words":["حُبّ","حَبِيب","حَبِيبِي"]},
 {"id":"kbr","words":["كَبِير","أَكْبَر"]},
 {"id":"sghr","words":["صَغِير"]},
 {"id":"byt","words":["بَيْت","بُيُوت"]},
 {"id":"slm","words":["سَلَام","سَلَامَة","مُسْلِم","سَلِيم"]},
 {"id":"3rf","words":["عَرَفَ","بَعْرِف","مَعْرُوف"]},
 {"id":"7ky","words":["حَكَى","بَحْكِي","حَكِي"]},
 {"id":"rwh","words":["رَاح","بَرُوح","رُوح"]},
 {"id":"2kl","words":["أَكَلَ","أَكْل"]},
 {"id":"shrb","words":["شَرِبَ","مَشْرُوب"]},
 {"id":"s2l","words":["سَأَلَ","سُؤَال"]},
 {"id":"qr2","words":["قَرَأَ","قِرَاءَة"]},
]

PHRASES = [
 "مَرْحَبا","أَهْلاً","كِيفَك","كِيفِك","الْحَمْدُ لله","مْنِيح","شُو أَخْبَارَك",
 "يِعْطِيك الْعَافْيِة","تِسْلَم","صَحْتِين","سَلَامْتَك","إِن شَاء الله","مَا شَاء الله",
 "بِدِّي","شُو","وِين","لِيش","يَلّا","خَلَص",
]

# passage id -> list of (speaker or None, line text)
PASSAGES = {
 "p1": [
   ("Ahmad", "مَرْحَبا سارة! كِيفَك؟"),
   ("Sara", "أَهْلاً أَحْمَد! الْحَمْدُ لله. وِإِنْتَ، كِيفَك؟"),
   ("Ahmad", "مْنِيح، شُكْراً. وِين الْبَيْت؟"),
   ("Sara", "الْبَيْت قَرِيب مِن الْمَدْرَسَة."),
 ],
 "p2": [
   (None, "بيتي صغير بس حلو."),
   (None, "بحب بيتي كتير."),
   (None, "أنا بحب أمي وأبي."),
   (None, "العيلة كبيرة وحلوة."),
 ],
 "p3": [
   (None, "أنا بدرس عربي بالمكتبة."),
   (None, "بحب اتعلم كلمات جديدة كل يوم."),
   (None, "المعلم منيح كتير وبيساعدني."),
 ],
}

MIN_PAIRS = [
 {"a":"كَلْب","b":"قَلْب"},
 {"a":"سَار","b":"صَار"},
 {"a":"تِين","b":"طِين"},
 {"a":"سُؤَال","b":"سُعَال"},
]

THROAT_TRIO = ["حَلِيب","خُبْز","هَدِيَّة"]

# Voices (Microsoft Edge neural TTS, Levantine dialect voices)
VOICE_MALE = "ar-SY-LaithNeural"     # Syrian male — primary narrator
VOICE_FEMALE = "ar-SY-AmanyNeural"   # Syrian female — used for Sara's dialogue lines


def build_manifest():
    """Returns list of (audio_id, text, voice, rate) to synthesize."""
    items = []

    for l in LETTERS:
        items.append((f"letter-{l['id']}", l["example"]["ar"], VOICE_MALE, "-8%"))

    for r in ROOTS:
        for i, w in enumerate(r["words"]):
            items.append((f"vocab-{r['id']}-{i}", w, VOICE_MALE, "-8%"))

    for i, p in enumerate(PHRASES):
        items.append((f"phrase-{i}", p, VOICE_MALE, "-8%"))
        items.append((f"phrase-{i}-slow", p, VOICE_MALE, "-35%"))

    for pid, lines in PASSAGES.items():
        for i, (speaker, text) in enumerate(lines):
            voice = VOICE_FEMALE if speaker == "Sara" else VOICE_MALE
            items.append((f"passage-{pid}-{i}", text, voice, "-6%"))

    for i, pair in enumerate(MIN_PAIRS):
        items.append((f"pair-{i}-a", pair["a"], VOICE_MALE, "-8%"))
        items.append((f"pair-{i}-a-slow", pair["a"], VOICE_MALE, "-40%"))
        items.append((f"pair-{i}-b", pair["b"], VOICE_MALE, "-8%"))
        items.append((f"pair-{i}-b-slow", pair["b"], VOICE_MALE, "-40%"))

    for i, w in enumerate(THROAT_TRIO):
        items.append((f"trio-{i}", w, VOICE_MALE, "-8%"))
        items.append((f"trio-{i}-slow", w, VOICE_MALE, "-40%"))

    return items
