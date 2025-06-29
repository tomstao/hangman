import './App.css'
import Language from "./components/language.tsx";
import WordRow from "./components/WordRow.tsx";
import Alphabet from "./components/Alphabet.tsx";

interface LanData {
    name: string;
    bgColor: string;
}


function App() {

    const dataOne: LanData [] = [
        {name: "HTML", bgColor: "bg-orange-600" },
        {name: "CSS", bgColor: "bg-blue-700" },
        {name: "Javascript", bgColor: "bg-yellow-500" },
        {name: "React", bgColor: "bg-sky-400" },
        {name: "Typescript", bgColor: "bg-indigo-700" },
    ] // Language data for the first row

    const dataTwo: LanData[] = [
        {name: "Node.js", bgColor: "bg-emerald-400" },
        {name: "Python", bgColor: "bg-amber-600" },
        {name: "Ruby", bgColor: "bg-red-700" },
        {name: "Assembly", bgColor: "bg-blue-900" },
    ] // Language data for the second row

    return (
        <>
            <header className="container text-center w-96 text-xl flex justify-center items-center flex-col py-20 mx-auto mb-9">
                <h1 className="font-medium text-xl" style={{color:"#F9F4DA"}}>Assembly: Endgame</h1>
                <p className="text-sm" style={{color:"#8E8E8E"}}>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            {/*Header text for introduction of hangman game*/}

            <section>
            <div className="container flex justify-center items-center flex-row gap-1 mx-auto">
                {dataOne.map((item, index) => (
                    <Language content={item.name} fontColor={"#F9F4DA"} className={item.bgColor} key={index} />
                ))}
            {/*Array of the first row of languages*/}
            </div>

            <div className="container flex justify-center items-center flex-row gap-1 mx-auto mt-2">
                {dataTwo.map((item, index) => (
                    <Language content={item.name} fontColor={"#F9F4DA"} className={item.bgColor} key={index} />
                ))}
                {/*Array of the second row of languages*/}
            </div>
            </section>
            {/*Language section*/}

            <section className={"w-4/5 mx-auto"} >
            <WordRow/>
            </section>

            <Alphabet/>
        </>
    )
}

export default App
