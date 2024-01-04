const BlockingBox = () => {
  return (
    <div
      className="boxBlock w-[100%] h-[100%] fixed left-0 right-0 top-0 bottom-0 z-10"
      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    ></div>
  );
};

export default BlockingBox;
