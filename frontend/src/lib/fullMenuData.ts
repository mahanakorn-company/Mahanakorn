export type DishItem = {
  name: string;
  thai?: string;
  note?: string;
  diet: 'V' | 'NV';
};

export type StationConcept = {
  id: string;
  number: string;
  name: string;
  thai?: string;
  tagline: string;
  items: string[];
  setupNote?: string;
  subsections?: { title: string; items: string[] }[];
};

export type ThemeMenu = {
  id: string;
  number: string;
  name: string;
  thai?: string;
  vibe: string;
  occasions: string;
  appetizers: string[];
  mains: string[];
  desserts: string[];
};

export const horsDoeuvres: DishItem[] = [
  // Non-Vegetarian
  { name: 'Shrimp + Pomelo + Avocado Skewer', diet: 'NV', note: 'Fresh poached river shrimp with citrus pomelo and avocado' },
  { name: 'Tempeh + Pomelo + Avocado Skewer', diet: 'V', note: 'Marinated crispy tempeh skewer with fresh pomelo and avocado' },
  { name: 'Starfruit with Herb Chicken', diet: 'NV', note: 'Sliced starfruit crowned with aromatic spiced minced chicken' },
  { name: 'Pineapple with Herb Chicken', diet: 'NV', note: 'Fresh pineapple bite topped with caramelized herb chicken' },
  { name: 'Larb with Sugarcane Chicken', diet: 'NV', thai: 'ลาบไก่อ้อย', note: 'Isan herb chicken served on sweet roasted sugarcane skewer' },
  { name: 'Larb Cracker Chicken', diet: 'NV', thai: 'ลาบไก่', note: 'Spiced chicken larb with toasted rice powder on crispy rice cracker' },
  { name: 'Northern Thai Pork Sausage Puff Pastry', diet: 'NV', thai: 'ไส้อั่ว', note: 'Herbed Chiang Mai sai oua sausage baked in golden flaky puff pastry' },
  { name: 'Salmon Salad', diet: 'NV', thai: 'พล่าแซลมอน', note: 'Thai spiced salmon salad with lemongrass, mint and chili lime dressing' },
  { name: 'Crab Omelette Bite', diet: 'NV', thai: 'ไข่เจียวปู', note: 'Crisp golden Thai omelette filled with jumbo lump blue crab' },
  { name: 'Moo Ping', diet: 'NV', thai: 'หมูปิ้ง', note: 'Bangkok charcoal grilled pork skewers with jaew tamarind dipping sauce' },
  { name: 'Prawn Satay', diet: 'NV', thai: 'กุ้งสะเต๊ะ', note: 'Grilled marinated prawn skewers served with peanut sauce and cucumber relish' },
  { name: 'Thai Pork Sausage', diet: 'NV', thai: 'ไส้กรอกอีสาน', note: 'Fermented Isan sausage grilled over charcoal with fresh ginger and bird’s eye chili' },
  { name: 'Miang Kham with Lamb and Chili Jam', diet: 'NV', note: 'Betel leaf wrap filled with spiced lamb, nam prik pao roasted chili jam and toasted coconut' },
  { name: 'Southern Thai Grilled Chicken', diet: 'NV', thai: 'ไก่กอและ', note: 'Gai Golae grilled chicken basted in rich red coconut-curry glaze' },
  { name: 'Noodle Station (Small Bowl)', diet: 'NV', note: 'Tasting-size live soup or dry noodle bowls handed fresh across the counter' },
  { name: 'La Tiang', diet: 'NV', thai: 'ล่าเตียง', note: 'Traditional royal Thai egg-net purse stuffed with spiced minced filling' },

  // Vegetarian
  { name: 'Southern Thai Grilled Corn', diet: 'V', note: 'Charred sweet corn basted with coconut cream, palm sugar and sea salt' },
  { name: 'Thai Flower Dumpling', diet: 'V', thai: 'ช่อม่วง', note: 'Chor Muang hand-pinched butterfly-pea purple flower dumplings with sweet radish' },
  { name: 'Choo Chee with Grilled Cauliflower', diet: 'V', thai: 'ฉู่ฉี่', note: 'Rich coconut choo chee curry reduction over charcoal-grilled cauliflower' },
  { name: 'Sticky Rice & Relish Station', diet: 'V', thai: 'ข้าวเหนียว', note: 'Steamed Thai sticky rice with an assortment of plant-based relishes and dips' },
  { name: 'Thai Holy Basil Fried Rice with Paneer', diet: 'V', note: 'Wok-tossed jasmine rice with holy basil, garlic, chili and seared paneer' },
  { name: 'Pineapple Fried Rice', diet: 'V', thai: 'ข้าวผัดสับปะรด', note: 'Jasmine rice stir-fried with sweet pineapple, turmeric, raisins and cashew nuts' },
  { name: 'Classic Green Curry Bite', diet: 'V', thai: 'แกงเขียวหวาน', note: 'Aromatic green curry served in crisp canapé shells with Thai basil and pea eggplant' },
  { name: 'Larb with Sugarcane Chickpea', diet: 'V', thai: 'ลาบ', note: 'Spiced crushed chickpea and mint larb mounted on roasted sugarcane' },
  { name: 'Larb Cracker Mushroom', diet: 'V', note: 'Wild mushroom larb with toasted rice and lime on a crispy rice cracker' },
  { name: 'Fried Miang Kham Pomelo', diet: 'V', note: 'Crisp betel leaf tempura topped with juicy pomelo, toasted coconut and palm syrup' },
  { name: 'Watermelon with Tofu Furikake', diet: 'V', note: 'Chilled sweet watermelon cubes with crispy dried tofu, shallots and sesame' },
  { name: 'Kimchi Tofu Wonton with Chili Oil', diet: 'V', note: 'Handmade steamed wonton filled with tofu and house-fermented kimchi, dressed in chili oil' },
  { name: 'Grilled Eggplant with Crispy Quinoa Salad', diet: 'V', note: 'Smoky grilled Thai eggplant tossed with lime, mint and toasted crispy quinoa' },
  { name: 'Live Som Tum Station Bite', diet: 'V', thai: 'ส้มตำ', note: 'Green papaya pounded live in a clay mortar with lime, peanuts and tamarind' },
  { name: 'Fruit Som Tum', diet: 'V', thai: 'ตำผลไม้', note: 'Seasonal tropical fruits pounded with chili, palm sugar, lime and crushed peanuts' },
  { name: 'Miang Kham Cones', diet: 'V', thai: 'เมี่ยงคำ', note: 'Hand-rolled betel leaf cones with roasted coconut, ginger, lime, peanuts and palm syrup' },
  { name: 'Morning Glory or Kale Bite', diet: 'V', thai: 'ผักบุ้งไฟแดง', note: 'Flash-seared greens with garlic, fermented bean sauce and bird’s eye chili' },
  { name: 'Tom Yum with Seasonal Veg Produce', diet: 'V', thai: 'ต้มยำ', note: 'Fragrant lemongrass and kaffir lime broth with seasonal farm vegetables' },
  { name: 'Spicy Pomelo Salad', diet: 'V', thai: 'ยำส้มโอ', note: 'Tender pink pomelo segments tossed with crispy shallots, toasted coconut and lime dressing' },
  { name: 'Baked Riceberry', diet: 'V', thai: 'ข้าวไรซ์เบอร์รี่', note: 'Antioxidant-rich purple Riceberry grain seasoned and baked with herbs' }
];

export const mainCourses: DishItem[] = [
  // Non-Vegetarian
  { name: 'Golden Noodle Shrimp with Guacamole', diet: 'NV', note: 'Crispy noodle-wrapped jumbo shrimp paired with Thai-spiced guacamole' },
  { name: 'Ka Prao Kai', diet: 'NV', thai: 'กะเพราไก่', note: 'Minced chicken stir-fried with fiery holy basil, garlic and chili, served over jasmine rice' },
  { name: 'Pad Thai River Prawn', diet: 'NV', thai: 'ผัดไทยกุ้งแม่น้ำ', note: 'Live wok-fried rice noodles with tamarind reduction, egg, crushed peanuts and grilled giant river prawn' },
  { name: '3-Flavored Fried Fish', diet: 'NV', thai: 'ปลาราดพริกสามรส', note: 'Crispy whole fish fillet dressed in classic sweet, sour and spicy tamarind chili glaze' },
  { name: 'Thai Holy Basil Fried Rice with Grilled Bacon & Marinated Egg Yolk', diet: 'NV', note: 'Smoky wok fried rice with crispy bacon, holy basil and cured egg yolk' },
  { name: 'Prawn Tom Yum', diet: 'NV', thai: 'ต้มยำกุ้ง', note: 'Traditional hot and sour prawn soup with lemongrass, galangal, straw mushrooms and kaffir lime' },
  { name: 'Pineapple Fried Rice with Protein', diet: 'NV', thai: 'ข้าวผัดสับปะรด', note: 'Curry-scented fried rice with choice of chicken or shrimp, served in a carved pineapple' },
  { name: 'Smoked Fish with Curry', diet: 'NV', note: 'Tender smoked fish simmered in a fragrant turmeric and coconut broth' },
  { name: 'Classic Green Curry with Choice of Protein', diet: 'NV', thai: 'แกงเขียวหวาน', note: 'Rich coconut green curry with Thai eggplant, sweet basil and choice of chicken, beef or seafood' },

  // Vegetarian
  { name: 'Stir Fried Paneer with Assorted Veggies', diet: 'V', note: 'Seared paneer cubes tossed in a hot wok with bell peppers, snow peas and garlic-soy sauce' },
  { name: 'Custard Tofu Krapao with Jasmine Rice', diet: 'V', thai: 'กะเพราเต้าหู้', note: 'Silken egg-free custard tofu seared and tossed with spicy holy basil over steamed jasmine rice' },
  { name: 'Indonesian Sambal Cabe Ijo with Marinated Tempe', diet: 'V', note: 'Crisp fried organic tempeh coated in aromatic green chili sambal and kaffir lime' },
  { name: 'Khao Soi with Fresh Truffle', diet: 'V', thai: 'ข้าวซอยเห็ดทรัฟเฟิล', note: 'Northern Thai rich coconut curry noodle soup elevated with freshly shaved truffle, crispy noodle crown and pickles' },
  { name: 'Panang Squash in Pumpkin Shell with Riceberry', diet: 'V', thai: 'พะแนงฟักทอง', note: 'Velvety Panang curry simmered inside a whole roasted pumpkin, served with purple Riceberry' },
  { name: 'Southern Pineapple Curry with Croissant', diet: 'V', note: 'Tangy-sweet Southern Thai yellow coconut curry with pineapple, served alongside warm buttery croissants' },
  { name: 'Ka Prao Tofu', diet: 'V', thai: 'กะเพราเต้าหู้', note: 'Fried custard tofu tossed with fragrant Thai holy basil sauce over fragrant jasmine rice' },
  { name: 'Pad Thai Vegetarian', diet: 'V', thai: 'ผัดไทยเจ', note: 'Chantaburi rice noodles stir-fried with firm tofu, bean sprouts, garlic chives, crushed peanuts and tamarind' }
];

export const desserts: DishItem[] = [
  { name: 'Coconut Pandan Panna Cotta with Palm Sugar', diet: 'V', note: 'Silky pandan and coconut cream panna cotta drizzled with smoky palm sugar caramel' },
  { name: 'Mango Sticky Rice Puff Pastry', diet: 'V', note: 'Flaky baked pastry filled with sweet coconut sticky rice and ripe Nam Dok Mai mango compote' },
  { name: 'Thai Tiramisu Caddy', diet: 'V', note: 'Espresso-soaked sponge layered with Thai tea infused mascarpone cream' },
  { name: 'Mango Sticky Rice', diet: 'V', thai: 'ข้าวเหนียวมะม่วง', note: 'Classic sweet coconut sticky rice with ripe golden mango, coconut cream and crispy yellow mung beans' },
  { name: 'Coconut Ice Cream with Condiments', diet: 'V', thai: 'ไอติมกะทิ', note: 'Fresh coconut milk ice cream served with sticky rice, roasted peanuts, sweet corn and palm seeds' },
  { name: 'Toast with Pandan Custard', diet: 'V', thai: 'ขนมปังสังขยา', note: 'Brioche toast charcoal-grilled on site, served warm with homemade pandan coconut egg custard' },
  { name: 'Caramelized Banana with Ice Cream', diet: 'V', thai: 'กล้วยทอดไอศกรีม', note: 'Charred caramelized baby bananas served with a scoop of coconut or vanilla ice cream' },
  { name: 'Tub Tim Krob', diet: 'V', thai: 'ทับทิมกรอบ', note: 'Crisp water chestnut rubies in sweet scented coconut milk over crushed shaved ice' },
  { name: 'Mini Ice Cream Flights', diet: 'V', note: 'Tasting scoops: Thai tea, coconut, pandan, lod chong, mango, passion fruit, and tamarind' },
  { name: 'Kanom Krok', diet: 'V', thai: 'ขนมครก', note: 'Traditional coconut-rice pancake cakes cooked live on sizzling cast-iron indent pans with corn and scallions' }
];

export const stationConcepts: StationConcept[] = [
  {
    id: 'rice-bar',
    number: '01',
    name: 'Khao Suay (Rice Bar)',
    thai: 'บาร์ข้าวสวย',
    tagline: 'The foundation of the Thai meal, cooked live in traditional style.',
    setupNote: 'Presented in large authentic rice cookers, wooden paddles, and woven burlap sacks with hand-painted Thai lettering.',
    items: ['Jasmine Rice (Khao Hom Mali)', 'Brown Rice (Khao Klong)', 'Khao Pad (Wok Fried Rice)', 'Glutinous Sticky Rice (Khao Niew)']
  },
  {
    id: 'curries',
    number: '02',
    name: 'Curries (Khaang)',
    thai: 'แกงไทย',
    tagline: 'Slow-simmered regional Thai curries served piping hot in artisanal small pots.',
    setupNote: 'Cast bronze and ceramic pots over soft warming burners with fresh Thai herbs on display.',
    items: ['Central Green Curry (Gaeng Kiew Wan)', 'Royal Massaman Curry with roasted peanuts', 'Ka Pao Curry', 'Tropical Mixed Fruit Curry']
  },
  {
    id: 'toppings',
    number: '03',
    name: 'Toppings & Relishes Bar',
    thai: 'เครื่องเคียงและน้ำพริก',
    tagline: 'Fresh herbs, crunchy aromatics and house relishes to customize every bowl.',
    setupNote: 'Small glazed celadon bowls with brass serving spoons on banana leaf runners.',
    items: ['Crispy Golden Garlic', 'Fried Sweet Shallots', 'Fresh Thai Holy Basil leaves', 'Nam Jim Jaew (Toasted rice & tamarind sauce)']
  },
  {
    id: 'noodle-bar',
    number: '04',
    name: 'Live Noodle Bar',
    thai: 'บาร์ก๋วยเตี๋ยว',
    tagline: 'Steaming woks, simmering aromatic broths, and custom bowls made to order.',
    setupNote: 'Live open wok with billows of aromatic steam. Condiment bar set in handmade ceramic bowls and bamboo tokris.',
    items: [],
    subsections: [
      {
        title: 'Broths & Soups',
        items: ['Tom Yum (Hot & Sour lemongrass)', 'Tom Kha (Rich galangal coconut)', 'Clear Broth (Fragrant vegetable / chicken)', 'Boat Noodle Broth (Rich spiced herb broth)', 'Khao Soi (Northern Thai curry broth)']
      },
      {
        title: 'Proteins',
        items: ['Silken Tofu', 'Wild Mushrooms', 'Tender Chicken', 'Sweet River Prawn']
      },
      {
        title: 'Fresh Noodles',
        items: ['Rice Noodles (Sen Lek)', 'Egg Noodles (Bamee)', 'Glass Noodles (Woon Sen)', 'Whole Wheat & Millet Noodles']
      },
      {
        title: 'Condiments Bar',
        items: ['Chili Vinegar', 'House Chili Oil & Roasted Flakes', 'Crushed Roasted Peanuts', 'Fresh Lime Wedges', 'Fish Sauce', 'Plant-based Vegan Fish Sauce']
      }
    ]
  },
  {
    id: 'som-tam',
    number: '05',
    name: 'Live Som Tam Station',
    thai: 'สถานีส้มตำสด',
    tagline: 'Green papaya salads pounded fresh to order with custom spice levels.',
    setupNote: 'Chefs in traditional indigo Mo Hom shirts and straw farmer hats pounding in tall clay mortars.',
    items: ['Crisp Green Papaya (Classic Som Tam Thai)', 'Sweet Table Grape Som Tam', 'Charred Pineapple Som Tam', 'Cherry Tomato & Long Bean Salad', 'Sweet Longan Fruit Som Tam', 'Lychee Som Tam', 'Raw Mango Som Tam']
  },
  {
    id: 'satay-grill',
    number: '06',
    name: 'Satay Bar & Charcoal Grill Hut',
    thai: 'กระท่อมเตาย่างสะเต๊ะ',
    tagline: 'Authentic charcoal smoke and sizzling marinated skewers served in banana leaf cups.',
    setupNote: 'Real charcoal smoke grill with bamboo basket displays and natural banana leaf liners.',
    items: ['Charcoal Satay Skewers (Chicken, Pork, Tofu, Tempeh)', 'Raw Papaya Slaw', 'Yam Woon Sen (Glass Noodle Salad)', 'Pomelo Salad with Toasted Coconut', 'Larb Cracker Station (Tofu, Chicken, Prawn with crispy crackers)'],
    subsections: [
      {
        title: 'Spice Levels',
        items: ['Thai Mild', 'Medium', 'Bangkok Hot (เผ็ดสะใจ)']
      }
    ]
  },
  {
    id: 'curry-karts',
    number: '07',
    name: 'Curry Karts',
    thai: 'รถเข็นแกงไทย',
    tagline: 'Mobile vintage-style Thai street carts serving aromatic curries in individual tasting pots.',
    setupNote: 'Wooden street cart styling with vintage Thai brass ladle bells and warm accent lanterns.',
    items: ['Green Coconut Curry', 'Red Chili Curry', 'Southern Turmeric & Black Pepper Curry', 'Panang Peanut Curry']
  },
  {
    id: 'dessert-corner',
    number: '08',
    name: 'Live Dessert Corner',
    thai: 'มุมขนมหวาน',
    tagline: 'Warm sizzle of cast iron, sweet ripe mango, and chilled coconut creations.',
    setupNote: 'Chefs pouring coconut batter into cast-iron Kanom Krok pans alongside woven bamboo baskets of sweet sticky rice.',
    items: ['Khanom Krok (Coconut-rice pancakes cooked live on cast-iron)', 'Mango Sticky Rice in traditional bamboo baskets', 'Kati Coconut Ice Cream with toasted toppings', 'Khao Niew Mamuang (Sweet glutinous rice)', 'Tub Tim Krob (Water chestnut rubies in chilled coconut milk)']
  }
];

export const themeMenus: ThemeMenu[] = [
  {
    id: 'thai-street',
    number: '01',
    name: 'Thai Street Food',
    thai: 'อาหารข้างทาง',
    vibe: 'Fun · Interactive · Casual',
    occasions: 'Festival · Welcome Party · Corporate Mixer',
    appetizers: [
      'Larb Rice Cracker',
      'Tempeh + Pomelo + Avocado Skewer',
      'Thai Fish Salmon Cakes',
      'Thai Dumplings with Chili Oil'
    ],
    mains: [
      'Krapao Tofu with Jasmine Rice',
      'Pad Thai (Live Wok)',
      'Pad See Ew (Wok-charred rice noodles)',
      'Boat Noodles (Small bowl station)',
      'Thai Fried Chicken (Hat Yai style)',
      'Live Som Tam Station'
    ],
    desserts: [
      'Tub Tim Krob',
      'Mango Sticky Rice',
      'Thai Tea Tiramisu'
    ]
  },
  {
    id: 'thai-classic',
    number: '02',
    name: 'Thai Classic',
    thai: 'ไทยคลาสสิก',
    vibe: 'Familiar · Authentic · Comfort',
    occasions: 'Wedding Dinner · Family Gathering · Formal Banquet',
    appetizers: [
      'Thai Chicken Satay with Spicy Peanut Sauce',
      'Spicy Pomelo Salad',
      'Larb with Sugarcane Chickpea'
    ],
    mains: [
      'Tom Yum Soup with choice of protein',
      'Classic Green Curry with Thai eggplant',
      'Southern Thai Grilled Skewers',
      'Tom Kha Coconut Soup with protein',
      'Chu Chee Curry with protein'
    ],
    desserts: [
      'Mango Sticky Rice with yellow mung beans',
      'Bua Loy (Taro & pumpkin pearls in warm coconut cream)',
      'Crisp Banana Fritter with Coconut Ice Cream'
    ]
  },
  {
    id: 'thai-royal',
    number: '03',
    name: 'Thai Royal',
    thai: 'อาหารชาววัง',
    vibe: 'Elegant · Cultural · Refined',
    occasions: 'Luxury Event · VIP Reception · Diplomatic Gala',
    appetizers: [
      'Starfruit with Herb Chicken',
      'Chor Muang (Royal butterfly-pea flower dumplings)',
      'Miang Kham (Betel leaf wraps with palm sugar reduction)'
    ],
    mains: [
      'Royal Thai Coconut Curry',
      'Chu Chee Glaze with herbs',
      'Slow-braised Massaman Curry',
      'Tom Khlong (Smoked fish & roasted herb sour broth)',
      'Khao Chae (Jasmine rice in jasmine-scented ice water — seasonal)'
    ],
    desserts: [
      'Luk Chup (Fruit-shaped glazed mung bean sweets)',
      'Khanom Chan (Steamed pandan layer cake)',
      'Foi Thong (Golden egg threads)',
      'Thong Yip & Thong Yod (Royal auspicious gold confections)'
    ]
  },
  {
    id: 'thai-fusion',
    number: '04',
    name: 'Thai Fusion & Fine Dining',
    thai: 'อาหารไทยร่วมสมัย',
    vibe: 'Creative · Contemporary · Unexpected & Experiential',
    occasions: 'Private Dinner · High-Fashion Event · International Showcase',
    appetizers: [
      'Larb Rice Cracker Canapé',
      'Larb Taco Veggie with micro herbs',
      'Miang Kham Tempura with palm reduction',
      'Tom Kha Pizza Crisp'
    ],
    mains: [
      'Tom Yum Risotto with seared prawns',
      'Khao Soi Arancini with pickled mustard greens',
      'Pumpkin Panang Curry baked in flaky croissant pastry',
      'Seared Paneer with roasted Thai Chili Paste'
    ],
    desserts: [
      'Thai Tea Tiramisu in glass caddy',
      'Pandan Coconut Mille Crêpe',
      'Mango Sticky Rice Tartlet',
      'Thai Tea Choux au Craquelin',
      'Coconut Panna Cotta with palm sugar syrup'
    ]
  }
];

export const villageAtmosphere = {
  concept: 'Thai Moo Ban (Village) Experience',
  description:
    'We convert our catering stations into an authentic living Thai Village. No harsh white LED tubes — only warm yellow bulbs encased in hanging bamboo baskets, festive string lights, paper lanterns at varying heights, fragrant charcoal grill smoke, and live green papaya pounding.',
  details: [
    { label: 'Presentation', value: 'Banana leaves as natural plate liners, sticky rice served in woven bamboo Kratip baskets, coconut shells, and vintage wooden crates.' },
    { label: 'Artisan Staff', value: 'Chefs and service crew wear traditional dark indigo Mo Hom shirts with straw farmer hats.' },
    { label: 'Sound & Aroma', value: 'Subtle soundscape of temple bells and evening crickets, live lemongrass and kaffir lime chopping, with aromatic Nam Jim Jaew toasting on open pans.' },
    { label: 'Bespoke Personalization', value: 'Handmade wooden signage at the village entrance: "Welcome to [Your Celebration] Thai Village", featuring family favorite dishes on hand-lettered Thai blackboard tags.' }
  ]
};

