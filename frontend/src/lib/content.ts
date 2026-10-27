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
  guest: { src: '/img/guest.jpg', alt: 'A wedding guest tasting a miang kham leaf wrap' },
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
  vegTarts: { src: '/img/veg-tarts.jpg', alt: 'Vegetarian tartlets on a tiered wooden stand' },
  basilRice: { src: '/img/basil-rice.jpg', alt: 'A saucy Thai stir-fry with basil and jasmine rice on banana leaf' },
  omelette: { src: '/img/thai-omelette.jpg', alt: 'A Thai omelette on banana leaf with chilli sauce' },
  teamServing: { src: '/img/team-serving.jpg', alt: 'Mahanakorn staff in branded aprons serving guests at an event' },
  khaosoiCounter: { src: '/img/khaosoi-counter.jpg', alt: 'The khao soi counter with crispy noodles, lime and pickled greens ready to serve' },
  krapaoPlate: { src: '/img/krapao-plate.jpg', alt: 'Krapao with a fried egg, jasmine rice and cucumber on a teal plate' },
  khaosoiSign: { src: '/img/khaosoi-sign.jpg', alt: 'The khao soi pot beside the Mahanakorn sign at a live counter' },
  pandanToast: { src: '/img/pandan-toast.jpg', alt: 'Grilled toast with custard and sauces on a white plate' },
  teamBangkok: { src: '/img/team-bangkok.jpg', alt: 'The Mahanakorn team in branded aprons before service' },
  thaiGrill: { src: '/img/thai-grill.jpg', alt: 'Grilled meat with crushed toasted rice and herbs, carried to the table' },
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
  { name: 'Welcome dinner', image: img.welcomeCounter, meta: 'Day 1 · Live food counters', text: 'Four to six live counters, so families can meet and mingle as they arrive.' },
  { name: 'Mehendi', image: img.pannaCotta, meta: 'Day 2 · Light, fresh snacks', text: 'Small bites that are easy to eat with henna on your hands: leaf wraps, papaya salad, coconut ice cream.' },
  { name: 'Haldi', image: img.papaya, meta: 'Day 2 · Fruit, salads and coconut', text: 'Light, cooling food for a hot morning outdoors.' },
  { name: 'Sangeet', image: img.grillPlate, meta: 'Day 2 · Hot noodles and grill', text: 'Khao soi noodles, grilled skewers (pork and vegan) and satay, served late into the night.' },
  { name: 'Cocktails', image: img.vegTarts, meta: 'Day 2 · Small bites', text: 'Bite-sized Thai snacks carried around by our team.' },
  { name: 'Wedding lunch', image: img.basilRice, meta: 'Day 3 · Sharing plates', text: 'Thai dishes served to every table for everyone to share.' },
  { name: 'Reception', image: img.prawns, meta: 'Day 3 · Sit-down dinner', text: 'A served Thai dinner, or a Thai food corner next to your main buffet.' },
  { name: 'After-party', image: img.padthai, meta: 'Day 3 · Late-night food', text: 'Pad thai, fried rice and sweet toast at 1 a.m.' },
  { name: 'Farewell brunch', image: img.omelette, meta: 'Day 4 · Thai breakfast', text: 'Rice porridge, Thai doughnuts with pandan custard, and strong Thai coffee.' }
];

/** Our live food counters (Our Menu page). */
export const stations: SwitchItem[] = [
  { name: 'Khao soi', thai: 'ข้าวซอย', image: img.khaosoiCounter, text: 'Curry noodle soup from northern Thailand, topped with crispy noodles and lime.' },
  { name: 'Som tum', thai: 'ส้มตำ', image: img.baskets, text: 'Green papaya salad, made fresh for each guest in a clay pot.' },
  { name: 'Larb', thai: 'ลาบ', image: img.larb, text: 'Spicy herb salad served on a crispy rice cracker.' },
  { name: 'Krapao', thai: 'กะเพรา', image: img.krapaoPlate, text: 'Thai basil stir-fry with rice, and a fried egg if you like.' },
  { name: 'Thai grill', thai: 'หมูปิ้ง', image: img.thaiGrill, text: 'Grilled skewers with a tangy dipping sauce. Pork and vegan.' },
  { name: 'Miang kham', thai: 'เมี่ยงคำ', image: img.guest, text: 'One-bite leaf wraps with lime, ginger, peanuts and coconut.' },
  { name: 'Mango sticky rice', thai: 'ข้าวเหนียวมะม่วง', image: img.fineDining, text: 'Sweet mango with coconut sticky rice. Thailand’s favourite dessert.' },
  { name: 'Thai tea', thai: 'ชาไทย', image: img.drinksCounter, text: 'Iced Thai tea and Thai coffee.' }
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
export const eventTypes: { id: string; name: string; image: Img; line: string; text: string; serve: string }[] = [
  { id: 'weddings', name: 'Vows Beyond Borders', image: img.pineappleCurry, line: 'Destination and Indian weddings', text: 'Every event of the wedding weekend, from the welcome dinner to the farewell brunch.', serve: 'Live food counters, sit-down dinners, late-night food' },
  { id: 'parties', name: 'Private Events', image: img.privateGuests, line: 'Customized Menus', text: 'Birthdays, anniversaries, engagement parties and house parties.', serve: 'Live food counters and small bites' },
  { id: 'company', name: 'Corporate Events', image: img.teamBangkok, line: 'Large Scale Capacity', text: 'Office parties, team dinners, product launches and client evenings.', serve: 'Live food counters, a sit-down dinner, or small bites with drinks' },
  { id: 'private', name: 'Fine Dining', image: img.fineDiningCurry, line: 'Personalized Culinary Services', text: profile.privateDining[0].text, serve: 'Sit-down Thai dinner or sharing plates' }
];

/** OUR TEAM, exactly as on the client's slide (team.jpg), including its capitals. */
export const team: { role: string; lines: string[]; image: Img }[] = [
  { role: 'FOUNDER', lines: ['MEENU - BANKER'], image: { src: '/img/team-meenu.jpg', alt: 'Meenu, founder of Mahanakorn' } },
  { role: 'CO FOUNDER', lines: ["KAMONPILAI 'GINK' DANWIRIYATRAKUL", 'NUTRITIONIST & FOOD STYLIST'], image: { src: '/img/team-gink.jpg', alt: "Kamonpilai 'Gink' Danwiriyatrakul, co-founder of Mahanakorn" } },
  { role: 'CO FOUNDER', lines: ['DHIVESH - PASSION IN CULINARY, ENTREPRENEUR, SOCIAL MEDIA'], image: { src: '/img/team-dhivesh.jpg', alt: 'Dhivesh, co-founder of Mahanakorn' } },
  { role: 'CO FOUNDER', lines: ['PRANAV - DRINKS EXPERT'], image: { src: '/img/team-pranav.jpg', alt: 'Pranav, co-founder of Mahanakorn' } }
];

