import { Button } from "@/components/ui/button";
import { CheckIcon, UserX } from "lucide-react";
import type { TUser, TRama } from "@/models";
import { useAppSelector } from "@/store/hooks";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
interface IAddUserAsideProps {
  rama: TRama;
}
export function UsersSelector({ rama }: IAddUserAsideProps) {
  console.log("rama seleccionada:  ", rama);
  const { users } = useAppSelector((s) => s.users);
  const beneficiarios = users.filter((user) => user.role === "BENEFICIARIO");

  const [usersList, setUsersList] = useState<TUser[]>(beneficiarios);
  const [selectedUsers, setSelectedUsers] = useState<TUser["id"][]>([]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const [search, setSearch] = useState("");

  // Debounce search at 300ms
  const debounced = useDebouncedCallback((value) => {
    const filter = beneficiarios.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase())
    );
    setUsersList(filter);
  }, 300);

  const handleSearch = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  return (
    <section className="h-full">
      <Input
        placeholder="Buscar usuario por username"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <br />

      {usersList.length ? (
        <div className="flex flex-col gap-2 max-h-[90%] overflow-auto p-1 ">
          {usersList.map((user) => (
            <div
              className={`flex items-center gap-2  ${
                selectedUsers.includes(user.id) ? "opacity-100" : "opacity-75"
              }`}
            >
              <div
                className={` rounded-full grid place-items-center ${
                  selectedUsers.includes(user.id)
                    ? "bg-primary-2 size-8 "
                    : "size-0"
                } transition-all duration-200`}
              >
                <CheckIcon
                  className={`${
                    selectedUsers.includes(user.id)
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
                  <CardDescription>
                    <p>
                      {user.role} - {user.dni}
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center ">
          <UserX className="size-12" />
          <p>No se encontraron usuarios {search}</p>
        </div>
      )}

      <div className="flex justify-end py-2">
        <Button>Crear</Button>
      </div>
    </section>
  );
}
