import { Content } from '@/@common/components/content'
import { HeroPage } from '../components/hero-page'
import { WillLearn } from '../components/will-learn'
import { DetailsCourseByPurchased } from '../components/details-course-by-purchased'
import { ContentVariousVideos } from '../components/content-various-videos'
import { ContentDescription } from '../components/content-description'
import { CoursesValorations } from '../components/courses-valorations'
import { MoreCoursesByTeacher } from '../components/more-courses-by-teacher'
import { FooterToBuy } from '../components/footer-to-buy'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseResult } from '@/modules/courses/types/Course'
import { getCourseByIdService } from '@/modules/courses/service/get-course-by-id.service'
import { ContentFull } from '@/@common/components/content-full'

const CourseDetailsPage = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<CourseResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await getCourseByIdService(id)
        setCourse(data)
      } catch (error) {
        console.log('Error al carga el detalle del curso', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  return (
    <>
      {loading ? (
        <ContentFull containerClassName="min-h-[60vh] py-32">
          <p className="text-primary-300">Cargando detalles del curso...</p>
        </ContentFull>
      ) : (
        <>
          <HeroPage course={course} />

          <Content className="flex flex-col items-start mt-16 mb-24 gap-y-16 md:mt-32 md:mb-40 xl:gap-x-32 lg:gap-x-16 lg:flex-row-reverse">
            <DetailsCourseByPurchased course={course} />

            <div className="w-full flex flex-col gap-y-16">
              <WillLearn />
              <ContentVariousVideos />
              <ContentDescription />
              <CoursesValorations />
              <MoreCoursesByTeacher />
            </div>
          </Content>

          <FooterToBuy price={course?.price} />
        </>
      )}
    </>
  )
}

export default CourseDetailsPage
