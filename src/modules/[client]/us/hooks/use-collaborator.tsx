import { collaborators } from '../mocks/collaborators'

export const useCollaborators = (slug?: string) => {
  if (slug) {
    return collaborators.find((col) => col.slug === slug)
  }

  return collaborators
}
