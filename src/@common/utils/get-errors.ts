import { AxiosError } from "axios"

const getError = (error: AxiosError<{ message?: string }>) => {
  switch (typeof error) {
    case "object":
      if (error.response) {
        if (error.response.data) {
          const message = error.response.data?.message ?? "Ocurrió un error"

          return { message, status: error.response.status };
        }
      } else {
        if (!navigator.onLine) {
          return {
            message: "No tienes conexión a internet, Conectate a internet para continuar."
          };
        }
        if (error.message == "Network Error") return { message: "No se ha podido conectar con el servidor" }

        return { message: error.message };
      }
      break;
    case "string":
      return { message: `Ocurrio un error: ${error}` }
    default:
      return { message: "Ocurrio un error" }
  }

  return { message: "Ocurrio un error" }
}

export default getError
