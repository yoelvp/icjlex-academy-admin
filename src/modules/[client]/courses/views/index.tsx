import { Content } from '@/@common/components/content'
import { ListOfCourses } from '../components/list-of-courses'
import { SearchCourse } from '../components/search-course'
import { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react'
import { useCourses } from '../../hooks/use-courses'

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { courses, getAllCourses, isLoadingCourses } = useCourses()

  useEffect(() => {
    getAllCourses()
  }, [])

  const filteredCourses = courses
    ? courses.filter((course) =>
      course.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  return (
    <Content className="py-32 flex flex-col lg:grid grid-cols-1 gap-8 lg:grid-cols-4">
      <SearchCourse
        coursesCounter={courses?.length}
        loading={isLoadingCourses}
        setSearchTerm={setSearchTerm}
      />
      {isLoadingCourses ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="flex-center text-primary-300 w-full col-span-4 min-h-[20vh]">
          <p>No se han encontrado resultados para tu búsqueda.</p>
        </div>
      ) : (
        <ListOfCourses courses={filteredCourses} />
      )}
    </Content>
  )
}

export default CoursesPage
