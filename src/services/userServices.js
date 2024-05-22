import axios from "axios";

export const createUser = async (userData) => {
  try {
    if (!userData.password || !userData.repassword || !userData.email)
      return alert("por favor llene todos los campos");
    if (userData.password !== userData.repassword)
      return alert("las contraseñas no coinciden");
    const response = await axios.post(
      process.env.API_KEY + "/api/users",
      userData
    );
    alert("usuario creado correctamente");

    return response; // Devolver los datos del usuario creado
  } catch (error) {
    alert(
      "El email ya se encuentra en uso por favor intente de nuevo con uno diferente"
    );
  }
};

export const validateUser = async (userData) => {
  try {
    if (!userData.password || !userData.email)
      return alert("por favor llene todos los campos");
    const response = await axios.post(
      process.env.API_KEY + "/api/users/validate",
      userData
    );
    alert("usuario logueado correctamente");

    return response; // Devolver los datos del usuario validado
  } catch (error) {
    alert("Error al iniciar sesion por favor reingrese sus datos");
  }
};
