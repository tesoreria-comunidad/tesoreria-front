export function AppLoader() {
  return (
    <div className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center gap-8 ">
      <img
        src="/logo.png"
        className="w-[250px] object-cover  animate-bounce  "
      />
      <div className="flex flex-col justify-center items-center gap-1">
        {/* <div className="flex flex-col justify-center items-center  gap-4 border-2 border-primary  border-r-transparent rounded-full aspect-square w-[15px] animate-spin   "></div> */}
        <p className="italic animate-pulse">Cargando</p>
      </div>
    </div>
  );
}
