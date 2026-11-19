/**
 * Events calendar.
 *
 * Add events here. Past events move to the "Past events" list automatically.
 * Dates use the format "YYYY-MM-DD", times use 24-hour "HH:MM" (Ghana time, GMT).
 *
 * Entries marked `sample: true` are design placeholders: they appear while you
 * run the site locally (npm run dev) but are left out of the live site
 * (npm run build). Delete them once real events are added.
 */

export type PartyEvent = {
  title: string;
  date: string;
  start?: string;
  end?: string;
  venue: string;
  area?: string;
  description: string;
  sample?: boolean;
};

const allEvents: PartyEvent[] = [
  {
    title: 'Branch executives forum',
    date: '2026-11-21',
    start: '10:00',
    end: '13:00',
    venue: 'Constituency office',
    description: 'Branch chairmen, secretaries and organisers meet to plan membership drives for the new year.',
    sample: true,
  },
  {
    title: 'TEIN-KNUST membership drive',
    date: '2026-12-02',
    start: '15:00',
    end: '18:00',
    venue: 'KNUST campus',
    area: 'Tech',
    description: 'Students can register with TEIN, meet the Youth Wing and sign up for campus organising.',
    sample: true,
  },
  {
    title: 'Polling agent training',
    date: '2026-12-12',
    start: '09:00',
    end: '14:00',
    venue: 'Ayeduase',
    area: 'Ayeduase / Kotei / Twumduase',
    description: 'A first training session for volunteers who want to protect the vote at polling stations.',
    sample: true,
  },
];

export const events = allEvents
  .filter((e) => import.meta.env.DEV || !e.sample)
  .sort((a, b) => a.date.localeCompare(b.date));

/** Today's date in Ghana (GMT) as YYYY-MM-DD. */
const today = () => new Date().toISOString().slice(0, 10);

export const upcomingEvents = () => events.filter((e) => e.date >= today());
export const pastEvents = () => events.filter((e) => e.date < today()).reverse();

export function eventDateParts(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  return {
    day: d.toLocaleDateString('en-GB', { day: 'numeric', timeZone: 'UTC' }),
    month: d.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' }),
    long: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  };
}

/** Google Calendar "add event" link. Ghana is on GMT all year, so times are UTC. */
export function calendarLink(e: PartyEvent) {
  const compact = (date: string, time = '00:00') => `${date.replaceAll('-', '')}T${time.replace(':', '')}00Z`;
  const dates = e.start
    ? `${compact(e.date, e.start)}/${compact(e.date, e.end ?? e.start)}`
    : `${e.date.replaceAll('-', '')}/${e.date.replaceAll('-', '')}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${e.title} (NDC Oforikrom)`,
    dates,
    location: e.venue,
    details: e.description,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
