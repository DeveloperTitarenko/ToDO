import React from "react";
import "./styles/index.scss";
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import LogIn from "./components/LogIn/LogIn";
import ToDo from "./components/ToDo/ToDo";


const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>LogIn</NavLink>
          </li>
          <li>
            <NavLink to='/todo'>ToDo</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <div className="todos-content">
          <h1>todos</h1>
          <Route path='/' exact component={LogIn}/>
          <Route path='/todo' component={ToDo}/>
        </div>
        <Redirect to={'/'}/>
      </Switch>

    </>
  );
}

export default App;
