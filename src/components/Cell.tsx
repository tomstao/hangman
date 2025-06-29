import type {ReactNode} from "react";

interface Word {
    children?: ReactNode;
    character?: string;
    display: boolean;
    onClick?: () => void;
    className?: string;
}

export default function Cell({character, className, display}: Word) {
    return (
        <button
            className={`${className}`}
        >
                <span className={"m-auto"}>
                {display && character?.toUpperCase()}
                </span>
        </button>
    );
}