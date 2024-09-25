import { IoIosArrowRoundForward } from 'react-icons/io'
import Button from './button'

interface Props {
  title: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
  withButton?: boolean
  containerClassName?: string
}

export const SectionHeader = ({
  title,
  description,
  withButton = false,
  buttonLabel,
  buttonHref,
  containerClassName = ''
}: Readonly<Props>) => {
  return (
    <header className={`flex flex-col justify-center items-center gap-y-4 ${containerClassName}`}>
      <div className="flex flex-col justify-center items-center gap-y-2">
        <h3 className="text-2xl text-center text-primary-700 font-bold md:text-3xl xl:text-4xl">
          {title}
        </h3>
        {description && (
          <p className="text-primary-400 text-center">
            {description}
          </p>
        )}
      </div>
      {Boolean(withButton) && buttonLabel && buttonHref && (
        <Button.NextLink href={buttonHref} variant="primary.underline">
          {buttonLabel}
          <IoIosArrowRoundForward size="24" />
        </Button.NextLink>
      )}
    </header>
  )
}
