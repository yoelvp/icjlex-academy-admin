import { Fragment } from 'react'
import { Content } from '@/@common/components/content'
import { HeroPage } from '../components/hero-page'
import { WillLearn } from '../components/will-learn'
import { DetailsCourseByPurchased } from '../components/details-course-by-purchased'
import { ContentVariousVideos } from '../components/content-various-videos'
import { ContentDescription } from '../components/content-description'
import { CoursesValorations } from '../components/courses-valorations'
import { MoreCoursesByTeacher } from '../components/more-courses-by-teacher'
import { FooterToBuy } from '../components/footer-to-buy'
import { useGetCourseDetails } from '../hooks'
import { CoursePlaceholder } from '../components/course-placeholder'

const CourseDetailsPage = () => {
  const { isLoading, course } = useGetCourseDetails()

  if (isLoading) return <CoursePlaceholder />

  return (
    <Fragment>
      <HeroPage course={course} />

      <Content className="flex flex-col items-start mt-16 mb-24 gap-y-16 md:mt-32 md:mb-40 xl:gap-x-32 lg:gap-x-16 lg:flex-row-reverse">
        <DetailsCourseByPurchased course={course} />

        <div className="w-full flex flex-col gap-y-16">
          <WillLearn course={course} />
          <ContentVariousVideos course={course} />
          <ContentDescription description={course?.description ?? ''} />
          <CoursesValorations />
          <MoreCoursesByTeacher />
        </div>
      </Content>

      <FooterToBuy price={course?.price} name={course?.name} />
    </Fragment>
  )
}

export default CourseDetailsPage
