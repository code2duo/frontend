import React from 'react';
import "../index.css"
import { Switch } from "react-router-dom";
import Login from "./pages/Login"
import TestPage from "./pages/TestPage";
import Dashboard from "./pages/Dashboard";
import {CenterLoader} from "./components/CenterLoader"
import ProtectedRoute from "./components/ProtectedRoute"
import UnprotectedRoute from "./components/UnprotectedRoute";
import { useAuth } from "./contexts/AuthContext";
import {ToastContainer} from "react-toastify";

function App() {
    // @ts-ignore
    const { loading } = useAuth();
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            >

            </ToastContainer>
            {loading ? (
                <CenterLoader />
            ) : (
                <Switch>
                    <ProtectedRoute path="/" exact component={Dashboard} />
                    <UnprotectedRoute path="/login" component={Login} />
                    <ProtectedRoute path="/testpage" component={TestPage} />
                </Switch>
          )}
        </>
    );
}

export default App;
