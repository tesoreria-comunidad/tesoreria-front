export function PageLoader() {
  return (
    <div className="size-full flex  flex-col justify-center items-center gap-4 ">
      <div className="flex flex-col justify-center items-center  gap-4 border-2 border-primary  border-r-primary/5 rounded-full aspect-square w-[100px] animate-spin   "></div>
      <p className="opacity-85">Cargando...</p>
    </div>
  );
}
