'use client'

import { Button } from '@/components/ui/Button'

interface HTMLKeyboardProps {
  onInsertTag: (tag: string) => void
}

const htmlTags = [
  { label: '<h1>', tag: '<h1></h1>', description: 'Título principal' },
  { label: '<h2>', tag: '<h2></h2>', description: 'Subtítulo' },
  { label: '<p>', tag: '<p></p>', description: 'Parágrafo' },
  { label: '<div>', tag: '<div></div>', description: 'Container' },
  { label: '<span>', tag: '<span></span>', description: 'Texto inline' },
  { label: '<a>', tag: '<a href=""></a>', description: 'Link' },
  { label: '<img>', tag: '<img src="" alt="">', description: 'Imagem' },
  { label: '<br>', tag: '<br>', description: 'Quebra de linha' },
  { label: '<ul>', tag: '<ul>\n  <li></li>\n</ul>', description: 'Lista' },
  { label: '<li>', tag: '<li></li>', description: 'Item da lista' },
  { label: '<strong>', tag: '<strong></strong>', description: 'Negrito' },
  { label: '<em>', tag: '<em></em>', description: 'Itálico' }
]

export function HTMLKeyboard({ onInsertTag }: HTMLKeyboardProps) {
  return (
    <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-200">
      <div className="grid grid-cols-3 gap-2">
        {htmlTags.map((htmlTag, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onInsertTag(htmlTag.tag)}
            className="flex flex-col items-center p-2 h-auto text-xs transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
            title={htmlTag.description}
          >
            <span className="font-mono font-bold text-primary">{htmlTag.label}</span>
            <span className="text-xs text-muted-foreground truncate w-full text-center leading-tight">
              {htmlTag.description}
            </span>
          </Button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center pt-1 border-t flex items-center justify-center space-x-1">
        <span>👆</span>
        <span>Toque em uma tag para inseri-la no código</span>
      </div>
    </div>
  )
}