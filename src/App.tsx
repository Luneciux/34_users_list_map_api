import { SetStateAction, createContext, useEffect, useRef, useState } from "react"
import { GetUsersList } from "./api/Api";
import { UserList } from "./components/UserList";
import { GeoType, UserType } from "./types/User";

import "./App.css";
import { GeoMap } from "./components/GeoMap";

interface LocalsContextType {
  locals: GeoType[],
  setLocals: React.Dispatch<SetStateAction<GeoType[]>>
}

export const LocalsContext = createContext< LocalsContextType >({ locals: [], setLocals: () => {} });

function App() {
  
  const [ users, setUsers ] = useState<UserType[]>([]);
  const [ locals, setLocals ] = useState<GeoType[]>([]);

  const loaded = useRef(false);

  const fetchData = async () => { 
    const data: UserType[] = await GetUsersList();

    setUsers((prevUsers) => {
      prevUsers = [...data];
      return prevUsers;
    });
    
    return data;
  }

  useEffect(() => {
    if(users.length === 0 ){
      fetchData().then((data) => {
        
        if(loaded.current === false && locals.length === 0){

          setLocals((prevLocals) => {
  
            data.map((user) => {
              const { geo } = user.address;
              prevLocals = [ ...prevLocals, geo];
            });
            
            loaded.current = true;
            return prevLocals;
          });
        }

      });


    }
  }, []);

  return (
    <>
      { 
        loaded && 
        <LocalsContext.Provider value={{ locals, setLocals }}>
          <GeoMap/>
        </LocalsContext.Provider>
      }
      <UserList users={users} />
      {/* <UserForm setUsers={setUsers}/> */}
    </>
  )
}

export default App
