import { type ChangeEvent, useRef, useState } from "react";
import Papa from "papaparse";
import {
  BulkCreateUserSchema,
  type TBulkCreateUser,
  type TCreateUser,
  type TUser,
} from "@/models";
import { Input } from "@/components/ui/input";
import { BulkUsersTable } from "./table/BulkUsersTable";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  FileIcon,
  FileUp,
  TableIcon,
  Upload,
  XIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormatedDate } from "@/components/common/FormatedDate";
import { UserServices } from "@/services/user.service";
import { useAlert } from "@/context/AlertContext";
interface BulkPersonUploaderProps {
  id_rama: string;
  size?: "sm" | "lg";
}
export function UserBulkUploader({
  id_rama,
  size = "lg",
}: BulkPersonUploaderProps) {
  const [validPersons, setValidPersons] = useState<TBulkCreateUser[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showAlert } = useAlert();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data as any[];
        const valid: TBulkCreateUser[] = [];
        const errs: string[] = [];

        parsed.forEach((row, index) => {
          // Limpiar valores
          const cleaned = Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k.trim(), String(v).trim()])
          );

          const validation = BulkCreateUserSchema.safeParse(cleaned);
          console.log("validation", validation.error);
          if (validation.success) {
            valid.push(validation.data);
          } else {
            errs.push(
              `Fila ${index + 2}: ${validation.error.issues
                .map((e) => e.message)
                .join(", ")}`
            );
          }
        });

        setValidPersons(valid);
        setErrors(errs);
      },
    });
  };

  const handleSubmit = async () => {
    if (!validPersons.length) return alert("No hay datos válidos para enviar");
    setLoading(true);
    try {
      const users: Omit<TCreateUser, "username" | "password">[] =
        validPersons.map((item) => {
          let birthdate: string = "";
          if (item.birthdate) {
            const [day, month, year] = item.birthdate.split("/");
            birthdate = new Date(
              Number(year),
              Number(month) - 1,
              Number(day)
            ).toISOString();
          }
          return {
            ...item,
            birthdate,
            role: "BENEFICIARIO",
            id_family: null,
            family_role: "MEMBER",
          };
        });

      const filteredUsersData = users.map((user) => {
        const aux: Partial<TUser> = {} as Partial<TUser>;
        (Object.keys(user) as (keyof TUser)[]).forEach((key) => {
          //@ts-ignore
          if (user[key]) {
            //@ts-ignore
            aux[key] = user[key];
          }
        });

        return aux;
      });

      await UserServices.bulkCreate({
        users: filteredUsersData,
        id_rama,
      });
      showAlert({
        title: "Personas cargadas correctamente",
        description: `${validPersons.length} usuarios han sido creado correctamente`,
        type: "success",
      });
      setValidPersons([]);
    } catch (err) {
      console.error(err);
      showAlert({
        title: "Hubo un error al cargar el archivo ",
        description: "Por favor revisar si todos los datos son correctos",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" ">
      <Sheet>
        <SheetTrigger>
          <Button type="button">
            <Upload />
            {size === "lg" ? "cargar csv" : null}
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className=" h-full max-h-full ">
            <SheetTitle>Cargar Csv</SheetTitle>
            <SheetDescription>
              Cargar un archivo csv para agregar al sistema. Verificar que el
              formato de la tabla respeta los valores de las columnas
              <span className="underline cursor-pointer"> ver template</span>
            </SheetDescription>
            <section className=" flex-1 flex flex-col items-center p-4 gap-4 overflow-auto max-h-[80vh] h-[80vh] ">
              <Button
                type="button"
                variant={"ghost"}
                onClick={handleClick}
                className="flex flex-col items-center w-full h-[300px] mx-auto border border-dashed text-primary hover:text-primary-2"
              >
                <FileUp className="size-20" />
                <p>Seleccionar archivo</p>
              </Button>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                ref={inputRef}
                className="hidden"
              />

              {selectedFile && (
                <>
                  <div className="border w-full p-4 border-border rounded-md flex justify-between items-start h-24">
                    <div className="flex gap-2  items-start text-gray-800">
                      <FileIcon />
                      <div className="flex flex-col gap-1">
                        <span className="font-medium ">
                          {selectedFile?.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {selectedFile?.size} kb
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 h-full justify-between">
                      {errors.length ? (
                        <div className="bg-destructive/80 text-white rounded-full p-1 ">
                          <XIcon className="size-3" />
                        </div>
                      ) : (
                        <div className="bg-primary text-white rounded-full p-1 ">
                          <CheckIcon className="size-3" />
                        </div>
                      )}
                      <p className="text-xs text-gray-400">
                        <FormatedDate date={new Date().toISOString()} />
                      </p>
                    </div>
                  </div>
                  <div className=" w-full">
                    <Button
                      variant={"link"}
                      onClick={() => setShowTable(!showTable)}
                      className="text-gray-500"
                    >
                      <TableIcon className="" />
                      Ver archivo
                    </Button>
                    <div
                      className={`${
                        showTable ? "visible" : "hidden"
                      } transition-all duration-300`}
                    >
                      {validPersons.length > 0 && (
                        <div className="space-y-2">
                          <BulkUsersTable users={validPersons} />
                          <p>{validPersons.length} personas cargadas.</p>
                        </div>
                      )}
                      {errors.length > 0 && (
                        <div className="text-red-600">
                          <h4>Errores en el archivo:</h4>
                          <ul className="list-disc pl-5">
                            {errors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </section>
          </SheetHeader>

          <SheetFooter>
            <div className="flex gap-2">
              <SheetClose>
                <Button disabled={loading} variant={"outline"}>
                  Cancelar
                </Button>
              </SheetClose>

              <Button
                onClick={handleSubmit}
                isLoading={loading}
                className="flex-1"
              >
                <Upload /> Cargar Archivo
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
