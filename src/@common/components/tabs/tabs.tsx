import { useState, Children, type ReactNode, type ReactElement } from 'react'
import classNames from 'classnames'
import { cva } from 'class-variance-authority'
import { twVariants } from '@/@common/utils'
import { TabProps } from '.'

const tabTriggerVariants = cva(
  'px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200',
  {
    variants: {
      active: {
        true: 'border-primary-500 text-primary-500',
        false: 'border-transparent text-gray-500 hover:text-primary-300 hover:border-gray-300'
      }
    }
  }
)

interface Props {
  children: ReactNode
  defaultValue?: string | number
  className?: string
}

export const Tabs = ({
  children,
  defaultValue = '1',
  className
}: Props) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const tabsContent = Children.toArray(children) as ReactElement<TabProps>[]
  const tabTitles = tabsContent.map((tab) => ({ title: tab.props.title, value: tab.props.value, onChange: tab.props.onChange }))

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={twVariants('w-full', className)}>
      {/* Listado de Tabs */}
      <div className="flex">
        {tabTitles.map(({ title, value, onChange }) => (
          <button
            key={value}
            onClick={() => {
              onChange?.()
              handleActiveTab(value)
            }}
            className={twVariants(tabTriggerVariants({ active: activeTab === value }))}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="py-4">
        {tabsContent.map((tab) => (
          <div className={classNames({ 'hidden': tab.props.value !== activeTab })}>
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  )
}
