import React from 'react'
import {Button} from "../components/Button";
import SvgSolidDiscord from "../../icons/SolidDiscord";
import SvgSolidGitHub from "../../icons/SolidGithub";
import SvgSolidTwitter from "../../icons/SolidTwitter"
import SvgSolidGoogle from "../../icons/SolidGoogle";
import SvgSiteLogo  from "../../icons/SiteLogo";

interface LoginButtonProps {
    children: [React.ReactNode, React.ReactNode];

}

const LoginButton: React.FC<LoginButtonProps> = ({
    children,
    ...props
}) => {
    return(
        <Button
            className="justify-center text-base py-3 mt-2"
            color="secondary"
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
                    <SvgSiteLogo width={120} height={120} />
                </div>
                <div className="flex justify-center items-center flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 sm:w-400 w-full">
                    <div className="flex gap-2 flex-col">
                        <span className="text-3xl text-center text-primary-100 font-bold">Welcome</span>
                        <div className="text-primary-100 text-center flex-wrap">
                            By logging in you accept our&nbsp;
                            <a
                                href="#"
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
                        <LoginButton>
                            <SvgSolidGoogle width={20} height={20} />
                            Log in with Google
                        </LoginButton>
                        <LoginButton>
                            <SvgSolidGitHub width={20} height={20} />
                            Log in with GitHub
                        </LoginButton>
                        <LoginButton>
                            <SvgSolidTwitter width={20} height={20} />
                            Log in with Twitter
                        </LoginButton>
                    </div>

                    <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
                        <div className="hidden sm:flex">
                            <SvgSiteLogo width={120} height={120} />
                        </div>
                        <div className="flex flex-row gap-6 text-primary-300">
                            <a href="#" className="hover:text-primary-200">
                                Privacy policy
                            </a>
                            <a
                                href="https://github.com/"
                                className="ml-2 hover:text-primary-200"
                            >
                                Report a bug
                            </a>
                            <div className="flex flex-row gap-6 sm:gap-4">
                                <a
                                    href="https://github.com"
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