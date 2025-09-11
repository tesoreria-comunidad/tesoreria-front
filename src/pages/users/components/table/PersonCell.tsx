import type { TUser } from "@/models";

interface PersonCellProps {
  user: TUser;
}
export function UserCell({ user }: PersonCellProps) {
  const fullNamae = `${user.last_name}, ${user.name}`;
  return (
    <div className="flex gap-2 items-center">
      {/* <CircleUser className="size-10" /> */}
      <div>
        <p className="text-md font-medium">{fullNamae}</p>
      </div>
    </div>
  );
}
