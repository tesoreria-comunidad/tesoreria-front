import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAlert } from "@/context/AlertContext";
import type { TFamily, TUser } from "@/models";
import { useUsersQuery, useEditUserMutation } from "@/queries/user.queries";
import { Check, CheckIcon, UserPlus, UserX } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function AddMemberAside({ family }: { family: TFamily }) {
  const { data: users = [], isLoading } = useUsersQuery();
  const editUserMutation = useEditUserMutation();
  const { showAlert } = useAlert();

  // Filtramos beneficiarios sin familia
  const beneficiarios = users.filter(
    (user) => user.role === "BENEFICIARIO" && !user.id_family
  );

  const [usersList, setUsersList] = useState<TUser[]>(beneficiarios);
  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
  const [search, setSearch] = useState("");

  const handleSelectUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setSelectedUsers((prev) =>
      prev.find((item) => item.id === user.id)
        ? prev.filter((item) => item.id !== user.id)
        : [...prev, { ...user }]
    );
  };

  // Debounce search
  const debounced = useDebouncedCallback((value: string) => {
    const filter = beneficiarios.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setUsersList(filter);
  }, 300);

  const handleSearch = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  const handleSubmit = async () => {
    try {
      const promises = selectedUsers.map((user) =>
        editUserMutation.mutateAsync({
          body: { id_family: family.id },
          userId: user.id,
        })
      );
      await Promise.all(promises);

      showAlert({
        title: "Usuarios agregados a la familia",
        description: "",
        type: "success",
      });
      setSelectedUsers([]);
    } catch (error) {
      console.log("error", error);
      showAlert({
        title: "Error al agregar usuarios a la familia",
        description: "Intenta nuevamente",
        type: "error",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UserPlus />
          <span>Agregar Miembro</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agrega miembro a {family.name}</SheetTitle>
          <SheetDescription>
            Seleccionar los miembros que quieres agregar
          </SheetDescription>
          <br />
          <div className="absolute bottom-0 right-0 m-4">
            <Button
              onClick={handleSubmit}
              isLoading={editUserMutation.isPending}
              disabled={selectedUsers.length === 0}
            >
              <Check />
              Confirmar
            </Button>
          </div>
          <section className="max-h-[85dvh] overflow-auto">
            <Input
              placeholder="Buscar usuario por username"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <br />

            {isLoading ? (
              <p className="text-sm text-gray-500">Cargando usuarios...</p>
            ) : usersList.length ? (
              <div className="flex flex-col gap-2">
                {usersList.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-2 ${
                      selectedUsers.find((item) => item.id === user.id)
                        ? "opacity-100"
                        : "opacity-75"
                    }`}
                  >
                    <div
                      className={`rounded-full grid place-items-center ${
                        selectedUsers.find((item) => item.id === user.id)
                          ? "bg-primary-2 size-8"
                          : "size-0"
                      } transition-all duration-200`}
                    >
                      <CheckIcon
                        className={`${
                          selectedUsers.find((item) => item.id === user.id)
                            ? "text-white size-4"
                            : "hidden"
                        }`}
                      />
                    </div>
                    <Card
                      className="border-gray-50 cursor-pointer hover:shadow-md transition-all duration-200 flex-1"
                      onClick={() => handleSelectUser(user.id)}
                    >
                      <CardHeader>
                        <CardTitle className="uppercase">
                          {user.name}, {user.last_name}
                        </CardTitle>
                        <CardDescription>{user.role}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center">
                <UserX className="size-12" />
                <p>No se encontraron usuarios {search}</p>
              </div>
            )}
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
