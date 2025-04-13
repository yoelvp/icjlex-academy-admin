import Form from "@/@common/components/form"

export const StudentForm = () => {
  return (
    <Form className="space-y-4">
      <Form.Control>
        <Form.Label htmlFor="firstName">
          Nombres
          <Form.Input placeholder="Ingrese los nombres" id="firstName" name="firstName" />
        </Form.Label>
      </Form.Control>
      <Form.Control>
        <Form.Label>
          Apellidos
        </Form.Label>
        <Form.Input placeholder="Ingrese los apellidos" />
      </Form.Control>
      <Form.Control>
        <Form.Label>
          Correo electrónico
        </Form.Label>
        <Form.Input placeholder="Ingrese el correo electrónico" />
      </Form.Control>
      <Form.Control>
        <Form.Label>
          Número de teléfono
        </Form.Label>
        <Form.Input placeholder="Ingrese su número de teléfono" />
      </Form.Control>
    </Form>
  )
}
