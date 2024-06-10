import { UserType } from "../../types/User";

interface UserListProps {
  user?: UserType
}

export function User({ user } : UserListProps) {
  //id, name, email, address.city, address.geo
  if(!user)
    return null

  return (
    <div className="container">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{`lat: ${user.address.geo.lat} lng: ${user.address.geo.lng}`}</p>
    </div>
  );
}