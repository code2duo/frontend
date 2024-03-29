import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "firebase/app";

import {auth} from "../services/firebase";
import app from "firebase";
import http from "../services/httpservice";
import {__api_base_url__} from "../../constants";

const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [idToken, setIdToken] = useState(null);

    const history = useHistory();

    async function signinwithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await globalHandler(provider);
    }
    async function signinwithGithub() {
        const provider = new firebase.auth.GithubAuthProvider();
        await globalHandler(provider);
    }
    async function signinwithTwitter() {
        const provider = new firebase.auth.TwitterAuthProvider();
        await globalHandler(provider);
    }

    async function globalHandler(provider) {
        setLoading(true);
        await firebase.auth().signInWithPopup(provider).finally(() => {setLoading(false)});
    }

    async function mergeAuthProviders(provider) {
        const twitterProvider = new app.auth.TwitterAuthProvider();
        const googleProvider = new app.auth.GoogleAuthProvider();
        const githubProvider = new app.auth.GithubAuthProvider();

        let x;
        if (provider === "google.com") {
            x = googleProvider;
        }
        if (provider === "github.com") {
            x = githubProvider;
        }
        if (provider === "twitter.com") {
            x = twitterProvider;
        }
        if (currentUser) {
            setLoading(true);
            currentUser.linkWithPopup(x).finally(() => {setLoading(false)});
        }
    }

    async function getIdToken() {
        return await currentUser.getIdToken();
    }

    async function signOut() {
        setLoading(true);
        await auth.signOut().finally(() => {setLoading(false)});
    }

    async function getAndSetUsername(){
        const idToken = getIdToken();
        http.setToken(idToken);
        await http.get(__api_base_url__+"/profile/get-username", {})
            .then((res) => {
                setUsername(res.data["message"]["username"])
                localStorage.setItem("username", res.data["message"]["username"]);
            })
    }

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if(!user){
                setLoading(false);
                setCurrentUser(null);
                setIdToken(null);
                setUsername(null);
                localStorage.removeItem("username");
                return history.push("/login")
            }
            setCurrentUser(user);
            const idToken = await user.getIdToken();
            setIdToken(idToken)
            http.setToken(idToken);
            setLoading(true)
            await http.get(__api_base_url__+"/profile/get-username", {})
                .then((res) => {
                    setUsername(res.data["message"]["username"]);
                    localStorage.setItem("username", res.data["message"]["username"]);
                })
                .finally(() => setLoading(false));
        });// tslint:disable-next-line
    }, [setCurrentUser, setUsername, history]);

    const value = {
        currentUser,
        loading,
        setLoading,
        username,
        setUsername,
        getAndSetUsername,
        getIdToken,
        signinwithGoogle,
        signinwithGithub,
        signinwithTwitter,
        mergeAuthProviders,
        signOut,
        idToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
