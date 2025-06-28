import AccountNav from "./AccountNav";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <aside className="flex flex-col gap-8 px-6 py-10 text-gray-700 bg-white border-r border-gray-100 dark:bg-gray-900 dark:text-white row-span-full">
      <Logo />
      <AccountNav />
    </aside>
  );
};

export default SideBar;
