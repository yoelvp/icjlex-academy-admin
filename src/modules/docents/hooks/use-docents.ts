import { useEffect } from 'react'
import { useDocentStore } from '../store/docents-store'

export const useDocents = () => {
  const { docents, getDocents } = useDocentStore()

  useEffect(() => {
    getDocents()
  }, [getDocents])

  return { docents }
}
