import './App.css'
import Language from "./components/language.tsx";
import WordRow from "./components/WordRow.tsx";
import {nanoid} from 'nanoid'
import {useState} from "react";

interface LanData {
    name: string;
    bgColor: string;
    id: string;
    disable?: boolean;
}

interface GameData {
    content: string;
    style: string;
}

function App() {
    const [message, setMessage] = useState<GameData>({content: "", style: ""} as GameData);
    const dataOne: LanData [] = [
        {name: "HTML", bgColor: "bg-orange-600", id: nanoid(), disable: false},
        {name: "CSS", bgColor: "bg-blue-700", id: nanoid(), disable: false},
        {name: "Javascript", bgColor: "bg-yellow-500", id: nanoid(), disable: false},
        {name: "React", bgColor: "bg-sky-400", id: nanoid(), disable: false},
        {name: "Typescript", bgColor: "bg-indigo-700", id: nanoid(), disable: false},
        {name: "Node.js", bgColor: "bg-emerald-400", id: nanoid(), disable: false},
        {name: "Python", bgColor: "bg-amber-600", id: nanoid(), disable: false},
        {name: "Ruby", bgColor: "bg-red-700", id: nanoid(), disable: false},
        {name: "Assembly", bgColor: "bg-blue-900", id: nanoid(), disable: false},
    ] // Language data for the first row

    const [lan, setLanguage] = useState<LanData[]>([...dataOne]);
    let winner = false

    const handleWinner = () => {
        winner = true
        setMessage({...message, content: "You win! Well done!"})
    }

    const handleWrongGuess = () => {
        // Check if all languages are already disabled
        if (lan.every(l => l.disable || l.name === "Assembly")) {
            setMessage((prev) => ({
                ...prev,
                content: "Game Over! \n You lose! Better learning Assembly!",
            }));
        }

        // Find the first enabled one
        const firstEnabledIndex = lan.findIndex(l => !l.disable);
        if (firstEnabledIndex === -1) return;
        if (lan[firstEnabledIndex].name === "Assembly") {
            setLanguage(prev =>
                prev.map((lang, i) =>
                    i === firstEnabledIndex ? {...lang, disable: true} : lang
                ))
            setMessage({...message, content: "Game Over! \n You lose! Better learning Assembly!"})
            return;
        }
        // Disable only that one
        setLanguage(prev =>
            prev.map((lang, i) =>
                i === firstEnabledIndex && lang.name !== "Assembly" ? {
                    ...lang,
                    bgColor: lang.bgColor + " brightness-50",
                    disable: true
                } : lang
            )
        );
        if (firstEnabledIndex === 7) {
            setMessage({...message, content: "Game Over! \n You lose! Better learning Assembly!"})
            return;
        }
        setMessage({...message, content: lan[firstEnabledIndex].name})
    };

    return (
        <>
            <header
                className="container text-center w-96 text-xl flex justify-center items-center flex-col mx-auto mb-9 pt-20">
                <h1 className="font-medium text-xl" style={{color: "#F9F4DA"}}>Assembly: Endgame</h1>
                <p className="text-sm" style={{color: "#8E8E8E"}}>Guess the word in under 8 attempts to keep the
                    programming world safe from Assembly!</p>
                <div className={"h-15"}>{message.content}</div>
            </header>
            {/*Header text for introduction of hangman game*/}

            <section>
                <div className="container flex justify-center items-center flex-row gap-1 mx-auto">
                    {lan.slice(0, 5).map((item) => (
                        <Language content={item.name}
                                  fontColor={"#F9F4DA"}
                                  className={item.bgColor}
                                  key={item.id}
                                  id={item.id}
                                  disable={item.disable}
                        />
                    ))}
                    {/*Array of the first row of languages*/}
                </div>

                <div className="container flex justify-center items-center flex-row gap-1 mx-auto mt-2">
                    {lan.slice(5).map((item) => (
                        <Language content={item.name}
                                  fontColor={"#F9F4DA"}
                                  className={item.bgColor}
                                  key={item.id}
                                  id={item.id}
                                  disable={item.disable}
                        />
                    ))}
                    {/*Array of the second row of languages*/}
                </div>
            </section>
            {/*Language section*/}

            <WordRow onWrongGuess={handleWrongGuess} onCorrectGuess={handleWinner}/>


            <div className={"flex justify-center items-center flex-col"}>
                { winner && <button className={"mx-auto bg-green-500 text-3xl px-1.5 rounded-md hover:scale-105 duration-200"}>New Game</button>}
            </div>

        </>
    )
}

export default App
