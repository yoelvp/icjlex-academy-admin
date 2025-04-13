import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";
import "@ant-design/v5-patch-for-react-19"
import { routes } from "@/routes"
import { AxiosInterceptor, theme } from "./lib"
import { ContainerConfirmModal } from "@/@common/components"

AxiosInterceptor()

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("es")
dayjs.tz.setDefault("America/Lima")

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
