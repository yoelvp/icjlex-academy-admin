import { type MouseEvent } from "react"
import type { AssignCourse, AssignCourseForm, SelectOption, Student } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import Select, { SingleValue } from "react-select"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { Modal } from "@/@common/components/modal"
import { useStudentsStore } from "../store/use-students.store"
import { yupResolver } from "@hookform/resolvers/yup"
import { assignCourseToStudentSchema } from "../schemas/assign-course.schema"
import { getFullName, QueryKeys } from "@/@common/utils"
import { assignCourseToStudentService, getAllCourseOptionsService } from "@/services/courses.service"
import { getSelectedOptions } from "@/@common/utils/select/get-option"
import { Spinner } from "@/@common/components"

interface Props {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

const AssignCourseToStudentModal = ({ student, isOpen, onClose }: Props) => {
  const setStudentId = useStudentsStore((state) => state.setStudentId)
  const { isLoading: isLoadingCourseOptions, data: courseOptionsData } = useQuery({
    queryKey: [QueryKeys.COURSE_OPTIONS],
    queryFn: () => getAllCourseOptionsService({ page: 1, perPage: 1000 })
  })
  const { control, handleSubmit, formState: { errors } } = useForm<AssignCourseForm>({
    resolver: yupResolver(assignCourseToStudentSchema),
    mode: "onChange"
  })
  const courseOptions: SelectOption[] = courseOptionsData?.data?.map((option) => ({
    value: option.id,
    label: option.name
  })) || []

  const handleCloseModal = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    setStudentId(null)
    onClose()
  }

  const { mutate } = useMutation({
    mutationFn: ({ courseId, studentId }: AssignCourse) => {
      return assignCourseToStudentService({ courseId, studentId })
    }
  })

  const onHandleSubmit: SubmitHandler<AssignCourseForm> = (data) => {
    console.log(data)
    mutate({
      courseId: data.courseId,
      studentId: student?.id ?? ""
    })
    /* assignCourseToStudent(studentId ?? "", data.courseId ?? "") */
    /*   .then(() => { */
    /*     handleCloseModal() */
    /*   }) */
  }

  return (
    <Modal
      title={`Asignar curso a ${getFullName(student)}`}
      description={`Inscribir a ${getFullName(student)} a un nuevo curso`}
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="md"
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
                value={getSelectedOptions(field.value, courseOptions)}
                options={courseOptions}
                onChange={(option: SingleValue<SelectOption>) => field.onChange(option?.value)}
                isLoading={isLoadingCourseOptions}
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
          <Button type="submit" size="sm" disabled={isLoadingCourseOptions}>
            {isLoadingCourseOptions && (
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
