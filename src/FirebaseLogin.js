import { useState , useEffect} from 'react';
import firebase from './Firebase/firebase'
import Login from './Pages/Login/Login';


const FirebaseLogin = props => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver(); 
    }, []);
    
    if (!isSignedIn) {
      return ( 
          <Login/>
      );
    }
}
export default FirebaseLogin