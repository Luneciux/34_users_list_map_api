import { UserType } from "../../types/User";

interface UserListProps {
  user?: UserType
}

export function User({ user } : UserListProps) {
  if(!user)
    return null

  return (
    <h1>{user.name}</h1>
  );
}