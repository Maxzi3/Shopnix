import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./Contexts/CartContext";
import { AuthProvider } from "./Contexts/AuthContext";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";
import ProfilePage from "./Pages/ProfilePage";
import AppLayout from "./UI/AppLayout";
import CartPage from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgetPassword";
import AccountLayout from "./UI/AccountLayout";
import OrderDetails from "./features/orders/OrderDetails";
import ProtectedRoute from "./UI/ProtectedRoute";
import Reviews from "./features/Reviews/Reviews";
import UpdatePage from "./Pages/UpdatePage";
import ProductDetailsPage from "./features/Product/ProductDetailsPage";

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
      <Route>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* App Layout (for users after login) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
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
          <Route path="/account/reviews" element={<Reviews />} />
          <Route path="/account/orders" element={<OrderPage />} />
          <Route path="/account/order/:orderId" element={<OrderDetails />} />
          <Route path="/account/updatedata" element={<UpdatePage />} />
        </Route>
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
