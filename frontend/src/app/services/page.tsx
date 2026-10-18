import type { Metadata } from 'next';
import Media from '@/components/Media';
import Split from '@/components/Split';
import SwitchList from '@/components/SwitchList';
import TransitionLink from '@/components/TransitionLink';
import { PillLabel, PillLink } from '@/components/Pill';
import { ClosingCta, Faq, PageTitle } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { eventTypes, functions, img } from '@/lib/content';
import { cta, routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Thai catering for weddings, Indian weddings, parties, company events, private dinners and pop-ups. Live food counters, sit-down Thai dinners and small bites, with vegetarian options at every counter.',
  alternates: { canonical: routes.services }
};

// Weddings get the long section; every other kind of event gets one block.
const others = eventTypes.filter((e) => e.id !== 'weddings');

const jumpTo = [
  ['weddings', 'Weddings'],
  ['indian-weddings', 'Indian weddings'],
  ...others.map((e) => [e.id, e.name]),
  ['diet', 'Vegetarian food'],
  ['prices', 'Prices']
];

const indianEvents = [
  ['Welcome dinner', 'Thai street-food counters', 'Families meet and chat over food.'],
  ['Mehendi', 'Fresh, light counters', 'Small bites, easy to eat with henna on your hands.'],
  ['Haldi', 'Fruit, salads and coconut', 'Light and cool for a hot morning.'],
  ['Sangeet', 'Thai grill and khao soi noodles', 'Filling and quick, between dances.'],
  ['Reception', 'A Thai corner next to the buffet', 'More choice, and your caterer stays.'],
  ['After-party', 'Late-night food', 'Pad thai and snacks after the dancing.']
];
const diets: [string, string, boolean][] = [
  ['Vegetarian', 'Thai without fish sauce', true],
  ['Vegan', 'Served at the Bali wedding', true],
  ['Egg-free', 'Desserts and mains', true],
  ['Jain', 'No onion, garlic or roots', false],
  ['Halal', 'Certified or halal-friendly (to check)', false],
  ['No beef or no pork', 'Can be set for your menu', false]
];
const prices = ['Live food counters', 'Sit-down Thai dinner', 'Small bites', 'Late-night food'];
const venueNeeds = [['Space for each food counter', 'to confirm'], ['Electricity or gas', 'to confirm'], ['Water close to the counters', 'Needed'], ['Time to set up before serving', 'to confirm']];

const h2 = { fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' } as const;
const h3 = { fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 } as const;

/*
  Page flow: what we serve → weddings → Indian weddings → parties, company events, private dinners, pop-ups
  → vegetarian food → what's included and prices → a real event → questions → get a quote
*/
export default function ServicesPage() {
  return (
    <>
      <PageTitle
        title="Our services"
        sub="(Thai catering for every event)"
        meta={[
          { label: 'What we serve', value: 'Food counters · Dinners · Small bites' },
          { label: 'Events', value: 'Weddings · Parties · Company events · Private dinners' },
          { label: 'Where', value: 'Thailand · Bali · Jakarta · India', note: 'And wherever your event is' }
        ]}
      />

      {/* Quick links to each part of this page */}
      <nav aria-label="On this page" className="in jump" data-intro-fade>
        <span className="br">Jump to</span>
        <div className="jump-links">
          {jumpTo.map(([id, label]) => <a key={id} className="pill sm ln" href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <Media as="figure" image={img.stationNight} clip priority sizes="100vw" style={{ height: 'clamp(440px, 52vw, 760px)', marginTop: 12 }}>
        <figcaption className="cap-in"><span className="cap">Khao soi counter</span><span style={{ fontSize: 12 }}>Bali · Sept 2025</span></figcaption>
      </Media>

      {/* 1. What we serve */}
      <section className="sec" aria-labelledby="serve">
        <div className="in grid-auto" style={{ ['--gap' as string]: '48px', alignItems: 'start' }}>
          <span className="br" data-reveal>What we serve, at any event</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 id="serve" className="lit"><span>Live counters, cooked in front of guests.</span><span>A sit-down Thai dinner.</span><span>Small bites with drinks.</span><span>Or a mix of all three.</span></h2>
            <p data-reveal className="lead-copy">Tell us what the event is and how many guests you expect. We suggest the right mix and send a price.</p>
            <PillLink href={routes.menu} variant="dk" style={{ alignSelf: 'flex-start' }}>See our menu</PillLink>
          </div>
        </div>
      </section>

      {/* 2. Weddings */}
      <section id="weddings" className="anchor" aria-labelledby="weddings-title" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680, paddingBottom: 24 }}>
          <span className="br">01 · Weddings</span>
          <Split as="h2" id="weddings-title" text="Thai food for *your wedding*" style={h2} />
          <p data-reveal className="lead-copy">Book us for one event or the whole weekend. We work next to your main caterer, and every guest finds something to eat.</p>
        </div>
        <div className="grid-auto">
          <Media image={img.marketSign} href={routes.menu} clip cursor="View" style={{ height: 'clamp(420px, 40vw, 600px)' }}>
            <span className="cap" style={{ position: 'absolute', left: 20, top: 20, color: '#fff', zIndex: 2 }}>Option 1 · Most popular</span>
            <div className="tag-in"><span className="extra"><span>Added next to your Indian or main caterer</span></span><PillLabel>Thai food counters at your wedding</PillLabel></div>
          </Media>
          <Media image={img.riceSalad} href={`${routes.quote}?event=weddings`} clip cursor="Ask" style={{ height: 'clamp(420px, 40vw, 600px)' }}>
            <span className="cap" style={{ position: 'absolute', left: 20, top: 20, color: '#fff', zIndex: 2 }}>Option 2</span>
            <div className="tag-in"><span className="extra"><span>Welcome dinner, reception or brunch</span></span><PillLabel>We cater a whole event</PillLabel></div>
          </Media>
        </div>
      </section>

      <section className="panel sec-sm" aria-label="Food for each wedding event" style={{ marginTop: 12 }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p className="lead-copy" style={{ maxWidth: 560 }}>Here is what we usually serve at each wedding event. Tap an event to see it.</p>
          <SwitchList items={functions} label="Wedding events" hint="Tap an event" initial={1} small link={{ href: `${routes.quote}?event=weddings&ask=sample-menu`, label: 'Ask for a sample menu' }} />
        </div>
      </section>

      {/* 3. Indian weddings */}
      <section id="indian-weddings" className="sec anchor" aria-labelledby="indian-title">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div className="grid-auto" style={{ ['--gap' as string]: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="br">02 · Indian weddings</span>
              <Split as="h2" id="indian-title" text="Thai food at *every* Indian wedding event" style={h2} />
              <p data-reveal className="lead-copy">Our Thai food counters sit next to your Indian caterer. Your guests get more choice, and there is a vegetarian version of every dish.</p>
              <PillLink href={`${routes.quote}?ask=veg-menu&type=indian`} variant="dk" style={{ alignSelf: 'flex-start' }}>Get the vegetarian menu</PillLink>
            </div>
            <Media image={img.signGuest} clip style={{ height: 'clamp(360px, 36vw, 520px)' }} imgStyle={{ objectPosition: 'center 28%' }} />
          </div>
          <div className="rows">
            <span className="cap mut grp">What we serve at each event</span>
            {indianEvents.map(([f, fmt, why], i) => (
              <div key={f} className="row r4 hov"><span>{String(i + 1).padStart(2, '0')}</span><span>{f}</span><span className="fmt">{fmt}</span><span className="fmt hide" style={{ maxWidth: 320 }}>{why}</span></div>
            ))}
          </div>
          <div className="grid-auto" style={{ ['--min' as string]: '260px' }} data-stagger>
            <div className="panel" style={{ padding: 28, minHeight: 190, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}><span className="br">Your caterer</span><strong style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2 }}>Cooks the Indian food and the main buffet</strong></div>
            <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 12, padding: 28, minHeight: 190, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}><span className="br" style={{ color: 'var(--smoke)' }}>Mahanakorn (us)</span><strong style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2 }}>Cooks the <span className="s">Thai</span> food counters or a whole Thai event</strong></div>
            <div className="panel" style={{ padding: 28, minHeight: 190, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}><span className="br">Your planner</span><strong style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2 }}>Plans the timing so everything runs smoothly</strong></div>
          </div>
          <div data-reveal style={{ border: '1px dashed #A79E8C', borderRadius: 12, padding: '24px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontWeight: 600 }}>Need Indian food too?</strong><span className="mut" style={{ fontSize: 14 }}>We can cater together with our partners at Queen&apos;s Catering (only if the partnership is confirmed).</span></span>
            <TransitionLink className="cap" href={`${routes.quote}?ask=joint-menu&type=indian`} style={{ textDecoration: 'none' }}>Ask about a joint menu →</TransitionLink>
          </div>
        </div>
      </section>

      {/* 4. Parties, company events, private dinners, pop-ups */}
      <section className="sec" aria-labelledby="other-title" style={{ paddingTop: 0 }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 6vw, 88px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
            <span className="br">Not a wedding?</span>
            <Split as="h2" id="other-title" text="Parties *and other events*" style={h2} />
            <p data-reveal className="lead-copy">We bring the same live Thai cooking to any event.</p>
          </div>
          {others.map((e, i) => (
            <article key={e.id} id={e.id} className="grid-auto anchor" style={{ ['--gap' as string]: '40px', alignItems: 'center' }} aria-labelledby={`${e.id}-title`}>
              <Media image={e.image} clip style={{ height: 'clamp(320px, 34vw, 480px)', order: i % 2 ? 2 : 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} data-stagger>
                <span className="br">{String(i + 3).padStart(2, '0')} · {e.line}</span>
                <h3 id={`${e.id}-title`} style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.05, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }}>{e.name}</h3>
                <p className="mut" style={{ lineHeight: 1.65, fontSize: 16, maxWidth: 460 }}>{e.text}</p>
                <p style={{ fontSize: 15, lineHeight: 1.5 }}><b style={{ fontWeight: 600 }}>What we usually serve:</b> {e.serve}</p>
                <PillLink href={`${routes.quote}?event=${e.id}`} variant="dk" style={{ alignSelf: 'flex-start' }}>Get a quote for this</PillLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Vegetarian food (all events) */}
      <section id="diet" className="panel sec anchor" aria-labelledby="diet-title">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <span className="br" data-reveal>Vegetarian, vegan and more</span>
            <Split as="h2" id="diet-title" text="Food every guest **can eat**" style={{ fontSize: 'clamp(34px, 4.6vw, 66px)', lineHeight: 1.02, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            <p data-reveal className="lead-copy" style={{ maxWidth: 480 }}>Real Thai taste without fish sauce. Every counter has a vegetarian, vegan and egg-free version, at every kind of event.</p>
          </div>
          <div className="grid-auto" style={{ ['--min' as string]: '220px', ['--gap' as string]: '28px' }} data-stagger>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">01 · Our own sauces</span><p style={{ lineHeight: 1.6 }}>We make our curry pastes and sauces without fish sauce or shrimp paste. <span className="mut">To confirm.</span></p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">02 · Cooked separately</span><p style={{ lineHeight: 1.6 }}>Vegetarian food has its own pans, spoons and counter. <span className="mut">To confirm.</span></p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">03 · Egg-free desserts</span><p style={{ lineHeight: 1.6 }}>Our desserts are egg-free as standard. <span className="mut">To confirm.</span></p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">04 · Clear labels</span><p style={{ lineHeight: 1.6 }}>Every dish has a name card that shows if it is vegetarian or vegan, and how spicy it is.</p></div>
          </div>
          <div className="rows">
            {diets.map(([d, note, ok], i) => (
              <div key={d} className="row r4 hov on-white"><span>{String(i + 1).padStart(2, '0')}</span><span>{d}</span><span className="fmt hide">{note}</span><span className={`st ${ok ? 'ok' : 'tbc'}`}>{ok ? 'Available' : 'To confirm'}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. What's included, prices and venue needs */}
      <section id="prices" className="sec anchor" aria-labelledby="prices-title">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div className="grid-auto" style={{ ['--min' as string]: '240px', ['--gap' as string]: '32px' }} data-stagger>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span className="br">Included</span><p style={{ lineHeight: 1.6 }}>The menu, Thai ingredients, chefs, cooking equipment, serving staff and food labels.</p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span className="br">Extras you can add</span><p style={{ lineHeight: 1.6 }}>Thai tea and drinks bar, dessert table, a tasting, more staff.</p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span className="br">You, your planner or venue handle</span><p style={{ lineHeight: 1.6 }}>The venue, decoration, other food, tables and linen, and alcohol.</p></div>
          </div>
          <div className="rows">
            <Split as="h2" id="prices-title" text="Prices *and* what we need" style={h3} />
            <span className="cap mut grp">Starting price per guest</span>
            {prices.map((p, i) => (
              <TransitionLink key={p} className="row r4" href={routes.quote}>
                <span>{String(i + 1).padStart(2, '0')}</span><span>{p}</span><span className="fmt">from THB — (to confirm)</span><span className="go" aria-hidden="true"><ArrowRight /></span>
              </TransitionLink>
            ))}
            <p className="mut" style={{ fontSize: 13, paddingTop: 8 }}>Travel outside Bangkok is extra. Tap a row to get an exact price for your date.</p>
            <span className="cap mut grp" style={{ paddingTop: 28 }}>What we need from your venue</span>
            {venueNeeds.map(([k, v], i) => (
              <div key={k} className="row r4 hov"><span>{String(i + 1).padStart(2, '0')}</span><span>{k}</span><span className="fmt">{v}</span><span /></div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. A real event */}
      <section className="pb" aria-labelledby="story">
        <div className="in grid-auto" style={{ ['--min' as string]: '240px', ['--gap' as string]: '16px', alignItems: 'start' }}>
          <Media image={img.guest} clip style={{ height: 460 }} />
          <Media image={img.miang} speed={0.3} style={{ height: 220 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} data-stagger>
            <span className="br">A real event</span>
            <span style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, textTransform: 'uppercase' }}>4–6 September 2025</span>
            <h2 id="story" style={{ fontSize: 16, fontWeight: 600 }}>Thai food at a three-day Indian wedding in Bali</h2>
            <p className="mut" style={{ lineHeight: 1.6, fontSize: 15 }}>Live food counters at the Mehendi, the Sangeet and a fun fair, with a vegan version of every dish.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <PillLink href={routes.baliWedding} variant="dk">See this wedding</PillLink>
              <PillLink href={routes.pastEvents} variant="ln">All past events</PillLink>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Questions */}
      <section className="pb" aria-label="Questions">
        <div className="in">
          <Faq
            title="Common *questions*"
            items={[
              { q: 'How early should we book?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'What is the smallest event you cater?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'Do you need a kitchen at the venue?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'Can you cook at our office or at home?', a: 'Yes. We need some space, electricity and water close by. We check this with you before the event.' },
              { q: 'Can we taste the food first?', a: 'Yes, we can arrange a tasting. Where and how is to be confirmed.' },
              { q: "Isn't Thai food too spicy?", a: 'No. We cook every dish to your spice level, and every counter is marked mild, medium or spicy.' },
              { q: 'What happens if it rains?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'Do you serve alcohol?', a: 'Answer to confirm with Mahanakorn.' }
            ]}
          />
        </div>
      </section>

      <ClosingCta label={cta.quote} title="Tell us *about*|your event" text="The type of event, date, place and number of guests. We reply with a menu idea and a price, usually in 1–2 days." />
    </>
  );
}
