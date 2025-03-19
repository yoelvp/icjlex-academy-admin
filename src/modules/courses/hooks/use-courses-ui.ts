import { useSearchParams } from "react-router"
import { TAB_INDEX } from "../utils/course-tab-index"

export const useCourseUI = () => {
  const [queryParams, setQueryParams] = useSearchParams()
  const tab = queryParams.get("tab")

  const handleTabIndex = (index: keyof typeof TAB_INDEX) => {
    setQueryParams(TAB_INDEX[index])
  }

  return {
    queryParams,
    tab,
    handleTabIndex
  }
}
