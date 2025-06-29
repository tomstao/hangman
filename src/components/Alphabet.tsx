import Cell from "./Cell.tsx";

export default function Alphabet() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i)
    );
    const style: string = "h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl  bg-amber-400 text-black hover:scale-105 duration-200";
    const fullRows = Math.floor(alphabet.length / 10); // 2

    return (
        <section className="grid grid-cols-10 p-4 gap-1 gap-x-10 w-1/2 mx-auto">
            {alphabet.slice(0, fullRows * 10).map((letter, i) => (
                <Cell
                    key={i}
                    character={letter}
                    display={false}
                    className= {style}
                />
            ))}

            {/* Wrap last row letters in a nested div with col-span-10 */}
                <div></div>
                <div></div>
                {alphabet.slice(fullRows * 10).map((letter, i) => (
                    <Cell
                        key={fullRows * 10 + i}
                        character={letter}
                        display={false}
                        className= {style}
                    />

                ))}

        </section>
    );
}