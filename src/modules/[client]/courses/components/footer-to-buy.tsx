import { FC } from 'react'
import { PriceAndPurchaseButton } from './price-and-purchase-button'

export const FooterToBuy: FC = () => {
  return (
    <div className="w-full bg-primary-500 fixed left-0 bottom-0 z-50 shadow shadow-white lg:hidden">
      <PriceAndPurchaseButton />
    </div>
  )
}
