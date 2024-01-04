const LoadingSpin = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <img
        className="w-10 h-10 animate-spin"
        src="https://www.svgrepo.com/show/491270/loading-spinner.svg"
        alt="Loading icon"
      />
      <p className="text-center text-2xl font-bold">Loading ...</p>
    </div>
  );
};

export default LoadingSpin;
