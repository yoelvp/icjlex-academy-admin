import { Outlet } from "react-router"
import classNames from "classnames"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { useSidebar } from "@/store/use-sidebar.store"

export const AdminLayout = () => {
  const show = useSidebar((state) => state.show)

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className={classNames("flex flex-col flex-1", { "ml-64": show, "ml-16": !show })}>
        <Header />

        <div className="flex-1 h-full w-full overflow-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
