import { Fragment } from 'react'
import { Content } from '@/@common/components/content'
import { HeroPage } from '../components/hero-page'
import { WillLearn } from '../components/will-learn'
import { DetailsCourseByPurchased } from '../components/details-course-by-purchased'
import { ContentVariousVideos } from '../components/content-various-videos'
import { ContentDescription } from '../components/content-description'
import { CoursesValorations } from '../components/courses-valorations'
/* import { MoreCoursesByTeacher } from '../components/more-courses-by-teacher' */
import { FooterToBuy } from '../components/footer-to-buy'
import { useGetCheckStudentPaidCourse, useGetCourseDetails } from '../hooks'
import { CoursePlaceholder } from '../components/course-placeholder'
import classNames from 'classnames'
import { IconRadioButtonOff } from '@/assets/icons'

const CourseDetailsPage = () => {
  const { isLoading, course } = useGetCourseDetails()
  const { paidCourse } = useGetCheckStudentPaidCourse()

  if (isLoading) return <CoursePlaceholder />

  return (
    <Fragment>
      <HeroPage course={course} />

      <Content className="flex flex-col items-start mt-16 mb-24 gap-y-16 md:mt-32 md:mb-40 xl:gap-x-32 lg:gap-x-16 lg:flex-row-reverse">
        {paidCourse && !paidCourse?.isPaid && (
          <DetailsCourseByPurchased course={course} />
        )}

        <div className="w-full flex flex-col gap-y-16">
          <div
            className={classNames(
              'flex flex-col gap-y-16',
              { 'flex-col-reverse': paidCourse?.isPaid }
            )}
          >
            {paidCourse?.isPaid && (
              <div className="flex flex-col gap-4 w-full">
                <span className="text-primary-700 font-semibold">
                  El curso incluye:{' '}
                </span>
                {course?.includes ? (
                  <div className="flex flex-col gap-2">
                    {Array.isArray(course.includes) ? course.includes.map((item, index) => (
                      <span
                        className="text-primary-500 flex gap-4 items-center"
                        key={index}
                      >
                        <IconRadioButtonOff size={16} className="text-primary-400" />
                        <p className="text-primary-500">{item}</p>
                      </span>
                    )) : (
                      <span className="text-primary-500 flex gap-4 items-center">
                        <IconRadioButtonOff size={16} className="text-primary-400" />
                        <p className="text-primary-500">{course.includes}</p>
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-primary-500 flex gap-4 items-center">
                    <IconRadioButtonOff size={16} className="text-primary-400" />
                    <p className="text-primary-500">No hay recursos incluidos</p>
                  </span>
                )}
              </div>
            )}
            <WillLearn course={course} />
            <ContentVariousVideos course={course} paidCourse={paidCourse} />
          </div>
          <ContentDescription description={course?.description ?? ''} />
          <CoursesValorations />
          {/* <MoreCoursesByTeacher /> */}
        </div>
      </Content>

      {paidCourse && !paidCourse?.isPaid && (
        <FooterToBuy price={course?.price} name={course?.name} />
      )}
    </Fragment>
  )
}

export default CourseDetailsPage
