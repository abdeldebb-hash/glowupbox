# GLOW UP BOX — Document de référence projet
> À coller en début de session Claude Code pour garder le contexte sans perdre de tokens

---

## 1. IDENTITÉ MARQUE

```
Marque       : Glow Up Box ✦
Secteur      : Cosmétique coréenne (K-Beauty)
Marché       : Maroc — livraison nationale
Canal actuel : Instagram → transition vers site vitrine
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
  ↓ achète le bon coffret
```

**Règle clé :** Les coffrets n'ont PAS de prix affiché → prix communiqué après conseil.
Les accessoires ONT un prix affiché → achat direct WhatsApp.

---

## 3. STACK TECHNIQUE

```
Langage      : HTML5 + CSS3 + JavaScript vanilla (ES6)
CSS util     : Tailwind CSS via CDN (pas de build tool)
Animations   : AOS.js v2.3.1 via CDN (scroll fade-in)
Polices      : Google Fonts — Playfair Display + DM Sans
Contact      : WhatsApp API wa.me + encodeURIComponent()
Hébergement  : Hostinger — Empty PHP/HTML — upload hPanel FTP
Déploiement  : Fichiers statiques, aucune config serveur
```

---

## 4. IDENTITÉ VISUELLE

### Couleurs CSS variables
```css
--fuchsia:   #E91E8C   /* CTA principaux, accents, gradient */
--coral:     #FF6B9D   /* Gradient, badges, icônes */
--peach:     #FFB347   /* Touches dorées, fin de gradient */
--black:     #1A1A2E   /* Titres, footer, hero dark */
--purple:    #2D1B4E   /* Gradient dark fin */
--soft-pink: #FDF0F5   /* Sections alternées, cards */
--gray:      #4A4A6A   /* Corps de texte, labels */
--nude:      #F5E6D3   /* Backgrounds secondaires */
```

### Gradients
```css
/* Gradient signature — CTA, boutons, badges */
linear-gradient(135deg, #E91E8C 0%, #FF6B9D 50%, #FFB347 100%)

/* Gradient dark — hero, navbar scrollée, footer */
linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)
```

### Typographie
```
Titres H1   : Playfair Display · Bold Italic · clamp(2rem, 5vw, 3.8rem)
Titres H2   : Playfair Display · Bold         · clamp(1.8rem, 3.5vw, 2.8rem)
Corps       : DM Sans · Regular · 16px · line-height 1.75
Boutons CTA : DM Sans · Bold · 13px · uppercase · letter-spacing 0.08em
Tags/Labels : DM Sans · 11-12px · uppercase · letter-spacing 0.12em
Prix        : Playfair Display · Bold · 22px · couleur --fuchsia
```

---

## 5. ARCHITECTURE DES PAGES

### Navbar (toutes les pages)
```
[Logo GLOW UP BOX ✦] — [Coffrets] [Accessoires] [Conseil Peau] [B2B] [Blog] [À Propos] — [📲 WA CTA]
Comportement : sticky · transparente sur hero · fond blanc après 60px scroll
Mobile       : hamburger → menu slide-in droite
```

### Pages principales
```
index.html          → Accueil (home)
coffrets.html       → Catalogue coffrets (sans prix)
accessoires.html    → Catalogue accessoires (avec prix)
conseil-peau.html   → Formulaire bilan peau → WhatsApp
b2b.html            → Offre entreprises / cadeaux
blog.html           → Articles K-Beauty (SEO)
a-propos.html       → Histoire de la marque
contact.html        → Canaux de contact + FAQ
```

### Pages secondaires (templates)
```
coffret-[nom].html       → Détail coffret (1 par coffret)
accessoire-[nom].html    → Détail accessoire (1 par produit)
blog-[slug].html         → Article individuel
```

### Footer (toutes les pages)
```
Logo · Liens rapides · Instagram · WhatsApp · Mentions légales · © 2025
```

### Élément global fixe
```
💬 Bouton WhatsApp flottant — position: fixed; bottom: 28px; right: 28px;
   background: #25D366; border-radius: 50%; animation pulse ring
   PRÉSENT SUR TOUTES LES PAGES SANS EXCEPTION
```

---

## 6. DÉTAIL DES SECTIONS PAR PAGE

### index.html
```
① Hero          : titre + p + 2 CTA + blob animé + stats (200+ clientes, 4.9★, 100% gratuit)
② Miroir        : 4 profils peau en cards (sensible, grasse, terne, mixte) → CTA conseil
③ Promesse      : 3 étapes process + features list (fond dark)
④ Coffrets      : 3 coffrets teaser sans prix + CTA "Voir tous"
⑤ Accessoires  : 4 accessoires avec prix + CTA "Voir tout"
⑥ B2B          : bloc aperçu entreprises + 6 occasions + CTA
⑦ Témoignages  : 3 avis clients (nom, type peau, ville)
⑧ CTA final    : gradient fuchsia + 2 boutons
```

### coffrets.html
```
① Hero page     : titre + breadcrumb (fond dark)
② Info banner   : explication "pourquoi pas de prix" + CTA bilan
③ Filtres       : all / sensible / grasse / sèche / mixte / éclat / anti-âge (JS)
④ Grille        : 6 coffrets × (tag type peau + nom + desc + produits inclus + no-price + 2 CTA WA)
⑤ CTA banner   : gradient + "Hésitez entre plusieurs coffrets ?"
⑥ Process      : 4 étapes (bilan → analyse → recommandation → livraison) fond dark
⑦ FAQ          : 6 questions accordéon
```

### accessoires.html
```
① Hero page     : titre + 3 hero badges (livraison / WA / K-Beauty)
② Toolbar       : filtres catégorie (all/visage/massage/nettoyage/accessoire) + tri prix (JS)
③ Compteur      : "Affichage de X accessoires"
④ Card vedette  : Ice Roller — layout 2 colonnes large (featured)
⑤ Grille        : 5 accessoires × (catégorie + nom + desc + étoiles + tags bénéfices + prix + stock + wishlist ❤️ + 2 CTA)
⑥ Why strip     : 4 raisons (fond soft-pink)
⑦ Cross-sell    : bloc coffrets (fond dark)
```

### conseil-peau.html
```
① Hero split    : gauche (titre + garanties) · droite (how it works 4 étapes) fond dark
② Formulaire    : 6 étapes avec barre de progression
   Step 1 → Prénom + numéro WhatsApp
   Step 2 → Type de peau (6 options radio)
   Step 3 → Problèmes (7 checkboxes)
   Step 4 → Routine actuelle (3 options)
   Step 5 → Expérience K-Beauty (3 options)
   Step 6 → Objectif (textarea libre)
   Submit → ouvre WhatsApp avec profil formaté
③ Sidebar       : garanties + témoignage + types de peau
```

### b2b.html
```
① Hero          : titre + 5 cards occasions + stats (5+ coffrets / 48h devis / 100% perso)
② Problème      : "fini les génériques" + 3 points forts
③ Offres        : 3 cards (Découverte ≥5 / Entreprise ≥20 / Grand Compte ≥50)
④ Process       : 4 étapes timeline (fond dark)
⑤ Témoignages  : 2 témoignages B2B (DRH + directeur commercial)
⑥ CTA final    : gradient + WA pré-rempli template devis
```

### blog.html
```
① Hero split    : gauche (titre + barre recherche JS) · droite (4 topics cards)
② Filtres cat  : all / routine / typepeau / ingredients / conseils / avantapres (JS)
③ Article vedette : format large 2 colonnes
④ Grille        : 6 articles × (catégorie + date + titre + extrait + tags + lire →)
⑤ Sidebar       : populaires + newsletter + tags nuage + CTA bilan
⑥ CTA banner   : gradient
```

### a-propos.html
```
① Hero split    : gauche (titre + CTA) · droite (card fondatrice + badges)
② Récit         : histoire marque + citation mise en valeur (fond soft-pink)
③ Stats         : 4 chiffres (200+ clientes / 4.9★ / 3 ans / 100% gratuit) fond gradient
④ Valeurs       : 3 cards (personnalisation / authenticité / accompagnement)
⑤ Engagements  : 4 items liste + visual dark box
⑥ CTA final    : gradient
```

### contact.html
```
① Hero          : titre centré (fond dark)
② 3 cards       : WhatsApp (featured dark) · Instagram · Bilan peau
③ FAQ accordéon : 6 questions · sidebar (liens rapides + horaires + zone livraison)
④ WA finale     : grande section gradient avec bouton "Ouvrir WhatsApp"
```

---

## 7. LOGIQUE WHATSAPP

### Template messages pré-remplis
```
Coffret (card)     : "Bonjour, je suis intéressée par le Coffret [NOM] et j'aimerais un conseil personnalisé"
Accessoire (card)  : "Bonjour, je souhaite commander [NOM ACCESSOIRE]"
Bilan peau (form)  : "Bonjour ! Voici mon bilan peau :\n👤 Prénom : X\n🌿 Type : X\n⚠️ Problèmes : X\n💆 Routine : X\n🇰🇷 K-Beauty : X\n🎯 Objectif : X"
B2B devis          : "Bonjour, coffrets pour mon entreprise.\nOccasion :\nQuantité :\nBudget :"
Global             : "Bonjour Glow Up Box !"
```

### Code JS type
```javascript
const msg = `Bonjour, je suis intéressée par le Coffret ${nomCoffret}...`;
window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank');
```

---

## 8. CATALOGUE PRODUITS

### Coffrets (6 — sans prix)
```
Douceur Coréenne   → Peau sensible    — Nettoyant centella · Toner aloe · Sérum HA · Crème barrière
Glow Intense       → Éclat/terne      — Huile double · Essence vit.C · Sérum niacinamide · Crème SPF
Équilibre & Pureté → Grasse/mixte     — Nettoyant moussant · Toner BHA · Sérum rétinol · Gel-crème
Hydra Boost        → Peau sèche       — Lait nettoyant · Essence snail · Sérum céramides · Crème 72h
Zone T Maîtrisée   → Peau mixte       — Gel équilibrant · Toner bi-phase · Sérum sébo · Crème ciblée
Youth Élixir       → Anti-âge/fermeté — Eau micellaire · Sérum rétinol+peptides · Crème collagène · Contour yeux
```

### Accessoires (6 — avec prix)
```
Ice Roller Visage         89 DH  — Visage/Massage    — Dégonfle · pores · éclat
Gua Sha Quartz Rose      129 DH  — Massage/Lifting   — Drainage · sculpture · tensions
Bandeau Soin Coréen       45 DH  — Accessoire soin   — Maintien · microfibre · lavable
Brosse Nettoyante Silicone159 DH — Nettoyage profond — 99% impuretés · ultra doux
Rouleau Jade Double Tête  99 DH  — Massage/Visage    — Anti-poches · éclat · contour yeux
Éponge Konjac Coréenne    55 DH  — Nettoyage naturel — Exfoliant doux · vegan · 100% végétal
```

---

## 9. RÈGLES ABSOLUES (à ne jamais violer)

```
① Mobile first — CSS conçu en 375px puis élargi (max-width progressif)
② Pas de prix sur les coffrets — uniquement "prix après conseil"
③ Chaque CTA coffret → WhatsApp avec message pré-rempli spécifique au coffret
④ Bouton WA flottant #25D366 — fixed bottom-right — TOUTES les pages
⑤ Navbar : transparente sur hero dark → fond blanc opaque après 60px scroll (JS)
⑥ Gradient signature sur tous les CTA principaux (jamais couleur plate)
⑦ Formulaire conseil → formate profil complet → ouvre WhatsApp au submit
⑧ Images : format WebP max 200ko — emojis en placeholder si pas de visuels réels
⑨ AOS.js sur toutes les sections (data-aos="fade-up" · once:true · offset:60)
⑩ Meta description unique par page + balises OG pour partage WA/Instagram
```

---

## 10. CHECKLIST AVANT MISE EN LIGNE

```
☐ Remplacer 212600000000 par le vrai numéro WhatsApp
☐ Ajouter les vraies photos produits (WebP < 200ko)
☐ Compléter les vrais noms de coffrets + prix accessoires réels
☐ Ajouter le lien Instagram réel
☐ Rédiger le texte "À Propos" avec la cliente (histoire vraie)
☐ Tester formulaire bilan → WhatsApp sur iPhone ET Android
☐ Vérifier responsive : 375px · 768px · 1024px · 1280px
☐ Ajouter favicon (PNG 32x32 et 192x192)
☐ Vérifier tous les liens inter-pages fonctionnels
☐ Upload sur Hostinger → public_html → tester en ligne
```

---

## 11. PROMPT SYSTÈME CLAUDE CODE

> Coller ce bloc en début de session pour contextualiser sans tout rédiger

```
# PROJET : GLOW UP BOX — Site vitrine K-Beauty

Marque : Glow Up Box | K-Beauty | Maroc | Conseil peau gratuit avant vente
Stack : HTML5/CSS3/JS vanilla | Tailwind CDN | AOS.js | Google Fonts
Hébergement : Hostinger static (Empty PHP/HTML)
Conversion : 100% WhatsApp via wa.me/[NUM]?text=encodeURIComponent(msg)

Couleurs CSS :
  --fuchsia:#E91E8C --coral:#FF6B9D --peach:#FFB347
  --black:#1A1A2E   --soft-pink:#FDF0F5 --gray:#4A4A6A
Gradient : linear-gradient(135deg,#E91E8C,#FF6B9D,#FFB347)
Polices  : Playfair Display (titres) + DM Sans (corps)

Pages : index · coffrets · accessoires · conseil-peau · b2b · blog · a-propos · contact
Produits : 6 coffrets (sans prix) + 6 accessoires (avec prix en DH)

Règles : Mobile first · WA float fixe sur toutes pages · Navbar sticky transparente
         Pas de prix coffrets · Formulaire → WA formaté · AOS sur sections
```

---

*Document v1.0 — À mettre à jour avec les contenus réels (photos, prix définitifs, texte fondatrice)*
