function Button({ children, onClick, type = "base" }) {
  const className = {
    base: "text-xs outline-none bg-linear-to-bl from-violet-500 to-fuchsia-500 py-2 px-3 rounded-lg mt-4  sm:py-3 sm:px-4 sm:text-sm md:text-lg cursor-pointer ml-4",
    secondary:
      "text-sm py-2 px-3 rounded-lg mt-4  sm:py-3 sm:px-4 sm:text-lg cursor-pointer ml-4 outline-none border-1 border-violet-500",
  };

  return (
    <button onClick={() => onClick} className={className[type]}>
      {children}
    </button>
  );
}

export default Button;
