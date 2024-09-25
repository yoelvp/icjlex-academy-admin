import type { FC } from 'react'

import { useEffect } from 'react'

export const Counter: FC = () => {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('.counter')

    const updateCounter = (counter: HTMLElement) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0')
      const currentCount = parseFloat(counter.innerText) || 0

      const increment = target / 300

      if (currentCount < target) {
        counter.innerText = `${Math.ceil(currentCount + increment)}`
        requestAnimationFrame(() => updateCounter(counter))
      } else {
        counter.innerText = `+ ${target}`
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement
          counter.innerText = '0'

          if (counter.innerText !== '0') {
            counter.innerText = '0'
          }

          updateCounter(counter)
          observer.unobserve(counter)
        }
      })
    }, {
      threshold: 0.8
    })

    counters.forEach((counter) => {
      observer.observe(counter)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="py-32 flex-col-center gap-16 md:flex-row ">
      <div className="flex-col-center rounded-[16px] shadow--primary text-primary-500 p-4 w-[300px] h-[400px]">
        <img
          src="/us/learning-sketching.svg"
          alt="Estudiantes"
          sizes="140px"
          className="w-full object-contain h-full"
        />
        <div className="grid text-center">
          <span className="counter font-bold text-primary-500 text-[64px]" data-target="100"></span>
          <p className="text-primary-300">Estudiantes</p>
        </div>
      </div>

      <div className="flex-col-center rounded-[16px] shadow--primary text-primary-500 p-4 w-[300px] h-[400px]">
        <img
          src="/us/professor.svg"
          alt="Alumnos"
          sizes="140px"
          className="w-full object-contain h-full"
        />
        <div className="grid text-center">
          <span className="counter font-bold text-primary-500 text-[64px]" data-target="15"></span>
          <p className="text-primary-300">Docentes</p>
        </div>
      </div>

      <div className="flex-col-center rounded-[16px] shadow--primary text-primary-500 py-4 w-[300px] h-[400px]">
        <img
          src="/us/education.svg"
          alt="Educación"
          sizes="140px"
          className=" w-full object-contain h-full pb-4 px-4"
        />
        <div className="grid text-center">
          <span className="counter font-bold text-primary-500 text-[64px]" data-target="10"></span>
          <p className="text-primary-300">Cursos</p>
        </div>
      </div>
    </div>
  )
}
