import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding...')

  // ── OPTIONS ─────────────────────────────────────────────
  await prisma.option.upsert({ where:{ key:'wa_number' },     update:{}, create:{ key:'wa_number',     value:'212600000000' } })
  await prisma.option.upsert({ where:{ key:'instagram_url' }, update:{}, create:{ key:'instagram_url', value:'https://instagram.com/glowupbox.ma' } })
  await prisma.option.upsert({ where:{ key:'instagram_handle' }, update:{}, create:{ key:'instagram_handle', value:'@glowupbox.ma' } })
  await prisma.option.upsert({ where:{ key:'city' },          update:{}, create:{ key:'city',          value:'Rabat, Maroc' } })
  await prisma.option.upsert({ where:{ key:'hero_title' },    update:{}, create:{ key:'hero_title',    value:"Votre peau mérite le meilleur de la Corée" } })
  await prisma.option.upsert({ where:{ key:'hero_subtitle' }, update:{}, create:{ key:'hero_subtitle', value:"Bilan peau gratuit, Box personnalisée, livraison partout au Maroc." } })

  // ── BOXES ────────────────────────────────────────────────
  const boxes = [
    { name:'Douceur Coréenne',  slug:'douceur-coreenne',  skinType:'sensible',  skinLabel:'Peau sensible',       tag:'Peau sensible · Réactive · Rougeurs',          order:1, accroche:'Apaiser et réparer sans agresser',              description:"Pour les peaux qui réagissent au moindre produit. Cette box K-Beauty mise sur les ingrédients les plus doux.", products:JSON.stringify(['Nettoyant centella','Toner aloe vera','Sérum acide hyaluronique','Crème barrière']), image:'/images/peau-sensible.jpg', waMessage:"Bonjour, je suis intéressée par la Box Douceur Coréenne et j'aimerais un conseil personnalisé" },
    { name:'Glow Intense',      slug:'glow-intense',      skinType:'terne',     skinLabel:'Peau terne',          tag:"Peau terne · Manque d'éclat · Taches",           order:2, accroche:"Révéler l'éclat naturel de votre peau",          description:"Pour les peaux qui ont perdu leur luminosité. Associe la vitamine C, la niacinamide et un SPF.",               products:JSON.stringify(['Huile double nettoyante','Essence vitamine C','Sérum niacinamide','Crème SPF']),   image:'/images/peau-terne.jpg',     waMessage:"Bonjour, je suis intéressée par la Box Glow Intense et j'aimerais un conseil personnalisé" },
    { name:'Équilibre & Pureté', slug:'equilibre-purete', skinType:'grasse',    skinLabel:'Peau grasse / mixte', tag:'Peau grasse · Peau mixte · Imperfections',        order:3, accroche:'Nettoyer en profondeur sans abîmer ta peau',     description:"Purifie sans agresser, rééquilibre sans assécher. La box qui corrige les erreurs de soin les plus courantes.", products:JSON.stringify(['Nettoyant moussant','Toner BHA','Sérum rétinol','Gel-crème équilibrant']),           image:'/images/peau-grasse.jpg',    waMessage:"Bonjour, je suis intéressée par la Box Équilibre & Pureté et j'aimerais un conseil personnalisé" },
    { name:'Hydra Boost',       slug:'hydra-boost',       skinType:'seche',     skinLabel:'Peau sèche',          tag:'Peau sèche · Tiraillements · Déshydratation',     order:4, accroche:'Nourrir et repulper les peaux déshydratées',    description:"Pour les peaux qui tirent constamment. Céramides reconstituants et crème 72h pour une hydratation durable.",   products:JSON.stringify(['Lait nettoyant','Essence escargot','Sérum céramides','Crème 72h']),                  image:'/images/peau-seche.jpg',     waMessage:"Bonjour, je suis intéressée par la Box Hydra Boost et j'aimerais un conseil personnalisé" },
    { name:'Zone T Maîtrisée',  slug:'zone-t-maitrisee',  skinType:'mixte',     skinLabel:'Peau mixte',          tag:'Peau mixte · Zone T · Déséquilibre',              order:5, accroche:'Équilibrer sans sacrifier les joues sèches',    description:"La peau mixte est la plus complexe. Cette box bi-phase traite chaque zone selon ses besoins.",                products:JSON.stringify(['Gel équilibrant','Toner bi-phase','Sérum séborégulateur','Crème ciblée']),          image:'/images/box-mixte.jpg',      waMessage:"Bonjour, je suis intéressée par la Box Zone T Maîtrisée et j'aimerais un conseil personnalisé" },
    { name:'Youth Élixir',      slug:'youth-elixir',      skinType:'anti-age',  skinLabel:'Anti-âge',            tag:'Anti-âge · Prévention · Fermeté',                 order:6, accroche:'Prévenir et corriger les premiers signes du temps', description:"Rétinol doux, peptides et collagène pour une action anti-âge globale.",                               products:JSON.stringify(['Eau micellaire','Sérum rétinol + peptides','Crème collagène','Contour des yeux']), image:'/images/box-antiage.jpg',    waMessage:"Bonjour, je suis intéressée par la Box Youth Élixir et j'aimerais un conseil personnalisé" },
  ]
  for (const b of boxes) {
    await prisma.box.upsert({ where:{ slug:b.slug }, update:{}, create:b })
  }

  // ── PRODUCTS ─────────────────────────────────────────────
  const products = [
    { name:'Ice Roller Visage',         slug:'ice-roller-visage',        category:'soin',      catLabel:'Soin du visage',        tagline:'Le secret des coréennes pour un teint parfait', description:"Dégonfle, resserre les pores et donne un éclat immédiat en 5 minutes.", price:89,  oldPrice:null, stock:50, stockStatus:'ok',  image:'/images/acc-ice-roller.jpg',  benefits:JSON.stringify(['Réduit les rougeurs','Resserre les pores','Éclat immédiat']), badge:null,   featured:true,  order:1 },
    { name:'Gua Sha Quartz Rose',       slug:'gua-sha-quartz-rose',      category:'massage',   catLabel:'Massage & drainage',    tagline:'Le lifting naturel ancestral revisité',         description:"Drainage lymphatique, sculpture du visage et effet lifting naturel.",    price:129, oldPrice:null, stock:30, stockStatus:'ok',  image:'/images/acc-gua-sha.jpg',     benefits:JSON.stringify(['Drainage','Lifting naturel','Anti-tension']),               badge:'popular', featured:false, order:2 },
    { name:'Bandeau Skincare',          slug:'bandeau-skincare',         category:'routine',   catLabel:'Accessoires routine',   tagline:'Le petit accessoire qui change tout',           description:"Maintien parfait pour vos soins visage. Microfibre douce, lavable.",    price:45,  oldPrice:null, stock:80, stockStatus:'ok',  image:'/images/acc-bandeau.jpg',     benefits:JSON.stringify(['Réutilisable','Ultra doux','Lavable']),                     badge:'new',     featured:false, order:3 },
    { name:'Brosse Nettoyante Silicone',slug:'brosse-nettoyante-silicone',category:'nettoyage',catLabel:'Nettoyage',             tagline:'Le nettoyage 3x plus efficace',                 description:"Nettoyage en profondeur ultra doux. Élimine les impuretés sans agresser.", price:159, oldPrice:null, stock:10, stockStatus:'low', image:'/images/acc-brosse.jpg',      benefits:JSON.stringify(['Nettoyage profond','Ultra doux','Anti-bactérien']),         badge:null,      featured:false, order:4 },
    { name:'Rouleau Jade Double Tête',  slug:'rouleau-jade-double-tete', category:'massage',   catLabel:'Massage & drainage',    tagline:'Grand visage + petit contour — un seul outil',  description:"Double tête pour grand et petit contour. Drainage, anti-poches.",        price:99,  oldPrice:120,  stock:25, stockStatus:'ok',  image:'/images/acc-rouleau-jade.jpg',benefits:JSON.stringify(['Anti-poches','Éclat','Double usage']),                      badge:'-17%',    featured:false, order:5 },
    { name:'Éponge Konjac',             slug:'eponge-konjac',            category:'nettoyage', catLabel:'Nettoyage',             tagline:"L'exfoliation la plus douce qui existe",         description:"Exfoliation douce naturelle, 100% végétale. Idéale peaux sensibles.",   price:55,  oldPrice:69,   stock:60, stockStatus:'ok',  image:'/images/acc-eponge.jpg',      benefits:JSON.stringify(['100% naturel','Exfoliant doux','Vegan']),                  badge:'-20%',    featured:false, order:6 },
  ]
  for (const p of products) {
    await prisma.product.upsert({ where:{ slug:p.slug }, update:{}, create:{ ...p, active:true } })
  }

  console.log('✅ Seed terminé !')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
