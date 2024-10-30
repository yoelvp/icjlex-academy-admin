import { Content } from '@/@common/components/content'
import { ListOfCourses } from '../components/list-of-courses'
import { SearchCourse } from '../components/search-course'
import { useEffect, useState } from 'react'
import { getAllCoursesService } from '@/modules/courses/service/course.service'
import { CourseResult } from '@/modules/courses/types/Course'

const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseResult[]>([])
  const [coursesCounter, setCoursesCounter] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getAllCoursesService(1, 9)
        setCourses(data.results)
        setCoursesCounter(data.count)
      } catch (error) {
        console.log('Error fetching course', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) => {
    return course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <Content className="py-32 flex flex-col lg:grid grid-cols-1 gap-8 lg:grid-cols-4">
      <SearchCourse
        coursesCounter={coursesCounter}
        loading={loading}
        setSearchTerm={setSearchTerm}
      />
      {loading ? (
        <div className="h-screen">
          <p className="text-primary-300">Cargando cursos...</p>
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
