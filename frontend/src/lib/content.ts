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
  signGuest: { src: '/img/sign-guest.jpg', alt: 'A guest holding the Mahanakorn sign beside the food counters in Bali' },
  fineDining: { src: '/img/fine-dining-mango.jpg', alt: 'Mango sticky rice with green sticky rice, gold leaf, coconut ice cream and an edible flower on a white plate' }
} satisfies Record<string, Img>;

export type FunctionRow = { n: string; name: string; fmt: string; thumbs: [Img, Img, Img] };
/** The wedding weekend, day by day, with what we serve at each event. */
export const weekend: { day: string; items: FunctionRow[] }[] = [
  { day: 'Day 1', items: [{ n: '01', name: 'Welcome dinner', fmt: 'Live food counters', thumbs: [img.marketSign, img.stationNight, img.chilli] }] },
  {
    day: 'Day 2',
    items: [
      { n: '02', name: 'Mehendi', fmt: 'Light, fresh snacks', thumbs: [img.miang, img.papaya, img.mango] },
      { n: '03', name: 'Haldi', fmt: 'Fruit, salads and coconut', thumbs: [img.papaya, img.riceSalad, img.mango] },
      { n: '04', name: 'Sangeet', fmt: 'Hot noodles and grill', thumbs: [img.khaosoi, img.stationNight, img.chilli] }
    ]
  },
  {
    day: 'Day 3',
    items: [
      { n: '05', name: 'Wedding lunch', fmt: 'Sharing plates at the table', thumbs: [img.riceSalad, img.somtum, img.larb] },
      { n: '06', name: 'Reception', fmt: 'Sit-down Thai dinner', thumbs: [img.prawns, img.dessert, img.canapes] },
      { n: '07', name: 'After-party', fmt: 'Late-night food', thumbs: [img.padthai, img.krapaoCard, img.stationNight] }
    ]
  },
  { day: 'Day 4', items: [{ n: '08', name: 'Farewell brunch', fmt: 'Thai breakfast and coffee', thumbs: [img.dessert, img.mango, img.riceSalad] }] }
];

export type SwitchItem = {
  name: string;
  image?: Img;
  shot?: string;
  meta?: string;
  text?: string;
  thai?: string;
  tags?: string[];
  list?: string[];
};

/** Types of food we offer (Home page). */
export const menus: SwitchItem[] = [
  { name: 'Live counters', image: img.stationNight, list: ['Khao soi noodles', 'Papaya salad, made to order', 'Herb salad on crispy rice', 'Grilled skewers (also vegan)', 'Mango sticky rice'] },
  { name: 'Sit-down dinner', image: img.prawns, list: ['Grilled river prawns', 'Prawns wrapped in golden noodles', 'Chicken in panang curry', 'Jackfruit coconut curry (vegan)', 'Blue sticky rice dessert'] },
  { name: 'Small bites', image: img.canapes, list: ['Herb salad on crispy rice', 'One-bite leaf wraps', 'Grilled skewers', 'Golden noodle rolls'] },
  { name: 'Late night', image: img.padthai, list: ['Pad thai', 'Fried rice', 'Toast with pandan custard'] },
  { name: 'Desserts', image: img.mango, list: ['Mango sticky rice', 'Coconut ice cream', 'Caramelised banana'] },
  { name: 'Vegetarian', image: img.krapaoCard, list: ['A vegan version at every counter', 'Egg-free desserts', 'Jain food on request (to confirm)'] }
];

/** Wedding events (Services page, weddings section). */
export const functions: SwitchItem[] = [
  { name: 'Welcome dinner', image: img.marketSign, meta: 'Day 1 · Live food counters', text: 'Four to six live counters, so families can meet and mingle as they arrive.' },
  { name: 'Mehendi', image: img.miang, meta: 'Day 2 · Light, fresh snacks', text: 'Small bites that are easy to eat with henna on your hands: leaf wraps, papaya salad, coconut ice cream.' },
  { name: 'Haldi', image: img.papaya, meta: 'Day 2 · Fruit, salads and coconut', text: 'Light, cooling food for a hot morning outdoors.' },
  { name: 'Sangeet', image: img.khaosoi, meta: 'Day 2 · Hot noodles and grill', text: 'Khao soi noodles, grilled skewers (pork and vegan) and satay, served late into the night.' },
  { name: 'Cocktails', image: img.canapes, meta: 'Day 2 · Small bites', text: 'Bite-sized Thai snacks carried around by our team.' },
  { name: 'Wedding lunch', image: img.riceSalad, meta: 'Day 3 · Sharing plates', text: 'Thai dishes served to every table for everyone to share.' },
  { name: 'Reception', image: img.prawns, meta: 'Day 3 · Sit-down dinner', text: 'A served Thai dinner, or a Thai food corner next to your main buffet.' },
  { name: 'After-party', image: img.padthai, meta: 'Day 3 · Late-night food', text: 'Pad thai, fried rice and sweet toast at 1 a.m.' },
  { name: 'Farewell brunch', image: img.dessert, meta: 'Day 4 · Thai breakfast', text: 'Rice porridge, Thai doughnuts with pandan custard, and strong Thai coffee.' }
];

/** Our live food counters (Our Menu page). */
export const stations: SwitchItem[] = [
  { name: 'Khao soi', thai: 'ข้าวซอย', image: img.khaosoi, text: 'Curry noodle soup from northern Thailand, topped with crispy noodles and lime.', tags: ['Vegan option', 'Spicy'] },
  { name: 'Som tum', thai: 'ส้มตำ', image: img.somtum, text: 'Green papaya salad, made fresh for each guest in a clay pot.', tags: ['Vegan option', 'Spicy', 'Contains nuts'] },
  { name: 'Larb', thai: 'ลาบ', image: img.larb, text: 'Spicy herb salad served on a crispy rice cracker.', tags: ['Vegan option', 'Spicy'] },
  { name: 'Krapao', thai: 'กะเพรา', image: img.krapaoEgg, text: 'Thai basil stir-fry with rice, and a fried egg if you like.', tags: ['Vegan option', 'Egg-free option'] },
  { name: 'Thai grill', thai: 'หมูปิ้ง', text: 'Grilled skewers with a tangy dipping sauce. Pork and vegan.', tags: ['Vegan option'] },
  { name: 'Miang kham', thai: 'เมี่ยงคำ', image: img.miang, text: 'One-bite leaf wraps with lime, ginger, peanuts and coconut.', tags: ['Vegan', 'Contains nuts'] },
  { name: 'Mango sticky rice', thai: 'ข้าวเหนียวมะม่วง', image: img.mango, text: 'Sweet mango with coconut sticky rice. Thailand’s favourite dessert.', tags: ['Vegan', 'Egg-free'] },
  { name: 'Thai tea', thai: 'ชาไทย', text: 'Iced Thai tea and Thai coffee.', tags: ['Vegan option'] }
];

/** Sliding row of counters on the Home page. */
export const stationStrip: { name: string; thai: string; line: string; image: Img }[] = [
  { name: 'Khao soi', thai: 'ข้าวซอย', line: 'Curry noodle soup', image: img.khaosoi },
  { name: 'Som tum', thai: 'ส้มตำ', line: 'Papaya salad, made to order', image: img.somtum },
  { name: 'Larb', thai: 'ลาบ', line: 'Herb salad on crispy rice', image: img.canapes },
  { name: 'Krapao', thai: 'กะเพรา', line: 'Thai basil, rice, fried egg', image: img.krapaoEgg },
  { name: 'Miang kham', thai: 'เมี่ยงคำ', line: 'One-bite leaf wraps', image: img.miang },
  { name: 'Mango sticky rice', thai: 'ข้าวเหนียวมะม่วง', line: 'Mango and coconut rice', image: img.mango }
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
  { id: 'weddings', name: 'Destination Weddings', image: img.signGuest, line: 'Destination and Indian weddings', text: 'Every event of the wedding weekend, from the welcome dinner to the farewell brunch.', serve: 'Live food counters, sit-down dinners, late-night food' },
  { id: 'parties', name: 'Private Events', image: img.canapes, line: 'Customized Menus', text: 'Birthdays, anniversaries, engagement parties and house parties.', serve: 'Live food counters and small bites' },
  { id: 'company', name: 'Corporate Events', image: img.corporateCounter, line: 'Large Scale Capacity', text: 'Office parties, team dinners, product launches and client evenings.', serve: 'Live food counters, a sit-down dinner, or small bites with drinks' },
  { id: 'private', name: 'Fine Dining', image: img.fineDining, line: 'Personalized Culinary Services', text: profile.privateDining[0].text, serve: 'Sit-down Thai dinner or sharing plates' }
];

/** OUR TEAM, exactly as on the client's slide (team.jpg), including its capitals. */
export const team: { role: string; lines: string[]; image: Img }[] = [
  { role: 'FOUNDER', lines: ['MEENU - BANKER'], image: { src: '/img/team-founder.jpg', alt: 'Meenu, founder of Mahanakorn' } },
  { role: 'CO FOUNDER', lines: ["KAMONPILAI 'GINK' DANWIRIYATRAKUL", 'NUTRITIONIST & FOOD STYLIST'], image: { src: '/img/team-gink.jpg', alt: "Kamonpilai 'Gink' Danwiriyatrakul, co-founder of Mahanakorn" } },
  { role: 'CO FOUNDER', lines: ['DHIVESH - PASSION IN CULINARY, ENTREPRENEUR, SOCIAL MEDIA'], image: { src: '/img/team-dhivesh.jpg', alt: 'Dhivesh, co-founder of Mahanakorn' } }
];

