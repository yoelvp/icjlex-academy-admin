interface Props {
  content: string
  className?: string
}

export const RenderHTML = ({
  content,
  className = ""
}: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={className}
    />
  )
}
