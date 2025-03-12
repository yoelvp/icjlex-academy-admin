import { useSearchParams } from 'react-router'
import { TAB_INDEX } from '../utils'
import { useShow } from '@/@common/hooks/use-show'
import { IconDelete, IconEdit, IconEye } from '@/assets/icons'
import { MenuOptions } from '@/@common/types/Menu'

export const useStudentsUI = () => {
  const [queryParams, setQueryParams] = useSearchParams()
  const { show: showActiveStudentDrawer, open: openActiveStudentDrawer, close: closeActiveStudentDrawer } = useShow()
  const tab = queryParams.get('tab')

  const handleTabIndex = (index: number) => {
    setQueryParams(TAB_INDEX[index])
  }

  const activeStudentsOptions: MenuOptions[] = [
    {
      label: 'Ver detalles',
      icon: IconEye,
      onClick: () => {
        openActiveStudentDrawer()
      }
    },
    {
      label: 'Editar',
      icon: IconEdit,
      onClick: () => console.log('Editar')
    },
    {
      label: 'Eliminar',
      icon: IconDelete,
      isDelete: true,
      dividerTop: true,
      onClick: () => console.log('Eliminar')
    }
  ]

  return {
    queryParams,
    tab,
    handleTabIndex,
    activeStudentsOptions,
    showActiveStudentDrawer,
    openActiveStudentDrawer,
    closeActiveStudentDrawer
  }
}
