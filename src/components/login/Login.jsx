import Form from "../../common/form/Form";
import { validateUser } from "../../services/userServices";

export default function Login() {
  return (
    <>
      <Form
        children={[
          {
            title: "correo electronico",
            props: {
              placeholder: "ingrese su correo electronico",
              name: "email",
              type: "email",
            },
          },
          {
            title: "contraseña",
            props: {
              placeholder: "ingrese su contraseña",
              name: "password",
              type: "password",
              minlength: 8,
            },
          },
        ]}
        func={validateUser}
        button={"iniciar sesion"}
      />
    </>
  );
}
