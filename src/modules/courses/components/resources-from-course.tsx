import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { IconAdd, IconDelete, IconEdit } from '@/assets/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Accordion } from 'flowbite-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { resourceCourseSchema } from '../schemas/resources-from-course.schema'
import { useCreateContentFromCourse } from '../hooks/content/use-create-content-from-course'
import { toast } from 'sonner'
import { ContentCourse } from '../types/Course'
import { addContentFromService } from '../service/content-from-course.service'
import { useParams } from 'react-router-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
  courseCreatedId?: string
}

const ResourcesFromCourse = ({ isOpen, onClose }: Props) => {
  const { isLoading } = useCreateContentFromCourse()
  const params = useParams()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(resourceCourseSchema),
    defaultValues: {
      content: {
        title: '',
        details: [{ titleClass: '', duration: '', url: '' }]
      }
    }
  })

  const { append, remove } = useFieldArray({
    control,
    name: 'content.details'
  })

  const [sections, setSections] = useState([{ title: '', isEditing: false }])

  const toggleEdit = (index: number) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, isEditing: !section.isEditing } : section
    )
    setSections(updatedSections)
  }

  const handleAddSection = () => {
    const newSection = { title: '', isEditing: false }
    setSections([...sections, newSection])
    append({ titleClass: '', duration: '', url: '' }) // Agrega un nuevo campo en details
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
    remove(index) // Remueve el campo correspondiente en details
  }

  const onSubmit = async (data: ContentCourse) => {
    console.log(data)
    console.log(params)

    if (!params.id) {
      toast.error('No se ha creado un curso para agregar contenido!')

      return
    }
    try {
      await addContentFromService(params.id ?? '', data)
      reset()
      onClose()
      toast.success('Contenido agregado exitosamente!')
    } catch (error) {
      console.error('Error al agregar contenido:', error)
      toast.error('Error al agregar contenido. Inténtalo de nuevo.')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Agregar secciones del curso"
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Accordion flush>
          {sections.map((section, sectionIndex) => (
            <Accordion.Panel key={sectionIndex}>
              <div className="bg-primary-50 flex">
                <Accordion.Title className="bg-transparent border-none !rounded-none !focus:ring-0 !focus:outline-none w-full">
                  <div className="flex items-center max-w-full">
                    {section.isEditing ? (
                      <input
                        className="border p-1 mr-2 w-full"
                        value={section.title}
                        onChange={(e) => {
                          const updatedSections = [...sections]
                          updatedSections[sectionIndex].title = e.target.value
                          setSections(updatedSections)
                          setValue('content.title', e.target.value) // Actualiza 'content.title' cada vez que cambia
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            toggleEdit(sectionIndex) // Cambia de vuelta a modo de visualización
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <p onClick={() => toggleEdit(sectionIndex)}>
                        {section.title || 'Nombre de la clase'}
                      </p>
                    )}
                    <IconEdit
                      size={24}
                      onClick={() => toggleEdit(sectionIndex)}
                      className="cursor-pointer"
                    />
                  </div>
                </Accordion.Title>

                <Button type="button" onClick={handleAddSection}>
                  <IconAdd />
                </Button>
                {sectionIndex !== 0 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveSection(sectionIndex)}
                  >
                    <IconDelete />
                  </button>
                )}
              </div>
              <Accordion.Content>
                <Form.Control>
                  <Form.Label>Nombre de la clase</Form.Label>
                  <Form.Input
                    {...register(`content.details.${sectionIndex}.titleClass`)}
                    placeholder="Nombre de la clase"
                  />
                  <Form.Error
                    hasError={
                      errors.content?.details?.[sectionIndex]?.titleClass
                        ?.message
                    }
                  />
                </Form.Control>
                <div className="flex mt-4 gap-4">
                  <Form.Control>
                    <Form.Label>Duración</Form.Label>
                    <Form.Input
                      {...register(`content.details.${sectionIndex}.duration`)}
                      placeholder="Duración de la clase"
                    />
                    <Form.Error
                      hasError={
                        errors.content?.details?.[sectionIndex]?.duration
                          ?.message
                      }
                    />
                  </Form.Control>
                  <Form.Control>
                    <Form.Label>Url del video</Form.Label>
                    <Form.Input
                      {...register(`content.details.${sectionIndex}.url`)}
                      placeholder="URL del video"
                    />
                    <Form.Error
                      hasError={
                        errors.content?.details?.[sectionIndex]?.url?.message
                      }
                    />
                  </Form.Control>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
        <div className="w-full flex justify-between mt-8">
          <Button type="button" variant={'error'} onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{isLoading ? 'Creando...' : 'Enviar'}</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ResourcesFromCourse
