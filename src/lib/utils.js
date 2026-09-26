export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(d, n) {
  const dt = new Date(d + 'T00:00:00Z');
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

export function formatMonthYear(d) {
  return new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Removes vowel marks and normalizes letter variants so the first letter of a word can be looked up.
export function stripAr(s) {
  return (s || '')
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ىة]/g, (c) => (c === 'ة' ? 'ه' : 'ي'))
    .replace(/\s|[.,!؟?،]/g, '');
}
