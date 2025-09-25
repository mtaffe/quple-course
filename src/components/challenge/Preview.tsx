'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface PreviewProps {
  code: string
  className?: string
}

export function Preview({ code, className }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document

      if (doc) {
        doc.open()
        doc.write(code)
        doc.close()
      }
    }
  }, [code])

  return (
    <div className={cn('border rounded-lg overflow-hidden bg-white', className)}>
      <div className="bg-muted px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            Preview - Quple App
          </span>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[400px] border-none"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}