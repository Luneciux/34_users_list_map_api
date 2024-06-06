import { useEffect, useState } from "react"
import { GetUsersList } from "./assets/api/Api";
import { UserList } from "./assets/components/UserList";
import { GeoType, UserType } from "./types/User";
import { Map } from "./assets/components/Map";
import { UserForm } from "./assets/components/UserForm";

function App() {
  
  const [ users, setUsers ] = useState<UserType[]>([]);
  const [ locals, setLocals ] = useState<GeoType[]>([]);

  const fetchData = async () => { 
    const data: UserType[] = await GetUsersList();
    setUsers((prevUsers) => {
      prevUsers = [...data];

      console.log(locals, users);

      return prevUsers;
    });

  }

  useEffect(() => {
    if(users.length !== 0){
      fetchData();
      setLocals((prevLocals) => {
        if(prevLocals.length === 0)
          users.map((user) => {
            const { geo } = user.address;
            prevLocals = [ ...prevLocals, geo];
          });
        
        return prevLocals;
      });
    }
  }, []);

  return (
    <>
      {users.length}
      {locals.length}
      <Map />
      <UserList users={users}/>
      <UserForm setUsers={setUsers}/>
      {locals.map((local, i) => (
        <h1 key={i}>{local.lat}</h1>
      ))}
    </>
  )
}

export default App
