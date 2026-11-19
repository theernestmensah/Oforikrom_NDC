/**
 * Site-wide settings for the NDC Oforikrom website.
 *
 * Most of what the constituency office will want to change lives here.
 * Leave a value as an empty string ("") to hide it on the site.
 */

export const site = {
  name: 'NDC Oforikrom',
  fullName: 'National Democratic Congress, Oforikrom Constituency',
  motto: 'Unity, Stability and Development',
  description:
    'The National Democratic Congress in Oforikrom, Kumasi. Find your branch, join the party, volunteer, and follow news and events across all 15 electoral areas.',

  contact: {
    /** WhatsApp number in international format without "+" or spaces, e.g. "233241234567". Forms send here if no form endpoint is set. */
    whatsapp: '',
    /** Phone number as people should see it, e.g. "024 123 4567". */
    phone: '',
    email: '',
    /** Constituency office address, e.g. "NDC Constituency Office, near Oforikrom Market, Kumasi". */
    office: '',
    /** Google Maps link to the office. */
    officeMapUrl: '',
    officeHours: '',
  },

  socials: {
    facebook: '',
    x: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    /** Link to a WhatsApp Channel or community, e.g. "https://whatsapp.com/channel/..." */
    whatsappChannel: '',
  },

  forms: {
    /**
     * Optional form backend (e.g. a Formspree endpoint like "https://formspree.io/f/abcdwxyz").
     * When set, forms submit here. When empty, forms open WhatsApp with the details pre-filled.
     */
    endpoint: '',
  },

  donate: {
    /** Mobile Money details for dues and donations. The "Support" block only shows when momoNumber is set. */
    momoNumber: '',
    momoName: '',
    network: '',
  },

  /** Official party logo, e.g. "/images/ndc-logo.png". When empty, a simple umbrella badge is shown. */
  logo: '',

  /** Optional photos. Put files in /public/images and reference them like "/images/hero.jpg". */
  photos: {
    hero: '',
    youth: '',
  },
};

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Get involved', href: '/get-involved' },
] as const;

/** Builds a wa.me link, or returns null if no WhatsApp number is configured. */
export function whatsappLink(text?: string) {
  if (!site.contact.whatsapp) return null;
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${site.contact.whatsapp}${query}`;
}
