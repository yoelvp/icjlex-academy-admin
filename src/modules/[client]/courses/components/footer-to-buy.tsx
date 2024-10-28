import { PriceAndPurchaseButton } from './price-and-purchase-button'
import { useFormattedPrice } from '../utils/format-price'

export const FooterToBuy = ({ price }) => {
  const formattedPrice = useFormattedPrice(price)

  return (
    <div className="w-full bg-primary-500 fixed left-0 bottom-0 z-50 shadow shadow-white lg:hidden">
      <PriceAndPurchaseButton price={formattedPrice} />
    </div>
  )
}
