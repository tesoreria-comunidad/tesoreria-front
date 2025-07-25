import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  return (
    <div className=" h-screen w-screen overflow-hidden relative grid place-items-center ">
      <div className="absolute flex h-full w-full  overflow-hidden z-0 bg-gradient-to-br from-primary to-primary-2"></div>
      <div className="lg:w-1/3  max-md:h-full w-full mx-auto  z-10 bg-white md:px-10 md:py-20  py-8  px-4 rounded-sm grid place-items-center">
        <LoginForm />
      </div>
    </div>
  );
}
