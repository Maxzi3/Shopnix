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
    const { data } = await api.patch(
      "/users/updateMyPassword",
      { passwordCurrent, password, passwordConfirm },
      {
        withCredentials: true, // This ensures the cookies are sent with the request
      }
    );

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
    const { data } = await api.patch("/users/updateMe", userData, {
      headers: {
        "Content-Type": "application/json",
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
    return data.data.doc;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
}

// ORDER
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};
