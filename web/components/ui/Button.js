export default function Button({ className, children, ...props }) {
  const styles = className ? className : '';
  // p-1 m-1 text-white transition-all duration-150 ease-in-out border rounded cursor-pointer bg-zinc-500 border-zinc-600 text-md flex-1  hover:bg-zinc-600 hover:border-zinc-700 hover:shadow-md active:bg-zinc-700 active:scale-95 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-300
  return (
    <button className={`btn btn-primary m-1 flex-1 ${styles}`} {...props}>
      {children}
    </button>
  );
}
