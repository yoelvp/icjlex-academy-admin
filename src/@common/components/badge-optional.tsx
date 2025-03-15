import classNames from "classnames"

export const BadgeOptional = () => {
  return (
    <span
      className={classNames(
        "font-light text-xs bg-primary-50 text-primary-900 border border-zinc-300 rounded-sm",
        "px-2"
      )}
    >
      Opcional
    </span>
  )
}
