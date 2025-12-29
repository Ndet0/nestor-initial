export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-2xl font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}
