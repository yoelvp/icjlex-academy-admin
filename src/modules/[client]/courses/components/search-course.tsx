import { Input } from '@/@common/components/form/input'
import { IconSearch } from '@/assets/icons'

export const SearchCourse = ({ coursesCounter, loading, setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value) // Actualizar el estado del término de búsqueda
  }

  return (
    <div className="flex flex-col gap-4 md:flex-between md:flex-row lg:col-span-4">
      <span className="text-primary-500 font-semibold text-xl">
        {loading ? 'Cargando...' : `${coursesCounter ?? 0} cursos encontrados`}
      </span>
      <div className="flex-between gap-4 px-4 border border-primary-500 rounded-lg">
        <IconSearch size={24} />
        <Input
          type="search"
          placeholder="Busca cualquier curso"
          className="border-none outline-none focus:outline-none"
          style={{
            boxShadow: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}
