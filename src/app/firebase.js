import app from "firebase/app"
import 'firebase/auth'
import { __prod__ } from "../constants"

const { REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
} = process.env

const config = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
}
class Firebase {
    constructor() {
        if(__prod__){
            app.initializeApp()
        }
        else{
             app.initializeApp(config)
        }
        this.auth = app.auth()
    }
    logout() {
        return this.auth.signOut()
    }
    async signinwithgoogle() {
        const provider = new app.auth.GoogleAuthProvider()
        return await this.auth.signInWithPopup(provider).then((res) => {
            console.log(res)
        })
    }
    async signinwithGithub() {
        const provider = new app.auth.GithubAuthProvider()
        return await this.auth.signInWithPopup(provider).then((res) => {
            console.log(res)
        })
    }
    async signinwithTwitter() {
        const provider = new app.auth.TwitterAuthProvider()
        return await this.auth.signInWithPopup(provider).then((res) => { console.log(res)})
    }
    async fetchoriginalemail(email) {
        return await this.auth.fetchSignInMethodsForEmail(email)
    }

    async mergeAuthProviders(provider){
        const twitterProvider = new app.auth.TwitterAuthProvider()
        const googleProvider = new app.auth.GoogleAuthProvider()
        const githubProvider = new app.auth.GithubAuthProvider()

        const user = this.auth.currentUser
        console.log(user)
        if(provider === "google.com"){
            var x = googleProvider
        }if(provider === "github.com"){
            var x = githubProvider
        }if(provider === "twitter.com"){
            var x = twitterProvider
        }
        if(user){
                user.linkWithPopup(x)
                    .then(() => {
                        console.log("linked successful")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
    }





    isInitialized() {
        var x =  new Promise(resolve => this.auth.onAuthStateChanged(resolve))
        return x
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }
    getCurrentUserObject () {
        return this.auth.currentUser
    }

}
export default new Firebase()