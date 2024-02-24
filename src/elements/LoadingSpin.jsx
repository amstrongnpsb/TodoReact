const LoadingSpin = ({ name, width = 10, height = 10 }) => {
  const fontSize = Math.min(width, height);
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <img
        className={`w-${width} h-${height} animate-spin`}
        src="https://www.svgrepo.com/show/491270/loading-spinner.svg"
        alt="Loading icon"
      />
      <p className={`text-center font-bold text-${fontSize}xl`}>{name}</p>
    </div>
  );
};

export default LoadingSpin;
