import { useLoading } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { deletePaymentService } from "@/services/payments.service"
import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"

export const useDeletePayment = () => {
  const { isLoading, loaded, loading } = useLoading()

  const deletePayment = async (paymentId: string) => {
    loading()

    try {
      const { data: { data: paymentIdDeleted }, status } = await deletePaymentService(paymentId)
      if (status === HttpStatusCode.Ok) {
        toast.success("El pago fue realizado con éxito.")

        return paymentIdDeleted
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
    deletePayment
  }
}
