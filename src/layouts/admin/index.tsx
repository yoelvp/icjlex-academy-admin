import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/@features/admin/components/sidebar'
import { Header } from '@/@features/admin/components/header'

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="relative w-full flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  )
}
