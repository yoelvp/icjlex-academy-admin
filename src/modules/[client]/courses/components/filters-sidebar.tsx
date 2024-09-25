import { useEffect, useState } from 'react'
import {
  IconMenu,
  IconClose,
  IconChevronDown,
  IconChevronUp
} from '@/assets/icons'

type Subcategory = {
  title: string
  path: string
}

type Category = {
  title: string
  subcategories: Subcategory[]
}

type SidebarProps = {
  categories: Category[]
}

export const FiltersSidebar = ({ categories }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean
  }>({})

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false) // Asegurar que se cierre en pantallas grandes
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Para asegurarse de que se ejecute al cargar

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="flex flex-col text-primary-500 h-auto overflow-hidden transition-all duration-300 w-full row-span-2">
      <div
        className="flex justify-between bg-primary-100 p-4 cursor-pointer hover:bg-primary-50 ease-in-out duration-200"
        onClick={toggleSidebar}
      >
        <strong>Filtros por categoría</strong>

        {/* Botón solo visible en pantallas pequeñas */}
        <button
          className="text-white self-end focus:outline-none flex lg:hidden"
          aria-expanded={isOpen}
        >
          {isOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Sidebar oculto en pantallas grandes */}
      <ul
        className={`flex flex-col space-y-2 mt-2 bg-white border overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        } lg:max-h-full lg:block`}
      >
        {categories.map((category, index) => (
          <li key={index} className="flex flex-col">
            <div
              className="flex items-center p-2 rounded-md hover:bg-primary-100 cursor-pointer ease-in-out duration-500"
              onClick={() => toggleCategory(index)}
            >
              <span className="flex-grow">{category.title}</span>
              {expandedCategories[index] ? (
                <IconChevronUp />
              ) : (
                <IconChevronDown />
              )}
            </div>

            {/* Subcategorías */}
            <ul
              className={`pl-4 space-y-1 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                expandedCategories[index] ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {category.subcategories.map((subcategory, subIndex) => (
                <li
                  key={subIndex}
                  className="p-2 rounded-md hover:bg-primary-50 cursor-pointer"
                >
                  {subcategory.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
