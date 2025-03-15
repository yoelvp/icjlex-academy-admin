import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";
import "@ant-design/v5-patch-for-react-19"
import { routes } from "@/routes"
import { AxiosInterceptor } from "./lib"
import { ContainerConfirmModal } from "@/@common/components"
import { theme } from "./lib/antd-theme";

AxiosInterceptor()

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("es")
dayjs.tz.setDefault("America/Lima")

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <ContainerConfirmModal />
      <Toaster
        richColors
        position="top-right"
        closeButton
        visibleToasts={2}
      />
      <RouterProvider router={routes} />
    </ConfigProvider>
  )
}

export default App
