export const wedding = {
  names: ['Rohith', 'Akhila'],
  dateLabel: '10 January 2027', day: 'Sunday',
  start: '2027-01-10T11:00:00+05:30', end: '2027-01-10T11:30:00+05:30',
  timeZone: 'Asia/Kolkata', timeLabel: '11:00 AM – 11:30 AM',
  ceremony: {
    label: 'Bride?s Home ? Wedding Ceremony',
    venue: 'Kattuparamba House',
    address: 'Kattuparamba House, Beypore, Kozhikode, Kerala, India',
    verifiedMapUrl: null, addressSource: 'Latest ceremony venue correction supplied by the family',
  },
  celebration: {
    venue: 'VIBGYOR Auditorium & Convention Centre',
    cardAddress: 'Areekode–Edavannappara Road',
    address: 'VIBGYOR Auditorium & Convention Centre, Kozhikkode–Edavannappara–Areekode Road, Vavoor, Cheekkode, Kerala 673645, India',
    addressSource: 'Card road supplied by family; fuller address corroborated by venue directories',
    addressSourceUrl: 'https://www.mandap.com/malappuram/vibgyor-auditorium-and-convention-centre-in-malappuram',
    start: '2027-01-10T13:00:00+05:30', end: null, dateLabel: 'Sunday, 10 January 2027', timeLabel: 'From 1:00 PM onwards', endTimeLabel: 'To be confirmed',
    verifiedMapUrl: 'https://maps.app.goo.gl/n56xQ4fDVavrNHdeA',
    coordinates: { latitude: 11.2390991, longitude: 76.0081802 },
    mapVerification: 'Original QR short link HTTP 302 resolves to Google Maps place VIBGYOR Auditorium & Convention centre; coordinates taken from the place marker, not the viewport.',
  },
  get venue() { return this.ceremony.venue; },
  get address() { return this.ceremony.address; },
  get verifiedMapUrl() { return this.ceremony.verifiedMapUrl; },
  phone: '+917034292134', phoneLabel: '+91 7034292134',
  canonicalUrl: null,
  family: {
    groomParents: 'Ravindran Kunnath and Geetha Ravindran',
    groomAddress: 'Kunnummal House, Hajiyarpadi, Urupuram P.O., Areekode, Malappuram',
    brideParents: 'Jagathi and Babitha Jagathi',
    brideAddress: 'Kattuparamba House, Beypore, Kozhikode',
    extendedFamily: 'With warm wishes from Vimal & Harsha',
    signOff: 'Kunnath Ravindran & Geetha Ravindran',
  },
  verification: {
    cardProvided: false, cardDetailsSuppliedByFamily: true, fullAddressConfirmed: true,
    qrDecoded: false, qrDestinationVerified: true, qrVenue: 'celebration',
    pending: ['Celebration ending time obscured on the original printed card', 'Precise ceremony house map pin'],
  },
  photos: {
    hero: { src: 'portrait-stone.webp', alt: 'Rohith and Akhila leaning together against a stone wall' },
    beach: { src: 'portrait-beach.webp', alt: 'Rohith and Akhila holding hands at the beach' },
    walking: { src: 'walking-beach.webp', alt: 'Rohith and Akhila walking on the beach and looking at each other' },
    hands: { src: 'holding-hands.webp', alt: 'An intimate close-up of Rohith and Akhila holding hands' },
    flowers: { src: 'flower-field.webp', alt: 'Rohith and Akhila among yellow flowers under a blue sky' },
    finale: { src: 'tender-moment.webp', alt: 'Black-and-white photograph of Rohith kissing Akhila on the forehead' }
  }
};
export const couple = wedding.names.join(' & ');
export function mapsUrl(event = 'ceremony') {
  const venue = wedding[event];
  if (!venue) throw new Error('Unknown event');
  return venue.verifiedMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`;
}
export function calendarEvent(event = 'ceremony') {
  if (event === 'ceremony') return { start: wedding.start, end: wedding.end, venue: wedding.venue, address: wedding.address, title: `${wedding.ceremony.label}: ${couple}`, description: `The wedding ceremony takes place at the bride?s family home. Muhurtham ${wedding.timeLabel} India Standard Time.` };
  if (event !== 'celebration') throw new Error('Unknown event');
  const celebration = wedding.celebration;
  if (!celebration.start) throw new Error('Celebration start time is not yet confirmed');
  return { ...celebration, title: `Wedding celebration of ${couple}`, description: `Wedding celebration ${celebration.timeLabel.toLowerCase()}. ${celebration.end ? '' : 'Ending time to be confirmed.'}` };
}
export function countdown(now = Date.now()) {
  const total = Math.max(0, Math.floor((Date.parse(wedding.start) - now) / 1000));
  return { values: [Math.floor(total / 86400), Math.floor(total % 86400 / 3600), Math.floor(total % 3600 / 60), total % 60], complete: total === 0 };
}
export function rsvpUrl(attending = true) {
  const message = `Hello! Thank you for inviting me to ${couple}'s wedding on January 10, 2027. ${attending ? 'I would love to celebrate with you.' : 'I am unable to attend, but send you both my warmest wishes.'}`;
  return `https://wa.me/${wedding.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
export function calendarContent(event = 'ceremony') {
  const details = calendarEvent(event);
  const utc = value => new Date(value).toISOString().replace(/[-:]/g, '').replace('.000', '');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Rohith and Akhila//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:rohith-akhila-${event}-20270110@wedding.invitation`,'DTSTAMP:20261113T000000Z',`DTSTART:${utc(details.start)}`,...(details.end ? [`DTEND:${utc(details.end)}`] : []),`SUMMARY:${details.title}`,`LOCATION:${details.address.replaceAll(',', '\\,')}`,`DESCRIPTION:${details.description}`,'END:VEVENT','END:VCALENDAR',''].join('\r\n');
}
