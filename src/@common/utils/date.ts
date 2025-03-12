export const formatDateTime = (date: Date | null) => {
  const currentDate = new Date(date ?? new Date())

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Lima"
  }).format(currentDate)
}
