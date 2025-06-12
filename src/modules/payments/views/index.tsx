import { lazy, Suspense } from "react"
import { useShow } from "@/@common/hooks"
import { LoadingModal, Menu, Pagination } from "@/@common/components"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { IconDelete, IconEye, IconSearch } from "@/assets/icons"
import { useDeletePayment, useGetAllPayments } from "../hooks"
import { TableLoading } from "@/@common/components/table-loading"
import { TableEmpty } from "@/@common/components/table-empty"

const RegisterPaymentModal = lazy(() => import("../components/register-payment-modal"))
const PaymentDetailsDrawer = lazy(() => import("../components/payment-details-drawer"))

const PaymentsPage = () => {
  const { show: showRegisterModal, open: openRegisterModal, close: closeRegisterModal } = useShow()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const { isLoading, payments, pagination, addNewPayment, handleSearch } = useGetAllPayments()
  const { isLoading: isLoadingDelete, deletePayment } = useDeletePayment()
  const TABLE_ROWS_LENGTH = 6

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex justify-between items-center">
        <h3 className="header-title">
          Pagos
        </h3>

        <div className="flex gap-x-2">
          <Form.Input
            type="search"
            size="sm"
            withIcon
            icon={IconSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Escriba cualquier cosa..."
          />
          <Button
            size="sm"
            onClick={() => {
              openRegisterModal()
            }}
          >
            Crear
          </Button>
        </div>
      </header>

      <section className="section-panel space-y-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th className="w-24">ID</th>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <TableLoading numCols={TABLE_ROWS_LENGTH} isLoading={isLoading} />
            <TableEmpty
              show={(payments?.length ?? 0) < 1}
              numCols={TABLE_ROWS_LENGTH}
              isLoading={isLoading}
              message="Aún no hay pagos registrados"
            />
            {!isLoading && payments && payments.map((payment) => (
              <tr key={payment?.id}>
                <td>
                  {payment?.id?.slice(0, 8)}
                </td>
                <td>
                  {payment?.studentName}
                </td>
                <td>
                  {payment?.courseName}
                </td>
                <td>
                  {payment?.type}
                </td>
                <td>
                  {payment?.date}
                </td>
                <td>
                  <Menu
                    variant="primary.outline"
                    options={[
                      {
                        label: "Ver detalles",
                        icon: IconEye,
                        onClick: () => openDetailsDrawer()
                      },
                      {
                        label: "Eliminar",
                        icon: IconDelete,
                        isDelete: true,
                        isLoading: isLoadingDelete,
                        dividerTop: true,
                        onClick: () => {
                          deletePayment(payment.id)
                        }
                      }
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination {...pagination} />
      </section>

      {showRegisterModal && (
        <Suspense fallback={<LoadingModal />}>
          <RegisterPaymentModal
            show={showRegisterModal}
            onClose={closeRegisterModal}
            addNewPayment={addNewPayment}
          />
        </Suspense>
      )}

      {showDetailsDrawer && (
        <PaymentDetailsDrawer
          show={showDetailsDrawer}
          onClose={closeDetailsDrawer}
        />
      )}
    </div>
  )
}

export default PaymentsPage
