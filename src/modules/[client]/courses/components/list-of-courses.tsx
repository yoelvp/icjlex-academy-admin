import { Pagination } from '@/@common/components/pagination'
import { CourseCardFind } from './card/course-card-client'

export const ListOfCourses = ({ courses }) => {
  return (
    <section className="col-span-4">
      <div className="grid mb-8 grid-cols-1 min-h-96 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 lg:gap-x-16 gap-y-16">
        {courses.map((course) => (
          <CourseCardFind key={course.id} course={course} />
        ))}
      </div>
      <Pagination
        page={1}
        totalItems={courses.length} // O el total que manejes
        size={100}
        nextPage={() => console.log('Next Page')}
        prevPage={() => console.log('Prev. page')}
        goToPage={() => console.log('Go to page')}
      />
    </section>
  )
}
