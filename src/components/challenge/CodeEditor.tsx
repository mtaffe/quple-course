'use client'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: 'light' | 'dark'
  height?: string
  readOnly?: boolean
  className?: string
}

export function CodeEditor({
  value,
  onChange,
  language = 'html',
  theme = 'light',
  height = '400px',
  readOnly = false,
  className
}: CodeEditorProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleEditorDidMount = () => {
    setIsLoading(false)
  }

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue)
    }
  }

  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      {isLoading && (
        <div className="flex items-center justify-center h-[400px] bg-muted">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <Editor
        height={height}
        language={language}
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineHeight: 1.6,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          renderLineHighlight: 'gutter',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
          },
        }}
      />
    </div>
  )
}