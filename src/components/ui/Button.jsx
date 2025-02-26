export function Button({ children, ...props }) {
    return (
      <button className="bg-blue-600 text-white p-2 rounded w-full" {...props}>
        {children}
      </button>
    );
  }
  