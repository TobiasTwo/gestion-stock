export function Menu({ children }) {
    return <nav className="p-4 bg-gray-900 text-white w-64">{children}</nav>;
  }
  
  export function MenuItem({ children }) {
    return <div className="p-2 hover:bg-gray-700 rounded">{children}</div>;
  }
  