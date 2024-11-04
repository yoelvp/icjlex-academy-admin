import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevronDown, IconChevronUp, IconPlay } from '@/assets/icons'
import { CourseDetails } from '@/_models/Course.model'
import { ValidateStudentHasPaidCourse } from '@/_models/Student.model'

interface Props {
  course: CourseDetails | null
  paidCourse: ValidateStudentHasPaidCourse | null
}

export const ContentVariousVideos = ({ course, paidCourse }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="flex-col-start gap-y-8">
      <div>
        <h4 className="text-primary-700 font-semibold text-2xl">Contenido del curso</h4>
        {/* <span className="text-primary-400">2 Secciones • 5 clases • 4h 20m de duración </span> */}
      </div>

      <div className="w-full grid gap-4">
        {(course?.contents?.length ?? 0) === 1 && Array.isArray(course?.contents?.[0]?.videos) && course?.contents?.[0]?.videos?.map((video, contentIndex) => (
          <button key={contentIndex} className="w-full flex items-center justify-between p-4 rounded-sm outline-none bg-primary-50 focus:outline-none">
            <div className="text-wrap flex items-center overflow-hidden whitespace-nowrap gap-2">
              <IconPlay size={24} className="text-primary-400" />
              <Link to="/" className="text-primary-500 hover:text-primary-300">
                {video?.name}
              </Link>
            </div>
            <span className="text-primary-300">
              {video?.duration}
            </span>
          </button>
        ))}

        {course?.contents?.map((section, index) => (
          <div key={index} className="bg-primary-50/25 rounded-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 rounded-sm outline-none bg-primary-50 focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {activeIndex === index ? (
                    <IconChevronUp size={18} className="text-primary-500" />
                  ) : (
                    <IconChevronDown size={18} className="text-primary-500" />
                  )}
                  <span className="ml-2 text-primary-700 font-semibold">{section?.title}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-primary-700">
                    {section?.numClasses} clase
                  </span>
                  <span className="text-primary-300">
                    {section?.totalClassTime}
                  </span>
                </div>
              </div>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2">
                {Array.isArray(section?.videos) && section?.videos?.map((video, contentIndex) => (
                  <div key={contentIndex} className="text-primary-500 flex gap-2 items-center py-2 justify-between">
                    <div className="text-wrap flex items-center overflow-hidden whitespace-nowrap gap-2">
                      <IconPlay size={24} className="text-primary-400" />
                      {paidCourse && paidCourse.isPaid ? (
                        <Link
                          to={video.url ?? '/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-300"
                        >
                          {video.name}
                        </Link>
                      ) : (
                        <span className="text-primary-500 hover:text-primary-300">
                          {video.name}
                        </span>
                      )}
                    </div>
                    <span className="text-primary-300">
                      {video?.duration}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
