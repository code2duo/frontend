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
        await firebase.auth().signInWithPopup(provider);
    }
    async function signinwithGithub() {
        const provider = new firebase.auth.GithubAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }
    async function signinwithTwitter() {
        const provider = new firebase.auth.TwitterAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }

    async function mergeAuthProviders(provider) {
        const twitterProvider = new app.auth.TwitterAuthProvider()
        const googleProvider = new app.auth.GoogleAuthProvider()
        const githubProvider = new app.auth.GithubAuthProvider()

        let x;
        if (provider === "google.com") {
            x = googleProvider
        }
        if (provider === "github.com") {
            x = githubProvider
        }
        if (provider === "twitter.com") {
            x = twitterProvider
        }
        if (currentUser) {
            currentUser.linkWithPopup(x)
                .then(() => {
                    console.log("linked successful")
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    async function getIdToken() {
        return await currentUser.getIdToken();
    }

    async function signOut() {
        await auth.signOut();
    }

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if(!user){
                setLoading(false);
                setCurrentUser(null)
                setIdToken(null)
                return history.push("/login")
            }
            setCurrentUser(user);
            const idToken = await user.getIdToken();
            setIdToken(idToken)
            try {
                http.setToken(idToken);
                const uname = await http.get(__api_base_url__+"/profile/get-username", {}).then(
                    (res) => res.data["message"]["username"]
                )
                setUsername(uname);
            } catch {
                setUsername(null);
            }
            setLoading(false);
        });
    }, [setCurrentUser, setUsername]);

    const value = {
        currentUser,
        loading,
        username,
        setUsername,
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
