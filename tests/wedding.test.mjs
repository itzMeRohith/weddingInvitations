import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { wedding as w, countdown, calendarContent, rsvpUrl, mapsUrl } from '../wedding-config.js';
test('Countdown uses the IST instant and clamps after ceremony',()=>{assert.equal(new Date(w.start).toISOString(),'2027-01-10T05:30:00.000Z');assert.deepEqual(countdown(Date.parse(w.start)-90061000).values,[1,1,1,1]);assert.deepEqual(countdown(Date.parse(w.start)+10000),{values:[0,0,0,0],complete:true});});
test('Calendar has correct UTC start/end and escaped venue',()=>{const ics=calendarContent();assert.match(ics,/DTSTART:20270110T053000Z/);assert.match(ics,/DTEND:20270110T060000Z/);assert.ok(ics.includes('Kattuparamba House\\, Beypore'));assert.ok(ics.endsWith('\r\n'));});
test('RSVP messages reflect selected attendance',()=>{assert.match(decodeURIComponent(rsvpUrl()),/I would love to celebrate with you/);assert.match(decodeURIComponent(rsvpUrl(false)),/unable to attend/);assert.ok(rsvpUrl().startsWith('https://wa.me/917034292134?text='));});
test('Unverified maps remains a textual search',()=>{assert.equal(new URL(mapsUrl()).searchParams.get('query'),w.address);assert.equal(w.verifiedMapUrl,null);});
test('All six original photographs exist and have independent section assignments',async()=>{assert.equal(Object.keys(w.photos).length,6);assert.equal(new Set(Object.values(w.photos).map(p=>p.src)).size,6);for(const p of Object.values(w.photos))await access(new URL('../'+p.src,import.meta.url));const source=await readFile(new URL('../app.js',import.meta.url),'utf8');for(const key of ['beach','walking','hands','flowers','finale'])assert.ok(source.includes(`photo('${key}'`));assert.ok(source.includes('w.photos.hero.src'));assert.doesNotMatch(source,/carousel|gallery|slideshow/i);assert.equal((source.match(/<section\b/g)||[]).length,10);});

test('Celebration QR is never reused for the ceremony',()=>{
 assert.equal(mapsUrl('celebration'),'https://maps.app.goo.gl/n56xQ4fDVavrNHdeA');
 assert.ok(mapsUrl('ceremony').includes('maps/search/'));
 assert.notEqual(mapsUrl('ceremony'),mapsUrl('celebration'));
 assert.equal(w.verification.qrVenue,'celebration');
});
test('Separate celebration calendar uses confirmed 1 PM IST start without fabricating its end',()=>{
 const ics=calendarContent('celebration');
 assert.match(ics,/DTSTART:20270110T073000Z/);
 assert.doesNotMatch(ics,/DTEND:|DURATION:/);
 assert.match(ics,/Ending time to be confirmed/);
 assert.match(ics,/VIBGYOR/);
 assert.notEqual(ics.match(/UID:(.*)/)[1],calendarContent().match(/UID:(.*)/)[1]);
 assert.doesNotMatch(calendarContent(),/VIBGYOR/);
});
