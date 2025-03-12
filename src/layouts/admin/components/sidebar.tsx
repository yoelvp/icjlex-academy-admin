import { Link } from "react-router"
import classNames from "classnames"
import { ADMIN_ROUTES } from "@/layouts/admin/constants/routes"
import { APP_SHORT_NAME } from "@/@common/env"
import { useSidebar } from "@/@common/store/use-sidebar.store"
import { Option } from "@/layouts/admin/components/option"

export const Sidebar = () => {
  const show = useSidebar((state) => state.show)

  return (
    <aside
      className={classNames(
        "fixed inset-y-0 z-50 top-0 h-full bg-white flex flex-col overflow-y-auto border-r border-r-primary-100/50",
        { "w-64": show },
        { "w-16": !show }
      )}
    >
      <div className={classNames("bg-primary-500 h-16 gap-x-2 px-4", { "flex-start": show, "flex-center": !show })}>
        <Link to="/admin" className="flex-center gap-x-2">
          <img
            src="/isotipo-white.svg"
            alt="isotipo"
            className="w-6"
          />
          <span className={classNames("text-white text-sm font-bold", { "hidden": !show })}>
            {APP_SHORT_NAME}
          </span>
        </Link>
      </div>

      <nav className={classNames("py-4", { "px-4": show }, { "px-2": !show })}>
        {ADMIN_ROUTES.map((option, index) => (
          <Option key={index} option={option} showLabel={show} />
        ))}
      </nav>
    </aside>
  )
}
