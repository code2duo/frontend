import React, {useState} from 'react'
import {toast } from "react-toastify"
import {Button} from "../components/Button";
import SvgSolidGitHub from "../../icons/SolidGithub";
import SvgSolidTwitter from "../../icons/SolidTwitter"
import SvgSolidGoogle from "../../icons/SolidGoogle";
import {useAuth} from "../contexts/AuthContext";

import { SignupUserModal } from "../components/SignupUserModal";

const TestPage: React.FC = () => {
    // @ts-ignore
    const { mergeAuthProviders, currentUser, signOut, idToken } = useAuth();
    const [roomModal, setRoomModal] = useState(false);
    const logout = async () => {
        await signOut();
        toast.dark("bye bye..")
    }
    const linkGoogle = async () => {
         await mergeAuthProviders("google.com")
    }
    const linkGithub = async () => {
        await mergeAuthProviders("github.com")
    }
    const linkTwitter = async () => {
        await mergeAuthProviders("twitter.com")
    }

    const getUser = async() => {
        console.log(idToken)
    }
    return(
        <>
            <div className = "flex flex-justify-center items-center flex-col">
            <span className = "text-xl text-center text-primary-100 font-bold">Hi, {currentUser.displayName}</span>
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
        <Button onClick={() => setRoomModal(true)} color={"accent-secondary"}>
            Signup
        </Button><br/>
        <Button onClick = {() => logout()}>
            Logout
        </Button>
        {roomModal && (
        <SignupUserModal onRequestClose={() => setRoomModal(false)} />
        )}
            </div>
        </>
    )
};
export default TestPage