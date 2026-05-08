# GLOW UP BOX — Document de référence Claude Code
> Coller en début de session pour garder le contexte complet

---

## 1. IDENTITÉ MARQUE

```
Marque       : Glow Up Box ✦
Secteur      : Cosmétique coréenne (K-Beauty)
Marché       : Maroc — livraison nationale
Canal actuel : Instagram → site vitrine Next.js
Modèle vente : 100% WhatsApp (zéro panier, zéro paiement en ligne)
Différenciant: Conseil peau GRATUIT avant chaque achat
```

---

## 2. MODÈLE COMMERCIAL

```
VISITEUR
  ↓ découvre le site
  ↓ se reconnaît dans un profil peau
  ↓ remplit le formulaire bilan (6 questions)
  ↓ WhatsApp s'ouvre avec son profil formaté
  ↓ reçoit une recommandation personnalisée
  ↓ achète le bon coffret/produit
```

**Règle clé :** Les Boxs n'ont PAS de prix affiché → prix communiqué après conseil.
Les produits Boutique ONT un prix affiché → achat direct WhatsApp.

---

## 3. STACK TECHNIQUE

```
Framework    : Next.js 15 App Router + TypeScript
Style        : Tailwind CSS + CSS variables palette marque
Animations   : Framer Motion 11 + 21st Magic MCP
BDD          : Prisma + Turso (SQLite cloud)
Images       : Cloudinary (upload + WebP auto)
Auth BO      : PIN code
Deploy       : Vercel (gratuit)
Domaine      : Hostinger DNS → Vercel
```

**Important :** Hostinger est utilisé UNIQUEMENT pour le domaine (DNS).
L'application tourne sur Vercel. Ne pas déployer sur Hostinger.

---

## 4. IDENTITÉ VISUELLE

### Couleurs CSS variables
```css
--fuchsia:   #E91E8C   /* CTA principaux, accents */
--coral:     #FF6B9D   /* Gradient, badges */
--peach:     #FFB347   /* Touches dorées */
--black:     #1A1A2E   /* Titres, footer, hero dark */
--purple:    #2D1B4E   /* Gradient dark fin */
--soft-pink: #FDF0F5   /* Sections alternées, cards */
--gray:      #4A4A6A   /* Corps de texte */
--nude:      #F5E6D3   /* Backgrounds secondaires */
```

### Gradients
```css
/* Gradient signature */
linear-gradient(135deg, #E91E8C 0%, #FF6B9D 50%, #FFB347 100%)

/* Gradient dark */
linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)
```

### Classes Tailwind custom (tailwind.config.ts)
```
bg-brand-gradient  → gradient signature fuchsia→coral→peach
bg-dark-gradient   → gradient dark black→purple
text-fuchsia       → #E91E8C
text-coral         → #FF6B9D
bg-soft-pink       → #FDF0F5
font-playfair      → Playfair Display (titres)
font-sans          → DM Sans (corps)
```

### Typographie
```
Titres H1   : Playfair Display · Bold Italic · clamp(2rem, 5vw, 3.8rem)
Titres H2   : Playfair Display · Bold         · clamp(1.8rem, 3.5vw, 2.8rem)
Corps       : DM Sans · Regular · 16px · line-height 1.75
Boutons CTA : DM Sans · Bold · 13px · uppercase · letter-spacing 0.08em
```

---

## 5. STRUCTURE DU PROJET

```
peso/
├── CLAUDE.md                    ← ce fichier
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                   ← variables d'env (ne pas commiter)
├── prisma/
│   └── schema.prisma
└── src/
    ├── app/
    │   ├── layout.tsx           ← layout global (Navbar + Footer + WAFloat)
    │   ├── globals.css          ← CSS variables + imports fonts
    │   ├── page.tsx             ← Homepage /
    │   ├── boxs/page.tsx        ← /boxs (catalogue coffrets)
    │   ├── boutique/page.tsx    ← /boutique (catalogue produits)
    │   ├── b2b/page.tsx         ← /b2b
    │   ├── blog/
    │   │   ├── page.tsx         ← /blog (liste articles)
    │   │   └── [slug]/page.tsx  ← /blog/[slug] (article)
    │   ├── a-propos/page.tsx    ← /a-propos
    │   ├── conseil-peau/page.tsx← /conseil-peau (formulaire bilan)
    │   ├── admin/               ← Back-office /admin
    │   │   ├── layout.tsx
    │   │   ├── page.tsx         ← dashboard
    │   │   ├── boxs/page.tsx
    │   │   ├── boutique/page.tsx
    │   │   ├── blog/page.tsx
    │   │   ├── contenu/page.tsx
    │   │   └── options/page.tsx
    │   └── api/admin/           ← API Routes CRUD
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── WhatsAppFloat.tsx
    │   ├── ui/                  ← composants réutilisables
    │   └── sections/            ← sections par page
    └── lib/
        ├── db.ts                ← Prisma client singleton
        └── utils.ts             ← cn(), waUrl(), slugify()
```

---

## 6. PAGES & SECTIONS

### Homepage `/`
1. Hero — blob morphant, stagger texte, parallax, floating cards types peau
2. Ticker — gradient infini
3. Profils peau — 4 cards avec tilt 3D (sensible, grasse, terne, mixte)
4. Comment ça marche — dark section, 4 étapes + features
5. Boxs teaser — 3 boxs sans prix
6. Boutique teaser — 4 produits avec prix
7. B2B aperçu — banner dark
8. Témoignages — marquee auto-scroll
9. CTA final — gradient fuchsia

### Boxs `/boxs`
1. Hero page dark
2. Info banner "pourquoi pas de prix"
3. Filtres par type de peau (JS)
4. Grille dynamique depuis DB (Prisma)
5. Process 4 étapes
6. FAQ accordéon

### Boutique `/boutique`
1. Hero + badges
2. Toolbar filtres catégorie + tri prix
3. Featured product (Ice Roller)
4. Grille dynamique depuis DB avec prix
5. Cross-sell vers Boxs

### B2B `/b2b`
1. Hero + 5 occasions
2. 3 offres (Découverte ≥5 / Entreprise ≥20 / Grand Compte ≥50)
3. Process timeline dark
4. Témoignages B2B
5. CTA devis WhatsApp

### Blog `/blog`
1. Hero + recherche JS
2. Filtres catégories
3. Article vedette
4. Grille articles depuis DB
5. Pagination

### Article `/blog/[slug]`
1. Hero article + image
2. Contenu riche (DB)
3. Sidebar (populaires + tags + CTA bilan)

### À Propos `/a-propos`
1. Hero split fondatrice
2. Histoire marque + citation
3. Stats (200+ clientes / 4.9★ / 3 ans / 100% gratuit)
4. Valeurs + engagements

### Conseil Peau `/conseil-peau`
1. Hero split dark
2. Formulaire multi-étapes (6 steps + progress bar)
   - Step 1 → Prénom + WhatsApp
   - Step 2 → Type de peau (6 options)
   - Step 3 → Problèmes (7 checkboxes)
   - Step 4 → Routine actuelle (3 options)
   - Step 5 → Expérience K-Beauty (3 options)
   - Step 6 → Objectif (textarea)
   - Submit → ouvre WhatsApp avec profil formaté
3. Sidebar garanties + témoignage

### Back-office `/admin`
- Dashboard avec liens vers chaque section
- `/admin/boxs` → CRUD coffrets + upload image Cloudinary
- `/admin/boutique` → CRUD produits + prix + stock + image
- `/admin/blog` → CRUD articles + éditeur riche
- `/admin/contenu` → Édition hero_title, hero_subtitle, etc.
- `/admin/options` → WhatsApp, tel, Instagram, email

---

## 7. BASE DE DONNÉES (Prisma schema)

```prisma
Box     → id, name, slug, description, skinType, products (JSON), image, active, order
Product → id, name, slug, description, category, price, stock, image, benefits (JSON), featured, active, order
Article → id, title, slug, excerpt, content, category, image, published, publishedAt
Option  → key (PK), value   (ex: "wa_number", "instagram_url", "hero_title")
Contact → id, prenom, phone, typePeau, problemes, routine, kbeauty, objectif
```

---

## 8. MESSAGES WHATSAPP PRÉ-REMPLIS

```js
// Box (sans prix)
`Bonjour, je suis intéressée par la Box ${nomBox} et j'aimerais un conseil personnalisé`

// Produit Boutique
`Bonjour, je souhaite commander ${nomProduit}`

// Bilan peau (formulaire)
`Bonjour ! Voici mon bilan peau :\n👤 Prénom : ${prenom}\n🌿 Type : ${typePeau}\n⚠️ Problèmes : ${problemes}\n💆 Routine : ${routine}\n🇰🇷 K-Beauty : ${kbeauty}\n🎯 Objectif : ${objectif}`

// B2B devis
`Bonjour, coffrets pour mon entreprise.\nOccasion :\nQuantité :\nBudget :`
```

Utiliser `waUrl()` depuis `@/lib/utils` : `waUrl(message)` → retourne l'URL encodée.

---

## 9. CATALOGUE PRODUITS (données initiales)

### Boxs (sans prix)
```
Douceur Coréenne   → sensible    — Nettoyant centella · Toner aloe · Sérum HA · Crème barrière
Glow Intense       → terne       — Huile double · Essence vit.C · Sérum niacinamide · Crème SPF
Équilibre & Pureté → grasse/mixte— Nettoyant moussant · Toner BHA · Sérum rétinol · Gel-crème
Hydra Boost        → sèche       — Lait nettoyant · Essence snail · Sérum céramides · Crème 72h
Zone T Maîtrisée   → mixte       — Gel équilibrant · Toner bi-phase · Sérum sébo · Crème ciblée
Youth Élixir       → anti-âge    — Eau micellaire · Sérum rétinol+peptides · Crème collagène · Contour yeux
```

### Boutique (avec prix DH)
```
Ice Roller Visage          89 DH  — Visage/Massage
Gua Sha Quartz Rose       129 DH  — Massage/Lifting
Bandeau Soin Coréen        45 DH  — Accessoire
Brosse Nettoyante Silicone159 DH  — Nettoyage
Rouleau Jade Double Tête   99 DH  — Massage
Éponge Konjac Coréenne     55 DH  — Nettoyage
```

---

## 10. RÈGLES ABSOLUES (ne jamais violer)

```
① Mobile first — 375px base, puis responsive vers le haut
② Pas de prix sur les Boxs — "Prix après bilan peau gratuit"
③ Chaque CTA Box → WhatsApp avec message pré-rempli spécifique
④ WhatsApp float #25D366 — fixed bottom-right — TOUTES les pages
⑤ Navbar pill flottante : transparente sur hero dark → blanche après 60px scroll
⑥ Gradient signature sur tous les CTA principaux (jamais couleur plate)
⑦ Formulaire conseil → formate profil complet → ouvre WhatsApp au submit
⑧ Images : Cloudinary auto WebP — emojis en placeholder si pas de visuels
⑨ Framer Motion sur toutes les sections (scroll reveal, stagger, parallax)
⑩ Meta description unique par page + balises OG
```

---

## 11. DÉPLOIEMENT

```
1. GitHub → push du repo
2. Vercel → import repo → variables d'env
3. Turso → créer DB → TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
4. Cloudinary → créer compte → variables d'env
5. Hostinger → DNS CNAME → cname.vercel-dns.com
6. Prisma → npx prisma db push (migration Turso)
```

---

## 12. CHECKLIST AVANT MISE EN LIGNE

```
☐ Remplacer NEXT_PUBLIC_WA_NUMBER par le vrai numéro
☐ Ajouter les vraies photos produits (Cloudinary)
☐ Rédiger le texte "À Propos" avec la cliente
☐ Tester formulaire bilan → WhatsApp sur iPhone ET Android
☐ Vérifier responsive : 375px · 768px · 1024px · 1280px
☐ Vérifier tous les liens inter-pages
☐ Configurer domaine Hostinger → Vercel
☐ Tester BO (CRUD boxs, produits, articles)
```

---

## 13. CONVENTIONS DE DÉVELOPPEMENT

- Composants : PascalCase (`HeroSection.tsx`)
- Pages : fichiers `page.tsx` dans les dossiers de route
- Données dynamiques → toujours depuis Prisma (pas hardcodé)
- Animations → Framer Motion (`motion.div`, `useScroll`, variants)
- Icons → Lucide React uniquement (pas d'emojis comme icons UI)
- Images → `next/image` avec Cloudinary comme source
- WhatsApp links → toujours via `waUrl()` de `@/lib/utils`
- Styles → Tailwind classes + `cn()` pour les conditionnels
