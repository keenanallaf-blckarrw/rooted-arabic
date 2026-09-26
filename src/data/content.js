// All learning content. tools/content.py mirrors the Arabic strings here for audio generation —
// if you add or change an item, update it there too and regenerate the audio.

export const LETTERS = [
 {id:'alif',name:'Alif',letter:'ا',initial:'ا',medial:'ا',final:'ـا',connects:false,translit:'ā / a',sound:'A long "aa" sound, like in "father". Also the seat for short vowels at the start of a word.',example:{ar:'كِتَاب',translit:'kitāb',meaning:'book'}},
 {id:'ba',name:'Bāʼ',letter:'ب',initial:'بـ',medial:'ـبـ',final:'ـب',connects:true,translit:'b',sound:'Like the "b" in "book".',example:{ar:'بَيْت',translit:'bayt',meaning:'house'}},
 {id:'ta',name:'Tāʼ',letter:'ت',initial:'تـ',medial:'ـتـ',final:'ـت',connects:true,translit:'t',sound:'Like the "t" in "top".',example:{ar:'تُفَّاح',translit:'tuffāḥ',meaning:'apple'}},
 {id:'tha',name:'Thāʼ',letter:'ث',initial:'ثـ',medial:'ـثـ',final:'ـث',connects:true,translit:'th',sound:'Like "th" in "think" — not "the".',example:{ar:'ثَعْلَب',translit:'thaʿlab',meaning:'fox'}},
 {id:'jim',name:'Jīm',letter:'ج',initial:'جـ',medial:'ـجـ',final:'ـج',connects:true,translit:'j',sound:'Like "j" in "jam" (in Egyptian speech, closer to a hard "g").',example:{ar:'جَمَل',translit:'jamal',meaning:'camel'}},
 {id:'haa',name:'Ḥāʼ',letter:'ح',initial:'حـ',medial:'ـحـ',final:'ـح',connects:true,translit:'ḥ',sound:'A breathy "h" pushed from deep in the throat — stronger than English "h" and different from ه.',example:{ar:'حَلِيب',translit:'ḥalīb',meaning:'milk'}},
 {id:'khaa',name:'Khāʼ',letter:'خ',initial:'خـ',medial:'ـخـ',final:'ـخ',connects:true,translit:'kh',sound:'Like the "ch" in Scottish "loch" or German "Bach".',example:{ar:'خُبْز',translit:'khubz',meaning:'bread'}},
 {id:'dal',name:'Dāl',letter:'د',initial:'د',medial:'د',final:'ـد',connects:false,translit:'d',sound:'Like "d" in "door".',example:{ar:'دَار',translit:'dār',meaning:'house / home'}},
 {id:'dhal',name:'Dhāl',letter:'ذ',initial:'ذ',medial:'ذ',final:'ـذ',connects:false,translit:'dh',sound:'Like "th" in "this" — not "think".',example:{ar:'ذَهَب',translit:'dhahab',meaning:'gold'}},
 {id:'ra',name:'Rāʼ',letter:'ر',initial:'ر',medial:'ر',final:'ـر',connects:false,translit:'r',sound:'A rolled or tapped "r", like Spanish "r".',example:{ar:'رُزّ',translit:'ruzz',meaning:'rice'}},
 {id:'zay',name:'Zāy',letter:'ز',initial:'ز',medial:'ز',final:'ـز',connects:false,translit:'z',sound:'Like "z" in "zoo".',example:{ar:'زَيْت',translit:'zayt',meaning:'oil'}},
 {id:'sin',name:'Sīn',letter:'س',initial:'سـ',medial:'ـسـ',final:'ـس',connects:true,translit:'s',sound:'Like "s" in "sun".',example:{ar:'سَمَك',translit:'samak',meaning:'fish'}},
 {id:'shin',name:'Shīn',letter:'ش',initial:'شـ',medial:'ـشـ',final:'ـش',connects:true,translit:'sh',sound:'Like "sh" in "shoe".',example:{ar:'شَمْس',translit:'shams',meaning:'sun'}},
 {id:'saad',name:'Ṣād',letter:'ص',initial:'صـ',medial:'ـصـ',final:'ـص',connects:true,translit:'ṣ',sound:'An "emphatic" s — say it with the back of the tongue pulled back and down. Deeper than س.',example:{ar:'صَبَاح',translit:'ṣabāḥ',meaning:'morning'}},
 {id:'daad',name:'Ḍād',letter:'ض',initial:'ضـ',medial:'ـضـ',final:'ـض',connects:true,translit:'ḍ',sound:'An "emphatic" d — like د but deeper, tongue pulled back.',example:{ar:'ضَوْء',translit:'ḍawʾ',meaning:'light'}},
 {id:'taa2',name:'Ṭāʼ',letter:'ط',initial:'طـ',medial:'ـطـ',final:'ـط',connects:true,translit:'ṭ',sound:'An "emphatic" t — deeper and more forceful than ت.',example:{ar:'طَاوِلَة',translit:'ṭāwila',meaning:'table'}},
 {id:'zaa2',name:'Ẓāʼ',letter:'ظ',initial:'ظـ',medial:'ـظـ',final:'ـظ',connects:true,translit:'ẓ',sound:'An emphatic version of ذ — deep and forceful.',example:{ar:'ظُهْر',translit:'ẓuhr',meaning:'noon'}},
 {id:'ain',name:'ʿAyn',letter:'ع',initial:'عـ',medial:'ـعـ',final:'ـع',connects:true,translit:'ʿ',sound:'A tight, voiced throat sound with no English equivalent — like the start of a swallow. Extremely common; worth practicing alone.',example:{ar:'عَيْن',translit:'ʿayn',meaning:'eye'}},
 {id:'ghain',name:'Ghayn',letter:'غ',initial:'غـ',medial:'ـغـ',final:'ـغ',connects:true,translit:'gh',sound:'A gargled sound, close to the French "r" in "rouge".',example:{ar:'غُرْفَة',translit:'ghurfa',meaning:'room'}},
 {id:'fa',name:'Fāʼ',letter:'ف',initial:'فـ',medial:'ـفـ',final:'ـف',connects:true,translit:'f',sound:'Like "f" in "fun".',example:{ar:'فِيل',translit:'fīl',meaning:'elephant'}},
 {id:'qaf',name:'Qāf',letter:'ق',initial:'قـ',medial:'ـقـ',final:'ـق',connects:true,translit:'q',sound:'A "k" made further back, deep in the throat. In everyday Levantine speech it is often dropped to a glottal stop — the catch in "uh-oh".',example:{ar:'قَلْب',translit:'qalb',meaning:'heart'}},
 {id:'kaf',name:'Kāf',letter:'ك',initial:'كـ',medial:'ـكـ',final:'ـك',connects:true,translit:'k',sound:'Like "k" in "kite".',example:{ar:'كِتَاب',translit:'kitāb',meaning:'book'}},
 {id:'lam',name:'Lām',letter:'ل',initial:'لـ',medial:'ـلـ',final:'ـل',connects:true,translit:'l',sound:'Like "l" in "lamp".',example:{ar:'لَيْمُون',translit:'laymūn',meaning:'lemon'}},
 {id:'mim',name:'Mīm',letter:'م',initial:'مـ',medial:'ـمـ',final:'ـم',connects:true,translit:'m',sound:'Like "m" in "moon".',example:{ar:'مَاء',translit:'māʾ',meaning:'water'}},
 {id:'nun',name:'Nūn',letter:'ن',initial:'نـ',medial:'ـنـ',final:'ـن',connects:true,translit:'n',sound:'Like "n" in "night".',example:{ar:'نَجْمَة',translit:'najma',meaning:'star'}},
 {id:'ha',name:'Hāʼ',letter:'ه',initial:'هـ',medial:'ـهـ',final:'ـه',connects:true,translit:'h',sound:'Like "h" in "house" — softer and further forward than ح.',example:{ar:'هَدِيَّة',translit:'hadiyya',meaning:'gift'}},
 {id:'waw',name:'Wāw',letter:'و',initial:'و',medial:'و',final:'ـو',connects:false,translit:'w / ū',sound:'Either a consonant "w" (like "win") or a long "oo" vowel, depending on context.',example:{ar:'وَرْد',translit:'ward',meaning:'flowers / roses'}},
 {id:'ya',name:'Yāʼ',letter:'ي',initial:'يـ',medial:'ـيـ',final:'ـي',connects:true,translit:'y / ī',sound:'Either a consonant "y" (like "yes") or a long "ee" vowel, depending on context.',example:{ar:'يَد',translit:'yad',meaning:'hand'}},
 {id:'hamza',name:'Hamza',letter:'ء',initial:'ء',medial:'ء',final:'ء',connects:false,translit:'ʾ',sound:'A glottal stop — the little catch in your throat in "uh-oh". It can sit alone or ride on ا, و or ي.',example:{ar:'سُؤَال',translit:'suʾāl',meaning:'question'}},
 {id:'taMarbuta',name:'Tāʼ Marbūṭa',letter:'ة',initial:'ة',medial:'ة',final:'ـة',connects:false,translit:'a / at',sound:'Marks a feminine word. Silent "a" at the end of a sentence, but sounds like "-at" when followed directly by another word.',example:{ar:'مَدْرَسَة',translit:'madrasa',meaning:'school'}},
 {id:'alifMaqsura',name:'Alif Maqṣūra',letter:'ى',initial:'ى',medial:'ى',final:'ـى',connects:false,translit:'ā',sound:'Looks like a dotless ي. Always at the end of a word; sounds like a long "aa".',example:{ar:'حَكَى',translit:'ḥaka',meaning:'he talked (Levantine)'}},
];
export const CHAR_TO_LETTER = {'ا':'alif','أ':'alif','إ':'alif','آ':'alif','ب':'ba','ت':'ta','ث':'tha','ج':'jim','ح':'haa','خ':'khaa','د':'dal','ذ':'dhal','ر':'ra','ز':'zay','س':'sin','ش':'shin','ص':'saad','ض':'daad','ط':'taa2','ظ':'zaa2','ع':'ain','غ':'ghain','ف':'fa','ق':'qaf','ك':'kaf','ل':'lam','م':'mim','ن':'nun','ه':'ha','و':'waw','ي':'ya','ء':'hamza','ؤ':'hamza','ئ':'hamza','ة':'taMarbuta','ى':'alifMaqsura'};

export const DIACRITICS = [
 {mark:'َ',name:'Fatha',effect:'short "a"',demo:'بَ',demoTr:'ba'},
 {mark:'ُ',name:'Damma',effect:'short "u"',demo:'بُ',demoTr:'bu'},
 {mark:'ِ',name:'Kasra',effect:'short "i"',demo:'بِ',demoTr:'bi'},
 {mark:'ْ',name:'Sukun',effect:'no vowel at all',demo:'بْ',demoTr:'b'},
 {mark:'ّ',name:'Shadda',effect:'doubles the consonant',demo:'بَّ',demoTr:'bba'},
 {mark:'ً',name:'Tanwīn (fatḥatān)',effect:'adds an "-an" ending',demo:'بًا',demoTr:'ban'},
];

export const ROOTS = [
 {id:'ktb',letters:['ك','ت','ب'],meaning:'writing',words:[
   {ar:'كِتَاب',translit:'kitāb',meaning:'book',note:'MSA & Levantine'},
   {ar:'مَكْتَب',translit:'maktab',meaning:'desk / office'},
   {ar:'مَكْتَبَة',translit:'maktaba',meaning:'library / bookshop'},
   {ar:'كَاتِب',translit:'kātib',meaning:'writer'},
   {ar:'كَتَبَ',translit:'kataba',meaning:'he wrote'},
 ]},
 {id:'drs',letters:['د','ر','س'],meaning:'studying',words:[
   {ar:'دَرْس',translit:'dars',meaning:'lesson'},
   {ar:'مَدْرَسَة',translit:'madrasa',meaning:'school'},
   {ar:'دَرَسَ',translit:'darasa',meaning:'he studied'},
   {ar:'مُدَرِّس',translit:'mudarris',meaning:'teacher (male)'},
 ]},
 {id:'3lm',letters:['ع','ل','م'],meaning:'knowledge',words:[
   {ar:'عِلْم',translit:'ʿilm',meaning:'knowledge / science'},
   {ar:'مُعَلِّم',translit:'muʿallim',meaning:'teacher'},
   {ar:'عَالِم',translit:'ʿālim',meaning:'scholar'},
   {ar:'تَعَلَّمَ',translit:'taʿallama',meaning:'he learned'},
 ]},
 {id:'hbb',letters:['ح','ب','ب'],meaning:'love',words:[
   {ar:'حُبّ',translit:'ḥubb',meaning:'love'},
   {ar:'حَبِيب',translit:'ḥabīb',meaning:'beloved / darling'},
   {ar:'حَبِيبِي',translit:'ḥabībi',meaning:'"my love" — said constantly as an endearment'},
 ]},
 {id:'kbr',letters:['ك','ب','ر'],meaning:'bigness',words:[
   {ar:'كَبِير',translit:'kabīr',meaning:'big / old (in age)'},
   {ar:'أَكْبَر',translit:'akbar',meaning:'bigger / greatest — as in "Allāhu akbar"'},
 ]},
 {id:'sghr',letters:['ص','غ','ر'],meaning:'smallness',words:[
   {ar:'صَغِير',translit:'ṣaghīr',meaning:'small / young'},
 ]},
 {id:'byt',letters:['ب','ي','ت'],meaning:'house / dwelling',words:[
   {ar:'بَيْت',translit:'bayt',meaning:'house / home'},
   {ar:'بُيُوت',translit:'buyūt',meaning:'houses (plural)'},
 ]},
 {id:'slm',letters:['س','ل','م'],meaning:'peace / safety',words:[
   {ar:'سَلَام',translit:'salām',meaning:'peace — "as-salāmu ʿalaykum"'},
   {ar:'سَلَامَة',translit:'salāma',meaning:'safety / wellness'},
   {ar:'مُسْلِم',translit:'muslim',meaning:'Muslim'},
   {ar:'سَلِيم',translit:'salīm',meaning:'sound / safe / healthy'},
 ]},
 {id:'3rf',letters:['ع','ر','ف'],meaning:'knowing',words:[
   {ar:'عَرَفَ',translit:'ʿarafa',meaning:'he knew (MSA)'},
   {ar:'بَعْرِف',translit:'baʿrif',meaning:'I know (Levantine, everyday)'},
   {ar:'مَعْرُوف',translit:'maʿrūf',meaning:'known — also "a favor, a kind deed"'},
 ]},
 {id:'7ky',letters:['ح','ك','ي'],meaning:'talking (Levantine)',words:[
   {ar:'حَكَى',translit:'ḥaka',meaning:'he talked / spoke (Levantine)'},
   {ar:'بَحْكِي',translit:'baḥki',meaning:'I talk / speak (Levantine, everyday)'},
   {ar:'حَكِي',translit:'ḥaki',meaning:'talk, speech'},
 ]},
 {id:'rwh',letters:['ر','و','ح'],meaning:'going / spirit',words:[
   {ar:'رَاح',translit:'rāḥ',meaning:'he went (Levantine)'},
   {ar:'بَرُوح',translit:'barūḥ',meaning:'I go (Levantine, everyday)'},
   {ar:'رُوح',translit:'rūḥ',meaning:'soul / spirit — "yā rūḥi"'},
 ]},
 {id:'2kl',letters:['أ','ك','ل'],meaning:'eating',words:[
   {ar:'أَكَلَ',translit:'akala',meaning:'he ate'},
   {ar:'أَكْل',translit:'akl',meaning:'food'},
 ]},
 {id:'shrb',letters:['ش','ر','ب'],meaning:'drinking',words:[
   {ar:'شَرِبَ',translit:'shariba',meaning:'he drank'},
   {ar:'مَشْرُوب',translit:'mashrūb',meaning:'a drink, a beverage'},
 ]},
 {id:'s2l',letters:['س','أ','ل'],meaning:'asking',words:[
   {ar:'سَأَلَ',translit:'saʾala',meaning:'he asked'},
   {ar:'سُؤَال',translit:'suʾāl',meaning:'question'},
 ]},
 {id:'qr2',letters:['ق','ر','أ'],meaning:'reading',words:[
   {ar:'قَرَأَ',translit:'qaraʾa',meaning:'he read'},
   {ar:'قِرَاءَة',translit:'qirāʾa',meaning:'reading'},
 ]},
];

export const PHRASES = [
 {ar:'مَرْحَبا',translit:'marḥaba',meaning:'hello',note:'Works anywhere, any time of day.'},
 {ar:'أَهْلاً',translit:'ahlan',meaning:'hi / welcome',note:'Casual greeting — "ahlan wa sahlan" is the fuller version.'},
 {ar:'كِيفَك',translit:'kīfak',meaning:'how are you (to a man)',note:''},
 {ar:'كِيفِك',translit:'kīfik',meaning:'how are you (to a woman)',note:''},
 {ar:'الْحَمْدُ لله',translit:'al-ḥamdu lillāh',meaning:'thank God / I\'m good',note:'The default answer to "how are you."'},
 {ar:'مْنِيح',translit:'mniḥ',meaning:'good, fine',note:'Very common Levantine word for "good."'},
 {ar:'شُو أَخْبَارَك',translit:'shu akhbārak',meaning:'what\'s your news / what\'s up',note:''},
 {ar:'يِعْطِيك الْعَافْيِة',translit:'yaʿṭīk il-ʿāfye',meaning:'"God give you strength" — said to someone working',note:'A small kindness people say constantly.'},
 {ar:'تِسْلَم',translit:'tislam',meaning:'thank you / "may your hands be safe"',note:'Said to a man; tislamī to a woman.'},
 {ar:'صَحْتِين',translit:'ṣaḥtēn',meaning:'"two healths" — said after a meal',note:''},
 {ar:'سَلَامْتَك',translit:'salāmtak',meaning:'get well soon / to your safety',note:''},
 {ar:'إِن شَاء الله',translit:'in shā\' allāh',meaning:'God willing',note:''},
 {ar:'مَا شَاء الله',translit:'mā shā\' allāh',meaning:'"as God willed" — an expression of praise or awe',note:''},
 {ar:'بِدِّي',translit:'biddi',meaning:'I want',note:'Levantine — MSA uses "urīd."'},
 {ar:'شُو',translit:'shu',meaning:'what',note:'Levantine — MSA uses "mādhā."'},
 {ar:'وِين',translit:'wēn',meaning:'where',note:'Levantine — MSA uses "ayna."'},
 {ar:'لِيش',translit:'lēsh',meaning:'why',note:'Levantine — MSA uses "limādhā."'},
 {ar:'يَلّا',translit:'yalla',meaning:'let\'s go / come on / hurry',note:''},
 {ar:'خَلَص',translit:'khalaṣ',meaning:'done / finished / that\'s it',note:''},
];

export const PASSAGES = [
 {id:'p1',title:'Marḥaba — a greeting',level:'With vowel marks, to help you sound it out',
  lines:[
   {speaker:'Aḥmad',toks:[{ar:'مَرْحَبا',gl:'hello'},{ar:'سارة!',gl:'Sara (name)'},{ar:'كِيفَك؟',gl:'how are you'}]},
   {speaker:'Sara',toks:[{ar:'أَهْلاً',gl:'hi / welcome'},{ar:'أَحْمَد!',gl:'Ahmad (name)'},{ar:'الْحَمْدُ لله.',gl:'thank God / good'},{ar:'وِإِنْتَ،',gl:'and you'},{ar:'كِيفَك؟',gl:'how are you'}]},
   {speaker:'Aḥmad',toks:[{ar:'مْنِيح،',gl:'good'},{ar:'شُكْراً.',gl:'thank you'},{ar:'وِين',gl:'where'},{ar:'الْبَيْت؟',gl:'the house'}]},
   {speaker:'Sara',toks:[{ar:'الْبَيْت',gl:'the house'},{ar:'قَرِيب',gl:'near'},{ar:'مِن',gl:'from'},{ar:'الْمَدْرَسَة.',gl:'the school'}]},
  ]},
 {id:'p2',title:'Beytī — my house',level:'No vowel marks — like everyday written Arabic',
  lines:[
   {toks:[{ar:'بيتي',gl:'my house'},{ar:'صغير',gl:'small'},{ar:'بس',gl:'but'},{ar:'حلو.',gl:'nice / sweet'}]},
   {toks:[{ar:'بحب',gl:'I love'},{ar:'بيتي',gl:'my house'},{ar:'كتير.',gl:'a lot'}]},
   {toks:[{ar:'أنا',gl:'I'},{ar:'بحب',gl:'I love'},{ar:'أمي',gl:'my mom'},{ar:'وأبي.',gl:'and my dad'}]},
   {toks:[{ar:'العيلة',gl:'the family'},{ar:'كبيرة',gl:'big (f.)'},{ar:'وحلوة.',gl:'and sweet (f.)'}]},
  ]},
 {id:'p3',title:'Bidrus ʿarabi — I study Arabic',level:'No vowel marks — like everyday written Arabic',
  lines:[
   {toks:[{ar:'أنا',gl:'I'},{ar:'بدرس',gl:'I study'},{ar:'عربي',gl:'Arabic'},{ar:'بالمكتبة.',gl:'at the library'}]},
   {toks:[{ar:'بحب',gl:'I love'},{ar:'اتعلم',gl:'to learn'},{ar:'كلمات',gl:'words'},{ar:'جديدة',gl:'new'},{ar:'كل يوم.',gl:'every day'}]},
   {toks:[{ar:'المعلم',gl:'the teacher'},{ar:'منيح',gl:'good'},{ar:'كتير',gl:'very'},{ar:'وبيساعدني.',gl:'and he helps me'}]},
  ]},
];

export const MIN_PAIRS = [
 {a:{ar:'كَلْب',translit:'kalb',meaning:'dog'},b:{ar:'قَلْب',translit:'qalb',meaning:'heart'},note:'ك vs ق'},
 {a:{ar:'سَار',translit:'sār',meaning:'he walked'},b:{ar:'صَار',translit:'ṣār',meaning:'he became'},note:'س vs ص'},
 {a:{ar:'تِين',translit:'tīn',meaning:'figs'},b:{ar:'طِين',translit:'ṭīn',meaning:'mud'},note:'ت vs ط'},
 {a:{ar:'سُؤَال',translit:'suʾāl',meaning:'question'},b:{ar:'سُعَال',translit:'suʿāl',meaning:'cough'},note:'ء vs ع'},
];
export const THROAT_TRIO = [
  {ar:'حَلِيب',translit:'ḥalīb',meaning:'milk',letter:'ح'},
  {ar:'خُبْز',translit:'khubz',meaning:'bread',letter:'خ'},
  {ar:'هَدِيَّة',translit:'hadiyya',meaning:'gift',letter:'ه'},
];
