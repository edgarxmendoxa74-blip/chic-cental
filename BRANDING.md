# 🐔 Chick Central - Brand Guidelines

## Brand Identity

**Chick Central - Flavored Chicken**

A friendly, vibrant chicken restaurant specializing in flavored wings, drumsticks, and fun bites with 8 delicious sauce varieties.

---

## Logo

The Chick Central logo features:
- **Cheerful white chicken character** with a red comb and yellow beak
- **Brown banner** with white text
- **Bright yellow background**
- **Friendly, welcoming aesthetic**

Logo file location: `/public/images/chick-central-logo.jpg`

---

## Color Palette

### Primary Colors

**Yellow Tones (Logo Background)**
- `#FFD700` - Bright Golden Yellow (Primary)
- `#FFC107` - Vibrant Golden
- `#FFB300` - Warm Sunset

**Brown Tones (Logo Banner)**
- `#6B4423` - Chocolate Brown (Primary)
- `#5D4037` - Rich Dark Brown
- `#8D6E63` - Light Brown Accent
- `#3E2723` - Deep Brown

### Accent Colors

- `#FF9800` - Warm Orange Accent
- `#E53935` - Chicken Red (Comb/Wattle)

### Neutral Colors

- `#FFFBF0` - Soft Cream (Background)
- `#FFF8E1` - Light Beige
- `#FFFFFF` - Pure White

### Supporting Colors

- `#10B981` - Cart Green (Checkout/Cart actions)
- `#9CAF88` - Fresh Herbs (Subtle accent)
- `#212121` - Deep Charcoal (Text)

---

## Typography

### Font Families

- **Pretendard** - Primary sans-serif (UI elements)
- **Noto Serif KR** - Serif (Headings)
- **Playfair Display** - Display serif (Special headings)

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Gradients

### Primary Gradient (Yellow)
```css
background: linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFB300 100%);
```
**Usage:** Headers, CTAs, featured elements

### Brown Gradient
```css
background: linear-gradient(135deg, #6B4423 0%, #5D4037 50%, #4E342E 100%);
```
**Usage:** Navigation, category tags

### Warm Background Gradient
```css
background: linear-gradient(to bottom, #FFFBF0 0%, #FFF8E1 100%);
```
**Usage:** Page backgrounds, cards

### Cart Gradient (Green)
```css
background: linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%);
```
**Usage:** Cart button, checkout CTAs

---

## Brand Voice

### Tone
- **Friendly & Approachable** - Like chatting with a friend
- **Energetic & Fun** - Exciting food experience
- **Authentic & Local** - "Pang-masa sarap"
- **Casual & Conversational** - Not overly formal

### Key Phrases
- "Flavored chicken that hits different! 🔥"
- "8 saucy flavors"
- "Pang-masa sarap 💯"
- "Choose your favorite flavor!"
- "Party size!"

### Emojis
Consistent emoji usage:
- 🍗 - Chicken/Wings
- 🔥 - Hot/Spicy/Popular
- 🐔 - Chick Central brand
- 🍚 - Rice meals
- 💯 - Quality/Value
- ⭐ - Featured items
- 🛒 - Cart/Shopping
- ✅ - Confirmed/Complete

---

## UI Components

### Buttons

**Primary (Yellow Gradient)**
```css
bg-chick-gradient text-white rounded-xl shadow-lg hover:shadow-xl
```

**Brown (Navigation)**
```css
bg-chick-brown text-white rounded-lg hover:bg-chick-darkBrown
```

**Cart (Green)**
```css
bg-cart-gradient text-white rounded-xl hover:shadow-cart-green
```

### Cards
```css
bg-white rounded-2xl shadow-lg border-2 border-chick-beige
```

### Tags/Badges
```css
bg-chick-golden text-white px-3 py-1 rounded-full text-sm font-bold
```

---

## Menu Categories

1. **Fun Bites 🌟** - `⭐` Yellow
2. **Wings - Jumbo** - `🟡` Yellow
3. **Wings - Junior** - `🔴` Red
4. **Drumstick** - `🍗` Red

---

## Product Photography

- High-quality food images preferred
- Logo fallback: `/images/chick-central-logo.jpg`
- Bright, appetizing presentation
- Clear view of saucy coatings

---

## Implementation

### Tailwind CSS Classes

**Colors:**
- `bg-chick-yellow`, `bg-chick-golden`, `bg-chick-brown`
- `text-chick-dark`, `text-chick-brown`, `text-chick-white`
- `border-chick-golden`, `border-chick-brown`

**Gradients:**
- `bg-chick-gradient`
- `bg-chick-brown-gradient`
- `bg-chick-warm-gradient`
- `bg-cart-gradient`

---

## Branding Consistency Checklist

- ✅ Logo displayed in header
- ✅ Favicon using brand logo
- ✅ Yellow & brown color scheme throughout
- ✅ Consistent emoji usage
- ✅ Friendly, conversational tone
- ✅ Menu items use logo as fallback
- ✅ Mobile navigation uses brand colors
- ✅ Cart/checkout uses green for actions
- ✅ Meta tags reflect brand identity

---

## Contact & Social Media

Orders via Facebook Messenger (link from checkout)

---

**Last Updated:** November 3, 2025
**Version:** 1.0

