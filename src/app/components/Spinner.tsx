import React from "react";

export default function Spinner(props: React.SVGProps<SVGSVGElement>){
    return (
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
