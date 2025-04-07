import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import SideBar from "./SideBar";
import AppNavMobile from "./AppNavMobile";

const AccountLayout = () => {
  return (
    <>
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
        <Outlet />
      </div>
    </>
  );
};

export default AccountLayout;
