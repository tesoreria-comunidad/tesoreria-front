import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { CircleUser, PenIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

function DataCard({ children }: PropsWithChildren) {
  return (
    <div className="bg-white p-6 w-full rounded-md relative">{children}</div>
  );
}
export function BeneficiarioPage() {
  const { user } = useAppSelector((s) => s.session);
  const { ramas } = useAppSelector((s) => s.ramas);
  const rama = ramas.find((e) => e.id === user?.id_rama);
  return (
    <div className=" size-full flex flex-col items-center ">
      <Label className="text-3xl">Bienvenido</Label>

      <section className="flex flex-col items-center w-1/2 gap-6  px-6">
        <header className="flex flex-col items-center">
          <CircleUser className="size-[150px] bg-gray-300 rounded-full" />
          <br />
          <p className="text-2xl">Francisco Javier, Villaneuva</p>
          <p className="text-gray-500">{user?.username}</p>
        </header>
        <div className="flex flex-col items-start gap-4 w-full text-lg">
          <Label className="text-lg">Mis datos personales</Label>
          <div className="w-full">
            <DataCard>
              <p className="text-sm font-light">Correo Electrónico</p>
              <b>{user?.email || "useremail@gmail.com"}</b>
              <PenIcon className="absolute right-4 top-4 text-primary" />
            </DataCard>
            <hr className=" border-accent" />
            <DataCard>
              <p className="text-sm font-light">Telefono celular</p>
              <b>{"+542915275753"}</b>
              <PenIcon className="absolute right-4 top-4 text-primary" />
            </DataCard>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 w-full text-lg">
          <Label className="text-lg">Domicilo Actual</Label>
          <div className="w-full">
            <DataCard>
              <b>{"SANTA FE 974"}</b>
              <p className="text-sm font-light">
                Bahia Blanca, Buenos Aires (8000) Argentina
              </p>
              <PenIcon className="absolute right-4 top-4 text-primary" />
            </DataCard>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 w-full text-lg">
          <Label className="text-lg">Rama Actual</Label>
          <div className="w-full">
            <DataCard>
              <b>{rama?.name}</b>
              <p className="text-sm font-light">
                {/* Bahia Blanca, Buenos Aires (8000) Argentina */}
              </p>
            </DataCard>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 w-full text-lg">
          <Label className="text-lg">Tus Datos</Label>
          <div className="w-full">
            <DataCard>
              <PenIcon className="absolute right-4 top-4 text-primary" />
              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <p className="text-sm font-light">Nombre</p>
                  <b>{"Francisco Javier"}</b>
                </div>
                <div>
                  <p className="text-sm font-light">Apellido</p>
                  <b>{"Villanueva"}</b>
                </div>
                <div>
                  <p className="text-sm font-light">DNI</p>
                  <b>{"41896328"}</b>
                </div>
                <div>
                  <p className="text-sm font-light">Sexo</p>
                  <b>{"Masculino"}</b>
                </div>
                <div>
                  <p className="text-sm font-light">Fecha de nacimiento</p>
                  <b>{"05/06/1999"}</b>
                </div>
                <div>
                  <p className="text-sm font-light">Nacionalidad</p>
                  <b>{"Argentina"}</b>
                </div>
              </div>
            </DataCard>
          </div>
        </div>
      </section>
    </div>
  );
}
