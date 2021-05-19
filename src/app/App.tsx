import React, { useState, useEffect } from 'react';
import Login from "./pages/Login"
import Test from "./pages/TestPage"
import "../index.css"
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import firebase from "./firebase"

function App() {
    const [firebaseInitialized, setFirebaseInitialized ] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Login />
        </Route>
          <Route exact path="/ezpz">
              <Test />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
