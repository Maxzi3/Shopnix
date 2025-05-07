import AccountNav from "./AccountNav";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <aside className="bg-white  dark:bg-gray-900 dark:text-white text-gray-700 p-8 border-r border-gray-100 flex flex-col gap-8 row-span-full">
      <Logo />
      <AccountNav />
    </aside>
  );
};

export default SideBar;
