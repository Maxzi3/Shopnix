const Spinner = () => {
  return (
    <div
      className="mx-auto my-24 w-16 aspect-square rounded-full 
                 dark:bg-[conic-gradient(transparent_30%,_#fff)] bg-[conic-gradient(transparent_30%,_#000)] 
                 animate-rotate"
      style={{
        WebkitMask:
          "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
      }}
    />
  );
};

export default Spinner;
