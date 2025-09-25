export function AppLoader() {
  return (
    <div className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center gap-8 ">
      <img
        src="/logo.png"
        className="h-[250px] p-4   shadow-xl rounded-full    "
      />
      <div className="flex flex-col justify-center items-center gap-1">
        {/* <div className="flex flex-col justify-center items-center  gap-4 border-2 border-primary  border-r-transparent rounded-full aspect-square w-[15px] animate-spin   "></div> */}
        <>
          <div className="w-50 h-1 bg-gray-100 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-primary absolute top-0 left-0"
              style={{
                width: "50%",
                animation: "loader 1.5s  infinite",
              }}
            />
          </div>
          <style>{`
            @keyframes loader {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(200%); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
        </>
      </div>
    </div>
  );
}
