/**
 * Constituency executives.
 *
 * Fill in `name` (and optionally `photo`, `phone`, `bio`) as profiles are confirmed.
 * Cards with an empty name show "Profile coming soon".
 * Photos go in /public/images/leaders, e.g. photo: '/images/leaders/chairman.jpg'.
 */

export type Leader = {
  role: string;
  name: string;
  photo?: string;
  phone?: string;
  bio?: string;
};

/** Shown large at the top of the Leadership page. */
export const featuredLeaders: Leader[] = [
  {
    role: 'Constituency Chairman',
    name: '',
    bio: 'Leads the constituency executive committee and chairs constituency meetings.',
  },
  {
    role: 'Constituency Secretary',
    name: '',
    bio: 'Runs party administration, membership records and communication with branches.',
  },
];

export const executives: Leader[] = [
  { role: 'First Vice Chairman', name: '' },
  { role: 'Second Vice Chairman', name: '' },
  { role: 'Treasurer', name: '' },
  { role: 'Organiser', name: '' },
  { role: "Women's Organiser", name: '' },
  { role: 'Youth Organiser', name: '' },
  { role: 'Communications Officer', name: '' },
  { role: 'Zongo Caucus Coordinator', name: '' },
  { role: 'Assistant Secretary', name: '' },
];

/** Government appointees serving in Oforikrom. */
export const government: Leader[] = [
  {
    role: 'Municipal Chief Executive, Oforikrom',
    name: 'Hon. Ahmed Anwel Sadat',
    bio: 'Nominated by President John Dramani Mahama and confirmed by the Oforikrom Municipal Assembly in 2025.',
  },
];

/** First and last initials, ignoring titles: "Hon. Ahmed Anwel Sadat" gives "AS". */
export const initials = (text: string) => {
  const words = text
    .replace(/^((Hon|Dr|Prof|Mr|Mrs|Ms)\.?|Alhaji|Hajia)\s+/gi, '')
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w));
  const picked = words.length > 1 ? [words[0]!, words.at(-1)!] : words;
  return picked.map((w) => w[0]!.toUpperCase()).join('');
};
