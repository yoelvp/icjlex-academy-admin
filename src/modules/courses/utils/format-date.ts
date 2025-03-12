export const formatDate = (
  date: Date | "" | null | undefined
): string | null => {
  if (!date) return null // Maneja '', null y undefined retornando null

  const validDate = date instanceof Date ? date : new Date(date)
  if (isNaN(validDate.getTime())) {
    return null // Retorna null si la fecha es inválida
  }

  const year = validDate.getFullYear()
  const month = String(validDate.getMonth() + 1).padStart(2, "0")
  const day = String(validDate.getDate()).padStart(2, "0")

  return `${day}-${month}-${year}` // Formato DD-MM-YYYY
}

export const formatDateString = (
  date: Date | string | null | undefined,
  format: "DD-MM-YYYY" | "YYYY-MM-DD" = "DD-MM-YYYY"
): string | null => {
  if (!date) return null // Retorna null si date es null o undefined

  const validDate = typeof date === "string" ? new Date(date) : date
  if (isNaN(validDate.getTime())) {
    return null // Retorna null si la fecha es inválida
  }

  const day = String(validDate.getDate()).padStart(2, "0")
  const month = String(validDate.getMonth() + 1).padStart(2, "0")
  const year = validDate.getFullYear()

  return format === "YYYY-MM-DD"
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`
}
