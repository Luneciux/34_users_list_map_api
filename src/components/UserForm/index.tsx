import { useContext, useState } from "react";
import { UsersContext } from "../../App";

import "./index.css";
import { UserType } from "../../types/User";

export function UserForm() {

  const { setUsers } = useContext(UsersContext);

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ lat, setLat ] = useState("");
  const [ lng, setLng ] = useState("");
  
  const user: UserType = {
    id: 0, 
    name: name, 
    email: email, 
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: lat,
        lng: lng
      }
    }
  }

  const handleSubmit = () => {
    setUsers(prevUsers => [...prevUsers, user]);
  };


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value); 
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value); 
  const handleLat = (e: React.ChangeEvent<HTMLInputElement>) => setLat(e.target.value); 
  const handleLng = (e: React.ChangeEvent<HTMLInputElement>) => setLng(e.target.value); 

  return (
    <div className="form">
      <input type="text" placeholder="Nome" value={user.name} onChange={handleName}/>
      <input type="email" placeholder="Email" value={user.email} onChange={handleEmail}/>
      <input type="text" placeholder="Latitude" value={user.address.geo.lat} onChange={handleLat}/>
      <input type="text" placeholder="Longitude" value={user.address.geo.lng} onChange={handleLng}/>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}