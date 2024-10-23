import { Content } from '@/@common/components'
import { useSearchParams } from 'react-router-dom'
import { useUpdateData, useValidateDataUpdate } from '../hooks'
import { Spinner } from 'flowbite-react'
import Form from '@/@common/components/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateStudent } from '../types/UpdateStudent'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateDataSchema } from '../schemas/update-data.schema'
import Button from '@/@common/components/button'
import { useDropzone } from 'react-dropzone'
import { useDropAcceptedFiles } from '../hooks'

const UpdateDataPage = () => {
  const [queryParams, _] = useSearchParams()
  const userId = queryParams.get('id')
  const { onDrop } = useDropAcceptedFiles()
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })
  const { isLoading } = useValidateDataUpdate(userId)
  const { isLoading: isLoadingData, updateMainData } = useUpdateData()
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateStudent>({
    resolver: yupResolver(updateDataSchema),
    defaultValues: {}
  })

  const handleOnSubmit: SubmitHandler<UpdateStudent> = (data) => {
    const userData = {
      ...data,
      image: acceptedFiles[0]
    }

    updateMainData(userId ?? '', userData)
  }

  return (
    <Content className="h-[calc(100vh-80px)]">
      <div className="h-full flex flex-col items-center justify-start pt-16 gap-y-8 md:gap-y-16">
        <h1 className="text-primary-700 font-bold text-2xl md:text-3xl lg:text-4xl">
          Actualiza tus datos
        </h1>
        {!isLoading ? (
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-y-4 md:col-span-1">
              <div className="w-48 h-48 rounded-full border border-primary-500/25 p-1 flex-center overflow-hidden sm:w-64 sm:h-64 md:w-48 md:h-48">
                {acceptedFiles[0] ? (
                  <img
                    src={URL.createObjectURL(acceptedFiles[0])}
                    alt="image of student"
                    className="w-full h-full object-cover object-center rounded-full"
                  />
                ) : (
                  <div className="text-primary-400">
                    USER
                  </div>
                )}
              </div>

              <div {...getRootProps()} className="border border-dashed rounded px-8 py-4 text-center">
                <input type="file" {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Arrastra tu imagen aquí</p> :
                    <p>Arrastra y suelta tu imagen de perfil aquí o haz click para seleccionarlo</p>
                }
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <Form
                onSubmit={handleSubmit(handleOnSubmit)}
                autoComplete="off"
                className="space-y-4"
              >
                <Form.Control>
                  <Form.Label htmlFor="name">
                    Nombres
                  </Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Ingres tus nombres completos"
                    size="lg"
                    disabled={isLoadingData}
                    error={errors.lastName?.message}
                    {...register('firstName')}
                  />
                </Form.Control>

                <Form.Control>
                  <Form.Label htmlFor="name">
                    Apellidos
                  </Form.Label>
                  <Form.Input
                    type="text"
                    placeholder="Ingres tus apellidos"
                    size="lg"
                    disabled={isLoadingData}
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </Form.Control>

                <hr className="inline-block sep-line-h mt-8" />

                <Form.Control>
                  <Form.Label htmlFor="name">
                    Contraseña
                  </Form.Label>
                  <Form.Password
                    type="text"
                    placeholder="Ingresa tu contraseña"
                    size="lg"
                    disabled={isLoadingData}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </Form.Control>
                <Form.Control>
                  <Form.Label htmlFor="name">
                    Repite tu contraseña
                  </Form.Label>
                  <Form.Password
                    type="text"
                    placeholder="Repite tu contraseña"
                    size="lg"
                    disabled={isLoadingData}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </Form.Control>

                <Button size="lg" className="w-full" disabled={isLoadingData}>
                  {isLoadingData && <Spinner color="info" />}
                  {isLoadingData ? 'Actualizando datos' : 'Actualizar datos'}
                </Button>
              </Form>
            </div>

          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Spinner color="info" />
            <span>Verificando la verificación de datos de tu cuenta</span>
          </div>
        )}
      </div>
    </Content>
  )
}

export default UpdateDataPage
