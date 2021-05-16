import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Home from './Component/Home/Home/Home';
import Login from './Component/Login/Login';
import { createContext } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({})
  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Switch>
          <PrivateRoute exact path='/'>
            <Home></Home>
          </PrivateRoute>
          <PrivateRoute path='/home'>
            <Home></Home>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
