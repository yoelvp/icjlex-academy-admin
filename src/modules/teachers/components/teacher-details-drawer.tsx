import { Drawer } from 'flowbite-react'

interface Props {
  show: boolean
  close: () => void
}

const TeacherDetailsDrawer = ({
  show,
  close
}: Props) => {
  return (
    <Drawer
      open={show}
      onClose={close}
      position="right"
      className="!z-100 !w-96"
      theme={{
        root: {
          backdrop: 'fixed inset-0 z-50 right-0 bg-gray-900/50'
        }
      }}
    >
      <Drawer.Header title="Detalles del estudiante" />
      <Drawer.Items>
        Buenas
      </Drawer.Items>
    </Drawer>
  )
}

export default TeacherDetailsDrawer
