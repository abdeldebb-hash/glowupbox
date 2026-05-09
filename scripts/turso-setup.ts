import { createClient } from '@libsql/client'

const client = createClient({
  url:       'libsql://glowupbox-abdeldebb-hash.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgzMjMwMjAsImlkIjoiMDE5ZTBjNGYtNTgwMS03MDY4LWEzOWUtMDM2NzFiNzBiMDU5IiwicmlkIjoiOGU4OTZkNTgtOThhNy00MmYyLWJjOGMtZTgxY2Y2NzU2YTQ5In0.7-E-B7CTL-qcJRJr7IDnBcGKGAPrz_JbHMjbXou7PSJURvo6AEbm6vsJRQNRe4san8eRQGVtBSzYrgiQ2y6mBA',
})

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS "Box" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "skinType" TEXT NOT NULL,
    "skinLabel" TEXT NOT NULL DEFAULT '',
    "tag" TEXT NOT NULL DEFAULT '',
    "accroche" TEXT NOT NULL DEFAULT '',
    "products" TEXT NOT NULL,
    "image" TEXT,
    "active" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL DEFAULT 0,
    "waMessage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Product" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "tagline" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL,
    "catLabel" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "oldPrice" REAL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "stockStatus" TEXT NOT NULL DEFAULT 'ok',
    "image" TEXT,
    "benefits" TEXT NOT NULL,
    "badge" TEXT,
    "featured" INTEGER NOT NULL DEFAULT 0,
    "active" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Article" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "catLabel" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "published" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" DATETIME,
    "readTime" TEXT NOT NULL DEFAULT '5 min',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Option" (
    "key" TEXT PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Contact" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "prenom" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "typePeau" TEXT NOT NULL,
    "problemes" TEXT NOT NULL,
    "routine" TEXT NOT NULL,
    "kbeauty" TEXT NOT NULL,
    "objectif" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
]

const SEED = [
  `INSERT OR IGNORE INTO "Option" ("key","value","updatedAt") VALUES ('wa_number','212600000000',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Option" ("key","value","updatedAt") VALUES ('instagram_url','https://instagram.com/glowupbox.ma',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Option" ("key","value","updatedAt") VALUES ('instagram_handle','@glowupbox.ma',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Option" ("key","value","updatedAt") VALUES ('city','Rabat, Maroc',CURRENT_TIMESTAMP)`,

  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Douceur Coréenne','douceur-coreenne','Pour les peaux qui réagissent au moindre produit. Cette box K-Beauty mise sur les ingrédients les plus doux.','sensible','Peau sensible','Peau sensible · Réactive · Rougeurs','Apaiser et réparer sans agresser','["Nettoyant centella","Toner aloe vera","Sérum acide hyaluronique","Crème barrière"]','/images/peau-sensible.jpg',1,1,'Bonjour, je suis intéressée par la Box Douceur Coréenne et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Glow Intense','glow-intense','Pour les peaux qui ont perdu leur luminosité. Vitamine C, niacinamide et SPF pour traiter les taches.','terne','Peau terne','Peau terne · Manque d''éclat · Taches','Révéler l''éclat naturel de votre peau','["Huile double nettoyante","Essence vitamine C","Sérum niacinamide","Crème SPF"]','/images/peau-terne.jpg',1,2,'Bonjour, je suis intéressée par la Box Glow Intense et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Équilibre & Pureté','equilibre-purete','Purifie sans agresser, rééquilibre sans assécher. La box qui corrige les erreurs de soin.','grasse','Peau grasse / mixte','Peau grasse · Peau mixte · Imperfections','Nettoyer en profondeur sans abîmer ta peau','["Nettoyant moussant","Toner BHA","Sérum rétinol","Gel-crème équilibrant"]','/images/peau-grasse.jpg',1,3,'Bonjour, je suis intéressée par la Box Équilibre & Pureté et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Hydra Boost','hydra-boost','Pour les peaux qui tirent. Céramides reconstituants et crème 72h pour une hydratation durable.','seche','Peau sèche','Peau sèche · Tiraillements · Déshydratation','Nourrir et repulper les peaux déshydratées','["Lait nettoyant","Essence escargot","Sérum céramides","Crème 72h"]','/images/peau-seche.jpg',1,4,'Bonjour, je suis intéressée par la Box Hydra Boost et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Zone T Maîtrisée','zone-t-maitrisee','La peau mixte est la plus complexe. Cette box bi-phase traite chaque zone selon ses besoins.','mixte','Peau mixte','Peau mixte · Zone T · Déséquilibre','Équilibrer sans sacrifier les joues sèches','["Gel équilibrant","Toner bi-phase","Sérum séborégulateur","Crème ciblée"]','/images/box-mixte.jpg',1,5,'Bonjour, je suis intéressée par la Box Zone T Maîtrisée et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Box" ("name","slug","description","skinType","skinLabel","tag","accroche","products","image","active","order","waMessage","updatedAt") VALUES ('Youth Élixir','youth-elixir','Rétinol doux, peptides et collagène pour une action anti-âge globale.','anti-age','Anti-âge','Anti-âge · Prévention · Fermeté','Prévenir et corriger les premiers signes du temps','["Eau micellaire","Sérum rétinol + peptides","Crème collagène","Contour des yeux"]','/images/box-antiage.jpg',1,6,'Bonjour, je suis intéressée par la Box Youth Élixir et j''aimerais un conseil personnalisé',CURRENT_TIMESTAMP)`,

  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Ice Roller Visage','ice-roller-visage','Dégonfle, resserre les pores et donne un éclat immédiat en 5 minutes.','Le secret des coréennes pour un teint parfait','soin','Soin du visage',89,NULL,50,'ok','/images/acc-ice-roller.jpg','["Réduit les rougeurs","Resserre les pores","Éclat immédiat"]',NULL,1,1,1,CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Gua Sha Quartz Rose','gua-sha-quartz-rose','Drainage lymphatique, sculpture du visage et effet lifting naturel.','Le lifting naturel ancestral revisité','massage','Massage & drainage',129,NULL,30,'ok','/images/acc-gua-sha.jpg','["Drainage","Lifting naturel","Anti-tension"]','popular',0,1,2,CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Bandeau Skincare','bandeau-skincare','Maintien parfait pour vos soins visage. Microfibre douce, lavable et réutilisable.','Le petit accessoire qui change tout','routine','Accessoires routine',45,NULL,80,'ok','/images/acc-bandeau.jpg','["Réutilisable","Ultra doux","Lavable"]','new',0,1,3,CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Brosse Nettoyante Silicone','brosse-nettoyante-silicone','Nettoyage en profondeur ultra doux. Élimine les impuretés sans agresser la peau.','Le nettoyage 3x plus efficace','nettoyage','Nettoyage',159,NULL,10,'low','/images/acc-brosse.jpg','["Nettoyage profond","Ultra doux","Anti-bactérien"]',NULL,0,1,4,CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Rouleau Jade Double Tête','rouleau-jade-double-tete','Double tête pour grand et petit contour. Drainage, anti-poches et éclat du teint.','Grand visage + petit contour — un seul outil','massage','Massage & drainage',99,120,25,'ok','/images/acc-rouleau-jade.jpg','["Anti-poches","Éclat","Double usage"]','-17%',0,1,5,CURRENT_TIMESTAMP)`,
  `INSERT OR IGNORE INTO "Product" ("name","slug","description","tagline","category","catLabel","price","oldPrice","stock","stockStatus","image","benefits","badge","featured","active","order","updatedAt") VALUES ('Éponge Konjac','eponge-konjac','Exfoliation douce naturelle, 100% végétale. Idéale pour les peaux sensibles.','L''exfoliation la plus douce qui existe','nettoyage','Nettoyage',55,69,60,'ok','/images/acc-eponge.jpg','["100% naturel","Exfoliant doux","Vegan"]','-20%',0,1,6,CURRENT_TIMESTAMP)`,
]

async function setup() {
  console.log('🚀 Création des tables sur Turso...')
  for (const sql of SCHEMA) {
    await client.execute(sql)
    console.log('✓ Table créée')
  }

  console.log('🌱 Insertion des données initiales...')
  for (const sql of SEED) {
    await client.execute(sql)
  }
  console.log('✅ Turso configuré avec succès !')
}

setup().catch(e => { console.error(e); process.exit(1) })
