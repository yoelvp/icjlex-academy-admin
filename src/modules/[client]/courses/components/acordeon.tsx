import type { FC } from 'react'

import { useState } from 'react'
import { IconChevronDown, IconChevronUp, IconPlay } from '@/assets/icons'
import { Link } from 'react-router-dom'

interface Props {
  data: {
    title: string
    class: string
    time: string
    content: {
      name: string
      link: string
      time: string
    } |
    {
      name: string
      link: string
      time: string
    }[]
  }[]
}

export const Accordion: FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full grid gap-4">
      {data.map((item, index) => (
        <div key={index} className="bg-primary-50/25 rounded-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 rounded-sm outline-none bg-primary-50 focus:outline-none"
            onClick={() => handleToggle(index)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                {activeIndex === index ? <IconChevronUp size={18} className="text-primary-500" /> : <IconChevronDown size={18} className="text-primary-500" />}
                <span className="ml-2 text-primary-700 font-semibold">{item.title}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-primary-700">{item.class}</span>
                <span className="text-primary-300">{item.time}</span>
              </div>
            </div>
          </button>
          {activeIndex === index && (
            <div className="px-4 py-2">
              {Array.isArray(item.content) ? (
                item.content.map((contentItem, contentIndex) => (
                  <div key={contentIndex} className="text-primary-500 flex gap-2 items-center py-2 justify-between">
                    <div className="text-wrap flex items-center overflow-hidden whitespace-nowrap gap-2">
                      <IconPlay size={24} className="text-primary-400" />
                      <Link to={contentItem.link} className="text-primary-500 hover:text-primary-300">{contentItem.name}</Link>
                    </div>
                    <span className="text-primary-300">{contentItem.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-primary-500 flex gap-2 items-center py-2 justify-between">
                  <div className="text-wrap flex items-center overflow-hidden whitespace-nowrap gap-2">
                    <IconPlay size={24} className="text-primary-400" />
                    <Link to={item.content.link} className="text-primary-500 hover:text-primary-300">{item.content.name}</Link>
                  </div>
                  <span className="text-primary-300">{item.content.time}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
