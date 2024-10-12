export const STEPS = [
  {
    title: 'Información del Curso',
    fields: ['name', 'objetive', 'docentId']
  },
  { title: 'Contenido del Curso', fields: ['content'] },
  { title: 'Detalles de las Clases', fields: ['content.0.details'] },
  { title: 'Imagen del Curso', fields: ['image'] }
]
