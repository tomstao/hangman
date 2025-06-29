import Cell from "./Cell.tsx";
import type {Hangman} from "./WordRow.tsx";

interface AlphabetProps {
    hangman: Hangman[]
}

export default function Alphabet({ hangman }: AlphabetProps) {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i)
    );
    const style: string = "h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl  bg-amber-400 text-black hover:scale-105 duration-200";
    // Style string
    const fullRows = Math.floor(alphabet.length / 10); // 2

    return (
        <section className="grid grid-cols-10 p-4 gap-1 gap-x-10 w-1/2 mx-auto">
            {hangman.slice(0, fullRows * 10).map((hangObj) => (
                <Cell
                    key={hangObj.id}
                    character={hangObj.char}
                    display={hangObj.display}
                    className= {style}
                    onClick={hangObj.onClick}
                />
            ))}

            {/* Wrap last row letters in a nested div with col-span-10 */}
                <div></div>
                <div></div>
            {/*two empty div to align the alphabet*/}
                {hangman.slice(fullRows * 10).map((hangObj) => (
                    <Cell
                        key={hangObj.id}
                        character={hangObj.char}
                        display={hangObj.display}
                        className= {style}
                        onClick={hangObj.onClick}
                    />

                ))}

        </section>
    );
}