import React from "react";

// I'm not doing string interpolation so tailwind can purge the css
const sizes = {
    "2": "h-2 w-2",
    "4": "h-4 w-4",
};
export default function Spinner(props: React.SVGProps<SVGSVGElement>){
// export const Spinner: React.FC<{ size?: keyof typeof sizes }> = ({
//                                                                      size = "4",
//                                                                  }) => {
    return (
        // <svg
        //     className={`animate-spin text-button ${sizes[size]}`}
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        // >
        //     <path
        //         fill="currentColor"
        //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        //     />
        // </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                margin: "auto",
                background: "0 0",
            }}
            width={200}
            height={200}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            display="block"
            {...props}
        >
            <path
                fill="none"
                stroke="#e90c59"
                strokeWidth={6.4}
                strokeDasharray="42.76482137044271 42.76482137044271"
                d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z"
                strokeLinecap="round"
                style={{
                    transformOrigin: "50px 50px",
                }}
            >
                <animate
                    attributeName="stroke-dashoffset"
                    repeatCount="indefinite"
                    dur="1.5384615384615383s"
                    keyTimes="0;1"
                    values="0;256.58892822265625"
                />
            </path>
        </svg>
    );
};
