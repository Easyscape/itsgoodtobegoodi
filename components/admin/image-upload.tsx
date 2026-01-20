'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  bucket: string
  folder?: string
}

export function ImageUpload({ value, onChange, bucket, folder = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont acceptées')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB')
      return
    }

    setError('')
    setIsUploading(true)

    try {
      const supabase = createClient()

      // Generate unique filename
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      const filePath = folder ? `${folder}/${fileName}` : fileName

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />

      {value ? (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-beige-100">
          <Image
            src={value}
            alt="Couverture"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className={`aspect-video bg-beige-100 rounded-xl border-2 border-dashed border-beige-300 flex flex-col items-center justify-center cursor-pointer hover:border-terracotta-400 hover:bg-terracotta-50 transition-colors ${
            isUploading ? 'pointer-events-none' : ''
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 text-terracotta-500 animate-spin mb-2" />
              <p className="text-sm text-brown-600">Upload en cours...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-beige-400 mb-2" />
              <p className="text-sm text-brown-600">Cliquez pour uploader</p>
              <p className="text-xs text-brown-400 mt-1">JPG, PNG max 5MB</p>
            </>
          )}
        </label>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
