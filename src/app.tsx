import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import routes from '@/routes'
import { AxiosInterceptor } from './lib'
import { ContainerConfirmModal } from '@/@common/components'

AxiosInterceptor()

const App = () => {
  return (
    <>
      <ContainerConfirmModal />
      <Toaster
        richColors
        position="top-right"
        closeButton
        visibleToasts={2}
      />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
