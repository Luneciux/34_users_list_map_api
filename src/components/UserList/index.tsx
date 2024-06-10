import { useContext } from "react";
import { User } from "../User";

import "./index.css"
import { UsersContext } from "../../App";
import { UserForm } from "../UserForm";

export function UserList() {

  const { users } = useContext(UsersContext);

  if(!users)
    return null
  
  return (
    <div id="container">
      <UserForm />
      <div id="container-users">
        <div className="content">
          {users.map((user, i) => (
            <User user={user} key={i}/>
          ))}
        </div>

      </div>
    </div>
  );
}