export default function Button({
  children,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-2xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
