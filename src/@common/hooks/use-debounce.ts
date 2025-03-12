import { useState, useEffect } from "react"

interface UseDebounce<T> {
  value: T
  delay?: number
}

export const useDebounce = <T>({
  value,
  delay = 1000
}: UseDebounce<T>) => {
  const [debouncedQuery, setDebouncedQuery] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    };
  }, [value, delay])

  return debouncedQuery
}
