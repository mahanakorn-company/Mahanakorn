/** Website content in one place, so copy and photos can be changed without touching layout code. */

export type Img = { src: string; alt: string };

export const img = {
  stationNight: { src: '/img/station-night.jpg', alt: 'The khao soi station at night, with garnish bowls and a basket of crispy noodles' },
  marketSign: { src: '/img/market-sign.jpg', alt: 'Rattan baskets of fresh produce beside the Mahanakorn station sign' },
  baskets: { src: '/img/baskets.jpg', alt: 'Baskets of papaya, beans, tomato and chilli at a som tum station' },
  corporateCounter: { src: '/img/corporate-counter.jpg', alt: 'Mahanakorn chefs serving a guest at a live food counter in a lit event tent' },
  prawns: { src: '/img/prawns.jpg', alt: 'Grilled river prawns with herb salad, plated' },
  canapes: { src: '/img/canapes.jpg', alt: 'Crispy rice canapés topped with spiced filling and chilli on banana leaf' },
  krapaoCard: { src: '/img/krapao-card.jpg', alt: 'Mahanakorn station card reading Krapao, vegan' },
  chef: { src: '/img/chef.jpg', alt: 'A Mahanakorn chef serving curry to a guest at a live station' },
  miangPlated: { src: '/img/miang-plated.jpg', alt: 'Miang kham plated with pomelo, toasted coconut and an edible flower in a glazed dish' },
  khaosoi: { src: '/img/khaosoi.jpg', alt: 'A bowl of khao soi beside its vegan station card' },
  somtum: { src: '/img/somtum.jpg', alt: 'Som tum in a white bowl' },
  larb: { src: '/img/larb.jpg', alt: 'Larb on crispy rice crackers on banana leaf' },
  miang: { src: '/img/miang.jpg', alt: 'Miang kham leaf wraps in a basket' },
  riceSalad: { src: '/img/rice-salad.jpg', alt: 'Southern Thai butterfly-pea rice salad' },
  mango: { src: '/img/mango.jpg', alt: 'Mango sticky rice in a banana-leaf boat' },
  chilli: { src: '/img/chilli.jpg', alt: 'A basket of red chillies and garlic' },
  dessert: { src: '/img/dessert.jpg', alt: 'Plated Thai dessert with coconut ice cream' },
  krapaoEgg: { src: '/img/krapao-egg.jpg', alt: 'Krapao with a fried egg and jasmine rice' },
  pineapple: { src: '/img/pineapple.jpg', alt: 'Pineapple fried rice with prawns served in a pineapple' },
  padthai: { src: '/img/padthai.jpg', alt: 'A plate of pad thai handed across a live station' },
  papaya: { src: '/img/papaya.jpg', alt: 'Shredded green papaya and carrot in a rattan basket' },
  smoked: { src: '/img/smoked.jpg', alt: 'A glass smoke cloche lifted from a drink at a guest table' },
  menuHero: { src: '/img/menu-hero.jpg', alt: 'Larb on crispy rice crackers, laid out on banana leaf on a wooden tray' },
  pineappleCurry: { src: '/img/pineapple-curry.jpg', alt: 'Vegetarian pineapple curry served in pineapple halves on banana leaf, with the Mahanakorn card' },
  fineDining: { src: '/img/fine-dining-mango.jpg', alt: 'Mango sticky rice with green sticky rice, gold leaf, coconut ice cream and an edible flower on a white plate' },
  // Client photos, second batch (October 2026). Every photo is used in one place only.
  privateGuests: { src: '/img/private-guests.jpg', alt: 'Friends sharing a meal and reading the menu at an outdoor table' },
  fineDiningCurry: { src: '/img/fine-dining-curry.jpg', alt: 'A Thai curry with prawn in a ribbed white bowl, carried to the table' },
  guestsMenu: { src: '/img/guests-menu.jpg', alt: 'Two guests reading the menu at the bar' },
  weddingLiveCounter: { src: '/img/wedding-live-counter.jpg', alt: 'A guest choosing food at the Mahanakorn live counters in a wedding tent, with chefs serving' },
  welcomeCounter: { src: '/img/welcome-counter.jpg', alt: 'A Mahanakorn cook ladling curry at an outdoor live counter' },
  pannaCotta: { src: '/img/panna-cotta.jpg', alt: 'Vegetarian coconut panna cotta served in spoons on banana leaf' },
  grillPlate: { src: '/img/thai-grill-plate.jpg', alt: 'Grilled meat with crushed toasted rice and a fresh herb salad' },
  cocktailBar: { src: '/img/cocktail-bar.jpg', alt: 'An iced drink with a striped straw, served on a lit tray at the bar' },
  basilRice: { src: '/img/basil-rice.jpg', alt: 'A saucy Thai stir-fry with basil and jasmine rice on banana leaf' },
  omelette: { src: '/img/thai-omelette.jpg', alt: 'A Thai omelette on banana leaf with chilli sauce' },
  corporateDrinks: { src: '/img/corporate-drinks.jpg', alt: 'A cocktail in a coupe glass and iced drinks served at the bar' },
  khaosoiCounter: { src: '/img/khaosoi-counter.jpg', alt: 'The khao soi counter with crispy noodles, lime and pickled greens ready to serve' },
  krapaoPlate: { src: '/img/krapao-plate.jpg', alt: 'Krapao with a fried egg, jasmine rice and cucumber on a teal plate' },
  khaosoiCups: { src: '/img/khaosoi-cups.jpg', alt: 'Khao soi served in small cups, each topped with a slice of lime' },
  pandanToast: { src: '/img/pandan-toast.jpg', alt: 'Grilled toast with custard and sauces on a white plate' },
  teamBangkok: { src: '/img/team-bangkok.jpg', alt: 'The Mahanakorn team in branded aprons before service' },
  thaiGrill: { src: '/img/thai-grill-skewers.jpg', alt: 'Grilled meat skewers with coriander and a dipping sauce, carried to the table' },
  drinksCounter: { src: '/img/drinks-counter.jpg', alt: 'Drinks being made to order at the bar counter' }
} satisfies Record<string, Img>;

export type SwitchItem = {
  name: string;
  image?: Img;
  shot?: string;
  meta?: string;
  text?: string;
  thai?: string;
  list?: string[];
};

/** Wedding events (Services page, weddings section). */
export const functions: SwitchItem[] = [
  { name: 'Welcome dinner', image: img.welcomeCounter },
  { name: 'Mehendi', image: img.pannaCotta },
  { name: 'Haldi', image: img.papaya },
  { name: 'Sangeet', image: img.grillPlate },
  { name: 'Cocktails', image: img.drinksCounter },
  { name: 'Wedding lunch', image: img.basilRice },
  { name: 'Reception', image: img.prawns },
  { name: 'After-party', image: img.padthai },
  { name: 'Farewell brunch', image: img.omelette }
];

/** Our live food counters (Our Menu page). */
export const stations: SwitchItem[] = [
  { name: 'Khao soi', thai: 'ข้าวซอย', image: img.khaosoiCounter },
  { name: 'Som tum', thai: 'ส้มตำ', image: img.baskets },
  { name: 'Larb', thai: 'ลาบ', image: img.larb },
  { name: 'Krapao', thai: 'กะเพรา', image: img.krapaoPlate },
  { name: 'Thai grill meat', thai: 'หมูปิ้ง', image: img.thaiGrill },
  { name: 'Miang kham', thai: 'เมี่ยงคำ', image: img.miangPlated },
  { name: 'Mango sticky rice', thai: 'ข้าวเหนียวมะม่วง', image: img.fineDining },
  { name: 'Thai tea', thai: 'ชาไทย', image: img.cocktailBar }
];

/** Sliding row of counters on the Home page. */
export const stationStrip: { name: string; thai: string; image: Img }[] = [
  { name: 'Khao soi', thai: 'ข้าวซอย', image: img.khaosoi },
  { name: 'Som tum', thai: 'ส้มตำ', image: img.somtum },
  { name: 'Larb', thai: 'ลาบ', image: img.canapes },
  { name: 'Krapao', thai: 'กะเพรา', image: img.krapaoEgg },
  { name: 'Miang kham', thai: 'เมี่ยงคำ', image: img.miang },
  { name: 'Mango sticky rice', thai: 'ข้าวเหนียวมะม่วง', image: img.mango }
];

/** Ready-made counter menus (Our Menu page). */
export const stationSets = [
  { when: 'For parties and welcome dinners', name: 'Bangkok night market', items: [['Khao soi', 'ข้าวซอย'], ['Som tum', 'ส้มตำ'], ['Thai grill', 'หมูปิ้ง'], ['Krapao', 'กะเพรา'], ['Mango sticky rice', 'ข้าวเหนียวมะม่วง']] },
  { when: 'For daytime events, lunches and Mehendi', name: 'Fresh and light', items: [['Miang kham', 'เมี่ยงคำ'], ['Som tum', 'ส้มตำ'], ['Rice salad', 'ข้าวยำ'], ['Coconut ice cream', 'ไอติมกะทิ']] },
  { when: 'For late nights and after-parties', name: 'Late night', items: [['Pad thai', 'ผัดไทย'], ['Grilled skewers (also vegan)', 'หมูปิ้ง'], ['Toast with pandan custard', 'ขนมปังสังขยา']] }
] as const;

/** How booking works, step by step. */
export const steps = [
  { title: 'Share your vision', text: 'Tell us the occasion, date, place and number of guests.' },
  { title: 'Receive a bespoke proposal', text: 'We send a menu and price on WhatsApp within 1–2 days.' },
  { title: 'Taste before you decide', text: 'Join us for a tasting in Bangkok or at one of our pop-ups.' },
  { title: 'Leave the rest to us', text: 'Our team cooks and serves on the day, so you can enjoy your event.' }
];

/**
 * The client's own wording, copied exactly from the Mahanakorn company profile (Given/menu-1..3.jpg, team.jpg).
 * Keep this text as the client wrote it.
 */
export const profile = {
  intro: 'Born out of love for Thai food, Mahanakorn is a homegrown crew from Thailand',
  pillars: [
    { title: 'Authentic Thai Cuisine', text: 'MAHANAKORN delivers the greatest tasting authentic Thai food with passion and excellence.' },
    { title: 'Global Pop-Up Events', text: 'Hosts pop-up events worldwide, showcasing culinary expertise and expanding presence.' },
    { title: 'Diverse Catering Services', text: 'Covers weddings, private parties, and corporate events with flexible, high-quality service.' },
    { title: 'Cultural Heritage Focus', text: 'Every event is infused with rich Thai flavors and cultural heritage for memorable experiences.' }
  ],
  // The first heading is partly hidden under the slide title: "Comm… ty", about 28 characters wide, so "Commitment to Sustainability".
  mission: [
    { title: 'Commitment to Sustainability', text: 'Focus on fresh, sustainable ingredients ensures environmentally responsible meals.' },
    { title: 'Authentic Thai Cuisine', text: 'Traditional Thai cooking techniques create genuine, creative dishes with cultural authenticity.' },
    { title: 'Passion and Detail', text: 'Food is made with heart, passion, and meticulous attention enhancing the dining experience.' },
    { title: 'Excellence and Innovation', text: 'Dedication to culinary innovation builds reputation for exceptional service and quality.' }
  ],
  catering: [
    { title: 'Large Scale Capacity', text: 'Supports catering for over 1000 guests at various event types with efficient service.' },
    { title: 'Customized Menus', text: 'Collaborates with clients to create menus tailored to themes, diets, and cultures.' },
    { title: 'Quality and Detail', text: 'Each dish is crafted perfectly with attention to quality and guest satisfaction.' },
    { title: 'Flexible Catering Solutions', text: 'Offers scalable and adaptable catering services for events of any size or complexity.' }
  ],
  privateDining: [
    { title: 'Personalized Culinary Services', text: 'Clients receive bespoke menus tailored to their tastes and preferences. Dining locations are flexible to client choice.' },
    { title: 'Chef Interaction Experience', text: 'Guests interact with chefs to learn about ingredients, techniques, and cultural stories behind dishes.' },
    { title: 'Cultural and Culinary Immersion', text: "The experience highlights Thai cuisine's authenticity and rich cultural background, enhancing appreciation." },
    { title: 'Versatile Event Options', text: 'Ideal for romantic dinners, family celebrations, and business gatherings with luxury and authenticity..' }
  ],
  consultations: [
    { title: 'Personalized Culinary Guidance', text: 'One-on-one sessions tailor to individual and business culinary goals and interests.' },
    { title: 'Expertise in Thai Cuisine', text: 'Experienced chefs share knowledge on traditional cooking methods and ingredient selection.' },
    { title: 'Hands-on Experience', text: 'Participants gain practical skills and insights to improve cooking or business strategies.' },
    { title: 'Cultural Education & Mentorship', text: 'Service reflects commitment to cultural exchange and professional culinary mentorship.' }
  ]
};

/** The four services we offer (Home and Services pages). `id` is the anchor on the Services page. */
export const eventTypes: { id: string; name: string; image: Img; line: string; text: string }[] = [
  { id: 'weddings', name: 'Vows Beyond Borders', image: img.pineappleCurry, line: 'Destination and Indian weddings', text: 'Every event of the wedding weekend, from the welcome dinner to the farewell brunch.' },
  { id: 'parties', name: 'Private Events', image: img.privateGuests, line: 'Customized Menus', text: 'Our private dining experiences are flawlessly executed from menu curation to tableside service.' },
  { id: 'company', name: 'Corporate Events', image: img.teamBangkok, line: 'Large Scale Capacity', text: 'We design and execute private corporate events with precision and style. Whether hosting 20 executives or 500 guests, we bring together refined cuisine and seamless service — anywhere in the world.' },
  { id: 'private', name: 'Fine Dining', image: img.fineDiningCurry, line: 'Personalized Culinary Services', text: profile.privateDining[0].text }
];

/** OUR TEAM, exactly as on the client's slide (team.jpg), including its capitals. */
export const team: { role: string; name: string; desc: string; image: Img }[] = [
  { role: 'FOUNDER', name: 'MEENU', desc: 'BANKER', image: { src: '/img/team-meenu.jpg', alt: 'Meenu, founder of Mahanakorn' } },
  { role: 'CO FOUNDER', name: 'GINK', desc: 'NUTRITIONIST & FOOD STYLIST', image: { src: '/img/team-gink.jpg', alt: "Kamonpilai 'Gink' Danwiriyatrakul, co-founder of Mahanakorn" } },
  { role: 'CO FOUNDER', name: 'DHIVESH', desc: 'PASSION IN CULINARY, ENTREPRENEUR, SOCIAL MEDIA', image: { src: '/img/team-dhivesh.jpg', alt: 'Dhivesh, co-founder of Mahanakorn' } },
  { role: 'CO FOUNDER', name: 'PRANAV', desc: 'BEVERAGE CURATOR', image: { src: '/img/team-pranav.jpg', alt: 'Pranav, co-founder of Mahanakorn' } }
];

