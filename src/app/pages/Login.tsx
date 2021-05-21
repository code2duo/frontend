import React from 'react'
import {useHistory} from "react-router-dom";
import {Button} from "../components/Button";
import SvgSolidDiscord from "../../icons/SolidDiscord";
import SvgSolidGitHub from "../../icons/SolidGithub";
import SvgSolidTwitter from "../../icons/SolidTwitter"
import SvgSolidGoogle from "../../icons/SolidGoogle";
import SvgSiteWordLogo from "../../icons/SiteWordLogo";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from "../contexts/AuthContext";
import {auth} from "../services/firebase";
import {CenterLoader} from "../components/CenterLoader";


interface LoginButtonProps {
    children: [React.ReactNode, React.ReactNode];
    onClick?: () => void;

}

const LoginButton: React.FC<LoginButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return(
        <Button
            className="justify-center text-base py-3 mt-2"
            color="secondary"
            onClick={onClick}
            {...props}
        >
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: "1fr auto 1fr",
                }}
            >
                {children[0]}
                {children[1]}
                <div />
            </div>
        </Button>
    )
}

const LoginPage: React.FC = () => {
    const history = useHistory();
    // @ts-ignore
    const { signinwithGoogle, signinwithGithub, signinwithTwitter, loading } = useAuth();

    const globalSigninHandler = async (provider: string) => {
        try{
            if (provider === "google.com") {
                await signinwithGoogle();
            }else if (provider === "github.com") {
                await signinwithGithub();
            }else if (provider === "twitter.com") {
                await signinwithTwitter();
            }
            history.push("/");
        }catch (e){
            if(e.message === "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."){
                const r = await auth.fetchSignInMethodsForEmail(e.email);
                if(r.length > 0)
                    toast.dark("Your email: "+e.email+" is linked with "+r[0])
            }
        }
    }

    const google = async () => {
        await globalSigninHandler("google.com")
    }
    const github = async () => {
        await globalSigninHandler("github.com")
    }
    const twitter = async () => {
        await globalSigninHandler("twitter.com")
    }
    if(loading)
        return <CenterLoader />
    return (
        <>
            <div className="flex">

            </div>
            <div
                className="grid w-full h-full"
                style={{
                    gridTemplateRows: "1fr auto 1fr",
                }}
            >
                <div className="hidden sm:flex" />
                <div className="flex justify-self-center self-center sm:hidden">
                    <SvgSiteWordLogo width={160} height={70} />
                </div>
                <div className="flex m-auto items-center flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
                    <div className="flex gap-2 flex-col">
                        <span className="text-3xl text-primary-100 font-bold">Welcome</span>
                        <div className="text-primary-100 flex-wrap">
                            By logging in you accept our&nbsp;
                            <a
                                href="https://code2duo.co/privacy-policy.html"
                                className="text-accent hover:underline"
                            >
                                Privacy Policy
                            </a>
                            &nbsp;and&nbsp;
                            <a href="#" className="text-accent hover:underline">
                                Terms of Service
                            </a>

                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <LoginButton onClick={() => google()}>
                            <SvgSolidGoogle width={20} height={20} />
                            Log in with Google
                        </LoginButton>
                        <LoginButton onClick = {() => github()}>
                            <SvgSolidGitHub width={20} height={20} />
                            Log in with GitHub
                        </LoginButton>
                        <LoginButton onClick = {() => twitter()}>
                            <SvgSolidTwitter width={20} height={20} />
                            Log in with Twitter
                        </LoginButton>
                    </div>

                    <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
                        <div className="hidden sm:flex">
                            <SvgSiteWordLogo width={160} height={40} />
                        </div>
                        <div className="flex flex-row gap-6 text-primary-300">
                            <a href="https://code2duo.co/privacy-policy.html" className="hover:text-primary-200">
                                Privacy policy
                            </a>
                            <a
                                href="mailto:bugreport@code2duo.co"
                                className="ml-2 hover:text-primary-200"
                            >
                                Report a bug
                            </a>
                            <div className="flex flex-row gap-6 sm:gap-4">
                                <a
                                    href="https://github.com/code2duo"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <SvgSolidGitHub
                                        width={20}
                                        height={20}
                                        className="ml-2 cursor-pointer hover:text-primary-200"
                                    />
                                </a>
                                <a
                                    href="https://discord.gg/6f5Ujseg"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <SvgSolidDiscord
                                        width={20}
                                        height={20}
                                        className="ml-2 hover:text-primary-200"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
export default LoginPage;