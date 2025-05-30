import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"
import { useLoading } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { createPaymentService } from "@/services/payments.service"
import { RegisterPaymentParam } from "@/types"

export const useCreatePayment = () => {
  const { isLoading, loaded, loading } = useLoading()

  const createPayment = async (data: RegisterPaymentParam): Promise<string | undefined> => {
    loading()

    try {
      const { data: { data: paymentData }, status } = await createPaymentService(data)
      if (status === HttpStatusCode.Created) {
        toast.success("El pago fue realizado con éxito.")

        return paymentData.paymentId
      }

      return
    } catch (error) {
      loaded()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    createPayment
  }
}
