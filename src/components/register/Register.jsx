import { createUser } from "../../services/userServices";
import Form from "../../common/form/Form";

export default function Register() {
  return (
    <>
      <Form
        children={[
          {
            props: {
              type: "email",
              name: "email",
              placeholder: "ingrese su correo electronico",
            },
            title: "correo electronico",
          },
          {
            props: {
              type: "password",
              name: "password",
              minLength: 8,
              placeholder: "ingrese su contraseña",
            },
            title: "contraseña",
          },
          {
            props: {
              type: "password",
              name: "repassword",
              placeholder: "confirme su contraseña",
              minLength: 8,
            },
            title: "reingrese su contraseña",
          },
        ]}
        func={createUser}
        button={"Crear cuenta"}
      />
    </>
  );
}
