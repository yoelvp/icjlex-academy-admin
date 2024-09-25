import Button from '@/@common/components/button'
import { ContentFull } from '@/@common/components/content-full'
import Form from '@/@common/components/form'
import { SectionHeader } from '@/@common/components/section-header'
import { IconSend } from '@/assets/icons'

export const ContactForm = () => {
  return (
    <ContentFull containerClassName="bg-primary-50 py-32" contentClassName="flex flex-col gap-y-8">
      <SectionHeader
        title="Ponte en contacto"
        description="Ingresa tu número de teléfono y nos comunicaremos contigo"
      />

      <div className="w-full max-w-[720px] mx-auto">
        <Form className="flex flex-col gap-y-4 justify-start items-end gap-x-4 sm:flex-row">
          <Form.Control>
            <Form.Label>
              Número de teléfono
            </Form.Label>
            <Form.Input placeholder="Ingresa tu número de teléfono" className="!bg-transparent" />
          </Form.Control>

          <Button className="w-full sm:w-auto">
            Enviar
            <IconSend />
          </Button>
        </Form>
      </div>
    </ContentFull>
  )
}
