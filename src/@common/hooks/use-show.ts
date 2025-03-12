import { useState } from "react"

export const useShow = (initialState = false) => {
  const [show, setShow] = useState(initialState)

  const open = () => setShow(true)
  const close = () => setShow(false)
  const toggle = () => setShow(!show)

  return {
    show,
    setShow,
    open,
    close,
    toggle
  }
}
