
const variantClasses = {
  primary:
    "bg-black text-white hover:bg-gray-100 disabled:bg-gray-200 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white dark:disabled:bg-gray-700",

  danger:
    "bg-white text-red-600 border border-red-600 hover:bg-red-50 disabled:text-red-300 disabled:border-red-300 dark:bg-black dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900 dark:disabled:text-red-700",

  success:
    "bg-dark text-green-600 border hover:bg-green-50 disabled:text-green-300 disabled:border-green-300 dark:bg-gray-100  dark:text-green-400 dark:hover:bg-green-900 dark:disabled:text-green-700",
};

const Button = ({
  type = "button",
  disabled = false,
  variant = "primary",
  children,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition font-medium ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
