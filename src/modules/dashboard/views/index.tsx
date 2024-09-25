import { Content } from '@/@common/components/content'
import { Card } from '../components/card'
import {
  IconCategory,
  IconCourse,
  IconStudent,
  IconTag,
  IconTeacher
} from '@/assets/icons'

const DashboardPage = () => {
  return (
    <Content className="py-32 gap-8 h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card
        title="Cursos"
        to="/admin/courses"
        count={72}
        change={+3.7}
        icon={IconCourse}
        details={[
          { label: 'En progreso', value: 50 },
          { label: 'Finalizados', value: 22 }
        ]}
        className="xl:row-span-1"
      />
      <Card
        title="Docentes"
        to="/admin/students"
        count={56}
        change={-2.1}
        icon={IconTeacher}
        details={[
          { label: 'Tiempo completo', value: 40 },
          { label: 'Tiempo parcial', value: 16 }
        ]}
      />
      <Card
        title="Estudiantes"
        to="/admin/students"
        count={1234}
        change={+5.2}
        icon={IconStudent}
        details={[
          { label: 'Activos', value: 1100 },
          { label: 'Nuevos (este mes)', value: 134 }
        ]}
      />
      <Card
        title="Categorías"
        to="/admin/students"
        count={18}
        change={0}
        icon={IconCategory}
        details={[
          { label: 'Más popular', value: 'Programación' },
          { label: 'Cursos por categoría', value: '4 (promedio)' }
        ]}
      />
      <Card
        to="/admin/students"
        title="Tags"
        count={120}
        change={+1.5}
        icon={IconTag}
        details={[
          { label: 'Más usado', value: 'JavaScript' },
          { label: 'Nuevos (este mes)', value: 5 }
        ]}
      />
    </Content>
  )
}

export default DashboardPage
