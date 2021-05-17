import React from 'react';
import Login from "./pages/Login"
import "../index.css"
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
            <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
