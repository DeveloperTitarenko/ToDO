import React from "react";
import "./styles/index.scss";
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import LogIn from "./components/LogIn/LogIn";
import ToDo from "./components/ToDo/ToDo";
import Registration from "./components/Registration/Registration";



const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/registration'>Registration</NavLink>
          </li>
          <li>
            <NavLink to='/'>Log In</NavLink>
          </li>
          <li>
            <NavLink to='/todo'>ToDo</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <div className="todos-content">
          <h1>todos</h1>
          <Route path='/' exact  component={LogIn}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/todo' component={ToDo}/>
        </div>
        <Redirect to={'/'}/>
      </Switch>

    </>
  );
}

export default App;
