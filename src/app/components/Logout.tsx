import React, { useEffect } from "react";
import { ButtonLink } from "../components/ButtonLink";
import firebase from "../firebase"

interface logoutProps {}

// purpose of this page is to wait for token store to be cleared
// should be done by the component sending the user here
// then it should redirect to landing page
const Logout: React.FC<logoutProps> = ({}) => {

    const logoutt = () => {
        firebase.logout()
    }
    return (
        <>
            <ButtonLink
                onClick={() => logoutt()}
            >
                click here if you are not automatically redirected
            </ButtonLink>
        </>
    );
};

export default Logout;