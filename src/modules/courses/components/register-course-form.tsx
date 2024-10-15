import { FC } from 'react'

import { useState } from 'react'

import { Modal } from '@/modules/dashboard/components/modal'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { courseSchema } from '../schemas/course.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDocentStore } from '@/modules/teachers/store/teachers.store'
import { useCreateCourse } from '../hooks/use-create-courses'
import { Course } from '../types/Course'
import { useGetAllTeachers } from '@/modules/teachers/hooks/use-get-all-teachers'

import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import ImageUploader from './image-uploader'
import { STEPS } from '../utils/constants'
import classNames from 'classnames'

interface ModalCourseProps {
  isOpen: boolean
  onClose: () => void
}

const RegisterCourseForm: FC<ModalCourseProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0)
  const { isLoading: loadingTeacher } = useGetAllTeachers()
  const teachers = useDocentStore((state) => state.teachers)
  const { createCourse, isLoading } = useCreateCourse()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
    reset
  } = useForm<Course>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: '',
      objetive: '',
      docentId: '',
      content: [
        { title: '', details: [{ titleClass: '', duration: '', videoUrl: '' }] }
      ]
    }
  })

  const { fields: contentFields } = useFieldArray({
    control,
    name: 'content'
  })

  const { fields: detailsFields } = useFieldArray({
    control,
    name: 'content.0.details'
  })

  const onSubmit: SubmitHandler<Course> = (data) => {
    createCourse(data)
    reset()
    onClose()
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Curso">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {STEPS.map((s, index) => (
            <div
              key={index}
              className={`w-1/4 text-center ${
                index <= step ? 'text-primary-400' : 'text-gray-400'
              }`}
            >
              <div
                className={classNames(
                  'w-8 h-8 mx-auto rounded-full flex items-center justify-center',
                  { 'bg-secondary-500 text-primary-500': index <= step },
                  { 'bg-gray-200': index >= step }
                )}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-sm">{s.title}</div>
            </div>
          ))}
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
            <div
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
            ></div>
          </div>
        </div>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div className="space-y-4">
            <Form.Control>
              <Form.Label>Nombre del curso</Form.Label>
              <Form.Input
                placeholder="Violencia contra Niñas, Niños y Adolescente en el ámbito..."
                size="md"
                {...register('name')}
              />
              <Form.Error hasError={errors.name?.message} />
            </Form.Control>

            <Form.Control>
              <Form.Label>Objetivo</Form.Label>
              <Form.Input
                placeholder="El curso tiene como objetivo enseñar a los estudiantes..."
                size="md"
                {...register('objetive')}
              />
              <Form.Error hasError={errors.objetive?.message} />
            </Form.Control>

            <Form.Control>
              <Form.Label>Docente</Form.Label>
              <select
                className="text-sm text-primary-500 border border-primary-400 rounded-lg "
                {...register('docentId')}
              >
                <option value="">
                  {loadingTeacher
                    ? 'Cargando docentes...'
                    : 'Selecciona un docente'}
                </option>

                {!loadingTeacher &&
                  teachers.map((teacher) => (
                    <option
                      key={teacher.id}
                      className="text-sm text-primary-500 border border-primary-400 rounded-lg"
                      value={teacher.id}
                    >
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
              </select>
              <Form.Error hasError={errors.docentId?.message} />
            </Form.Control>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-6 w-full h-full">
            {contentFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-primary-100 rounded-xs"
              >
                <Form.Control>
                  <Form.Label
                    htmlFor={`content.${index}.title`}
                    className="font-bold"
                  >
                    Título del Contenido
                  </Form.Label>
                  <Form.Input
                    {...register(`content.${index}.title`)}
                    id={`content.${index}.title`}
                    type="text"
                  />
                  {errors.content && errors.content[index] && (
                    <Form.Error
                      hasError={errors.content[index].title?.message}
                    />
                  )}
                </Form.Control>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {detailsFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-primary-100 rounded-xs space-y-6"
              >
                <Form.Control>
                  <Form.Label htmlFor={`content.0.details.${index}.titleClass`}>
                    Título de la Clase
                  </Form.Label>
                  <Form.Input
                    {...register(`content.0.details.${index}.titleClass`)}
                    id={`content.0.details.${index}.titleClass`}
                    type="text"
                  />
                  {errors.content &&
                    errors.content[0] &&
                    errors.content[0].details && (
                    <Form.Error
                      hasError={
                        errors.content[0]?.details?.[index]?.titleClass
                          ?.message
                      }
                    />
                  )}
                </Form.Control>

                <Form.Control className="mt-2">
                  <Form.Label htmlFor={`content.0.details.${index}.duration`}>
                    Duración
                  </Form.Label>
                  <Form.Input
                    {...register(`content.0.details.${index}.duration`)}
                    id={`content.0.details.${index}.duration`}
                    type="text"
                    placeholder="HH:MM:SS"
                  />
                  {errors.content &&
                    errors.content[0] &&
                    errors.content[0].details && (
                    <Form.Error
                      hasError={
                        errors.content[0].details?.[index]?.duration?.message
                      }                      />
                  )}
                </Form.Control>

                <Form.Control className="mt-2">
                  <Form.Label htmlFor={`content.0.details.${index}.videoUrl`}>
                    URL del Video
                  </Form.Label>
                  <Form.Input
                    {...register(`content.0.details.${index}.videoUrl`)}
                    id={`content.0.details.${index}.videoUrl`}
                    type="text"
                  />
                  {errors.content &&
                    errors.content[0] &&
                    errors.content[0].details && (
                    <Form.Error
                      hasError={
                        errors.content?.[0].details?.[index]?.videoUrl
                          ?.message
                      }
                    />
                  )}
                </Form.Control>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 p-4 border border-primary-100 rounded-xs">
            <Form.Control>
              <Form.Label className="">
                Selecciona la imagen del curso
              </Form.Label>
              <ImageUploader name="image" setValue={setValue} />
              <Form.Error hasError={errors.image?.message} />
            </Form.Control>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant={'white'}
            onClick={prevStep}
            className={` ${step === 0 ? 'invisible' : ''}`}
          >
            Anterior
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" disabled={!isDirty}>
              {isLoading ? 'Creando...' : 'Enviar'}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  )
}

export default RegisterCourseForm
