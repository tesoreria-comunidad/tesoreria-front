type LoderSizes = "bg" | "sm" | "md";
export function LoaderSpinner({ size = "sm" }: { size?: LoderSizes }) {
  const loaderSize: Record<LoderSizes, string> = {
    bg: "h-10 w-10",
    md: "h-6 w-6",
    sm: "h-4 w-4",
  };
  return (
    <div
      className={` ${loaderSize[size]}   animate-spin rounded-full border-2   border-l-transparent    `}
      role="status"
    ></div>
  );
}
