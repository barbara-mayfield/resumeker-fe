import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

// styles
import "./App.css";

// components
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./user/Profile";
import FormEdit from "./FormEdit";
import MasterForm from "./formFlow/masterform.js";
import ProtectedRoute from "./ProtectedRoute.js";

//Used for Token Authentication
import { useGetToken } from "./getToken.js";
import { getUser, updateUser } from "../actions/actions.js";


function App(props) {

    // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const token = useGetToken();

    localStorage.setItem("token", token);

    return (
        <div className="App">
          <Navbar />
    <h1>Resumeker</h1>
    <Switch>
        <Route path="/register" render={(props) => <Profile />} />
        <Route exact path="/" component={Home} />
        <Route
          path="/profile"
          component={() => <ProtectedRoute Component={Profile} />}
        />
        <Route
          path="/form"
          component={() => <ProtectedRoute Component={MasterForm} />}
        />
        <Route path="/edit" component={FormEdit} />
      </Switch>
    {/* <Switch>
        <Route path="/register" render={(props) => <Profile />} />

        {isAuthenticated &&
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/edit" component={FormEdit} />
            <Route path="/form" component={MasterForm} />
        </div>
        }
    </Switch> */}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error,
        loading: state.userReducer.loading,
    };
};

export default connect(mapStateToProps, { getUser, updateUser })(App);
