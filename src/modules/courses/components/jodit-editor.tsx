import { useState, useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

type JoditEditorComponentProps = {
  placeholder?: string // Prop para el placeholder
  onChange: (content: string) => void // Prop para manejar el cambio
}

export const JoditEditorComponent = ({
  placeholder,
  onChange
}: JoditEditorComponentProps) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...'
    }),
    [placeholder]
  )

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent)
          onChange(newContent) // Llama a la prop onChange para pasar el contenido
        }}
        // onChange={(newContent) => {}} // Puede dejarse vacío o usar para otra lógica
      />
      <style>{`
        .jodit-wysiwyg {
          height: 28vh !important; 
          width: 100% !important; 
        }
        .jodit-container {
          height: 100% !important; 
          width: 100% !important; 
        }
      `}</style>
    </div>
  )
}
