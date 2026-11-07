'use client';

import { useMemo, useState } from 'react';
import Split from '@/components/Split';
import { PillLink } from '@/components/Pill';
import {
  horsDoeuvres,
  mainCourses,
  desserts,
  type DishItem
} from '@/lib/fullMenuData';
import { cta, routes } from '@/lib/site';

type CategoryKey = 'all' | 'hors' | 'mains' | 'desserts';
type DietKey = 'all' | 'V' | 'NV';

export default function MenuClient() {
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

  const totalFilteredCount =
    filteredHors.length + filteredMains.length + filteredDesserts.length;

  const showHors = (activeCategory === 'all' || activeCategory === 'hors') && filteredHors.length > 0;
  const showMains = (activeCategory === 'all' || activeCategory === 'mains') && filteredMains.length > 0;
  const showDesserts = (activeCategory === 'all' || activeCategory === 'desserts') && filteredDesserts.length > 0;

  return (
    <div className="full-menu-wrap">
      {/* Category Tabs, Dietary Filter & Search */}
      <div className="fm-bar">
        <div className="fm-tabs" role="tablist" aria-label="Menu Sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`fm-tab${activeCategory === 'all' ? ' on' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Dishes
            <span className="fm-tab-count">
              {horsDoeuvres.length + mainCourses.length + desserts.length}
            </span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'hors'}
            className={`fm-tab${activeCategory === 'hors' ? ' on' : ''}`}
            onClick={() => setActiveCategory('hors')}
          >
            Hors d’oeuvres
            <span className="fm-tab-count">{horsDoeuvres.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'mains'}
            className={`fm-tab${activeCategory === 'mains' ? ' on' : ''}`}
            onClick={() => setActiveCategory('mains')}
          >
            Main Course
            <span className="fm-tab-count">{mainCourses.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'desserts'}
            className={`fm-tab${activeCategory === 'desserts' ? ' on' : ''}`}
            onClick={() => setActiveCategory('desserts')}
          >
            Desserts
            <span className="fm-tab-count">{desserts.length}</span>
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
            >
              <span className="fm-diet-dot v" />
              Veg
            </button>
            <button
              type="button"
              className={`fm-diet-btn${diet === 'NV' ? ' on' : ''}`}
              onClick={() => setDiet('NV')}
            >
              <span className="fm-diet-dot nv" />
              Non-Veg
            </button>
          </div>

          <div className="fm-search-wrap">
            <svg
              className="fm-search-icon"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              aria-label="Search dishes"
              className="fm-search"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="fm-search-clear"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty State when filters produce no result */}
      {totalFilteredCount === 0 && (
        <div className="fm-empty" data-reveal>
          <p className="fm-empty-title">No dishes found</p>
          <p className="fm-empty-sub">
            {query
              ? `No dishes match "${query}". Try searching another ingredient or clearing your filters.`
              : 'No dishes match the selected dietary filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setDiet('all');
              setQuery('');
              setActiveCategory('all');
            }}
            className="fm-empty-btn"
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
              <p className="svc-label"><span>02 / Curries, wok & noodles</span></p>
              <Split as="h2" id="mains-title" className="svc-title" text="*Main Course*" />
            </div>
            <p className="lead-copy">
              Aromatic coconut curries, fiery holy basil wok-tossed dishes, and artisanal noodles prepared fresh with regional Thai herbs.
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
              <p className="svc-label"><span>03 / Traditional sweets & desserts</span></p>
              <Split as="h2" id="desserts-title" className="svc-title" text="*Desserts*" />
            </div>
            <p className="lead-copy">
              From classic sweet mango sticky rice and warm coconut-rice pancake cakes to artisanal Thai tea pastries and tropical ice cream flights.
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

      {/* Quote Banner */}
      <div className="fm-quote-banner" data-reveal>
        <div className="fm-quote-copy">
          <h3 className="fm-quote-title">Looking for a custom combination?</h3>
          <p className="fm-quote-text">
            Tell us your guest count, dietary preferences, and event style. We will curate a tailored tasting selection for your celebration.
          </p>
        </div>
        <PillLink href={routes.quote} variant="dk">
          {cta.quote}
        </PillLink>
      </div>
    </div>
  );
}

