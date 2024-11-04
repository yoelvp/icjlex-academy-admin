import { CourseDetails } from '@/_models/Course.model'
import { IconList } from '@/assets/icons'
import { List } from 'flowbite-react'

interface Props {
  course: CourseDetails | null
}

export const WillLearn = ({ course }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-primary-700 font-semibold text-2xl">
        Lo que aprenderás
      </h2>

      {course?.youWillLearn ? (
        <List>
          {Array.isArray(course.youWillLearn) ? course.youWillLearn.map((item, index) => (
            <List.Item icon={IconList} key={index}>
              {item.trim()}
            </List.Item>
          )) : (
            <List.Item icon={IconList}>
              {course.youWillLearn}
            </List.Item>
          )}
        </List>
      ) : (
        <p>No hay elementos incluidos.</p>
      )}
    </div>
  )
}
