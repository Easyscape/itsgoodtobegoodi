'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Save, Loader2, Check, MapPin, Plane, Heart, Instagram, Mail } from 'lucide-react'

type Setting = {
  id: string
  key: string
  value: string | null
  label: string | null
  type: string
  category: string
}

export default function ParametresPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category')

    if (error) {
      setError('Erreur lors du chargement des paramètres')
      console.error(error)
    } else {
      setSettings(data || [])
    }
    setLoading(false)
  }

  const handleChange = (key: string, value: string) => {
    setSettings(settings.map(s =>
      s.key === key ? { ...s, value } : s
    ))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    const supabase = createClient()

    try {
      for (const setting of settings) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: setting.value })
          .eq('key', setting.key)

        if (error) throw error
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Erreur lors de la sauvegarde')
      console.error(err)
    }

    setSaving(false)
  }

  const getSettingsByCategory = (category: string) =>
    settings.filter(s => s.category === category)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Paramètres du site
          </h1>
          <p className="text-brown-600 mt-1">
            Modifiez les informations affichées sur votre site
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4" />
              Sauvegardé !
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Sauvegarder
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {/* Statistiques */}
      <section className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
        <h2 className="font-serif text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          📊 Statistiques affichées
        </h2>
        <p className="text-brown-600 text-sm mb-6">
          Ces chiffres apparaissent sur la page d&apos;accueil
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {getSettingsByCategory('stats').map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                {setting.key === 'stat_countries' && <MapPin className="inline h-4 w-4 mr-1" />}
                {setting.key === 'stat_trips' && <Plane className="inline h-4 w-4 mr-1" />}
                {setting.key === 'stat_children' && <Heart className="inline h-4 w-4 mr-1" />}
                {setting.label}
              </label>
              <input
                type="text"
                value={setting.value || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Page d'accueil */}
      <section className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
        <h2 className="font-serif text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          🏠 Page d&apos;accueil
        </h2>

        <div className="space-y-6">
          {getSettingsByCategory('homepage').map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                {setting.label}
              </label>
              {setting.type === 'text' && setting.key.includes('subtitle') ? (
                <textarea
                  value={setting.value || ''}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={setting.value || ''}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  placeholder={setting.type === 'image' ? 'URL de l\'image' : ''}
                  className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section À propos */}
      <section className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
        <h2 className="font-serif text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          👋 Section À propos
        </h2>

        <div className="space-y-6">
          {getSettingsByCategory('about').map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                {setting.label}
              </label>
              {setting.key.includes('text') ? (
                <textarea
                  value={setting.value || ''}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={setting.value || ''}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  placeholder={setting.type === 'image' ? 'URL de l\'image' : ''}
                  className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Réseaux sociaux */}
      <section className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
        <h2 className="font-serif text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          📱 Réseaux sociaux & Contact
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {getSettingsByCategory('social').map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                {setting.key === 'instagram' && <Instagram className="inline h-4 w-4 mr-1" />}
                {setting.key === 'email' && <Mail className="inline h-4 w-4 mr-1" />}
                {setting.label}
              </label>
              <input
                type={setting.key === 'email' ? 'email' : 'text'}
                value={setting.value || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Informations générales */}
      <section className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
        <h2 className="font-serif text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          ⚙️ Informations générales
        </h2>

        <div className="space-y-6">
          {getSettingsByCategory('general').map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                {setting.label}
              </label>
              <input
                type="text"
                value={setting.value || ''}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Save button at bottom */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4" />
              Sauvegardé !
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Sauvegarder les modifications
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
