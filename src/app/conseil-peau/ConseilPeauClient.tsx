'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Shield, Clock, Star, MessageCircle, CheckCircle } from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl } from '@/lib/utils'
import { useWaNumber } from '@/lib/wa-context'

type Answers = {
  nom:                string
  phone:              string
  typePeau:           string
  preoccupation:      string
  reactionNettoyage:  string
  texture:            string
  budget:             string
  experienceCentella: string
  routineActuelle:    string
  inconforts:         string
  objectif:           string
  objectifAutre:      string
}

const QUESTIONS = [
  {
    key: 'typePeau' as keyof Answers,
    title: '🌿 Quel est ton type de peau ?',
    subtitle: null,
    options: [
      { value: 'Sèche',    emoji: '💧', desc: 'Tiraillements, peu de brillance' },
      { value: 'Grasse',   emoji: '✨', desc: 'Brillante en fin de journée, pores visibles' },
      { value: 'Mixte',    emoji: '⚖️', desc: 'Zone T brillante, joues normales à sèches' },
      { value: 'Normale',  emoji: '😊', desc: 'Équilibrée, sans inconfort' },
      { value: 'Sensible', emoji: '🌸', desc: 'Réagit facilement : rougeurs, picotements' },
    ],
  },
  {
    key: 'preoccupation' as keyof Answers,
    title: '⚠️ Quelle est ta principale préoccupation ?',
    subtitle: 'Une seule réponse — la plus importante pour toi',
    options: [
      { value: 'Hydratation / tiraillements',                  emoji: '💧', desc: '' },
      { value: 'Excès de sébum / brillance',                   emoji: '✨', desc: '' },
      { value: 'Pores visibles / texture irrégulière',         emoji: '🔍', desc: '' },
      { value: 'Boutons / imperfections',                      emoji: '🔴', desc: '' },
      { value: "Taches / teint irrégulier / manque d'éclat",  emoji: '🌟', desc: '' },
      { value: 'Sensibilité / rougeurs',                       emoji: '🌸', desc: '' },
      { value: 'Prévention des rides / fermeté',               emoji: '⏰', desc: '' },
    ],
  },
  {
    key: 'reactionNettoyage' as keyof Answers,
    title: '🧴 Comment réagit ta peau après le nettoyage ?',
    subtitle: null,
    options: [
      { value: 'Confortable, ni tiraille ni brille',           emoji: '😊', desc: '' },
      { value: 'Tiraille et tire (même juste après)',          emoji: '💧', desc: '' },
      { value: 'Devient rouge ou chaude',                     emoji: '🌸', desc: '' },
      { value: "Devient rapidement grasse (moins d'1 heure)", emoji: '✨', desc: '' },
      { value: 'Je ne fais pas attention',                    emoji: '🤷', desc: '' },
    ],
  },
  {
    key: 'texture' as keyof Answers,
    title: '🫧 Quelle texture préfères-tu pour tes soins ?',
    subtitle: null,
    options: [
      { value: 'Gel / fluide léger',        emoji: '💨', desc: '' },
      { value: 'Crème / lait (riche)',       emoji: '🥛', desc: '' },
      { value: 'Masque / patch',            emoji: '🎭', desc: '' },
      { value: "Je n'ai pas de préférence", emoji: '🤷', desc: '' },
    ],
  },
  {
    key: 'budget' as keyof Answers,
    title: '💰 Quel est ton budget mensuel pour ta routine ?',
    subtitle: 'Hors nettoyant',
    options: [
      { value: 'Moins de 200 MAD', emoji: '💚', desc: '' },
      { value: '200 – 500 MAD',    emoji: '💛', desc: '' },
      { value: '500 – 700 MAD',    emoji: '🧡', desc: '' },
      { value: 'Plus de 700 MAD',  emoji: '❤️', desc: '' },
    ],
  },
  {
    key: 'experienceCentella' as keyof Answers,
    title: "🧪 As-tu déjà utilisé un produit à base d'acides aminés ou de centella ?",
    subtitle: null,
    options: [
      { value: "Oui, j'ai aimé",        emoji: '✅', desc: '' },
      { value: "Oui, je n'ai pas aimé", emoji: '❌', desc: '' },
      { value: 'Non, jamais',            emoji: '🆕', desc: '' },
      { value: 'Je ne sais pas',         emoji: '🤷', desc: '' },
    ],
  },
  {
    key: 'routineActuelle' as keyof Answers,
    title: '💆 Quelle est ta routine skincare actuelle ?',
    subtitle: 'Ce que tu fais la plupart du temps',
    options: [
      { value: 'Aucune routine',               emoji: '🆕', desc: "Eau seule, rien d'autre" },
      { value: 'Nettoyage seul',               emoji: '🧼', desc: 'Un nettoyant, pas de soin après' },
      { value: 'Nettoyage + crème hydratante', emoji: '💧', desc: 'Parfois ou souvent' },
      { value: 'Routine de base',              emoji: '🌱', desc: 'Nettoyant + sérum + crème' },
      { value: 'Routine complète',             emoji: '✨', desc: 'Plusieurs étapes, produits ciblés, masques / exfoliants' },
    ],
  },
  {
    key: 'inconforts' as keyof Answers,
    title: '😣 Ressens-tu régulièrement des inconforts cutanés ?',
    subtitle: 'Une seule réponse — le plus fréquent',
    options: [
      { value: 'Démangeaisons',                                  emoji: '🔴', desc: '' },
      { value: 'Tiraillements après chaque lavage',              emoji: '💧', desc: '' },
      { value: "Zones qui piquent à l'application d'un sérum",  emoji: '🌶️', desc: '' },
      { value: 'Rougeurs persistantes',                          emoji: '🌸', desc: '' },
      { value: 'Aucun inconfort',                                emoji: '😊', desc: '' },
    ],
  },
  {
    key: 'objectif' as keyof Answers,
    title: '🎯 Quel est ton objectif principal avec Glow Up Box ?',
    subtitle: null,
    options: [
      { value: 'Avoir une peau éclatante sans fond de teint', emoji: '✨', desc: '' },
      { value: 'Faire enfin fonctionner mes sérums chers',    emoji: '💊', desc: '' },
      { value: 'Arrêter les irritations / boutons / pores',  emoji: '🛑', desc: '' },
      { value: 'Découvrir une routine simple et efficace',    emoji: '🌱', desc: '' },
      { value: 'Autre',                                       emoji: '💬', desc: '' },
    ],
  },
]

// Steps: 0=intro, 1=personal info, 2-10=questions 1-9, 11=success
const LAST_QUESTION_STEP = QUESTIONS.length + 1  // 10
const SUCCESS_STEP       = QUESTIONS.length + 2  // 11

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
}

export function ConseilPeauClient() {
  const waNum = useWaNumber()

  const [step,       setStep]       = useState(0)
  const [direction,  setDirection]  = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [answers,    setAnswers]    = useState<Answers>({
    nom: '', phone: '', typePeau: '', preoccupation: '',
    reactionNettoyage: '', texture: '', budget: '',
    experienceCentella: '', routineActuelle: '', inconforts: '',
    objectif: '', objectifAutre: '',
  })

  const currentQuestion = (step >= 2 && step <= LAST_QUESTION_STEP) ? QUESTIONS[step - 2] : null
  const progress        = step >= 1 && step <= LAST_QUESTION_STEP ? (step / LAST_QUESTION_STEP) * 100 : 0
  const showNav         = step >= 1 && step <= LAST_QUESTION_STEP

  function goNext() { setDirection(1);  setStep(s => s + 1) }
  function goPrev() { setDirection(-1); setStep(s => s - 1) }

  function selectOption(key: keyof Answers, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function canProceed(): boolean {
    if (step === 0) return true
    if (step === 1) return answers.nom.trim().length > 0 && answers.phone.trim().length > 0
    if (currentQuestion) {
      if (currentQuestion.key === 'objectif' && answers.objectif === 'Autre') {
        return answers.objectifAutre.trim().length > 0
      }
      return answers[currentQuestion.key] !== ''
    }
    return false
  }

  async function handleSubmit() {
    setSubmitting(true)
    const objectifFinal = answers.objectif === 'Autre'
      ? `Autre : ${answers.objectifAutre}`
      : answers.objectif

    const msg = `Bonjour Glow Up Box ! 👋\n\nVoici mon bilan peau :\n\n👤 Nom & Prénom : ${answers.nom}\n📱 WhatsApp : ${answers.phone}\n\n🌿 Type de peau : ${answers.typePeau}\n⚠️ Préoccupation principale : ${answers.preoccupation}\n🧴 Réaction après nettoyage : ${answers.reactionNettoyage}\n🫧 Texture préférée : ${answers.texture}\n💰 Budget mensuel : ${answers.budget}\n🧪 Expérience centella/acides : ${answers.experienceCentella}\n💆 Routine actuelle : ${answers.routineActuelle}\n😣 Inconforts cutanés : ${answers.inconforts}\n🎯 Objectif principal : ${objectifFinal}\n\nMerci de me conseiller ! 🌸`

    window.open(waUrl(msg, waNum), '_blank')
    await new Promise(r => setTimeout(r, 800))
    setSubmitting(false)
    setStep(SUCCESS_STEP)
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="bg-dark-gradient pt-28 pb-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E91E8C 0%, transparent 55%), radial-gradient(circle at 80% 50%, #FFB347 0%, transparent 55%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <SectionBadge light>Bilan peau gratuit</SectionBadge>
              <h1 className="font-playfair font-bold italic text-white mt-2 mb-4" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
                Trouve ta <span className="gradient-text">routine idéale</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed">
                Réponds à 9 questions et reçois une recommandation box personnalisée sur WhatsApp — gratuitement.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:flex gap-4 justify-end">
              {[{ emoji: '🌸', label: 'Sensible' }, { emoji: '✨', label: 'Terne' }, { emoji: '💧', label: 'Sèche' }, { emoji: '⚖️', label: 'Mixte' }].map((p, i) => (
                <div key={p.label} className="bg-white/8 border border-white/12 rounded-2xl px-4 py-3 text-center backdrop-blur-sm"
                  style={{ transform: `translateY(${i % 2 === 0 ? '0' : '12px'})` }}>
                  <div className="text-2xl mb-1">{p.emoji}</div>
                  <div className="text-white/70 text-xs font-medium">{p.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section className="py-16 px-5 bg-soft-pink">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Formulaire multi-étapes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Barre de progression */}
              {step >= 1 && step <= LAST_QUESTION_STEP && (
                <div className="h-1.5 bg-gray-100">
                  <motion.div className="h-full bg-brand-gradient" initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }} />
                </div>
              )}

              <div className="p-7 sm:p-10">
                {step >= 1 && step <= LAST_QUESTION_STEP && (
                  <p className="text-[11px] font-bold text-brand-gray/40 uppercase tracking-widest mb-7">
                    {step === 1 ? 'Vos informations' : `Étape ${step} / 10`}
                  </p>
                )}

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={step} custom={direction} variants={slideVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.3, ease: 'easeOut' }}>

                    {/* ── INTRO ── */}
                    {step === 0 && (
                      <div>
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 rounded-3xl bg-brand-gradient flex items-center justify-center text-3xl mx-auto mb-6 shadow-[0_8px_24px_rgba(233,30,140,0.3)]">
                            ✦
                          </div>
                          <h2 className="font-playfair font-bold text-brand-black text-2xl sm:text-3xl mb-1">
                            Glow Up Box — Bilan de Peau
                          </h2>
                          <p className="text-fuchsia font-semibold text-sm">Trouve la routine adaptée à ta peau</p>
                        </div>
                        <div className="bg-soft-pink rounded-2xl p-6 mb-8 text-brand-gray text-sm leading-relaxed space-y-3">
                          <p>Prends 1 à 2 minutes pour répondre à ce questionnaire 🤍</p>
                          <p>👉 Cela nous permet de comprendre ta peau, tes besoins et tes habitudes afin de te proposer une routine simple, efficace et adaptée à ton quotidien ✨</p>
                          <div className="border-l-4 border-fuchsia pl-4 space-y-1">
                            <p className="font-semibold text-brand-black">💖 Avec Glow Up Box, tu ne reçois pas seulement des produits :</p>
                            <p>✔️ Tu reçois une routine claire</p>
                            <p>✔️ Une fiche de suivi pour rester régulière</p>
                            <p>✔️ Un accompagnement personnalisé pendant 1 mois</p>
                          </div>
                          <p>👉 Notre objectif : t&apos;aider à prendre soin de ta peau sans te compliquer la vie</p>
                          <p className="text-brand-gray/60 text-xs">📩 Une fois le formulaire rempli, nous analysons tes réponses et revenons vers toi rapidement avec la box la plus adaptée 🤍</p>
                        </div>
                        <motion.button onClick={goNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gradient text-white font-bold text-[14px] uppercase tracking-wider shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_16px_32px_rgba(233,30,140,0.4)] transition-shadow">
                          Commencer mon bilan <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}

                    {/* ── STEP 1 : Infos personnelles ── */}
                    {step === 1 && (
                      <div>
                        <h2 className="font-playfair font-bold text-brand-black text-2xl mb-1">👋 On fait connaissance !</h2>
                        <p className="text-brand-gray text-sm mb-8">Ces informations resteront confidentielles.</p>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-semibold text-brand-black mb-2">
                              Nom et Prénom <span className="text-fuchsia">*</span>
                            </label>
                            <input type="text" value={answers.nom}
                              onChange={e => setAnswers(prev => ({ ...prev, nom: e.target.value }))}
                              placeholder="Ex : Salma Benali"
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-fuchsia focus:ring-2 focus:ring-fuchsia/15 outline-none text-brand-black transition-all text-base" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-brand-black mb-2">
                              N° WhatsApp <span className="text-fuchsia">*</span>
                            </label>
                            <input type="tel" value={answers.phone}
                              onChange={e => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="Ex : 06 12 34 56 78"
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-fuchsia focus:ring-2 focus:ring-fuchsia/15 outline-none text-brand-black transition-all text-base" />
                            <p className="text-brand-gray/60 text-xs mt-1.5">Pour recevoir ta recommandation personnalisée</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── QUESTIONS 2–10 ── */}
                    {step >= 2 && step <= LAST_QUESTION_STEP && currentQuestion && (
                      <div>
                        <h2 className="font-playfair font-bold text-brand-black text-xl sm:text-2xl mb-1">
                          {currentQuestion.title}
                        </h2>
                        {currentQuestion.subtitle
                          ? <p className="text-brand-gray text-sm mb-6">{currentQuestion.subtitle}</p>
                          : <div className="mb-6" />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentQuestion.options.map((opt, i) => {
                            const selected = answers[currentQuestion.key] === opt.value
                            return (
                              <motion.button key={opt.value}
                                onClick={() => selectOption(currentQuestion.key, opt.value)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 min-h-[44px] ${
                                  selected
                                    ? 'border-fuchsia bg-soft-pink shadow-[0_0_0_3px_rgba(233,30,140,0.08)]'
                                    : 'border-gray-200 bg-white hover:border-fuchsia/40'
                                }`}>
                                <div className="flex items-center gap-3">
                                  <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${selected ? 'text-fuchsia' : 'text-brand-black'}`}>
                                      {opt.value}
                                    </p>
                                    {opt.desc && (
                                      <p className="text-brand-gray/60 text-xs mt-0.5">{opt.desc}</p>
                                    )}
                                  </div>
                                  {selected && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                      className="w-5 h-5 rounded-full bg-fuchsia flex items-center justify-center flex-shrink-0">
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>

                        {/* Champ libre si "Autre" sur Q9 */}
                        {currentQuestion.key === 'objectif' && answers.objectif === 'Autre' && (
                          <AnimatePresence>
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden mt-3">
                              <textarea value={answers.objectifAutre}
                                onChange={e => setAnswers(prev => ({ ...prev, objectifAutre: e.target.value }))}
                                placeholder="Décris ton objectif en quelques mots..."
                                rows={3}
                                className="w-full px-4 py-3.5 rounded-xl border-2 border-fuchsia focus:ring-2 focus:ring-fuchsia/15 outline-none text-brand-black transition-all text-sm resize-none" />
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </div>
                    )}

                    {/* ── SUCCÈS ── */}
                    {step === SUCCESS_STEP && (
                      <div className="text-center py-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-24 h-24 rounded-full bg-brand-gradient flex items-center justify-center mx-auto mb-6 shadow-[0_12px_32px_rgba(233,30,140,0.35)]">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                            <CheckCircle className="w-12 h-12 text-white" />
                          </motion.div>
                        </motion.div>
                        <h2 className="font-playfair font-bold text-brand-black text-2xl sm:text-3xl mb-3">
                          🎉 Merci pour ton bilan !
                        </h2>
                        <p className="text-brand-gray text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                          Nous analysons tes réponses et revenons vers toi rapidement sur WhatsApp avec la box la plus adaptée à ta peau 🤍
                          <br /><br />
                          En attendant, découvre nos box soins personnalisées.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <GradientButton href={waUrl('Bonjour Glow Up Box ! 👋', waNum)} size="md" external>
                            <MessageCircle className="w-4 h-4" />📲 Suivre sur WhatsApp
                          </GradientButton>
                          <GradientButton href="/boxs" variant="outline" size="md">
                            Voir nos box →
                          </GradientButton>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                {showNav && (
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                    {step >= 2 ? (
                      <button onClick={goPrev}
                        className="flex items-center gap-1.5 text-brand-gray hover:text-fuchsia transition-colors font-medium text-sm min-h-[44px] px-2">
                        <ChevronLeft className="w-4 h-4" />Précédent
                      </button>
                    ) : <div />}

                    {step < LAST_QUESTION_STEP ? (
                      <motion.button onClick={goNext} disabled={!canProceed()}
                        whileHover={canProceed() ? { scale: 1.02 } : {}}
                        whileTap={canProceed() ? { scale: 0.97 } : {}}
                        className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
                          canProceed()
                            ? 'bg-brand-gradient text-white shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_16px_32px_rgba(233,30,140,0.4)]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}>
                        Suivant <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <motion.button onClick={handleSubmit} disabled={!canProceed() || submitting}
                        whileHover={canProceed() && !submitting ? { scale: 1.02 } : {}}
                        whileTap={canProceed() && !submitting ? { scale: 0.97 } : {}}
                        className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
                          canProceed() && !submitting
                            ? 'bg-brand-gradient text-white shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_16px_32px_rgba(233,30,140,0.4)]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}>
                        {submitting ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                            Préparation de ton bilan...
                          </>
                        ) : (
                          <>Envoyer mon bilan <ChevronRight className="w-4 h-4" /></>
                        )}
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5 lg:sticky lg:top-28 self-start">
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <h3 className="font-playfair font-bold text-brand-black text-lg mb-5">Ce que vous obtenez</h3>
              <div className="space-y-4">
                {[
                  { Icon: Shield, text: 'Conseil 100% gratuit' },
                  { Icon: Clock,  text: '2 minutes chrono' },
                  { Icon: Star,   text: 'Recommandation personnalisée' },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-soft-pink flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-fuchsia" />
                    </div>
                    <span className="text-brand-gray text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-gradient rounded-3xl p-6 text-white">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-4">
                &quot;J&apos;ai fait le bilan et en 24h j&apos;avais ma recommandation. La box Hydra Boost a transformé ma peau en 3 semaines !&quot;
              </p>
              <p className="text-coral text-sm font-semibold">— Nadia, Casablanca</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-3">
              <Shield className="w-4 h-4 text-fuchsia mt-0.5 flex-shrink-0" />
              <p className="text-brand-gray text-xs leading-relaxed">
                Vos informations sont confidentielles et utilisées uniquement pour votre conseil peau personnalisé.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
