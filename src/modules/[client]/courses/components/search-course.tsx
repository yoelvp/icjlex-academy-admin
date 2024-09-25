import { Input } from '@/@common/components/form/input'
import { IconSearch } from '@/assets/icons'

export const SearchCourse = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-between md:flex-row  lg:col-span-3">
      <span className="text-primary-500 font-semibold text-xl">
        10 cursos encontrados
      </span>
      <div className="flex-between gap-4 px-4 border border-primary-500 rounded-lg">
        <IconSearch size={24} />
        <Input
          type="search"
          name=""
          id=""
          placeholder="Busca cualquier cosa"
          className="border-none outline-none focus:outline-none"
          style={{
            boxShadow: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        />
      </div>
    </div>
  )
}
