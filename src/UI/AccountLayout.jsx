import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import SideBar from "./SideBar";
import AppNavMobile from "./AppNavMobile";
import FooterMobile from "./FooterMobile";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

const AccountLayout = () => {
  const handleDeleteAccount = () => {
    console.log("Deleting account..."); // call your mutation or logic here
  };
  return (
    <Modal>
      <div className="hidden md:grid h-screen grid-cols-[18rem_1fr] grid-rows-[auto_1fr]">
        <AccountHeader />
        <SideBar />
        <main className="bg-gray-50 p-16 overflow-scroll">
          <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="md:hidden block">
        <AppNavMobile />
        <main className="bg-gray-50 mt-20 overflow-scroll">
          <Outlet />
        </main>
        <FooterMobile />
      </div>
      {/* Place Modal.Window at the root */}
      <Modal.Window name="delete">
        <ConfirmDelete resourceName="account" onConfirm={handleDeleteAccount} />
      </Modal.Window>
    </Modal>
  );
};

export default AccountLayout;
