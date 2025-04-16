import { api } from "../UI/Constant";

// AUTHENTICATION
export async function loginUser({ email, password }) {
  try {
    const { data } = await api.post("/users/login", { email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}
export async function logoutUser() {
  try {
    const { data } = await api.get("/users/logout");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

export async function signupUser({
  fullName,
  email,
  phoneNumber,
  password,
  passwordConfirm,
}) {
  try {
    const { data } = await api.post("/users/signup", {
      fullName,
      email,
      password,
      passwordConfirm,
      phoneNumber,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}
export async function updateMyPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const { data } = await api.patch("/users/updateMyPassword", {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password update failed");
  }
}
export async function forgotPassword({ email }) {
  try {
    const { data } = await api.post("/users/forgotPassword", { email });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
export async function resetPassword({ token, password, passwordConfirm }) {
  try {
    const { data } = await api.post(`/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
}
export async function updateMe(userData) {
  try {
    const formData = new FormData();

    // Append each property if it exists
    if (userData.fullName) formData.append("fullName", userData.fullName);
    if (userData.address) formData.append("address", userData.address);
    if (userData.phoneNumber)
      formData.append("phoneNumber", userData.phoneNumber);
    // if (userData.avatar) formData.append("photo", userData.avatar);

    const { data } = await api.patch("/users/updateMe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed");
  }
}

export async function deleteMe() {
  try {
    const { data } = await api.delete("/users/deleteMe");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Account deletion failed");
  }
}

export async function getMe() {
  try {
    const { data } = await api.get("/users/me");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
}



// ORDER
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};


