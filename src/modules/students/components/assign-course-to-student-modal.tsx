import Select from 'react-select'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { Modal } from '@/@common/components/modal'
import { useStudents } from '../hooks/use-students'
import { Spinner } from 'flowbite-react'
import { FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useCourseMainDataStore } from '@/modules/courses/store/course-main-data.store'
import { useStudentsStore } from '../store/use-students.store'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AssignCourseToStudentModal = ({ isOpen, onClose }: Props) => {
  const [courseSelectedId, setCourseSelectedId] = useState<string | null>(null)
  const { isLoading, assignCourseToStudent } = useStudents()
  const { isLoading: isLoadingCoursesData, getAllCoursesOnlyName } = useStudents()
  const setStudentId = useStudentsStore((state) => state.setStudentId)
  const studentId = useStudentsStore((state) => state.studentId)
  const courses = useCourseMainDataStore((state) => state.courses)
  const setCourses = useCourseMainDataStore((state) => state.setCourses)

  useEffect(() => {
    getAllCoursesOnlyName()
  }, [])

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault()
    assignCourseToStudent(studentId ?? '', courseSelectedId ?? '')
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
      title="Asignar un curso al estudiante"
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="sm"
    >
      <Form onSubmit={onHandleSubmit} className="pt-4 flex flex-col gap-y-4">
        <Form.Control>
          <Form.Label htmlFor="email">
            Buscar curso
          </Form.Label>
          <Select
            options={courses.map((course) => ({ label: course.name, value: course.id }))}
            onChange={(option) => setCourseSelectedId(option?.value ?? '')}
            isLoading={isLoadingCoursesData}
            menuPosition="fixed"
            isClearable
          />
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
          <Button type="submit" size="sm" disabled={isLoading || courseSelectedId === null}>
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
