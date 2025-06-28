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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024 );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <Modal>
        <div className="block text-gray-700 bg-white lg:hidden dark:bg-gray-900 dark:text-white">
          <AppNavMobile />
          <main className="min-h-screen text-gray-700 bg-white dark:bg-gray-900 dark:text-white md:overflow-scroll ">
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
      <div className="hidden md:grid h-screen grid-cols-[14rem_1fr] grid-rows-[auto_1fr]">
        <AccountHeader />
        <SideBar />
        <main className="p-16 overflow-scroll text-gray-700 bg-white dark:bg-gray-900 dark:text-white">
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
