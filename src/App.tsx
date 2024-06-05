import { useState } from "react"
import { GetUsersList } from "./assets/api/Api";

export interface UserType {
  id: number, 
  name: string, 
  email: string, 
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  }
}

function App() {

  const [ users, setUsers ] = useState<UserType>();

  let teste = "";

  if(!users)
    teste = GetUsersList();

  return (
    <>
      {teste}
    </>
  )
}

export default App
