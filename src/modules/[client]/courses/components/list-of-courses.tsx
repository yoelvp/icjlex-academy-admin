import { CourseCard } from '@/@common/components/course-card'
import { Pagination } from '@/@common/components/pagination'

export const ListOfCourses = () => {
  return (
    <section className="col-span-3">
      <div className="grid mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-16">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <Pagination />
    </section>
  )
}
