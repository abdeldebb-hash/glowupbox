'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Send, Shield, Clock, Star } from 'lucide-react'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { waUrl } from '@/lib/utils'

type Answers = {
  prenom:             string
  phone:              string
  typePeau:           string
  preoccupation:      string
  reactionNettoyage:  string
  texture:            string
  budget:             string
  experienceCentella: string
}

const QUESTIONS = [
  {
    key: 'typePeau' as keyof Answers,
    title: '🌿 Quel est ton type de peau ?',
    subtitle: null,
    options: [
      { value: 'Sèche',     label: 'Sèche',     emoji: '💧', desc: 'Tiraillements, peu de brillance' },
      { value: 'Grasse',    label: 'Grasse',     emoji: '✨', desc: 'Brillante en fin de journée, pores visibles' },
      { value: 'Mixte',     label: 'Mixte',      emoji: '⚖️', desc: 'Zone T brillante, joues normales à sèches' },
      { value: 'Normale',   label: 'Normale',    emoji: '😊', desc: 'Équilibrée, sans inconfort' },
      { value: 'Sensible',  label: 'Sensible',   emoji: '🌸', desc: 'Réagit facilement : rougeurs, picotements' },
    ],
  },
  {
    key: 'preoccupation' as keyof Answers,
    title: '⚠️ Quelle est ta principale préoccupation ?',
    subtitle: 'Une seule réponse — la plus importante pour toi',
    options: [
      { value: 'Hydratation / tiraillements',                  label: 'Hydratation',        emoji: '💧', desc: 'Tiraillements' },
      { value: 'Excès de sébum / brillance',                   label: 'Sébum / brillance',  emoji: '✨', desc: 'Excès de brillance' },
      { value: 'Pores visibles / texture irrégulière',         label: 'Pores / texture',    emoji: '🔍', desc: 'Pores visibles' },
      { value: 'Boutons / imperfections',                      label: 'Boutons',            emoji: '🔴', desc: 'Imperfections' },
      { value: "Taches / teint irrégulier / manque d'éclat",  label: 'Taches / éclat',     emoji: '🌟', desc: 'Teint irrégulier' },
      { value: 'Sensibilité / rougeurs',                       label: 'Sensibilité',        emoji: '🌸', desc: 'Rougeurs' },
      { value: 'Prévention des rides / fermeté',               label: 'Anti-âge',           emoji: '⏰', desc: 'Rides / fermeté' },
    ],
  },
  {
    key: 'reactionNettoyage' as keyof Answers,
    title: '🧴 Comment réagit ta peau après le nettoyage ?',
    subtitle: null,
    options: [
      { value: 'Confortable, ni tiraille ni brille',     label: 'Confortable',     emoji: '😊', desc: 'Ni tiraille ni brille' },
      { value: 'Tiraille et tire (même juste après)',    label: 'Tiraille',         emoji: '💧', desc: 'Même juste après' },
      { value: 'Devient rouge ou chaude',               label: 'Rouge / chaude',   emoji: '🌸', desc: 'Réaction sensible' },
      { value: "Devient rapidement grasse (moins d'1h)",'label': 'Vite grasse',    emoji: '✨', desc: "Moins d'1h après" },
      { value: 'Je ne fais pas attention',              label: 'Je ne sais pas',   emoji: '🤷', desc: '' },
    ],
  },
  {
    key: 'texture' as keyof Answers,
    title: '🫧 Quelle texture préfères-tu pour tes soins ?',
    subtitle: null,
    options: [
      { value: 'Gel / fluide léger',    label: 'Gel / fluide',      emoji: '💨', desc: 'Léger et frais' },
      { value: 'Crème / lait (riche)',  label: 'Crème / lait',      emoji: '🥛', desc: 'Riche et nourrissant' },
      { value: 'Masque / patch',        label: 'Masque / patch',    emoji: '🎭', desc: 'Soin intensif' },
      { value: 'Pas de préférence',     label: 'Pas de préférence', emoji: '🤷', desc: '' },
    ],
  },
  {
    key: 'budget' as keyof Answers,
    title: '💰 Quel est ton budget mensuel pour ta routine ?',
    subtitle: 'Hors nettoyant',
    options: [
      { value: 'Moins de 200 MAD', label: '< 200 MAD',      emoji: '💚', desc: '' },
      { value: '200 – 400 MAD',    label: '200 – 400 MAD',  emoji: '💛', desc: '' },
      { value: '400 – 600 MAD',    label: '400 – 600 MAD',  emoji: '🧡', desc: '' },
      { value: 'Plus de 600 MAD',  label: '> 600 MAD',      emoji: '❤️', desc: '' },
    ],
  },
  {
    key: 'experienceCentella' as keyof Answers,
    title: "🧪 As-tu déjà utilisé un produit à base d'acides aminés ou de Centella ?",
    subtitle: null,
    options: [
      { value: "Oui, j'ai aimé",         label: "Oui, j'ai aimé",   emoji: '✅', desc: '' },
      { value: "Oui, je n'ai pas aimé",  label: "Oui, pas aimé",    emoji: '❌', desc: '' },
      { value: 'Non, jamais',             label: 'Non, jamais',      emoji: '🆕', desc: '' },
      { value: 'Je ne sais pas',          label: 'Je ne sais pas',   emoji: '🤷', desc: '' },
    ],
  },
]

const TOTAL_STEPS = 7 // step 0 (infos) + 6 questions

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ConseilPeauPage() {
  const [step,      setStep]      = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers,   setAnswers]   = useState<Answers>({
    prenom: '', phone: '', typePeau: '', preoccupation: '',
    reactionNettoyage: '', texture: '', budget: '', experienceCentella: '',
  })

  const progress        = (step / TOTAL_STEPS) * 100
  const currentQuestion = step > 0 ? QUESTIONS[step - 1] : null
  const isLastStep      = step === TOTAL_STEPS - 1

  function goNext() {
    setDirection(1)
    setStep(s => s + 1)
  }

  function goPrev() {
    setDirection(-1)
    setStep(s => s - 1)
  }

  function selectOption(key: keyof Answers, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function canProceed() {
    if (step === 0) return answers.prenom.trim().length > 0 && answers.phone.trim().length > 0
    if (currentQuestion) return answers[currentQuestion.key] !== ''
    return false
  }

  function handleSubmit() {
    const msg =
`Bonjour Glow Up Box ! 👋

Voici mon bilan peau :

👤 Prénom : ${answers.prenom}
📱 Mon numéro : ${answers.phone}
🌿 Type de peau : ${answers.typePeau}
⚠️ Préoccupation principale : ${answers.preoccupation}
🧴 Réaction après nettoyage : ${answers.reactionNettoyage}
🫧 Texture préférée : ${answers.texture}
💰 Budget mensuel : ${answers.budget}
🧪 Expérience Centella/acides : ${answers.experienceCentella}

Merci de me conseiller ! 😊`

    window.open(waUrl(msg), '_blank')
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="bg-dark-gradient pt-28 pb-16 px-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E91E8C 0%, transparent 55%), radial-gradient(circle at 80% 50%, #FFB347 0%, transparent 55%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <SectionBadge light>Bilan peau gratuit</SectionBadge>
              <h1
                className="font-playfair font-bold italic text-white mt-2 mb-4"
                style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}
              >
                Quel est votre{' '}
                <span className="gradient-text">profil peau ?</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed">
                Répondez à 6 questions et recevez une recommandation box personnalisée sur WhatsApp — gratuitement.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex gap-4 justify-end"
            >
              {[
                { emoji: '🌸', label: 'Sensible' },
                { emoji: '✨', label: 'Terne' },
                { emoji: '💧', label: 'Sèche' },
                { emoji: '⚖️', label: 'Mixte' },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className="bg-white/8 border border-white/12 rounded-2xl px-4 py-3 text-center backdrop-blur-sm"
                  style={{ transform: `translateY(${i % 2 === 0 ? '0' : '12px'})` }}
                >
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
              <div className="h-1.5 bg-gray-100">
                <motion.div
                  className="h-full bg-brand-gradient"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>

              <div className="p-7 sm:p-10">
                <p className="text-[11px] font-bold text-brand-gray/40 uppercase tracking-widest mb-7">
                  Étape {step + 1} / {TOTAL_STEPS + 1}
                </p>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                  >

                    {/* ── STEP 0 : Prénom + WhatsApp ── */}
                    {step === 0 && (
                      <div>
                        <h2 className="font-playfair font-bold text-brand-black text-2xl mb-1">
                          👋 On fait connaissance !
                        </h2>
                        <p className="text-brand-gray text-sm mb-8">
                          Ces informations resteront confidentielles.
                        </p>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-semibold text-brand-black mb-2">
                              Votre prénom <span className="text-fuchsia">*</span>
                            </label>
                            <input
                              type="text"
                              value={answers.prenom}
                              onChange={e => setAnswers(prev => ({ ...prev, prenom: e.target.value }))}
                              placeholder="ex : Sara"
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-fuchsia focus:ring-2 focus:ring-fuchsia/15 outline-none text-brand-black transition-all text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-brand-black mb-2">
                              Votre numéro WhatsApp <span className="text-fuchsia">*</span>
                            </label>
                            <input
                              type="tel"
                              value={answers.phone}
                              onChange={e => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="ex : 0612345678"
                              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-fuchsia focus:ring-2 focus:ring-fuchsia/15 outline-none text-brand-black transition-all text-base"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEPS 1–6 : Questions ── */}
                    {step > 0 && currentQuestion && (
                      <div>
                        <h2 className="font-playfair font-bold text-brand-black text-xl sm:text-2xl mb-1">
                          {currentQuestion.title}
                        </h2>
                        {currentQuestion.subtitle
                          ? <p className="text-brand-gray text-sm mb-6">{currentQuestion.subtitle}</p>
                          : <div className="mb-6" />
                        }
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentQuestion.options.map(opt => {
                            const selected = answers[currentQuestion.key] === opt.value
                            return (
                              <motion.button
                                key={opt.value}
                                onClick={() => selectOption(currentQuestion.key, opt.value)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 min-h-[44px] ${
                                  selected
                                    ? 'border-fuchsia bg-soft-pink shadow-[0_0_0_3px_rgba(233,30,140,0.08)]'
                                    : 'border-gray-200 bg-white hover:border-fuchsia/40'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm ${selected ? 'text-fuchsia' : 'text-brand-black'}`}>
                                      {opt.label}
                                    </p>
                                    {opt.desc && (
                                      <p className="text-brand-gray/60 text-xs mt-0.5 truncate">{opt.desc}</p>
                                    )}
                                  </div>
                                  {selected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-5 h-5 rounded-full bg-fuchsia flex items-center justify-center flex-shrink-0"
                                    >
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
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                  {step > 0 ? (
                    <button
                      onClick={goPrev}
                      className="flex items-center gap-1.5 text-brand-gray hover:text-fuchsia transition-colors font-medium text-sm min-h-[44px] px-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </button>
                  ) : <div />}

                  {!isLastStep ? (
                    <motion.button
                      onClick={goNext}
                      disabled={!canProceed()}
                      whileHover={canProceed() ? { scale: 1.02 } : {}}
                      whileTap={canProceed() ? { scale: 0.97 } : {}}
                      className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
                        canProceed()
                          ? 'bg-brand-gradient text-white shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_16px_32px_rgba(233,30,140,0.4)]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Suivant <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      whileHover={canProceed() ? { scale: 1.02 } : {}}
                      whileTap={canProceed() ? { scale: 0.97 } : {}}
                      className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] uppercase tracking-wider transition-all duration-300 min-h-[44px] ${
                        canProceed()
                          ? 'bg-brand-gradient text-white shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_16px_32px_rgba(233,30,140,0.4)]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Recevoir mon conseil
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-28 self-start">

            {/* Garanties */}
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

            {/* Témoignage */}
            <div className="bg-dark-gradient rounded-3xl p-6 text-white">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-4">
                "J'ai fait le bilan et en 24h j'avais ma recommandation. La box Hydra Boost a transformé ma peau en 3 semaines !"
              </p>
              <p className="text-coral text-sm font-semibold">— Nadia, Casablanca</p>
            </div>

            {/* Confidentialité */}
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
