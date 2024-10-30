import { useMemo, forwardRef } from 'react'
import JoditEditor, { type Jodit } from 'jodit-react'

interface Props {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
}

const TextEditor = forwardRef<Jodit, Props>(({
  placeholder,
  value,
  onChange,
  onBlur
}, ref) => {
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...'
  }), [])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <JoditEditor
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        config={config}
        className="h-full"
      />

      <style>{`
        .jodit-wysiwyg {
          height: 25vh !important;
          width: 100% !important;
        }
        .jodit-container {
          height: 100% !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  )
})

if (import.meta.env.VITE_APP_ENV === 'development') {
  TextEditor.displayName = 'TextEditor'
}

export default TextEditor
