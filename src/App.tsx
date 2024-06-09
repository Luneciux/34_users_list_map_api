import { useEffect, useState } from "react"
import { GetUsersList } from "./api/Api";
import { UserList } from "./components/UserList";
import { GeoType, UserType } from "./types/User";
import { Map } from "./components/Map";
import { UserForm } from "./components/UserForm";

function App() {
  
  const [ users, setUsers ] = useState<UserType[]>([]);
  const [ locals, setLocals ] = useState<GeoType[]>([]);

  const fetchData = async () => { 
    const data: UserType[] = await GetUsersList();
    setUsers((prevUsers) => {
      prevUsers = [...data];
      return prevUsers;
    });
    
    return data;

  }

  useEffect(() => {
    if(users.length === 0){
      fetchData().then((data) => {

        setLocals((prevLocals) => {
          console.log("data: " + data);

          data.map((user) => {
            const { geo } = user.address;
            prevLocals = [ ...prevLocals, geo];
          });
          
          return prevLocals;
        });
      });


    }
  }, []);

  return (
    <>
      {users.length}
      {locals.length}
      <Map />
      <UserList users={users}/>
      {/* <UserForm setUsers={setUsers}/> */}
      {locals.map((local, i) => (
        <h1 key={i}>{local.lat}</h1>
      ))}
    </>
  )
}

export default App
