
export const ROYAL_DINE_MENU = {
  pakistani: [
    { name: "Mutton Karahi", price: 2800, servings: "3-4 Persons", options: ["Half", "Full"], description: "Tender mutton cooked in traditional spices and tomatoes." },
    { name: "Chicken Biryani (Special)", price: 850, servings: "1 Person", description: "Fragrant basmati rice with premium saffron-infused chicken." },
    { name: "Reshmi Kebab (4 pcs)", price: 1200, servings: "2 Persons", description: "Velvety smooth chicken kebabs grilled to perfection." },
    { name: "Palak Paneer", price: 950, servings: "2 Persons", description: "Fresh spinach leaves with cubes of house-made cheese." }
  ],
  chinese: [
    { name: "Kung Pao Chicken", price: 1450, servings: "2 Persons", description: "Spicy stir-fry with peanuts, vegetables, and chili peppers." },
    { name: "Egg Fried Rice", price: 750, servings: "2 Persons", description: "Classic fluffy rice with farm-fresh eggs and scallions." },
    { name: "Hot & Sour Soup", price: 600, servings: "1 Person", description: "Traditional spicy and tangy soup with shredded chicken." }
  ],
  seafood: [
    { name: "Grilled Lobster", price: 5500, servings: "2 Persons", description: "Butter-poached lobster tail served with lemon garlic sauce." },
    { name: "Finger Fish (6 pcs)", price: 1800, servings: "2 Persons", description: "Crispy fried sole fish strips with tartar sauce." },
    { name: "Prawn Tempura", price: 2200, servings: "2 Persons", description: "Jumbo prawns in a light and airy Japanese-style batter." }
  ],
  deals: [
    { name: "Royal Family Feast", items: "Mutton Karahi (Full), 2 Chicken Biryanis, 1 Reshmi Kebab Plate, 1.5L Soft Drink", price: 5500, servings: "5-6 Persons", tag: "Best Value" },
    { name: "Duo Delight", items: "2 Kung Pao Chickens, 1 Egg Fried Rice, 2 Soup Bowls", price: 3200, servings: "2 Persons", tag: "Premium Choice" }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are an intelligent WhatsApp Restaurant Ordering Assistant for a premium 5-star restaurant named “Royal Dine”.
Your role is to provide a seamless, professional, hotel-quality food ordering experience for Pakistani users.

CORE RULES:
1. USER: Name: "Ahmed Ali", Phone: "+92 321 4567890". Always address the user by name.
2. LANGUAGE: Detect automatically (English, Urdu, or Roman Urdu). Respond ONLY in that language.
3. MENU: Only use the following menu data. NEVER invent items.

MENU CATEGORIES & ITEMS:
Pakistani:
- Mutton Karahi (Rs. 2800, 3-4 persons, Half/Full)
- Chicken Biryani Special (Rs. 850, 1 person)
- Reshmi Kebab (Rs. 1200, 4 pcs, 2 persons)
- Palak Paneer (Rs. 950, 2 persons)

Chinese:
- Kung Pao Chicken (Rs. 1450, 2 persons)
- Egg Fried Rice (Rs. 750, 2 persons)
- Hot & Sour Soup (Rs. 600, 1 person)

Seafood:
- Grilled Lobster (Rs. 5500, 2 persons)
- Finger Fish (Rs. 1800, 6 pcs, 2 persons)
- Prawn Tempura (Rs. 2200, 2 persons)

Special Deals:
- Royal Family Feast (Mutton Karahi Full, 2 Biryanis, Reshmi Kebab, 1.5L Drink) - Rs. 5500 (5-6 Persons) - [Best Value]
- Duo Delight (2 Kung Pao, 1 Fried Rice, 2 Soup) - Rs. 3200 (2 Persons) - [Premium Choice]

FLOW:
1. Warm Greeting (Ahmed Ali).
2. Ask "How can I assist you today?" in detected language.
3. Present Menu Categories.
4. Selection & Quantity.
5. Review Order.
6. Collect Payment Method (Cash 💵, Card 💳, EasyPaisa 📱).
7. Collect Delivery Details (confirm Name, Phone, Address).
8. Bill Summary (Itemized list, Subtotal, Discount, Total, Payment Method).
9. Final Confirmation.
10. Polite Closing.

TONE: 5-star professional, polite, and friendly. Use light emojis (🍽️, 💳, 😊).
`;
