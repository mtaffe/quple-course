'use client'

import { ReactNode } from 'react'

interface ContentRendererProps {
  content: string
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const renderContent = () => {
    const lines = content.trim().split('\n')
    const elements: ReactNode[] = []
    let currentIndex = 0

    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trimEnd()

      // Skip empty lines
      if (line === '') {
        currentIndex++
        continue
      }

      // H1 (# Title)
      if (line.startsWith('# ') && !line.startsWith('## ')) {
        elements.push(
          <h1
            key={currentIndex}
            className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0"
          >
            {line.substring(2)}
          </h1>
        )
        currentIndex++
        continue
      }

      // H2 (## Subtitle)
      if (line.startsWith('## ') && !line.startsWith('### ')) {
        elements.push(
          <h2
            key={currentIndex}
            className="text-2xl font-bold text-foreground mb-4 mt-8 pb-2 border-b border-border/50"
          >
            {line.substring(3)}
          </h2>
        )
        currentIndex++
        continue
      }

      // H3 (### Subtitle)
      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={currentIndex}
            className="text-xl font-semibold text-foreground mb-3 mt-6"
          >
            {line.substring(4)}
          </h3>
        )
        currentIndex++
        continue
      }

      // Code block (```language)
      if (line.startsWith('```')) {
        const language = line.substring(3).trim()
        const codeLines: string[] = []
        currentIndex++

        while (currentIndex < lines.length && !lines[currentIndex].startsWith('```')) {
          codeLines.push(lines[currentIndex])
          currentIndex++
        }

        elements.push(
          <div key={currentIndex} className="my-6">
            <div className="glass-card rounded-lg overflow-hidden border border-border/50">
              {language && (
                <div className="bg-muted/50 px-4 py-2 border-b border-border/50">
                  <span className="text-xs font-mono font-medium text-primary">
                    {language}
                  </span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground leading-relaxed">
                  {codeLines.join('\n')}
                </code>
              </pre>
            </div>
          </div>
        )
        currentIndex++ // Skip closing ```
        continue
      }

      // Inline code block (single backticks)
      if (line.includes('`') && !line.startsWith('```')) {
        elements.push(
          <p key={currentIndex} className="text-foreground leading-relaxed mb-4">
            {parseInlineFormatting(line)}
          </p>
        )
        currentIndex++
        continue
      }

      // Unordered list (- item or * item)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems: string[] = []
        while (currentIndex < lines.length && (lines[currentIndex].startsWith('- ') || lines[currentIndex].startsWith('* '))) {
          listItems.push(lines[currentIndex].substring(2))
          currentIndex++
        }

        elements.push(
          <ul key={currentIndex} className="space-y-2 mb-6 ml-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground leading-relaxed flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span className="flex-1">{parseInlineFormatting(item)}</span>
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Checkbox list (✅ or ❌)
      if (line.startsWith('✅') || line.startsWith('❌')) {
        const listItems: string[] = []
        const types: string[] = []
        while (currentIndex < lines.length && (lines[currentIndex].startsWith('✅') || lines[currentIndex].startsWith('❌'))) {
          types.push(lines[currentIndex].substring(0, 1))
          listItems.push(lines[currentIndex].substring(2))
          currentIndex++
        }

        elements.push(
          <ul key={currentIndex} className="space-y-2 mb-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground leading-relaxed flex items-start glass-card p-3 rounded-lg">
                <span className="mr-3 text-lg">{types[idx]}</span>
                <span className="flex-1">{parseInlineFormatting(item)}</span>
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Blockquote or special boxes
      if (line.startsWith('>')) {
        elements.push(
          <div key={currentIndex} className="glass-card border-l-4 border-primary p-4 rounded-lg mb-6 bg-primary/5">
            <p className="text-foreground italic leading-relaxed">
              {parseInlineFormatting(line.substring(1).trim())}
            </p>
          </div>
        )
        currentIndex++
        continue
      }

      // ASCII art / diagrams (lines with special chars)
      if (line.includes('→') || line.includes('├') || line.includes('└') || line.includes('│')) {
        const diagramLines: string[] = []
        while (currentIndex < lines.length && (lines[currentIndex].includes('→') || lines[currentIndex].includes('├') || lines[currentIndex].includes('└') || lines[currentIndex].includes('│') || lines[currentIndex].trim() === '')) {
          if (lines[currentIndex].trim() !== '') {
            diagramLines.push(lines[currentIndex])
          }
          currentIndex++
          if (currentIndex < lines.length && lines[currentIndex].trim() !== '' && !lines[currentIndex].includes('→') && !lines[currentIndex].includes('├') && !lines[currentIndex].includes('└') && !lines[currentIndex].includes('│')) {
            break
          }
        }

        elements.push(
          <div key={currentIndex} className="my-6 glass-card p-6 rounded-lg bg-muted/20">
            <pre className="text-sm font-mono text-primary overflow-x-auto">
              {diagramLines.join('\n')}
            </pre>
          </div>
        )
        continue
      }

      // Table (lines starting with |)
      if (line.startsWith('|')) {
        const tableLines: string[] = []
        while (currentIndex < lines.length && lines[currentIndex].startsWith('|')) {
          tableLines.push(lines[currentIndex])
          currentIndex++
        }

        const rows = tableLines
          .filter(l => !l.includes('---')) // Skip separator
          .map(l => l.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim()))

        const headers = rows[0]
        const dataRows = rows.slice(1)

        elements.push(
          <div key={currentIndex} className="my-6 overflow-x-auto">
            <table className="w-full glass-card rounded-lg overflow-hidden">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-sm text-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        continue
      }

      // Regular paragraph
      if (line.trim() !== '') {
        elements.push(
          <p key={currentIndex} className="text-foreground leading-relaxed mb-4 text-base">
            {parseInlineFormatting(line)}
          </p>
        )
      }

      currentIndex++
    }

    return elements
  }

  // Helper function to parse inline formatting (bold, italic, code, etc.)
  const parseInlineFormatting = (text: string): ReactNode => {
    const parts: ReactNode[] = []
    let currentText = text
    let key = 0

    while (currentText.length > 0) {
      // Inline code (`code`)
      const codeMatch = currentText.match(/`([^`]+)`/)
      if (codeMatch && codeMatch.index !== undefined) {
        // Add text before code
        if (codeMatch.index > 0) {
          const beforeText = currentText.substring(0, codeMatch.index)
          parts.push(<span key={key++}>{processTextFormatting(beforeText)}</span>)
        }
        // Add code
        parts.push(
          <code key={key++} className="px-2 py-0.5 bg-muted/50 rounded text-primary font-mono text-sm border border-border/50">
            {codeMatch[1]}
          </code>
        )
        currentText = currentText.substring(codeMatch.index + codeMatch[0].length)
        continue
      }

      // No more special formatting
      parts.push(<span key={key++}>{processTextFormatting(currentText)}</span>)
      break
    }

    return <>{parts}</>
  }

  // Process bold, italic, and other text formatting
  const processTextFormatting = (text: string): ReactNode => {
    const parts: ReactNode[] = []
    let currentText = text
    let key = 0

    while (currentText.length > 0) {
      // Bold (**text**)
      const boldMatch = currentText.match(/\*\*([^*]+)\*\*/)
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(currentText.substring(0, boldMatch.index))
        }
        parts.push(
          <strong key={key++} className="font-bold text-primary">
            {boldMatch[1]}
          </strong>
        )
        currentText = currentText.substring(boldMatch.index + boldMatch[0].length)
        continue
      }

      // Links ([text](url))
      const linkMatch = currentText.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch && linkMatch.index !== undefined) {
        if (linkMatch.index > 0) {
          parts.push(currentText.substring(0, linkMatch.index))
        }
        parts.push(
          <a
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            {linkMatch[1]}
          </a>
        )
        currentText = currentText.substring(linkMatch.index + linkMatch[0].length)
        continue
      }

      // No more formatting
      parts.push(currentText)
      break
    }

    return <>{parts}</>
  }

  return <div className="space-y-2">{renderContent()}</div>
}
