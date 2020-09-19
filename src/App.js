import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Guest from './Components/Guest';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/admin" component={Login} />
          <Route exact path="/" component={Guest} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App