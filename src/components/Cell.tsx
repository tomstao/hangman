import { type ReactNode } from "react";
import * as React from "react";

interface Word {
  children?: ReactNode;
  character?: string;
  display: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Cell({
  character,
  className,
  display,
  onClick,
  disabled,
}: Word) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      value={character}
      disabled={disabled}
      // We need to pass the value here, otherwise, we can't compare the character
    >
      <span className={"m-auto"}>{display && character?.toUpperCase()}</span>
    </button>
  );
}
