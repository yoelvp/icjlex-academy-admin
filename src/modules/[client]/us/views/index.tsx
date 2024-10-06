import { Content } from '@/@common/components/content'
import { Counter } from '../components/counter'
import { SectionForm } from '../components/section-form'
import { Map } from '../components/map'
import { ImageSlider } from '../components/slider'
import { UsHero } from '../components/us-hero'
import { WhoWeAre } from '../components/wo-we-are'
import { Mision } from '../components/mision'
import Objective from '../components/objective'
import { ContactForm } from '@/modules/[client]/home/components/contact-form'
import { MeetOurTeachers } from '../components/meet-our-teachers'
import Collaborators from '../components/collaborators'

const UsPage = () => {
  const images = [
    '/us/teachers/sechira-mendoza.png',
    '/us/teachers/sechira-mendoza.png',
    '/us/teachers/sechira-mendoza.png',
    '/us/teachers/sechira-mendoza.png',
    '/us/teachers/sechira-mendoza.png'
  ]

  return (
    <>
      <UsHero />
      <WhoWeAre />
      <Objective />

      <div className="bg-primary-700 py-32">
        <Mision />
      </div>
      <Counter />
      <Collaborators />
      <Content>
        <MeetOurTeachers />
        <ImageSlider images={images} />
      </Content>
      <SectionForm />
      <Map />
      <ContactForm />
    </>
  )
}

export default UsPage
