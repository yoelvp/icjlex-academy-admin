import { Content } from '@/@common/components/content'
import { HeroPage } from '../components/hero-page'
import { WillLearn } from '../components/will-learn'
import { DetailsCourseByPurchased } from '../components/details-course-by-purchased'
import { ContentVariousVideos } from '../components/content-various-videos'
import { ContentDescription } from '../components/content-description'
import { CoursesValorations } from '../components/courses-valorations'
import { MoreCoursesByTeacher } from '../components/more-courses-by-teacher'
import { ContentFull } from '@/@common/components/content-full'
import { useEffect } from 'react'
import { useCourses } from '../../hooks/use-courses'
import { useParams } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import { FooterToBuy } from '../components/footer-to-buy'

const CourseDetailsPage = () => {
  const { id } = useParams()
  const { isLoadingCourses, getAllCourses, getCourseDetailsById } = useCourses()

  useEffect(() => {
    getAllCourses()
  }, [])

  const course = getCourseDetailsById(id || '')
  if (!course)
    return (
      <div className="min-h-[60vh] flex-center">
        <Spinner />
      </div>
    )

  return (
    <>
      {isLoadingCourses ? (
        <ContentFull containerClassName="min-h-[100vh] py-32">
          <Spinner />
        </ContentFull>
      ) : (
        <>
          <HeroPage course={course} />

          <Content className="flex flex-col items-start mt-16 mb-24 gap-y-16 md:mt-32 md:mb-40 xl:gap-x-32 lg:gap-x-16 lg:flex-row-reverse">
            <DetailsCourseByPurchased course={course} />

            <div className="w-full flex flex-col gap-y-16">
              <WillLearn course={course} />
              <ContentVariousVideos />
              <ContentDescription course={course} />
              <CoursesValorations />
              <MoreCoursesByTeacher />
            </div>
          </Content>

          <FooterToBuy price={course.price} name={course.name}/>
        </>
      )}
    </>
  )
}

export default CourseDetailsPage
