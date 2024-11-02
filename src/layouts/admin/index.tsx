import { Outlet } from 'react-router-dom'
import classNames from 'classnames'
import { Sidebar } from './components/sidebar'
import { Header } from './components/header'
import Content from './components/content'
import { useSidebar } from '@/store/use-sidebar.store'

export const AdminLayout = () => {
  const show = useSidebar((state) => state.show)

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className={classNames('flex flex-1 flex-col overflow-hidden', { 'ml-64': show, 'ml-16': !show })}>
        <Header />

        <div className="flex-1 h-full overflow-y-hidden w-full">
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}
