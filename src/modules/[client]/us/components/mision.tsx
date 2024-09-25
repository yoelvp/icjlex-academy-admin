import { Content } from '@/@common/components/content'
import { IconDisc, IconEye } from '@/assets/icons'

export const Mision = () => {
  return (
    <Content className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 justify-center lg:justify-between">
      <div className="rounded-[16px] bg-primary-500 p-5 gap-4 flex flex-col max-w-[400px] lg:max-w-full border-primary-400 border">
        <span className="rounded-sm w-12 h-12 flex-col-center bg-primary-400 border-primary-300 border">
          <IconDisc className="text-primary-50" size={24} />
        </span>
        <h3 className="text-white text-[32px]">Misión</h3>
        <p className="text-primary-50 text-[16px]">SOMOS una firma de abogados con un equipo comprometido y altamente calificado, enfocados en proporcionar soluciones legales integrales y efectivas.</p>
      </div>

      <div className="rounded-[16px] bg-primary-500 p-5 gap-4 flex flex-col max-w-[400px] lg:max-w-full border-primary-400 border">
        <span className="rounded-sm w-12 h-12 flex-col-center bg-primary-400 border-primary-300 border">
          <IconEye className="text-primary-50" size={24} />
        </span>
        <h3 className="text-white text-[32px]">Misión</h3>
        <p className="text-primary-50 text-[16px]">SOMOS una firma de abogados con un equipo comprometido y altamente calificado, enfocados en proporcionar soluciones legales integrales y efectivas.</p>
      </div>

      <div className="h-full w-full max-w-[400px] lg:max-w-full lg:h-auto">
        <img
          src="/us/image-complement.png"
          alt="Nuestro objetivo"
          sizes="140px"
          className=" w-full object-cover h-full rounded-[16px]"
        />
      </div>
    </Content>
  )
}
