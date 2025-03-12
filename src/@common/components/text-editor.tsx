import { useMemo, forwardRef } from "react"
import JoditEditor, { type Jodit } from "jodit-react"

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
    placeholder: placeholder || "Escribe aquí...",
    language: "es",
    buttonsSM: [
      "bold", "italic", "underline", "fontsize", "|", "brush", "lineHeight", "|", "outdent", "indent", "align",
      "|",
      "undo", "redo",
      "\n",
      "ul", "ol",
      "|", "table",
      "link", "copy", "|", "cut", "paste", "|", "eraser", "spellcheck"
    ],
    statusbar: false,
    addNewLine: false,
    className: "!rounded-sm",
    height: "24rem",
    toolbarSticky: false
  }), [placeholder])

  return (
    <JoditEditor
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      config={config}
      className="h-full"
    />
  )
})

if (import.meta.env.VITE_APP_ENV === "development") {
  TextEditor.displayName = "TextEditor"
}

export default TextEditor
