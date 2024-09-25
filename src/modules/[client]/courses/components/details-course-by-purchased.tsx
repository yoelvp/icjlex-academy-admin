import type { FC } from 'react'

import { IconRadioButtonOff } from '@/assets/icons'
import { PriceAndPurchaseButton } from './price-and-purchase-button'

export const DetailsCourseByPurchased: FC = () => {
  return (
    <section className="w-full h-auto py-8 px-4 rounded border border-primary-400 flex flex-col gap-8 md:border-none lg:shadow--primary lg:max-w-[300px] xl:min-w-[360px]">
      <div className="hidden lg:block">
        <PriceAndPurchaseButton />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <span className="text-primary-700 font-semibold">El curso incluye: </span>
        <div className="flex flex-col gap-2">
          <span className="text-primary-500 flex gap-4 items-center">
            <IconRadioButtonOff size={16} className="text-primary-400" />
            <p className="text-primary-500">4h 20m de video bajo demanda</p>
          </span>
          <span className="text-primary-500 flex gap-4 items-center">
            <IconRadioButtonOff size={16} className="text-primary-400" />
            <p className="text-primary-500">1 artículo</p>
          </span>
          <span className="text-primary-500 flex gap-4 items-center">
            <IconRadioButtonOff size={16} className="text-primary-400" />
            <p className="text-primary-500">7 recursos descargables</p>
          </span>
          <span className="text-primary-500 flex gap-4 items-center">
            <IconRadioButtonOff size={16} className="text-primary-400" />
            <p className="text-primary-500">Acceso de por vida</p>
          </span>
        </div>
      </div>

      {/* <div className="flex gap-4 flex-col w-full">
        <p>Aplicar cupón</p>

        <div className="rounded outline outline-primary-500 outline-1 flex justify-between  h-[48px] items-center pl-4 md:w-auto md:h-auto md:flex-col md:outline-none md:gap-4 md:px-0  lg:w-full lg:h-[48px] lg:flex-row lg:outline lg:outline-primary-500 lg:outline-1">
          <input placeholder="Introducir el cupón" className=" outline-none md:outline md:py-2 md:outline-primary-500 md:rounded md:outline-1 lg:outline-none lg:py-0 md:px-4 text-primary-200 w-full" />
          <Button className="obsolute md:w-full lg:w-auto rounded-sm mr-2">
            Aplicar
          </Button>
        </div>
      </div> */}
    </section>
  )
}
