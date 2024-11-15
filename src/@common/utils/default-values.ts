export const defaultValues = (condition: boolean, values: object | null = {}, defValues: object = {}) => {
  return condition ? values : defValues
}
