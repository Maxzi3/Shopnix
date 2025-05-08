import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import SideBar from "./SideBar";
import AppNavMobile from "./AppNavMobile";
import AccountFooter from "./AccountFooter";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import LogoutForm from "../features/Authentication/LogoutForm";

import { useState, useEffect } from "react";
import EditReviewForm from "../features/Reviews/EditReviewForm";
const AccountLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <Modal>
        <div className="md:hidden block bg-white dark:bg-gray-900 dark:text-white text-gray-700">
          <AppNavMobile />
          <main className="bg-white dark:bg-gray-900 dark:text-white text-gray-700  md:overflow-scroll min-h-screen ">
            <Outlet />
          </main>
          <AccountFooter />
        </div>

        <Modal.Window name="delete">
          <ConfirmDelete />
        </Modal.Window>
        <Modal.Window name="logout">
          <LogoutForm />
        </Modal.Window>
      </Modal>
    );
  }

  // Desktop layout
  return (
    <Modal>
      <div className="hidden md:grid h-screen grid-cols-[18rem_1fr] grid-rows-[auto_1fr]">
        <AccountHeader />
        <SideBar />
        <main className="bg-white dark:bg-gray-900 dark:text-white text-gray-700 p-16 overflow-scroll">
          <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Modal.Window name="delete">
        <ConfirmDelete />
      </Modal.Window>
      <Modal.Window name="logout">
        <LogoutForm />
      </Modal.Window>
      <Modal.Window name="editreview">
        <EditReviewForm />
      </Modal.Window>
    </Modal>
  );
};

export default AccountLayout;
