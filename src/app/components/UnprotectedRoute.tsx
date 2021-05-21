import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// @ts-ignore
export default function UnprotectedRoute({ component: Component, ...rest }) {
    // @ts-ignore
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Redirect to="/"/>
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
}