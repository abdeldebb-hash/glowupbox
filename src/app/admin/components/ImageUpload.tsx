'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'

interface Props {
  value:    string
  onChange: (url: string) => void
  label?:   string
}

export function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const inputRef  = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res  = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onChange(data.url)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">{label}</label>

      {value ? (
        <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-gray-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="bg-white text-[#1A1A2E] p-2 rounded-xl hover:bg-gray-100 transition-colors" title="Changer">
              <Upload className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => onChange('')}
              className="bg-white text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors" title="Supprimer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="w-48 h-48 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#E91E8C] hover:bg-[rgba(233,30,140,.02)] transition-all text-gray-400 hover:text-[#E91E8C]">
          {loading
            ? <Loader2 className="w-6 h-6 animate-spin" />
            : <><ImageIcon className="w-6 h-6" /><span className="text-xs font-medium">Choisir une image</span></>
          }
        </button>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

      {value && (
        <div className="mt-2">
          <input type="text" value={value} onChange={e => onChange(e.target.value)}
            placeholder="Ou coller une URL..."
            className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 text-[#4A4A6A] outline-none focus:border-[#E91E8C] transition-colors" />
        </div>
      )}
      {!value && (
        <div className="mt-2">
          <input type="text" value={value} onChange={e => onChange(e.target.value)}
            placeholder="Ou coller une URL image..."
            className="w-48 text-xs px-3 py-2 rounded-lg border border-gray-200 text-[#4A4A6A] outline-none focus:border-[#E91E8C] transition-colors" />
        </div>
      )}
    </div>
  )
}
