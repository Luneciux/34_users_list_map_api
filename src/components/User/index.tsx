import { UserType } from "../../types/User";
import "./index.css";

interface UserListProps {
  user?: UserType
}

export function User({ user } : UserListProps) {
  //id, name, email, address.city, address.geo
  if(!user)
    return null

  return (
    <div className="container">
      <div className="content">
        <p>{user.name}</p>
        <div className="info">
          <p>{user.email}</p>
          <p>{`lat: ${user.address.geo.lat}`}</p>
          <p>{`lng: ${user.address.geo.lat}`}</p>
        </div>
      </div>
    </div>
  );
}