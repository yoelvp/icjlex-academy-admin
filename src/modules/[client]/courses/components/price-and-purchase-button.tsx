import Link from '@/@common/components/link'
import { IconSend, IconWhatsapp } from '@/assets/icons'
import { useFormattedPrice } from '../utils/format-price'
import Button from '@/@common/components/button'
import { useState } from 'react'
import { whatsappMessage } from '@/@common/utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '@/@common/env'
import { Modal } from 'flowbite-react'

export const PriceAndPurchaseButton = ({ price, name }) => {
  const formattedPrice = useFormattedPrice(price)
  const [openModal, setOpenModal] = useState(false)

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
            S/. {formattedPrice}
          </span>
          <span className="text-primary-300 line-through">S/. 120.00</span>
        </div>
        <div className="w-full flex md:w-auto lg:w-full">
          <Button
            onClick={() => setOpenModal(true)}
            variant="white"
            size="lg"
            className="w-full lg:hidden"
          >
            Comprar ahora
            <IconWhatsapp size={18} />
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            variant="primary.outline"
            size="lg"
            className="w-full hidden lg:flex"
          >
            Comprar ahora
            <IconWhatsapp size={18} />
          </Button>

          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
            className="custom-rounded-popup"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="flex-center flex-col space-x-2">
                <h3 className="text-lg text-primary-500 font-bold">
                  Escanea para pagar
                </h3>
                <img src="/qr-code.jpeg" alt="Qr code" className="w-48 h-48" />
                <p className="mt-4"> Aldo Carranza Rios - 987 654 321</p>
                <p className="mt-2 text-sm text-center text-primary-300">
                  Para acceder al curso, tienes que comunicarte con un asesor de
                  nuestra plataforma.
                </p>

                <div className="flex-center mt-2 gap-4 w-full">
                  <Button
                    variant={'primary'}
                    className="w-full"
                    size={'md'}
                    onClick={() => setOpenModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Link
                    href={whatsappMessage({
                      phoneNumber: WHATSAPP_ADMIN_NUMBER_PHONE,
                      message: `¡Hola! quiero adquirir este curso ${name}, espero la validación de está compra.`
                    })}
                    variant="primary.outline"
                    size="md"
                  >
                    Comprar curso
                    <IconSend size={18} className="-rotate-45" />
                  </Link>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  )
}
