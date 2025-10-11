import { useUserQueryById } from "@/queries/user.queries";

export function UserCell({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUserQueryById(userId);
  if (isLoading) return "...";

  if (!user) return "n/a";

  const fullName = `${user.name}, ${user.last_name}`;
  return <p>{fullName}</p>;
}
