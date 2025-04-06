import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";
import ProfilePage from "./Pages/ProfilePage";
import AppLayout from "./UI/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CartPage from "./Pages/Cart";

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
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
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
