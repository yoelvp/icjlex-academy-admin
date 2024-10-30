import classNames from 'classnames'
import { Modal } from 'flowbite-react'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'

interface Props {
  show: boolean
  close: () => void
}

export const ConfirmModal = ({
  show,
  close
}: Props) => {
  const options = useConfirmModalStore((state) => state.options)

  return (
    <Modal show={show} onClose={close} size="xl">
      <div className="py-8 bg-gray-100 overflow-hidden rounded-t-lg">
        <h4 className="text-primary-700 text-center text-lg font-bold">
          {options?.title}
        </h4>
        {options?.subTitle && (
          <h6 className="text-primary-400 text-center text-base">
            {options.subTitle}
          </h6>
        )}
      </div>

      <Modal.Body className="py-8">
        <div
          className={classNames(
            'flex gap-x-8 gap-y-4',
            { 'flex-col': Array.isArray(options?.options) },
            { 'flex-row': !Array.isArray(options?.options) }
          )}
        >
          {!Array.isArray(options?.options) && (
            <button
              type="button"
              onClick={close}
              className={classNames(
                'w-full flex-center bg-white h-12 px-4 rounded-sm text-error-700 transition-[background]',
                'hover:bg-error-50/50'
              )}
            >
              Cancelar
            </button>
          )}
          {Array.isArray(options?.options) && options.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={option.onClick}
              className={classNames(
                'w-full flex-center h-12 bg-primary-500 text-white rounded-sm transition-[background]',
                'hover:bg-primary-700'
              )}
            >
              {option.content}
            </button>
          ))}
          {!Array.isArray(options?.options) && (
            <button
              type="button"
              onClick={options?.options?.onClick}
              className={classNames(
                'w-full flex-center h-12 bg-primary-500 text-white rounded-sm transition-[background]',
                'hover:bg-primary-700'
              )}
            >
              {options?.options?.content}
            </button>
          )}
          {Array.isArray(options?.options) && (
            <button
              type="button"
              onClick={close}
              className={classNames(
                'w-full flex-center bg-white h-12 px-4 rounded-sm text-error-700 transition-[background]',
                'hover:bg-error-50/50'
              )}
            >
              Cancelar
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
