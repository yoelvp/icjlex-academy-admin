import classNames from 'classnames'

interface Props {
  color?: 'primary' | 'gray'
  className?: string
}

export const Skeleton = ({
  color = 'gray',
  className
}: Props) => {
  return (
    <div
      className={classNames(
        `bg-gradient-to-r from-${color}-100 via-${color}-300 to-${color}-100 rounded animate-pulse`,
        className
      )}
    />
  )
}
