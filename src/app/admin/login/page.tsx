'use client'

import { useState, FormEvent } from 'react'
import { useRouter }           from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router   = useRouter()
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password: pass }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erreur de connexion')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2D1B4E] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-playfair font-bold italic text-white text-4xl mb-1">
            GLOW UP BOX <span style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>✦</span>
          </h1>
          <p className="text-white/40 text-[12px] uppercase tracking-widest">Back-office</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,.3)] overflow-hidden">
          <div className="h-1.5" style={{ background:'linear-gradient(135deg,#E91E8C,#FF6B9D,#FFB347)' }} />
          <div className="p-10">
            <h2 className="font-playfair font-bold italic text-[#1A1A2E] text-2xl mb-1">Connexion</h2>
            <p className="text-[#4A4A6A] text-sm mb-8">Accès réservé à l'administratrice</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Email</label>
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@glowupbox.ma"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.12)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'} required
                    value={pass} onChange={e => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.12)] transition-all"
                  />
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E91E8C] transition-colors">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background:'linear-gradient(135deg,#E91E8C,#FF6B9D,#FFB347)', boxShadow:'0 8px 24px rgba(233,30,140,.3)' }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          Glow Up Box © 2025 — Back-office privé
        </p>
      </div>
    </div>
  )
}
