export function AppLoader() {
  return (
    <div className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center  gap-4 border-2 border-primary  border-r-transparent rounded-full aspect-square w-[500px] animate-spin  absolute "></div>
      <img src="/logo.png" className="w-[250px] object-cover animate-pulse  " />
      <p className="animate-pulse">Cargando</p>
    </div>
  );
}
