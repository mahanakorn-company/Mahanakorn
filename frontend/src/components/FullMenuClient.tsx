'use client';

import { useMemo, useState } from 'react';
import Split from '@/components/Split';
import { PillLink } from '@/components/Pill';
import { ArrowRight } from '@/components/Icons';
import {
  horsDoeuvres,
  mainCourses,
  desserts,
  type DishItem
} from '@/lib/fullMenuData';
import { cta, routes } from '@/lib/site';

type CategoryKey = 'all' | 'hors' | 'mains' | 'desserts';
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

  const showHors = (activeCategory === 'all' || activeCategory === 'hors') && filteredHors.length > 0;
  const showMains = (activeCategory === 'all' || activeCategory === 'mains') && filteredMains.length > 0;
  const showDesserts = (activeCategory === 'all' || activeCategory === 'desserts') && filteredDesserts.length > 0;

  const totalResults =
    (showHors ? filteredHors.length : 0) +
    (showMains ? filteredMains.length : 0) +
    (showDesserts ? filteredDesserts.length : 0);

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

