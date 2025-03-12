import { useSearchParams } from "react-router"
import { TAB_INDEX } from "../utils/course-tab-index"

export const useCourseUI = () => {
  const [queryParams, setQueryParams] = useSearchParams()
  const tab = queryParams.get("tab")

  const handleTabIndex = (index: number) => {
    setQueryParams(TAB_INDEX[index])
  }

  return {
    queryParams,
    tab,
    handleTabIndex
  }
}
