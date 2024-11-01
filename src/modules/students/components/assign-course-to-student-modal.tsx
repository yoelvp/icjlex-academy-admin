import Select, { SingleValue } from 'react-select'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { useStudents } from '../hooks/use-students'
import { Spinner } from 'flowbite-react'
import { type MouseEvent, useEffect } from 'react'
import { useCourseMainDataStore } from '@/modules/courses/store/course-main-data.store'
import { useStudentsStore } from '../store/use-students.store'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AssignCourseFields } from '../types/AssignCourse'
import { yupResolver } from '@hookform/resolvers/yup'
import { assignCourseToStudentSchema } from '../schemas/assign-course.schema'
import { SelectOption } from '@/@common/types/Select'
import { getSelectedOptions } from '@/@common/utils/select/get-option'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AssignCourseToStudentModal = ({ isOpen, onClose }: Props) => {
  const { isLoading, assignCourseToStudent } = useStudents()
  const { isLoading: isLoadingCoursesData, getAllCoursesOnlyName } = useStudents()
  const setStudentId = useStudentsStore((state) => state.setStudentId)
  const studentId = useStudentsStore((state) => state.studentId)
  const courses = useCourseMainDataStore((state) => state.courses)
  const setCourses = useCourseMainDataStore((state) => state.setCourses)
  const { control, handleSubmit, formState: { errors } } = useForm<AssignCourseFields>({
    resolver: yupResolver(assignCourseToStudentSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    getAllCoursesOnlyName()
  }, [])

  const formattedCourses: SelectOption[] = courses.map((course) => ({ label: course.name, value: course.id }))

  const onHandleSubmit: SubmitHandler<AssignCourseFields> = (data) => {
    assignCourseToStudent(studentId ?? '', data.courseId ?? '')
      .then(() => {
        handleCloseModal()
      })
  }

  const handleCloseModal = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    setStudentId(null)
    setCourses([])
    onClose()
  }

  return (
    <Modal
      title="Asignar curso a Yoel Valverde Polo"
      description="Inscribir a Yoel Valverde a un nuevo curso"
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="sm"
      className="h-56"
    >
      <Form onSubmit={handleSubmit(onHandleSubmit)} className="p2-4 h-full grid grid-rows-[1fr_auto] gap-y-4">
        <Form.Control>
          <Form.Label htmlFor="email">
            Buscar curso
          </Form.Label>
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={getSelectedOptions(field.value, formattedCourses)}
                options={formattedCourses}
                onChange={(option: SingleValue<SelectOption>) => field.onChange(option?.value)}
                isLoading={isLoadingCoursesData}
                menuPosition="fixed"
                isClearable
              />
            )}
          />
          <Form.Error hasError={errors.courseId?.message} />
        </Form.Control>

        <div className="flex justify-end items-center gap-x-4 mt-4">
          <Button
            type="button"
            onClick={handleCloseModal}
            variant="error.outline"
            size="sm"
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading && (
              <Spinner />
            )}
            Asignar curso
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AssignCourseToStudentModal
