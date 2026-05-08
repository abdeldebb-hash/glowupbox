'use client'

import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

interface Props {
  id:       number
  endpoint: string
  label:    string
}

export function DeleteBtn({ id, endpoint, label }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Supprimer "${label}" ? Cette action est irréversible.`)) return
    setLoading(true)
    try {
      await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      className="p-2 rounded-lg text-[#4A4A6A] hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50" title="Supprimer">
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
