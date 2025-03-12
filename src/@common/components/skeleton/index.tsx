import classNames from "classnames"

interface Props {
  className?: string
}

export const Skeleton = ({
  className
}: Props) => {
  return (
    <div
      className={classNames(
        "bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 rounded animate-pulse",
        className
      )}
    />
  )
}
