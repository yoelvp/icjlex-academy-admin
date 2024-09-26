import type { FC } from 'react'

import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Option } from '../types/AdminRoutes'

interface Props {
  option: Option
  showLabel?: boolean
}

export const OptionLink: FC<Props> = ({
  option: { name, path, icon: Icon },
  showLabel
}) => {
  return (
    <Link
      to={path ?? '/admin'}
      className={classNames(
        'gap-2 py-2 px-4 rounded-sm transition duration-200 text-primary-500 hover:bg-primary-400 hover:text-primary-50',
        { 'flex-start': showLabel },
        { 'flex-center': !showLabel }
      )}
    >
      {!!Icon && <Icon size="18" />}
      <span className={classNames({ 'hidden': !showLabel })}>{name}</span>
    </Link>
  )
}
