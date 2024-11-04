import { CourseCardFind } from './card/course-card-client'
import { Course } from '@/_models/Course.model'

interface Props {
  courses: Course[] | null
}

export const ListOfCourses = ({ courses }: Props) => {
  return (
    <section className="col-span-4">
      <div className="grid mb-8 grid-cols-1 min-h-96 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 lg:gap-x-16 gap-y-16">
        {courses?.map((course) => (
          <CourseCardFind key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
