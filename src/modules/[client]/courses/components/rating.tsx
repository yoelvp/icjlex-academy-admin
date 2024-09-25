import type { FC } from 'react'

import { Rating } from 'flowbite-react'

interface Props {
  count: number
  filled: number
}

export const RatingCourse: FC<Props> = ({ count = 5, filled = 0 }) => {
  const stars = Array.from({ length: count }, (_, index) => index < filled)

  return (
    <Rating>
      {stars.map((isFilled, index) => (
        <Rating.Star key={index} filled={isFilled} />
      ))}
    </Rating>
  )
}
