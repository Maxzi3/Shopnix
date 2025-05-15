import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-white">
      <Navbar />

      <main className="flex-grow pb-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
