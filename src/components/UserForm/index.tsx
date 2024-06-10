import { useContext, useState } from "react";
import { UserContext } from "../../App";

import "./index.css";

export function UserForm() {

  const { setNewUser } = useContext(UserContext);

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ lat, setLat ] = useState("");
  const [ lng, setLng ] = useState("");


  const handleSubmit = () => {

    if(lat === "" && lng === "")
      return

    const newUser = {
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

    setNewUser(newUser);
  };


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value); 
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value); 
  const handleLat = (e: React.ChangeEvent<HTMLInputElement>) => setLat(e.target.value); 
  const handleLng = (e: React.ChangeEvent<HTMLInputElement>) => setLng(e.target.value); 

  return (
    <div className="form">
      <input type="text" placeholder="Nome" value={name} onChange={handleName}/>
      <input type="email" placeholder="Email" value={email} onChange={handleEmail}/>
      <input type="text" placeholder="Latitude" value={lat} onChange={handleLat}/>
      <input type="text" placeholder="Longitude" value={lng} onChange={handleLng}/>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}