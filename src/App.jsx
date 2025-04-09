import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";
import ProfilePage from "./Pages/ProfilePage";
import AppLayout from "./UI/AppLayout";
import CartPage from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgetPassword";
import AccountLayout from "./UI/AccountLayout";
import UpdateUserDataForm from "./features/Authentication/UpdateUserDataForm";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The amount it takes before a refetch
      staleTime: 0,
      // staleTime: 60 * 1000,
    },
  },
});
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* App Layout (for users after login) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Route>

        {/* Account Layout (maybe for settings/account management) */}
        <Route path="/account" element={<AccountLayout />}>
          <Route path="/account/orders" element={<OrderPage />} />
          <Route path="/account/updatedata" element={<UpdateUserDataForm />} />
          <Route path="/account/profile" element={<ProfilePage/>} />
        </Route>
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
