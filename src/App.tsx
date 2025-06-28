import './App.css'
import Language from "./components/language.tsx";
function App() {

    return (
        <>
            <div className="container text-center w-96 text-xl flex justify-center items-center flex-col py-25 mx-auto mb-14">
                <h1 className="font-medium text-xl" style={{color:"#F9F4DA"}}>Assembly: Endgame</h1>
                <p className="text-sm" style={{color:"#8E8E8E"}}>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div>

            <div className="container flex justify-center items-center flex-col">
                <Language content={"HTML"} className={"bg-orange-600"} fontColor={"#F9F4DA"} />
            </div>
        </>
    )
}

export default App
