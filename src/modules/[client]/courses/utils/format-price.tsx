import { useMemo } from 'react'

export const useFormattedPrice = (price: string | number) => {
  return useMemo(() => {
    const priceNumber = typeof price === 'string' ? parseFloat(price) : price

    return isNaN(priceNumber)
      ? '0.00'
      : new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(priceNumber)
  }, [price])
}
