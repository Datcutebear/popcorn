import { useState , useEffect, useContext, createContext} from 'react';
import './App.css';

import Routers from './Routers/Routers';
import Login from './Pages/Login/Login';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export const userContext= createContext()

function App() { 
  const [user, setUser] = useState({})

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const users =JSON.parse(localStorage.getItem("user")) 

  
  // if (!isSignedIn) {
  //   return ( 
  //       <Login/>
  //   );
  // }
  useEffect(() => {
      if(users) {
        setUser(users)
      } 
  }, []);

    return (
      <div>
          <userContext.Provider value={{user, setUser}}>
          <Routers/>     
          </userContext.Provider>
      </div>
    )
    
}

export default App;
