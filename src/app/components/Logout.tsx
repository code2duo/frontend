import React from "react";
import { ButtonLink } from "./ButtonLink";
import {useAuth} from "../contexts/AuthContext";

interface logoutProps {}

// purpose of this page is to wait for token store to be cleared
// should be done by the component sending the user here
// then it should redirect to landing page
const Logout: React.FC<logoutProps> = ({}) => {
    // @ts-ignore
    const { signOut } = useAuth();
    const logout = () => {
        signOut()
    }
    return (
        <>
            <ButtonLink
                onClick={() => logout()}
            >
                click here if you are not automatically redirected
            </ButtonLink>
        </>
    );
};

export default Logout;