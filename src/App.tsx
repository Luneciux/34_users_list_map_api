import { SetStateAction, createContext, useEffect, useRef, useState } from "react"
import { GetUsersList } from "./api/Api";
import { UserList } from "./components/UserList";
import { GeoType, UserType } from "./types/User";
import { GeoMap } from "./components/GeoMap";

import "./App.css";

interface LocalsContextType {
  locals: GeoType[],
  setLocals: React.Dispatch<SetStateAction<GeoType[]>>
}

interface UsersContextType {
  users: UserType[],
  setUsers: React.Dispatch<SetStateAction<UserType[]>>
}

interface UserContextType {
  setNewUser: React.Dispatch<SetStateAction<UserType>>
}

export const LocalsContext = createContext< LocalsContextType >({ locals: [], setLocals: () => {} });
export const UsersContext = createContext< UsersContextType >({ users: [], setUsers: () => {} });
export const UserContext = createContext< UserContextType >({ setNewUser: () => {} });

function App() {
  
  const [ users, setUsers ] = useState<UserType[]>([]);
  const [ locals, setLocals ] = useState<GeoType[]>([]);
  const [ newUser, setNewUser ] = useState<UserType>({
    id: 0, 
    name: "", 
    email: "", 
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    }
  });

  const usersLength = useRef(0);

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


  useEffect(() => {
    if(users.length > usersLength.current){

      setUsers(prevUsers => [ ...prevUsers, newUser]);

      setLocals((prevLocals) => {        
        usersLength.current = users.length;
        console.log(newUser);
        return [ ...prevLocals, newUser.address.geo];
      });
      
    }
  }, [newUser]);

  return (
    <>
      { 
        loaded && 
        <LocalsContext.Provider value={{ locals, setLocals }}>
          <GeoMap/>
          <UsersContext.Provider value={{ users, setUsers }}>
            <UserContext.Provider value={{ setNewUser }}>
              <UserList />  
            </UserContext.Provider>
          </UsersContext.Provider>  
        </LocalsContext.Provider>
      }        
    </>
  )
}

export default App
