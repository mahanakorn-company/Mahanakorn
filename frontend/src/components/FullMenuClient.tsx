'use client';

import { useMemo, useState } from 'react';
import Split from '@/components/Split';
import { PillLink } from '@/components/Pill';
import { ArrowRight } from '@/components/Icons';
import {
  horsDoeuvres,
  mainCourses,
  desserts,
  stationConcepts,
  themeMenus,
  villageAtmosphere,
  type DishItem
} from '@/lib/fullMenuData';
import { cta, routes } from '@/lib/site';

type CategoryKey = 'all' | 'hors' | 'mains' | 'desserts' | 'stations' | 'themes';
type DietKey = 'all' | 'V' | 'NV';

export default function FullMenuClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [diet, setDiet] = useState<DietKey>('all');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filterDishes = (list: DishItem[]) => {
    return list.filter((item) => {
      if (diet !== 'all' && item.diet !== diet) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.thai && item.thai.toLowerCase().includes(q)) ||
        (item.note && item.note.toLowerCase().includes(q))
      );
    });
  };

  const filteredHors = useMemo(() => filterDishes(horsDoeuvres), [diet, q]);
  const filteredMains = useMemo(() => filterDishes(mainCourses), [diet, q]);
  const filteredDesserts = useMemo(() => filterDishes(desserts), [diet, q]);

  const filteredStations = useMemo(() => {
    if (!q) return stationConcepts;
    return stationConcepts.filter((st) => {
      return (
        st.name.toLowerCase().includes(q) ||
        (st.thai && st.thai.toLowerCase().includes(q)) ||
        st.tagline.toLowerCase().includes(q) ||
        st.items.some((it) => it.toLowerCase().includes(q)) ||
        (st.subsections &&
          st.subsections.some((sub) =>
            sub.items.some((it) => it.toLowerCase().includes(q))
          ))
      );
    });
  }, [q]);

  const filteredThemes = useMemo(() => {
    if (!q) return themeMenus;
    return themeMenus.filter((tm) => {
      return (
        tm.name.toLowerCase().includes(q) ||
        (tm.thai && tm.thai.toLowerCase().includes(q)) ||
        tm.vibe.toLowerCase().includes(q) ||
        tm.occasions.toLowerCase().includes(q) ||
        tm.appetizers.some((it) => it.toLowerCase().includes(q)) ||
        tm.mains.some((it) => it.toLowerCase().includes(q)) ||
        tm.desserts.some((it) => it.toLowerCase().includes(q))
      );
    });
  }, [q]);

  const showHors = (activeCategory === 'all' || activeCategory === 'hors') && filteredHors.length > 0;
  const showMains = (activeCategory === 'all' || activeCategory === 'mains') && filteredMains.length > 0;
  const showDesserts = (activeCategory === 'all' || activeCategory === 'desserts') && filteredDesserts.length > 0;
  const showStations = (activeCategory === 'all' || activeCategory === 'stations') && diet === 'all' && filteredStations.length > 0;
  const showThemes = (activeCategory === 'all' || activeCategory === 'themes') && diet === 'all' && filteredThemes.length > 0;

  const totalResults =
    (showHors ? filteredHors.length : 0) +
    (showMains ? filteredMains.length : 0) +
    (showDesserts ? filteredDesserts.length : 0) +
    (showStations ? filteredStations.length : 0) +
    (showThemes ? filteredThemes.length : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Sticky Filter & Search Bar */}
      <div className="fm-bar">
        <div className="fm-tabs" role="tablist" aria-label="Menu Sections">
          <button
            type="button"
            className={`fm-tab${activeCategory === 'all' ? ' on' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Courses
          </button>
          <button
            type="button"
            className={`fm-tab${activeCategory === 'hors' ? ' on' : ''}`}
            onClick={() => setActiveCategory('hors')}
          >
            Hors d’oeuvres ({horsDoeuvres.length})
          </button>
          <button
            type="button"
            className={`fm-tab${activeCategory === 'mains' ? ' on' : ''}`}
            onClick={() => setActiveCategory('mains')}
          >
            Mains ({mainCourses.length})
          </button>
          <button
            type="button"
            className={`fm-tab${activeCategory === 'desserts' ? ' on' : ''}`}
            onClick={() => setActiveCategory('desserts')}
          >
            Desserts ({desserts.length})
          </button>
          <button
            type="button"
            className={`fm-tab${activeCategory === 'stations' ? ' on' : ''}`}
            onClick={() => setActiveCategory('stations')}
          >
            Live Stations ({stationConcepts.length})
          </button>
          <button
            type="button"
            className={`fm-tab${activeCategory === 'themes' ? ' on' : ''}`}
            onClick={() => setActiveCategory('themes')}
          >
            Themed Menus ({themeMenus.length})
          </button>
        </div>

        <div className="fm-controls">
          <div className="fm-diet-toggle" role="group" aria-label="Dietary preference">
            <button
              type="button"
              className={`fm-diet-btn${diet === 'all' ? ' on' : ''}`}
              onClick={() => setDiet('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`fm-diet-btn${diet === 'V' ? ' on' : ''}`}
              onClick={() => setDiet('V')}
              title="Show Vegetarian only"
            >
              Veg (V)
            </button>
            <button
              type="button"
              className={`fm-diet-btn${diet === 'NV' ? ' on' : ''}`}
              onClick={() => setDiet('NV')}
              title="Show Non-Vegetarian only"
            >
              Non-Veg (NV)
            </button>
          </div>

          <div className="fm-search-wrap">
            <svg
              className="fm-search-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              className="fm-search"
              placeholder="Search dishes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search dishes and ingredients"
            />
          </div>
        </div>
      </div>

      {totalResults === 0 && (
        <div
          className="panel"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 500 }}>No dishes match your search.</p>
          <p className="mut" style={{ fontSize: 14 }}>Try clearing the search or changing dietary preferences.</p>
          <button
            type="button"
            className="pill dk sm"
            style={{ marginTop: 8 }}
            onClick={() => {
              setQuery('');
              setDiet('all');
              setActiveCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 1. Hors d’oeuvres Section */}
      {showHors && (
        <section id="hors-doeuvres" className="sec-sm anchor" aria-labelledby="hors-title">
          <div className="menu-intro" style={{ marginBottom: 28 }}>
            <div className="menu-intro-head">
              <p className="svc-label"><span>01 / Passed bites & canapés</span></p>
              <Split as="h2" id="hors-title" className="svc-title" text="*Hors d’oeuvres*" />
            </div>
            <p className="lead-copy">
              Handcrafted small plates and skewers handed fresh to guests during welcome receptions, cocktail hours, and celebrations.
            </p>
          </div>

          <div className="fm-grid">
            {filteredHors.map((item, idx) => (
              <article key={item.name} className="fm-item">
                <span className="mc-n">{String(idx + 1).padStart(2, '0')}</span>
                <div className="fm-item-content">
                  <div className="fm-item-head">
                    <span className="fm-item-name">{item.name}</span>
                    {item.thai && <span className="fm-item-thai" lang="th">{item.thai}</span>}
                  </div>
                  {item.note && <span className="fm-item-note">{item.note}</span>}
                </div>
                <span className={`fm-badge ${item.diet.toLowerCase()}`}>
                  {item.diet === 'V' ? 'Veg' : 'Non-Veg'}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 2. Main Course Section */}
      {showMains && (
        <section id="main-course" className="sec-sm anchor" aria-labelledby="mains-title">
          <div className="menu-intro" style={{ marginBottom: 28 }}>
            <div className="menu-intro-head">
              <p className="svc-label"><span>02 / Live wok & curries</span></p>
              <Split as="h2" id="mains-title" className="svc-title" text="*Main Course*" />
            </div>
            <p className="lead-copy">
              Aromatic coconut curries, smoky holy basil wok-tossed dishes, and artisanal noodles prepared live before your guests.
            </p>
          </div>

          <div className="fm-grid">
            {filteredMains.map((item, idx) => (
              <article key={item.name} className="fm-item">
                <span className="mc-n">{String(idx + 1).padStart(2, '0')}</span>
                <div className="fm-item-content">
                  <div className="fm-item-head">
                    <span className="fm-item-name">{item.name}</span>
                    {item.thai && <span className="fm-item-thai" lang="th">{item.thai}</span>}
                  </div>
                  {item.note && <span className="fm-item-note">{item.note}</span>}
                </div>
                <span className={`fm-badge ${item.diet.toLowerCase()}`}>
                  {item.diet === 'V' ? 'Veg' : 'Non-Veg'}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. Desserts Section */}
      {showDesserts && (
        <section id="desserts" className="sec-sm anchor" aria-labelledby="desserts-title">
          <div className="menu-intro" style={{ marginBottom: 28 }}>
            <div className="menu-intro-head">
              <p className="svc-label"><span>03 / Traditional sweets & ice creams</span></p>
              <Split as="h2" id="desserts-title" className="svc-title" text="*Desserts*" />
            </div>
            <p className="lead-copy">
              From sweet coconut sticky rice and live cast-iron Kanom Krok to artisanal Thai tea pastries and tropical ice cream flights.
            </p>
          </div>

          <div className="fm-grid">
            {filteredDesserts.map((item, idx) => (
              <article key={item.name} className="fm-item">
                <span className="mc-n">{String(idx + 1).padStart(2, '0')}</span>
                <div className="fm-item-content">
                  <div className="fm-item-head">
                    <span className="fm-item-name">{item.name}</span>
                    {item.thai && <span className="fm-item-thai" lang="th">{item.thai}</span>}
                  </div>
                  {item.note && <span className="fm-item-note">{item.note}</span>}
                </div>
                <span className={`fm-badge ${item.diet.toLowerCase()}`}>
                  {item.diet === 'V' ? 'Veg' : 'Non-Veg'}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 4. Live Station Concepts Section */}
      {showStations && (
        <section id="live-stations" className="sec-sm anchor" aria-labelledby="stations-title">
          <div className="menu-intro" style={{ marginBottom: 28 }}>
            <div className="menu-intro-head">
              <p className="svc-label"><span>04 / Interactive counters</span></p>
              <Split as="h2" id="stations-title" className="svc-title" text="*Live Station Concepts*" />
            </div>
            <p className="lead-copy">
              Each counter operates as an interactive culinary stage, manned by Bangkok chefs cooking to order with authentic equipment.
            </p>
          </div>

          {/* Thai Village Atmosphere Banner */}
          <div
            className="panel"
            style={{
              padding: 'clamp(28px, 4vw, 44px)',
              marginBottom: 32,
              background: '#f8f4ec',
              border: '1px solid #ebd9c8',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="th" style={{ fontSize: 20, color: 'var(--tamarind)' }}>หมู่บ้านไทย</span>
                <h3 style={{ font: '600 clamp(20px, 2.2vw, 26px)/1.2 var(--f-sans)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                  {villageAtmosphere.concept}
                </h3>
              </div>
              <span className="cap" style={{ color: 'var(--tamarind)', letterSpacing: '0.08em' }}>Atmosphere & Experience</span>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 960, color: 'var(--ink)' }}>
              {villageAtmosphere.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16, paddingTop: 8 }}>
              {villageAtmosphere.details.map((det) => (
                <div key={det.label} style={{ borderTop: '1px solid #e2cfbd', paddingTop: 12 }}>
                  <span className="cap mut" style={{ display: 'block', marginBottom: 4 }}>{det.label}</span>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--stone)' }}>{det.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fm-cards-grid">
            {filteredStations.map((st) => (
              <article key={st.id} className="fm-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
                  <span className="mc-n">{st.number}</span>
                  {st.thai && <span className="fm-item-thai" lang="th">{st.thai}</span>}
                </div>
                <div>
                  <h3 style={{ font: '600 20px/1.2 var(--f-sans)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6 }}>
                    {st.name}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--stone)', lineHeight: 1.5 }}>{st.tagline}</p>
                </div>

                {st.setupNote && (
                  <p style={{ fontSize: 13, color: 'var(--tamarind)', fontStyle: 'italic', lineHeight: 1.45 }}>
                    ✦ {st.setupNote}
                  </p>
                )}

                {st.items.length > 0 && (
                  <ul style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {st.items.map((it) => (
                      <li key={it} style={{ fontSize: 14.5, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--tamarind)', fontSize: 11 }}>•</span> {it}
                      </li>
                    ))}
                  </ul>
                )}

                {st.subsections && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                    {st.subsections.map((sub) => (
                      <div key={sub.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span className="cap mut" style={{ fontSize: 10.5 }}>{sub.title}</span>
                        <p style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.5 }}>
                          {sub.items.join(' · ')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 5. Themed Curations Section */}
      {showThemes && (
        <section id="themed-menus" className="sec-sm anchor" aria-labelledby="themes-title">
          <div className="menu-intro" style={{ marginBottom: 28 }}>
            <div className="menu-intro-head">
              <p className="svc-label"><span>05 / Curated by celebration style</span></p>
              <Split as="h2" id="themes-title" className="svc-title" text="*Themed Curations*" />
            </div>
            <p className="lead-copy">
              Complete culinary narratives designed for specific event atmospheres — from vibrant Bangkok street stalls to refined royal feasts.
            </p>
          </div>

          <div className="fm-cards-grid">
            {filteredThemes.map((theme) => (
              <article key={theme.id} className="fm-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
                  <span className="mc-n">{theme.number}</span>
                  {theme.thai && <span className="fm-item-thai" lang="th">{theme.thai}</span>}
                </div>

                <div>
                  <h3 style={{ font: '600 22px/1.2 var(--f-sans)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6 }}>
                    {theme.name}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    <span className="pill sm ln" style={{ fontSize: 10, minHeight: 28, padding: '0 10px' }}>
                      {theme.vibe}
                    </span>
                    <span className="cap mut" style={{ alignSelf: 'center', fontSize: 11 }}>
                      {theme.occasions}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <div>
                    <span className="cap mut" style={{ fontSize: 10.5, display: 'block', marginBottom: 4 }}>Appetizers / Bites</span>
                    <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55 }}>
                      {theme.appetizers.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <span className="cap mut" style={{ fontSize: 10.5, display: 'block', marginBottom: 4 }}>Main / Live Stations</span>
                    <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55 }}>
                      {theme.mains.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <span className="cap mut" style={{ fontSize: 10.5, display: 'block', marginBottom: 4 }}>Desserts</span>
                    <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55 }}>
                      {theme.desserts.join(' · ')}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Direct Quote consultation callout */}
      <div
        className="panel"
        style={{
          marginTop: 'clamp(32px, 4vw, 56px)',
          padding: 'clamp(28px, 4vw, 44px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20
        }}
      >
        <div style={{ maxWidth: 580 }}>
          <span className="cap mut">Custom Menus & Dietary Alignment</span>
          <h3 style={{ font: '500 clamp(22px, 2.5vw, 32px)/1.2 var(--f-sans)', letterSpacing: '-0.02em', margin: '8px 0' }}>
            Looking for a bespoke combination?
          </h3>
          <p style={{ fontSize: 15, color: 'var(--stone)', lineHeight: 1.6 }}>
            Every event is personalized. We can adapt dishes for vegan, Jain, gluten-free, or specific guest preferences without compromising authentic Thai flavor.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <PillLink href={routes.quote} variant="dk">
            {cta.quote}
          </PillLink>
          <PillLink href={routes.menu} variant="ln">
            Back to Curations
          </PillLink>
        </div>
      </div>
    </div>
  );
}

