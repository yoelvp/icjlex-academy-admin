import Button from '@/@common/components/button'
import { Card } from '@/@common/components/card'
import { IconStar, IconStudent } from '@/assets/icons'

export const TeacherCard = () => {
  const data = [
    {
      label: 'Cursos',
      value: '240',
      icon: IconStudent
    },
    {
      label: 'Estudiantes',
      value: '120',
      icon: IconStar
    }
  ]

  return (
    <Card>
      <img
        src="https://www.fairviewer.org/wp-content/uploads/2017/12/1Q01257.jpg"
        alt="Teacher profile image"
        className="w-full h-48 rounded object-cover object-center"
        loading="lazy"
      />
      <section className="px-4 py-6 flex-col-start gap-y-8">
        <article className="flex gap-x-4 items-start">
          <img
            src="https://www.fairviewer.org/wp-content/uploads/2017/12/1Q01257.jpg"
            alt="Teacher profile image"
            className="w-8 h-8 rounded-full object-cover object-center"
            loading="lazy"
          />
          <div className="flex-col-start gap-y-4">
            <div>
              <h4 className="text-primary-700 font-bold text-xl leading-4">
                Yoel Valverde
              </h4>
              <span className="text-xs font-medium text-primary-400">
                Software developer
              </span>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-8">
              {data.map((item, index) => (
                <article key={index} className="flex items-start gap-x-2">
                  <div className="w-6 h-6 bg-primary-50 rounded-sm flex-center text-primary-500 text-sm">
                    <item.icon />
                  </div>
                  <div className="flex-col-start">
                    <strong className="text-sm font-medium text-primary-400">
                      {item.label}
                    </strong>
                    <span className="text-xl text-primary-700 font-bold leading-5">
                      {item.value}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>
        <div className="flex flex-col gap-y-4">
          <p className="text-primary-500">
            Yoel Valverde is a seasoned instructor with over 10 years of experience in the field of web development. He is passionate about teaching and sharing his knowledge with students from all backgrounds.
          </p>
          <Button.Link href="/teachers/nancy-lozano-diaz" variant="primary.link" className="w-auto">
            Ver perfil
          </Button.Link>
        </div>
      </section>
    </Card>
  )
}
