import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import SideBar from "./SideBar";
import AppNavMobile from "./AppNavMobile";
import AccountFooter from "./AccountFooter";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import LogoutForm from "../features/Authentication/LogoutForm";

const AccountLayout = () => {
 
  return (
    <Modal>
      <div className="hidden md:grid h-screen grid-cols-[18rem_1fr] grid-rows-[auto_1fr]">
        <AccountHeader />
        <SideBar />
        <main className="bg-white p-16 overflow-scroll">
          <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="md:hidden block">
        <AppNavMobile />
        <main className="bg-white mt-20 overflow-scroll ">
          <Outlet />
        </main>
        <AccountFooter />
      </div>
     
      <Modal.Window name="delete">
        <ConfirmDelete  />
      </Modal.Window>
      <Modal.Window name="logout">
        <LogoutForm />
      </Modal.Window>
    </Modal>
  );
};

export default AccountLayout;
