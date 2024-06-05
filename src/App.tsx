import { useEffect, useState } from "react"
import { GetUsersList } from "./assets/api/Api";
import { UserList } from "./assets/components/UserList";
import { UserType } from "./types/User";

function App() {

  const [ users, setUsers ] = useState<UserType[]>();

  const fetchData = async () => {
    const data = await GetUsersList();
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <UserList users={users}/>
    </>
  )
}

export default App
