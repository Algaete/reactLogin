import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import  Login  from './components/Login';
import { Admin } from './components/Admin';

import {auth} from './firebase';

function App() {

  const [firebaseUser, setFirebaseuser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged( user => {
      console.log(user)
      if(user){
        setFirebaseuser(user)
      }else{
        setFirebaseuser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="App">
        <div className="container">
          <Navbar firebaseUser={firebaseUser}/>
          <Switch>
            <Route path="/" exact>
              inicio...
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            
          </Switch>
          
        </div>
      </div>
    </Router>
   
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
