import axios from "axios";

export const createUser = async (userData, showAlert) => {
  try {
    if (!userData.password || !userData.repassword || !userData.email) {
      showAlert("por favor llene todos los campos", "warning");
      return;
    }
    if (userData.password !== userData.repassword) {
      showAlert("las contraseñas no coinciden", "warning");
      return;
    }
    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "/api/users",
      userData,
    );
    showAlert("usuario creado correctamente", "success");
    return response;
  } catch (error) {
    showAlert(
      "el email ya se encuentra en uso, intente con uno diferente",
      "error",
    );
  }
};

export const validateUser = async (userData, showAlert) => {
  try {
    if (!userData.password || !userData.email) {
      showAlert("por favor llene todos los campos", "warning");
      return;
    }
    const response = await axios.post(
      process.env.REACT_APP_API_KEY + "/api/users/validate",
      userData,
    );
    showAlert("usuario logueado correctamente", "success");
    return response;
  } catch (error) {
    showAlert(
      "error al iniciar sesión, por favor reingrese sus datos",
      "error",
    );
  }
};
