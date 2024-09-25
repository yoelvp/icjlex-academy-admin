import type { FC } from 'react'

import { IconCheckmark } from '@/assets/icons'

export const WillLearn: FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-primary-700 font-semibold text-2xl">
        Lo que aprenderás
      </h2>

      <ul className="flex flex-col gap-y-2">
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
        <li className="flex items-center gap-2">
          <IconCheckmark size={18} className="text-primary-500" />
          <span className="text-primary-700">Primer punto a aprender</span>
        </li>
      </ul>
    </div>
  )
}
