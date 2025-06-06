import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./Contexts/CartContext";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import AppLayout from "./UI/AppLayout";
import CartPage from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgetPassword";
import AccountLayout from "./UI/AccountLayout";
import ProtectedRoute from "./UI/ProtectedRoute";
import Reviews from "./features/Reviews/Reviews";
import UpdatePage from "./Pages/UpdatePage";
import ProductDetailsPage from "./features/Product/ProductDetailsPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import CreateOrderForm from "./features/orders/CreateOrderForm";
import UserOrders from "./features/orders/UserOrders";
import SingleOrder from "./features/orders/SingleOrder";
import ErrorFallback from "./UI/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorFallback />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/verify-email/:token"
          element={<EmailVerificationPage />}
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* App Layout (for users after login) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/orders/new" element={<CreateOrderForm />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/updatedata" element={<UpdatePage />} />
          <Route path="/account/reviews" element={<Reviews />} />
          <Route path="/account/orders" element={<UserOrders />} />
          <Route path="/account/orders/:id" element={<SingleOrder />} />
        </Route>
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "14px",
              maxWidth: "90vw", // responsive on mobile
              wordWrap: "break-word", // handles long messages
              padding: "12px 16px",
              backgroundColor: "#fff",
              color: "#374151",
              borderRadius: "12px",
              boxShadow:
                "0 2px 6px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        />

        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
