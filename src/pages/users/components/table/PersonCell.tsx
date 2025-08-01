import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";

interface PersonCellProps {
  user: TUser;
}
export function UserCell({ user }: PersonCellProps) {
  const fullNamae = `${user.name}, ${user.last_name}`;
  return (
    <div className="flex gap-2 items-center">
      {/* <CircleUser className="size-10" /> */}
      <div>
        <p className="text-md font-medium">{fullNamae}</p>
        <p className="text-xs font-light">{user.email}</p>
      </div>
    </div>
  );
}
