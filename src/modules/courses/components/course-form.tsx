import SelectCreateable from "react-select/creatable"
import ReactSelect from "react-select"
import Form from "@/@common/components/form"
import { DatePicker, Radio } from "antd"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useCreateCourse } from "../hooks/use-create-courses"
import { useGetAllTeachersOnlyNames } from "@/modules/teachers/hooks/get-all-teachers-only-names"
import { useTeachersOnlyNamesStore } from "@/modules/teachers/store/teachers-only-name.store"
import { yupResolver } from "@hookform/resolvers/yup"
import { courseSchema } from "@/_schemas/course.schema"
import { getFullName } from "@/@common/utils"
import TextEditor from "@/@common/components/text-editor"
import { BadgeOptional, ImageUpload, Switch } from "@/@common/components"
import Button from "@/@common/components/button"
import { IconAdd } from "@/assets/icons"
import Link from "@/@common/components/link"
import { PricingType } from "../enums/pricing-type"
import { getSelectedOptions } from "@/@common/utils/select/get-option"
import type { CourseFormValues, CourseFormFields } from "@/_models/Course.model"
import { useUpdateCourse } from "../hooks/use-update-course"
import dayjs from "dayjs"

interface Props {
  isToCreate?: boolean
  defaultValues?: Partial<CourseFormFields>
  courseId?: string
}

export const CourseForm = ({ isToCreate, defaultValues, courseId }: Props) => {
  const { isLoading: isLoadingTeachers } = useGetAllTeachersOnlyNames()
  const { isLoading: isLoadingCreateCourse, createCourse } = useCreateCourse()
  const { isLoading: isLoadingUpdateCourse, updateCourse } = useUpdateCourse()
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseFormFields>({
    resolver: yupResolver(courseSchema),
    defaultValues,
    mode: "onChange"
  })
  const teachers = useTeachersOnlyNamesStore((state) => state.teachers)
  const formattedTeachers = teachers.map((teacher) => ({
    label: getFullName(teacher),
    value: teacher.id
  }))

  const onHandleSubmit: SubmitHandler<CourseFormFields> = async (data) => {
    const { image, price, includes, youWillLearn, pricingType } = data

    const formattedData: CourseFormValues = {
      ...data,
      includes: includes.map((include) => include.label),
      youWillLearn: youWillLearn.map((include) => include.label),
      price: pricingType === PricingType.PAID ? price : 0,
      publicationDate: data.publicationDate
    }

    if (isToCreate) {
      await createCourse(formattedData, image?.[0], data.isScheduled ?? false)
    } else {
      await updateCourse(formattedData, courseId ?? "", image?.[0], data.isScheduled ?? false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
      <Form.Control>
        <Form.Label>Nombre del curso</Form.Label>
        <Form.Input
          type="text"
          placeholder="Ingresa el nombre del curso..."
          error={errors.name?.message}
          {...register("name")}
          rounded="sm"
        />
      </Form.Control>

      <Form.Control>
        <Form.Label>Docente</Form.Label>
        <Controller
          name="teacherId"
          control={control}
          render={() => (
            <ReactSelect
              options={formattedTeachers}
              value={getSelectedOptions(defaultValues?.teacherId ?? "", formattedTeachers)}
              onChange={(selected) => setValue("teacherId", selected?.value ?? "")}
              isClearable
              isSearchable
              isLoading={isLoadingTeachers}
              placeholder="Selecciona el ponente de la clase"
              menuPosition="fixed"
              noOptionsMessage={() => "No hay docentes registrados"}
            />
          )}
        />
        <Form.Error hasError={errors.teacherId?.message} />
      </Form.Control>

      <Form.Control>
        <Form.Label>Objetivo</Form.Label>
        <Form.Input
          type="text"
          rounded="sm"
          placeholder="Ingresa el objetivo del curso"
          error={errors.objective?.message}
          {...register("objective")}
        />
      </Form.Control>

      <Form.Control>
        <Form.Label>Lo que aprenderá</Form.Label>
        <Controller
          name="youWillLearn"
          control={control}
          render={({ field }) => (
            <SelectCreateable
              {...field}
              isMulti
              value={field.value || []}
              isClearable
              formatCreateLabel={(value) => (<><strong>Crear &gt;</strong> {value}</>)}
              onChange={field.onChange}
              placeholder="Lo que el estudiante aprenderá"
              menuPosition="fixed"
              noOptionsMessage={() => "No hay opciones disponibles"}
            />
          )}
        />
        <Form.Error hasError={errors.youWillLearn?.message} />
      </Form.Control>

      <Form.Control>
        <Form.Label>Incluye</Form.Label>
        <Controller
          name="includes"
          control={control}
          render={({ field }) => (
            <SelectCreateable
              {...field}
              isMulti
              value={field.value || []}
              isClearable
              formatCreateLabel={(value) => `Crear ${value}`}
              onChange={field.onChange}
              placeholder="Lo que el curso incluye"
              menuPosition="fixed"
              noOptionsMessage={() => "No hay opciones disponibles"}
            />
          )}
        />
        <Form.Error hasError={errors.includes?.message} />
      </Form.Control>

      <Form.Control>
        <Form.Label>Detalles del curso</Form.Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextEditor
              {...field}
              placeholder="Escribe los detalles del curso"
            />
          )}
        />
        <Form.Error hasError={errors.description?.message} />
      </Form.Control>

      <Form.Control>
        <Form.Label className="mb-1 flex justify-between">
          Selecciona tu imagen
          <BadgeOptional />
        </Form.Label>
        <ImageUpload name="image" register={register} defaultImageUrl={defaultValues?.imageUrl ?? ""} />
        <Form.Error hasError={errors.image?.message} />
      </Form.Control>

      <div className="flex flex-col gap-y-6 bg-primary-50 p-4 rounded-sm">
        <div className="flex flex-col gap-y-2">
          <span className="text-sm text-primary-500">
            Tipo
          </span>
          <Controller
            name="pricingType"
            control={control}
            render={({ field }) => (
              <Radio.Group
                {...field}
                block
                size="large"
                optionType="button"
                buttonStyle="solid"
                defaultValue={PricingType.PAID}
                options={[
                  {
                    value: PricingType.PAID,
                    label: "De pago"
                  },
                  {
                    value: PricingType.FREE,
                    label: "Gratis"
                  }
                ]}
              />
            )}
          />
        </div>

        {watch("pricingType") === PricingType.PAID && (
          <div>
            <Form.Input
              type="number"
              placeholder="120.00"
              rounded="sm"
              {...register("price")}
            />

            <Form.Error hasError={errors.price?.message} />
          </div>
        )}
      </div>

      <Form.Control>
        <Form.Label className="mb-1 flex justify-between">
          Programar publicación
          <BadgeOptional />
        </Form.Label>
        <div className="h-10 flex items-center w-full gap-x-4">
          <Controller
            name="isScheduled"
            control={control}
            render={({ field }) => (
              <Switch {...field} />
            )}
          />
          {watch("isScheduled") && (
            <Controller
              name="publicationDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value as string | number | Date) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString() : "")}
                  format="DD [de] MMM, YYYY - HH:mm:ss A"
                  showTime
                  className="h-10 w-full"
                  placeholder="Selecciona la fecha de publicación"
                />
              )}
            />
          )}
        </div>
        <Form.Error hasError={errors.publicationDate?.message} />
      </Form.Control>

      <div>
        <h3 className="text-primary-500 text-lg font-semibold">
          Datos del curso
        </h3>
        <hr className="sep-line-h mb-4" />

        <div className="grid grid-cols-2 gap-6">
          <Form.Control>
            <Form.Label>Nombre del video</Form.Label>
            <Form.Input
              type="text"
              rounded="sm"
              placeholder="Ingresa el nombre de la clase"
              error={errors.course?.name?.message}
              {...register("course.name")}
            />
          </Form.Control>

          <Form.Control>
            <Form.Label>URL de la clase</Form.Label>
            <Form.Input
              type="text"
              rounded="sm"
              placeholder="Ingresa la url del curso"
              error={errors.course?.url?.message}
              {...register("course.url")}
            />
          </Form.Control>

          <Form.Control>
            <Form.Label>
              Duración
            </Form.Label>
            <Form.Input
              type="text"
              rounded="sm"
              placeholder="3h 30m 20s"
              error={errors.course?.duration?.message}
              {...register("course.duration")}
            />
          </Form.Control>
        </div>
      </div>

      <div className="w-full flex justify-start gap-x-4 mt-8">
        <Button
          type="submit"
          size="md"
          rounded="sm"
          isLoading={isToCreate ? isLoadingCreateCourse : isLoadingUpdateCourse}
        >
          <IconAdd />
          {isToCreate ? "Crear" : "Actualizar"}
        </Button>
        <Link
          href="/admin/courses"
          variant="primary.outline"
          size="md"
          rounded="sm"
        >
          Cancelar
        </Link>
      </div>
    </Form >
  )
}
