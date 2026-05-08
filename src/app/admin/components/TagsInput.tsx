'use client'

import { useState, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'

interface Props {
  value:    string[]
  onChange: (v: string[]) => void
  label?:   string
  placeholder?: string
}

export function TagsInput({ value, onChange, label = 'Éléments', placeholder = 'Ajouter...' }: Props) {
  const [input, setInput] = useState('')

  function add() {
    const v = input.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setInput('')
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i))
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); add() }
    if (e.key === 'Backspace' && !input && value.length) remove(value.length - 1)
  }

  return (
    <div>
      <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">{label}</label>
      <div className="min-h-[48px] flex flex-wrap gap-1.5 p-2 rounded-xl border border-gray-200 focus-within:border-[#E91E8C] focus-within:ring-2 focus-within:ring-[rgba(233,30,140,.1)] transition-all bg-white">
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-[rgba(233,30,140,.08)] text-[#E91E8C] text-xs font-medium px-2.5 py-1 rounded-lg">
            {tag}
            <button type="button" onClick={() => remove(i)} className="hover:text-red-600 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none text-sm text-[#1A1A2E] placeholder-gray-300 bg-transparent"
        />
      </div>
      {input && (
        <button type="button" onClick={add}
          className="mt-1 flex items-center gap-1 text-xs text-[#E91E8C] hover:underline">
          <Plus className="w-3 h-3" /> Ajouter "{input}"
        </button>
      )}
      <p className="text-[#4A4A6A]/50 text-xs mt-1">Appuyez sur Entrée pour ajouter</p>
    </div>
  )
}
