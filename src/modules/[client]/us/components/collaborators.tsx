import { Content } from '@/@common/components/content'
import { collaborators } from '../mocks/collaborators'
import { CollaboratorCard } from './collaborator-card'

const Collaborators = () => {
  return (
    <section className="py-32 bg-primary-50">
      <Content>
        <h3 className="text-primary-500 text-center font-semibold text-[24px] p-4 md:text-[48px]">
          Nuestro Equipo de Profesionales
        </h3>
        <span className="text-primary-500 text-center">
          Contamos con un equipo de colaboradores especializados que aportan su
          experiencia y conocimientos para garantizar el éxito de nuestras
          iniciativas. Cada uno de nuestros colaboradores está comprometido con
          ofrecer soluciones integrales y personalizadas, alineadas con los más
          altos estándares profesionales.
        </span>
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16 xl:grid-cols-3">
          {collaborators.map((collaborator, index) => (
            <CollaboratorCard
              key={index}
              name={collaborator.name}
              role={collaborator.role}
              image={collaborator.image}
              description={collaborator.description}
              slug={collaborator.slug}
            />
          ))}
        </div>
      </Content>
    </section>
  )
}

export default Collaborators
