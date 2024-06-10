import { UserType } from "../../types/User";
import { User } from "../User";

interface UserListProps {
  users?: UserType[]
}

  export function UserList({ users } : UserListProps) {

  if(!users)
    return null
  
  return (
    <div className="content">
      {users.map((user, i) => (
        <User user={user} key={i}/>
      ))}
    </div>
  );
}