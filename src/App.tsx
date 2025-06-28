import './App.css'
import Language from "./components/language.tsx";

interface LanData {
    name: string;
    bgColor: string;
}


function App() {

    const dataOne: LanData [] = [
        {name: "HTML", bgColor: "bg-orange-600" },
        {name: "CSS", bgColor: "bg-blue-700" },
        {name: "Javascript", bgColor: "bg-yellow-400" },
        {name: "React", bgColor: "bg-sky-400" },
        {name: "Typescript", bgColor: "bg-indigo-700" },
    ]

    const dataTwo: LanData[] = [
        {name: "Node.js", bgColor: "bg-emerald-400" },
        {name: "Python", bgColor: "bg-amber-600" },
        {name: "Ruby", bgColor: "bg-red-700" },
        {name: "Assembly", bgColor: "bg-blue-900" },
    ]


    return (
        <>
            <div className="container text-center w-96 text-xl flex justify-center items-center flex-col py-25 mx-auto mb-14">
                <h1 className="font-medium text-xl" style={{color:"#F9F4DA"}}>Assembly: Endgame</h1>
                <p className="text-sm" style={{color:"#8E8E8E"}}>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div>

            <div className="container flex justify-center items-center flex-row gap-1 mx-auto">
                {dataOne.map((item, index) => (
                    <Language content={item.name} fontColor={"#F9F4DA"} className={item.bgColor} key={index} />
                ))}

            </div>

            <div className="container flex justify-center items-center flex-row gap-1 mx-auto mt-2">
                {dataTwo.map((item, index) => (
                    <Language content={item.name} fontColor={"#F9F4DA"} className={item.bgColor} key={index} />
                ))}
            </div>
        </>
    )
}

export default App
