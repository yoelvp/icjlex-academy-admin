import { useSearchParams } from 'react-router-dom'
import { TAB_INDEX } from '../utils'

export const useStudentsUI = () => {
  const [queryParams, setQueryParams] = useSearchParams()
  const tab = queryParams.get('tab')

  const handleTabIndex = (index: number) => {
    setQueryParams(TAB_INDEX[index])
  }

  return {
    queryParams,
    tab,
    handleTabIndex
  }
}
