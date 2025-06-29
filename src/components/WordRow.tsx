import Cell from "./Cell.tsx";
import {nanoid} from "nanoid";
//
// interface Word {
//     children?: ReactNode;
//     character?: string;
//     display: boolean;
//     onClick?: () => void;
//     className?: string;
// }

export default function WordRow() {
    const vocabulary: string = "abcdefgh";


    return (
        <div className="grid grid-cols-8 gap-0 p-4">
            {Array.from(vocabulary, (v) => (
                <Cell
                    key={nanoid()}
                    character={v}
                    display={false}
                    className={"h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl font-bold text-white"}
                />
            ))}
        </div>
    );
}