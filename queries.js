// Prints today's search queries for the daily MS News routine.
// The routine runs these verbatim, so the wording can't drift back to
// month-only searches ("October 2026") that return the same pages every day.
const tz = 'Europe/Copenhagen';
const now = Date.now();
const day = 864e5;
const long = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long', day: 'numeric', year: 'numeric' });
const iso = new Intl.DateTimeFormat('en-CA', { timeZone: tz });
const weekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' }).format(new Date(now));

// Last 3 dates, quoted so the search matches pages that show that date.
const recent = [0, 1, 2].map(i => '"' + long.format(new Date(now - i * day)) + '"').join(' OR ');

const daily = [
  ['A-a research', 'multiple sclerosis study ' + recent],
  ['A-b treatment', 'multiple sclerosis drug OR trial OR FDA ' + recent],
  ['A-c living', 'living with multiple sclerosis ' + recent],
  ['A-d societies', '"MS Society" OR "National MS Society" OR "MS International Federation" OR "MS Australia" ' + recent],
  ['A-e events', 'multiple sclerosis conference OR webinar OR event ' + recent],
];

const topics = {
  Monday: ['vision and eye problems', 'bladder and bowel', 'sleep'],
  Tuesday: ['progressive MS', 'remyelination myelin repair', 'neuroprotection'],
  Wednesday: ['BTK inhibitor', 'Ocrevus OR Kesimpta OR Briumvi', 'stem cell transplant HSCT'],
  Thursday: ['walking balance falls', 'rehabilitation physical therapy', 'spasticity OR pain'],
  Friday: ['cognition memory', 'depression OR anxiety', 'fatigue'],
  Saturday: ['diet OR gut microbiome', 'vitamin D OR smoking OR weight', 'Epstein-Barr virus'],
  Sunday: ['children OR pediatric', 'pregnancy OR women', 'cost OR access to treatment'],
};

// Weekday topics look back further (the 14-day window), so they name the
// last 7 dates in short form rather than only the last 3.
const short = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long', day: 'numeric' });
const week = [0, 1, 2, 3, 4, 5, 6].map(i => short.format(new Date(now - i * day))).join(' OR ');
const year = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric' }).format(new Date(now));
const extra = topics[weekday].map(t => ['B ' + t, 'multiple sclerosis ' + t + ' new study ' + week + ' ' + year]);

console.log('TODAY ' + iso.format(new Date(now)) + ' | WEEKDAY ' + weekday);
for (const [label, q] of [...daily, ...extra]) console.log(label + ' :: ' + q);
