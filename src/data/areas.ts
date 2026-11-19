/**
 * Oforikrom's electoral areas, grouped by zonal council.
 * Source: Oforikrom Municipal Assembly composite budgets (2023, 2025).
 *
 * `contact` is the branch or area coordinator's WhatsApp number in
 * international format (e.g. "233241234567"). Leave empty to send people
 * to the constituency office instead.
 */

export type Zone = {
  id: string;
  name: string;
};

export type Area = {
  id: string;
  name: string;
  zone: Zone['id'];
  communities: string[];
  /** Extra search words (landmarks, nicknames). */
  aliases?: string[];
  coordinator?: string;
  contact?: string;
};

export const zones: Zone[] = [
  { id: 'oforikrom', name: 'Oforikrom' },
  { id: 'bomso', name: 'Bomso' },
  { id: 'ayigya', name: 'Ayigya' },
  { id: 'kentinkrono-ayeduase', name: 'Kentinkrono / Ayeduase' },
];

export const areas: Area[] = [
  { id: 'anloga-east', name: 'Anloga East', zone: 'oforikrom', communities: ['Anloga'] },
  { id: 'anloga-west', name: 'Anloga West', zone: 'oforikrom', communities: ['Anloga'] },
  { id: 'oforikrom-east', name: 'Oforikrom East', zone: 'oforikrom', communities: ['Oforikrom'] },
  { id: 'oforikrom-west', name: 'Oforikrom West', zone: 'oforikrom', communities: ['Oforikrom'] },

  { id: 'bomso', name: 'Bomso', zone: 'bomso', communities: ['Bomso'] },
  { id: 'tech', name: 'Tech', zone: 'bomso', communities: ['KNUST campus'], aliases: ['knust', 'university', 'campus', 'tech junction'] },

  { id: 'ayigya-zongo', name: 'Ayigya Zongo', zone: 'ayigya', communities: ['Ayigya Zongo'], aliases: ['ayigya'] },
  { id: 'ahenbronum', name: 'Ahenbronum', zone: 'ayigya', communities: ['Ahenbronum'] },
  { id: 'ayigya-akatego', name: 'Ayigya Akatego', zone: 'ayigya', communities: ['Ayigya', 'Akatego'] },

  { id: 'kentinkrono', name: 'Kentinkrono / Oduom / Nsenie', zone: 'kentinkrono-ayeduase', communities: ['Kentinkrono', 'Oduom', 'Nsenie'] },
  { id: 'aprade-meseum', name: 'Aprade / Meseum', zone: 'kentinkrono-ayeduase', communities: ['Aprade', 'Meseum'] },
  { id: 'emena', name: 'Emena / Boadi / Appiadu / Kokoben', zone: 'kentinkrono-ayeduase', communities: ['Emena', 'Boadi', 'Appiadu', 'Kokoben'] },
  { id: 'anwomaso-bebre', name: 'Anwomaso / Bebre', zone: 'kentinkrono-ayeduase', communities: ['Anwomaso', 'Bebre'] },
  { id: 'deduako', name: 'Deduako / Kodiekrom / Apemso', zone: 'kentinkrono-ayeduase', communities: ['Deduako', 'Kodiekrom', 'Apemso'] },
  { id: 'ayeduase', name: 'Ayeduase / Kotei / Twumduase', zone: 'kentinkrono-ayeduase', communities: ['Ayeduase', 'Kotei', 'Twumduase'] },
];

export const zoneName = (id: string) => zones.find((z) => z.id === id)?.name ?? id;

/** Every community name, de-duplicated, for the scrolling band on the home page. */
export const allCommunities = [...new Set(areas.flatMap((a) => a.communities.map((c) => c.replace(' campus', ''))))];
