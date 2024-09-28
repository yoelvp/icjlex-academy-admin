import type { MutableRefObject } from 'react'

import { useEffect } from 'react'

type CloseComponent = () => void

export const useClickOutside = (
  componentRef: MutableRefObject<HTMLDivElement | null>,
  closeComponent: CloseComponent
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(e.target as Node)) {
      closeComponent()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
}
