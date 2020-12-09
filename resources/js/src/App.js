import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Login from "./components/Login"
import Trash from "./components/Trash";

const App = () => {
    return  (
        <Router className="App__container">
            <Switch>
            <Route exact path="/">
                <Login/>
            </Route>
            <Route exact path="/home">
                <Home/>
            </Route>
            <Route exact path="/add">
                <AddUser/>
            </Route>
            <Route exact path="/edit/:id">
                <EditUser/>
            </Route>
            <Route exact path="/trash">
                <Trash/>
            </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));