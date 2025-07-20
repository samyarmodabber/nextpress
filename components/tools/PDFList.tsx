'use client'

import { useEffect, useState } from 'react'

type PDFListProps = {
  setName: string
}

export default function PDFList({ setName }: PDFListProps) {
  const [pdfs, setPdfs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const res = await fetch(`/api/pdfs/${setName}`)
        const data = await res.json()

        if (res.ok && data.pdfs) {
          setPdfs(data.pdfs)
        } else {
          setError(data.error || 'Unknown error')
        }
      } catch (err) {
        setError('Failed to fetch')
      }
    }

    fetchPDFs()
  }, [setName])

  const getImagePath = (pdfName: string): string => {
    const basePath = `/static/pdf/${setName}/`
    const nameWithoutExt = pdfName.replace(/\.pdf$/, '')
    return `${basePath}${nameWithoutExt}.jpg` // Try JPG first
  }

  const getFallbackPath = (pdfName: string): string => {
    const basePath = `/static/pdf/${setName}/`
    const nameWithoutExt = pdfName.replace(/\.pdf$/, '')
    return `${basePath}${nameWithoutExt}.png` // Try PNG as fallback
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {pdfs.map((pdf) => (
          <div key={pdf} style={{ width: 150, textAlign: 'center' }}>
            <a href={`/static/pdf/${setName}/${pdf}`} target="_blank" rel="noopener noreferrer">
              <img
                src={getImagePath(pdf)}
                alt={pdf}
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: 10,
                }}
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = () => {
                    target.src = '/static/pdf/default.jpg' // Final fallback
                  }
                  target.src = getFallbackPath(pdf)
                }}
              />
              <div style={{ marginTop: 8 }}>{pdf}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
