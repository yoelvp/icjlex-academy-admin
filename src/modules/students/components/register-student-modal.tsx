import { Modal } from '@/@common/components/modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RegisterStudentModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal title="Registrar nuevo estudiante" isOpen={isOpen} onClose={onClose}>
      Como va
    </Modal>
  )
}

export default RegisterStudentModal
