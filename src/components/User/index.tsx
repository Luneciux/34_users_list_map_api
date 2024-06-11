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
        <div className="info">
          <div className="name-email">
            <p className="name">{`${user.name}`}</p>
            <p>{`${user.email}`}</p>
          </div>
          <div className="adress-geo">
            <p className="coordinate"><span className="coordinate-label">lat:</span>{`${user.address.geo.lat}`}</p>
            <p className="coordinate"><span className="coordinate-label">lng:</span>{`${user.address.geo.lng}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}