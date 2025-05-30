import { Drawer } from "@/@common/components"
import { formatCurrency } from "@/@common/utils"
import { Card } from "antd"

interface Props {
  show: boolean
  onClose: () => void
}

const PaymentDetailsDrawer = ({
  show,
  onClose
}: Props) => {
  return (
    <Drawer
      title="Detalles del pago"
      show={show}
      onClose={onClose}
    >
      <Card title="Detalles del pago">
        <div className="flex flex-col gap-y-4">
          <p className="flex flex-col">
            <strong>
              Curso:
            </strong>
            <span>
              {"Nombre del curso"}
            </span>
          </p>

          <p className="flex flex-col">
            <strong>
              Estudiante:
            </strong>
            <span>
              {"Yoel Valverde Polo"}
            </span>
          </p>

          <div className="grid grid-cols-2">
            <p className="flex flex-col">
              <strong>
                Tipo de pago:
              </strong>
              <span>
                YAPE
              </span>
            </p>
            <p className="flex flex-col">
              <strong>
                Precio:
              </strong>
              <span className="text-green-700 font-bold text-lg">
                {formatCurrency(0.00)}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </Drawer>
  )
}

export default PaymentDetailsDrawer
