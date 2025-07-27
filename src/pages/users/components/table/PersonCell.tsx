import { useAppSelector } from "@/store/hooks";

interface PersonCellProps {
  userId: string;
}
export default function PersonCell({ userId }: PersonCellProps) {
  const { users } = useAppSelector((s) => s.users);
  const user = users.find((u) => u.id === userId);

  const person = user?.person;
  console.log({ person });
  if (!person) return user?.username;

  const fullNamae = `${person.name}, ${person.last_name}`;
  return (
    <div className="flex gap-2 items-center">
      {/* <CircleUser className="size-10" /> */}
      <div>
        <p className="text-md font-medium">{fullNamae}</p>
        <p className="text-xs font-light">{person.email}</p>
      </div>
    </div>
  );
}
