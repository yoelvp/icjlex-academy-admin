import { IconList } from '@/assets/icons'
import { List } from 'flowbite-react'

export const WillLearn = ({ course }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-primary-700 font-semibold text-2xl">
        Lo que aprenderás
      </h2>

      {course.youWillLearn && course.youWillLearn.trim() !== '' ? (
        <List>
          {course.youWillLearn.split(',').map((item, index) => (
            <List.Item icon={IconList} key={index}>
              {item.trim()}
            </List.Item>
          ))}
        </List>
      ) : (
        <p>No hay elementos incluidos.</p>
      )}
    </div>
  )
}
