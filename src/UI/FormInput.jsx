const FormInput = ({
  id,
  type = "text",
  value,
  onChange,
  disabled = false,
  placeholder = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-md"
      {...rest}
    />
  );
};

export default FormInput;
