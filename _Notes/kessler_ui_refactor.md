# Kessler — UX/UI Visual Upgrade Brief

## Objective

Improve the visual identity, UX and UI of the Kessler app.

The current app feels too technical, dated and dashboard-heavy. It needs to become more inviting, cinematic, modern and visually memorable, while still keeping its credibility as a space debris intelligence platform.

Kessler should feel like a premium space-tech product: clear enough for students and professors to understand, but polished enough to look like a real startup/product concept.

The app must work well across **iOS, Android and Web**, with responsive layouts, adaptive components and a strong visual system for both **Dark Mode** and **Light Mode**.

---

## Product Direction

Kessler is not just a technical dashboard.

It is a visual experience about the future of Earth’s orbit.

The app should communicate three things immediately:

1. Space debris is a real and growing problem.
2. Kessler makes orbital risk understandable.
3. Space waste can become part of a circular space economy.

The design should feel modern, cinematic and accessible — not like an old scientific tool.

---

## Visual Inspiration

Use these references as inspiration, not as something to copy directly.

### Apple-like qualities

Apply:

* clean visual hierarchy;
* large hero sections;
* strong use of whitespace;
* few but powerful words;
* beautiful product-like visuals;
* smooth transitions;
* simple navigation;
* premium typography;
* one clear message per section;
* polished light and dark modes.

Avoid:

* dense dashboards too early;
* too many cards on one screen;
* excessive borders;
* small text everywhere;
* overly technical first impression.

### Lando Norris-style qualities

Apply:

* bold visual energy;
* strong hero imagery;
* immersive sections;
* motion and interaction;
* editorial layout;
* personality;
* large media blocks;
* dynamic cards;
* a feeling of speed, technology and performance.

Avoid:

* copying racing visuals literally;
* making the app look like a sports website;
* using too many aggressive colors.

---

## Main UX Problem to Fix

The current app presents too much information too quickly.

The new UX should progressively reveal complexity.

The user journey should be:

1. Feel attracted by the visual experience.
2. Understand the problem quickly.
3. Explore the orbit visually.
4. Inspect one object.
5. Understand its risk.
6. Simulate a mission.
7. Discover how debris could become reusable value.

The homepage should not look like a full control room. It should look like the entrance to a premium product.

---

## Required Visual Improvements

### 1. More images and visual storytelling

Add more visual content across the app:

* cinematic Earth/orbit hero image;
* 3D satellite/debris illustrations;
* symbolic object visuals by category;
* mission simulation visuals;
* circular economy diagrams;
* educational illustrations;
* empty-state illustrations;
* risk-state visual cards;
* light/dark compatible graphics.

Important: real object photos are not required. Most APIs will not provide photos for debris or satellites. Use generated or symbolic visuals with labels like:

> Visual representation based on object type.

Suggested visual categories:

* active satellite;
* dead satellite;
* rocket body;
* fragment cloud;
* high-risk object;
* reusable candidate;
* controlled reentry;
* orbital recycling;
* mission vehicle;
* circular economy loop.

---

### 2. Add Light Mode

Treat the current theme as **Dark Mode**.

Create a full **Light Mode** with its own mood, not just inverted colors.

Dark Mode should feel:

* deep space;
* premium;
* cinematic;
* technical;
* immersive.

Light Mode should feel:

* clean;
* educational;
* modern;
* trustworthy;
* Apple-like;
* easier for reading long content.

The theme switch should be visible in settings or navigation.

Both themes must share the same layout, spacing and components.

---

### 3. Improve homepage hierarchy

The homepage should have fewer things at once.

Suggested homepage order:

1. Hero section
   Big visual, strong headline, short paragraph, two CTA buttons.

2. Problem section
   Explain space debris in simple terms with 3 visual cards.

3. Explore section
   Preview of the orbital map with a large image or interactive mock.

4. Intelligence section
   Explain Risk Score, Priority Queue and Reuse Potential.

5. Circular future section
   Show how debris can become useful material.

6. Final CTA
   Invite the user to explore the orbital map or simulate a mission.

Do not start with a dense table or dashboard.

---

### 4. Make the app less technical at first glance

Technical information should still exist, but later in the experience.

Homepage language should be more human:

Instead of:

> Collision probability modeling and orbital debris mitigation analysis.

Use:

> Understand which objects in orbit need attention first.

Instead of:

> Reuse assessment based on material composition estimation.

Use:

> See how abandoned space objects could become future resources.

---

### 5. Use modern product sections

Add sections similar to current premium product websites:

* full-width hero;
* sticky navigation;
* large visual storytelling blocks;
* scroll-based reveal sections;
* feature spotlight cards;
* horizontal feature carousel on mobile;
* immersive map preview;
* comparison section: “From debris to resource”;
* final call-to-action section;
* large footer with product links and project context.

---

## Design System

### Brand mood

Kessler should feel:

* futuristic;
* responsible;
* clean;
* intelligent;
* cinematic;
* hopeful;
* not military;
* not childish;
* not overloaded.

### Typography

Use a modern sans-serif style.

Suggested hierarchy:

* Display headline: very large, bold, tight line-height.
* Section title: strong but smaller than hero.
* Body text: comfortable, readable.
* Technical labels: small, uppercase, letter-spaced.
* Data numbers: large, clean and clear.

Avoid too many font weights.

### Dark Mode colors

Use:

* background: near-black navy;
* surface: dark blue-gray;
* elevated surface: slightly lighter navy;
* primary: electric blue/cyan;
* success: soft green;
* warning: amber;
* danger: red-orange;
* text primary: near-white;
* text secondary: cool gray.

### Light Mode colors

Use:

* background: soft white;
* surface: white;
* elevated surface: very light blue-gray;
* primary: deep blue;
* accent: cyan;
* success: green;
* warning: amber;
* danger: red-orange;
* text primary: near-black navy;
* text secondary: slate gray.

Light Mode should not look plain. Use soft gradients, subtle orbital lines and clean image blocks.

---

## Component Improvements

### Navigation

Create a responsive navigation:

Web:

* logo left;
* main links center or right;
* theme toggle;
* primary CTA.

Mobile:

* top bar;
* menu button or bottom tabs;
* theme toggle in settings;
* main CTAs moved into screen content.

### Cards

Cards should be larger and less crowded.

Each card should have:

* one icon or image;
* one title;
* one short description;
* one optional action.

Avoid cards with too many metrics.

### Data panels

Use data panels only after the user understands the story.

Data panels should:

* show fewer metrics;
* use clear labels;
* avoid too many colors;
* use visual states;
* include explanation text.

### Object Passport

Make the Object Passport more visual.

Add:

* large object visual;
* object type badge;
* risk level;
* reuse potential;
* short summary;
* technical details hidden in expandable sections.

### Priority Queue

Make it less like a boring table.

Use:

* ranked cards on mobile;
* table only on wide web;
* visual risk bars;
* object type icons;
* short action labels.

### Circular Economy Lab

Make this one of the most beautiful areas.

Use:

* “before / after” visual;
* material cards;
* reuse diagrams;
* possible future uses;
* clear explanation of limitations;
* visual storytelling: “from abandoned object to orbital resource.”

---

## Motion and Interaction

Use motion carefully.

Add:

* smooth section reveals;
* hover effects on web cards;
* press feedback on mobile;
* subtle parallax in hero;
* animated orbital lines;
* theme transition;
* loading skeletons;
* map object selection animation.

Avoid:

* constant motion;
* distracting animations;
* heavy effects that hurt mobile performance.

---

## Image Strategy

Since orbital debris APIs usually do not provide real photos, create a controlled visual library.

Required image assets:

1. Hero Earth/orbit visual.
2. Active satellite illustration.
3. Dead satellite illustration.
4. Rocket body illustration.
5. Fragment cloud illustration.
6. Mission vehicle illustration.
7. Circular economy visual.
8. Reentry visual.
9. Prevention/clean orbit visual.
10. Empty state illustration.

Each image should have:

* dark mode version or transparent background;
* light mode compatibility;
* consistent 3D or editorial style;
* no random AI artifacts;
* no unreadable fake text.

Use these visuals to make the app feel alive, not just filled with tables.

---

## Responsive UX Rules

The app must work on iOS, Android and Web.

### Web layout

* wide hero split layout;
* large orbital visual;
* grid sections;
* map and data side-by-side;
* table layout for priority queue.

### Tablet layout

* hero stacked or balanced split;
* 2-column cards;
* map above data;
* readable spacing.

### Mobile layout

* single-column sections;
* bottom navigation or compact top nav;
* feature cards as vertical stack or horizontal carousel;
* priority queue as ranked cards, not table;
* object details grouped into sections;
* touch targets at least 44px high.

---

## Accessibility

The redesigned app must remain accessible.

Requirements:

* readable contrast in both themes;
* no text over busy images without overlay;
* clear focus states on web;
* large touch targets on mobile;
* reduced motion support;
* icons must not be the only way to understand status;
* risk colors must include labels, not only color.

---

## What to Avoid

Do not make the app look like:

* an old NASA database;
* a military radar system;
* a crypto dashboard;
* a generic AI SaaS landing page;
* a cluttered analytics dashboard;
* a sci-fi poster with no usable UI.

The app should feel like a real product.

---

## Expected Outcome

After the redesign, Kessler should have:

* a more emotional and attractive homepage;
* stronger visual storytelling;
* better light/dark mode support;
* more images and illustrations;
* less technical overload;
* cleaner navigation;
* better mobile experience;
* more modern product sections;
* clearer value proposition;
* stronger pitch quality for a college presentation.

The final result should make users think:

> “This looks like a real space-tech product, not just a school dashboard.”
