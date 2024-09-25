import { Content } from '@/@common/components/content'
import { ListOfCourses } from '../components/list-of-courses'
import { FiltersSidebar } from '../components/filters-sidebar'
import { SearchCourse } from '../components/search-course'

const CoursesPage = () => {
  const sidebarCategories = [
    {
      title: 'Categoria 1',
      subcategories: [
        { title: 'Subcategoria 1.1', path: '/sub1-1' },
        { title: 'Subcategoria 1.2', path: '/sub1-2' }
      ]
    },
    {
      title: 'Categoria 2',
      subcategories: [
        { title: 'Subcategoria 2.1', path: '/sub2-1' },
        { title: 'Subcategoria 2.2', path: '/sub2-2' }
      ]
    }
  ]
  
  return (
    <Content className="py-32 flex flex-col lg:grid grid-cols-1 gap-8 lg:grid-cols-4">
      <FiltersSidebar categories={sidebarCategories} />
      <SearchCourse />
      <ListOfCourses />
    </Content>
  )
}

export default CoursesPage
