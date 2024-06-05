import { useEffect, useState } from "react"
import { GetUsersList } from "./assets/api/Api";
import { UserList } from "./assets/components/UserList";
import { UserType } from "./types/User";
import { Map } from "./assets/components/Map";
import { UserForm } from "./assets/components/UserForm";

interface GeoType {
  lat: string, 
  lng: string,
}

function App() {
  


  const [ users, setUsers ] = useState<UserType[]>();
  const [ locals, setLocals ] = useState<GeoType[]>([]);

  const fetchData = async () => {
    const data = await GetUsersList();

    setUsers((prevUsers) => {
      prevUsers = data;

      if(prevUsers)
        prevUsers.map((user)=> {
          const { geo } = user.address;
          setLocals(prevLocals => [ ...prevLocals, geo]);
        });        

      return prevUsers;
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Map />
      <UserList users={users}/>
      <UserForm setUsers={setUsers}/>
      {locals.map((local) => (
        <h1>{local.lat}</h1>
      ))}
    </>
  )
}

export default App
