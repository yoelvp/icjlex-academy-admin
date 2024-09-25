import type { FC } from 'react'

import { Link } from 'react-router-dom'
import { ChangeIndicator } from './change-indicator'
import { IconType } from 'react-icons'

interface CardProps {
  title: string
  count: number
  change: number
  icon: IconType
  to: string
  details: Array<{ label: string; value: string | number }>
  className?: string
}

export const Card: FC<CardProps> = ({
  title,
  count,
  change,
  icon: Icon,
  to,
  details,
  className
}) => {
  return (
    <Link
      to={to}
      className={`rounded-sm overflow-hidden shadow--primary transform transition-transform hover:scale-105 hover:opacity-90 ${className}`}
    >
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-primary-500">{title}</h2>
          <span className="text-4xl text-primary-500">
            <Icon size={24}/>
          </span>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-5xl font-bold text-primary-700">
            {count.toLocaleString()}
          </p>
          <ChangeIndicator change={change} />
        </div>
      </div>
      <div className="p-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-2 last:mb-0"
          >
            <span className="text-primary-500">{detail.label}:</span>
            <span className="font-semibold text-primary-400">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </Link>
  )
}
