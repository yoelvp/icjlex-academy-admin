import { Masthead } from '../components/masthead'
import { Associates } from '../components/associates'
import { UpcomingCourses } from '../components/upcoming-courses'
/* import { SpecializedCourses } from '../components/specialized-courses' */
import { AcademyDetails } from '../components/academy-details'
import { StudentComments } from '../components/student-commments'
import { ContactForm } from '../components/contact-form'

const HomePage = () => {
  return (
    <>
      <Masthead />
      <Associates />

      <div className="flex flex-col gap-y-32">
        <UpcomingCourses />
        {/* <SpecializedCourses /> */}
        <AcademyDetails />
        <StudentComments />
        <ContactForm />
      </div>
    </>
  )
}

export default HomePage
