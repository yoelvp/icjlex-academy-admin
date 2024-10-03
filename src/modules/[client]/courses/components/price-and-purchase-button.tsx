import type { FC } from 'react'

import Link from '@/@common/components/link'
import { IconWhatsapp } from '@/assets/icons'

export const PriceAndPurchaseButton: FC = () => {
  return (
    <div className="flex justify-between gap-x-8 px-4 py-4 sm:px-8 md:gap-x-16 lg:px-0">
      <div className="hidden w-full md:flex lg:hidden">
        <strong className="font-bold text-white">
          {'Violencia contra Niñas, Niños y Adolescente en el Ámbito Familiar'}
        </strong>
      </div>
      <div className="w-full flex justify-center items-center gap-x-4 sm:gap-x-8 lg:flex-col lg:gap-y-4">
        <div className="flex flex-col items-end lg:items-center xl:flex-row xl:gap-x-2">
          <span className="text-white text-2xl text-nowrap font-bold leading-8 sm:text-3xl md:text-4xl lg:text-primary-700 xl:leading-normal">
            S/. 100.00
          </span>
          <span className="text-primary-300 line-through">S/. 120.00</span>
        </div>
        <div className="w-full flex md:w-auto lg:w-full">
          <Link href="/details" variant="white" size="lg" className="w-full lg:hidden">
            Comprar ahora
            <IconWhatsapp size={18} />
          </Link>
          <Link href="/details" variant="primary.outline" size="lg" className="w-full hidden lg:flex">
            Comprar ahora
            <IconWhatsapp size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
