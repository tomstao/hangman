import  {type ReactNode} from "react";
import * as React from "react";

interface Word {
    children?: ReactNode;
    character?: string;
    display: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export default function Cell({character, className, display, onClick}: Word) {
    return (
        <button
            className={`${className}`}
            onClick={onClick}
        >
                <span className={"m-auto"}>
                {display && character?.toUpperCase()}
                </span>
        </button>
    );
}