import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import { ConfirmModal } from '.'

export const ContainerConfirmModal = () => {
  const show = useConfirmModalStore((state) => state.show)
  const close = useConfirmModalStore((state) => state.close)

  if (!show) return null

  return (
    <ConfirmModal
      show={show}
      close={close}
    />
  )
}
