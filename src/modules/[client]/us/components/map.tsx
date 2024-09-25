import type { FC } from 'react'

import { Content } from '@/@common/components/content'
import { Icon } from './icon'
import { IconCall, IconLocation, IconMail } from '@/assets/icons'

export const Map: FC = () => {
  return (
    <Content className="py-32 flex flex-col gap-8 ">
      <h4 className="text-[32px] text-primary-500 font-semibold">Úbicanos en el mapa</h4>
      <div className="relative flex justify-center flex-col md:flex-row md:rounded-sm">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17257.37281237243!2d-78.51888651847574!3d-7.162885598047389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b25af9b241e341%3A0x8162b308c0972486!2sMercado%20Central!5e1!3m2!1ses-419!2spe!4v1725068164787!5m2!1ses-419!2spe"
          width="100%"
          height="500"
          style={{ borderRadius: 8 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe >

        <div className="md:absolute w-full md:w-[90%] flex rounded-lg bg-white md:px-12 md:py-8 justify-between bottom-6 flex-wrap gap-4 mt-4 lg:mt-0 lg:flex-row">
          <span className="text-[24px] text-primary-500 font-semibold">Huamachuco, Perú</span>

          <div className="flex gap-6 justify-between flex-wrap w-full  lg:w-auto lg:flex-nowrap">
            <div className="gap-4 flex items-center">
              <Icon variant="secondary">
                <IconCall size={24} />
              </Icon>
              <div>
                <span className="text-primary-500">Llámanos</span>
                <p className="text-primary-300 text-[12px]">941036553</p>
              </div>
            </div>

            <div className="gap-4 flex">
              <Icon variant="secondary">
                <IconMail size={18} />
              </Icon>
              <div>
                <span className="text-primary-500">Envíanos un correo</span>
                <p className="text-primary-300 text-[12px]">icjlex@academy.edu</p>
              </div>
            </div>

            <div className="gap-4 flex">
              <Icon variant="secondary">
                <IconLocation size={24} />
              </Icon>

              <div>
                <span className="text-primary-500">Visítanos</span>
                <p className="text-primary-300 text-[12px]">Pasaje César Vallejo 133</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Content>
  )
}
