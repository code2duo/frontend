import React from 'react'
import {Button} from "../components/Button";
import firebase from '../firebase'
import SvgSolidGitHub from "../../icons/SolidGithub";
import SvgSolidTwitter from "../../icons/SolidTwitter"
import SvgSolidGoogle from "../../icons/SolidGoogle";
import {toast } from "react-toastify"
import { useHistory} from "react-router-dom"
import http from '../services/httpservice'

const TestPage: React.FC = () => {
    const history = useHistory()
    const logout = () => {
        toast.dark("bye bye..")
        history.push("/")
    }
    const linkGoogle = async () => {

         await firebase.mergeAuthProviders("google.com")
    }
    const linkGithub = async () => {
        await firebase.mergeAuthProviders("github.com")
    }
    const linkTwitter = async () => {
        await firebase.mergeAuthProviders("twitter.com")
    }

    const getUser = async() => {
        await http.setToken()
        http.get('https://api.code2duo.co/api/v1/profile/admin', {

        }).then((res) => { console.log(res.data)})
            .catch(err => console.log(err))
    }
    return(
        <>
            <div className = "flex flex-justify-center items-center flex-col">
            <span className = "text-xl text-center text-primary-100 font-bold">Hi, {firebase.getCurrentUsername()}</span>
                <br/>

        <Button onClick={() => linkGoogle()} color={"secondary"}>
             <SvgSolidGoogle width={20} height={20} />
                  Link Google
        </Button><br/>
        <Button onClick={() => linkTwitter()} color={"secondary"}>
             <SvgSolidTwitter width={20} height={20} />
                Link Twitter
        </Button><br/>
        <Button onClick={() => linkGithub()} color={"secondary"}>
             <SvgSolidGitHub width={20} height={20} />
                Link Github
        </Button><br/>
        <Button onClick={() => getUser()} color={"secondary"}>
             <SvgSolidGitHub width={20} height={20} />
                Get User Details
        </Button><br/>
        <Button onClick = {() => logout()} color={"accent-secondary"}>
            Logout
        </Button>
            </div>
        </>
    )
}
export default TestPage