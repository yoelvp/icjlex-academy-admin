import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import routes from '@/routes'

const App = () => {
  return (
    <>
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
