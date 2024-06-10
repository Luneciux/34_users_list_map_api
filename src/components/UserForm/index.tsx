import { useContext } from "react";
import { UsersContext } from "../../App";

import "./index.css";

export function UserForm() {

  const { setUsers } = useContext(UsersContext);

  const handleSubmit = () => (console.log("handler"));

  return (
    <div className="form">
      <input type="text" placeholder="Nome"/>
      <input type="email" placeholder="Email"/>
      <input type="text" placeholder="Latitude"/>
      <input type="text" placeholder="Longitude"/>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}