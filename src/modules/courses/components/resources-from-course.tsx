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
import { UseCourseStore } from '../store/course.store'
import { toast } from 'sonner'

const ResourcesFromCourse = ({ isOpen, onClose }) => {
  const { addContent, isLoading } = useCreateContentFromCourse()
  const courseId = UseCourseStore.getState().courseId

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
        title: '', // Cambia aquí a un objeto con title
        details: [{ titleClass: '', duration: '', url: '' }] // Aquí es un array de objetos
      }
    }
  })

  const { fields } = useFieldArray({
    control,
    name: 'content.details' // Cambia aquí para que se refiera a 'details'
  })

  const [sections, setSections] = useState([{ title: '', isEditing: false }])

  const toggleEdit = (index) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, isEditing: !section.isEditing } : section
    )
    setSections(updatedSections)
  }

  const handleAddSection = () => {
    const newSection = { title: '', isEditing: false }
    setSections([...sections, newSection])
  }

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    if (!courseId) {
      toast.error('No se ha creado un curso para agregar contenido!')

      return
    }

    const resource = {
      title: data.content.title, // Accede a title directamente desde el objeto content
      details: data.content.details // Usa directamente details del objeto content
    }

    try {
      await addContent(resource)
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
        <Form.Control>
          <Form.Label>Título del contenido</Form.Label>
          <Form.Input
            {...register('content.title')} // Registra el título del contenido
            placeholder="Título del contenido"
          />
          <Form.Error hasError={errors.content?.title?.message} />
        </Form.Control>
        <Accordion flush>
          {sections.map((section, sectionIndex) => (
            <Accordion.Panel key={sectionIndex}>
              <div className="bg-primary-50 flex">
                <Accordion.Title className="bg-transparent border-none !rounded-none !focus:ring-0 !focus:outline-none w-full">
                  <div className="flex items-center max-w-full ">
                    {section.isEditing ? (
                      <input
                        className="border p-1 mr-2 w-full "
                        value={section.title}
                        onChange={(e) => {
                          const updatedSections = [...sections]
                          updatedSections[sectionIndex].title = e.target.value
                          setSections(updatedSections)
                          setValue(
                            `content.details.${sectionIndex}.titleClass`,
                            e.target.value
                          )
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
                {fields.map((_, detailIndex) => (
                  <div key={detailIndex}>
                    <Form.Control>
                      <Form.Label>Nombre de la clase</Form.Label>
                      <Form.Input
                        {...register(
                          `content.details.${detailIndex}.titleClass`
                        )}
                        placeholder="Nombre de la clase"
                      />
                      <Form.Error
                        hasError={
                          errors.content?.details?.[detailIndex]?.titleClass
                            ?.message
                        }
                      />
                    </Form.Control>
                    <div className="flex mt-4 gap-4">
                      <Form.Control>
                        <Form.Label>Duración</Form.Label>
                        <Form.Input
                          {...register(
                            `content.details.${detailIndex}.duration`
                          )}
                          placeholder="Duración de la clase"
                        />
                        <Form.Error
                          hasError={
                            errors.content?.details?.[detailIndex]?.duration
                              ?.message
                          }
                        />
                      </Form.Control>
                      <Form.Control>
                        <Form.Label>Url del video</Form.Label>
                        <Form.Input
                          {...register(`content.details.${detailIndex}.url`)}
                          placeholder="URL del video"
                        />
                        <Form.Error
                          hasError={
                            errors.content?.details?.[detailIndex]?.url?.message
                          }
                        />
                      </Form.Control>
                    </div>
                  </div>
                ))}
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
