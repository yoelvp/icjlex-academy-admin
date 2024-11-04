import { PriceAndPurchaseButton } from './price-and-purchase-button'

interface Props {
  price?: number
  name?: string
}

export const FooterToBuy = ({ price,name }: Props) => {
  return (
    <div className="w-full bg-primary-500 fixed left-0 bottom-0 z-50 shadow shadow-white lg:hidden">
      <PriceAndPurchaseButton price={price} name={name} />
    </div>
  )
}
