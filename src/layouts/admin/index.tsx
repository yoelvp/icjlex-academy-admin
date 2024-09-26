import { Outlet } from 'react-router-dom'
import classNames from 'classnames'
import { Sidebar } from '@/@features/admin/components/sidebar'
import { Header } from '@/@features/admin/components/header'
import Content from '@/@features/admin/components/content'
import { useSidebar } from '@/@features/admin/store/use-sidebar.store'

export const AdminLayout = () => {
  const show = useSidebar((state) => state.show)

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className={classNames('flex flex-1 flex-col overflow-hidden', { 'ml-64': show, 'ml-16': !show })}>
        <Header />

        <div className="flex-1 overflow-y-scroll w-full">
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}
