import type { FC, ReactNode } from "react"

import { Content } from "./content"

interface Props {
  children: ReactNode
  backgroundImage?: string
  backgroundColorClassName?: string
  containerClassName?: string
  contentClassName?: string
}

export const ContentFull: FC<Props> = ({
  children,
  backgroundImage,
  backgroundColorClassName = "",
  containerClassName = "",
  contentClassName
}) => {
  return (
    <div
      className={`w-full ${containerClassName} ${backgroundColorClassName}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : { }}
    >
      <Content className={contentClassName}>
        {children}
      </Content>
    </div>
  )
}
