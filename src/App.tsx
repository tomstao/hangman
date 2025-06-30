import "./App.css";
import Language from "./components/language.tsx";
import { nanoid } from "nanoid";
import { useState } from "react";
import WordRow from "./components/WordRow.tsx";

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
  const [message, setMessage] = useState<GameData>({
    content: "",
    style: "",
  } as GameData);
  const dataOne: LanData[] = [
    { name: "HTML", bgColor: "bg-orange-600", id: nanoid(), disable: false },
    { name: "CSS", bgColor: "bg-blue-700", id: nanoid(), disable: false },
    {
      name: "Javascript",
      bgColor: "bg-yellow-500",
      id: nanoid(),
      disable: false,
    },
    { name: "React", bgColor: "bg-sky-400", id: nanoid(), disable: false },
    {
      name: "Typescript",
      bgColor: "bg-indigo-700",
      id: nanoid(),
      disable: false,
    },
    {
      name: "Node.js",
      bgColor: "bg-emerald-400",
      id: nanoid(),
      disable: false,
    },
    { name: "Python", bgColor: "bg-amber-600", id: nanoid(), disable: false },
    { name: "Ruby", bgColor: "bg-red-700", id: nanoid(), disable: false },
    { name: "Assembly", bgColor: "bg-blue-900", id: nanoid(), disable: false },
  ]; // Language data for the first row

  const [lan, setLanguage] = useState<LanData[]>([...dataOne]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const handleWinner = () => {
    if (gameOver) {
      return;
    }
    setGameOver(true);
    setMessage({ content: "You win! Well done!🎉", style: "bg-green-500" });
    setTextBg("bg-green-500");
  };

  const [textBg, setTextBg] = useState<string>("");

  // const handleWrongGuess = () => {
  //     // Check if all languages are already disabled
  //     if(gameOver) {return;}
  //     if (lan.every(l => l.disable || l.name === "Assembly")) {
  //         setMessage((prev) => ({
  //             ...prev,
  //             content: "Game Over! \n You lose! Better learning Assembly!😭",
  //         }));
  //         setGameOver(true);
  //         return;
  //     }
  //
  //     // Find the first enabled one
  //     const firstEnabledIndex = lan.findIndex(l => !l.disable);
  //     if (firstEnabledIndex === -1) return;
  //     if (lan[firstEnabledIndex].name === "Assembly") {
  //         setLanguage(prev =>
  //             prev.map((lang, i) =>
  //                 i === firstEnabledIndex ? {...lang, disable: true} : lang
  //             ))
  //         setMessage({...message, content: "Game Over! \n You lose! Better learning Assembly!😭"})
  //         setGameOver(true);
  //         return;
  //     }
  //     // Disable only that one
  //     setLanguage(prev =>
  //         prev.map((lang, i) =>
  //             i === firstEnabledIndex && lang.name !== "Assembly" ? {
  //                 ...lang,
  //                 bgColor: lang.bgColor + " brightness-50",
  //                 disable: true
  //             } : lang
  //         )
  //     );
  //     if (firstEnabledIndex === 7) {
  //         setMessage({...message, content: "Game Over! \n You lose! Better learning Assembly!😭"})
  //         setGameOver(true);
  //         return;
  //     }
  //     setMessage({...message, content: `Farewell  ${lan[firstEnabledIndex].name}!🫡`})
  // };

  const handleWrongGuess = () => {
    if (gameOver) return;

    // Work with current state
    const remaining = lan.filter((l) => !l.disable);
    const firstEnabled = remaining[0];

    if (!firstEnabled || remaining.every((l) => l.name === "Assembly")) {
      endGame("Game Over! \n You lose! Better learn Assembly! 😭");
      setTextBg("bg-fuchsia-600");
      return;
    }

    const isAssembly = firstEnabled.name === "Assembly";

    const updatedLanguages = lan.map((lang) =>
      lang.id === firstEnabled.id
        ? {
            ...lang,
            disable: true,
            bgColor:
              lang.bgColor + (isAssembly ? " brightness-75" : " brightness-50"),
          }
        : lang
    );

    setLanguage(updatedLanguages);

    if (isAssembly || updatedLanguages.filter((l) => !l.disable).length === 1) {
      endGame("Game Over! \n You lose! Better learn Assembly! 😭");
      setTextBg("bg-fuchsia-600");
    } else {
      setMessage({ ...message, content: `Farewell ${firstEnabled.name}! 🫡` });
      setTextBg("bg-red-500");
    }
  };
  const endGame = (finalMessage: string) => {
    setMessage({ ...message, content: finalMessage });
    setGameOver(true);
  };

  const resetGame = () => {
    // Reset all game state to initial values
    setLanguage([...dataOne]);
    setGameOver(false);
    setMessage({ content: "", style: "" });
    setTextBg("");
    setResetTrigger((prevTrigger) => prevTrigger + 1);
  };

  return (
    <>
      <header className="container text-center w-96 text-xl flex justify-center items-center flex-col mx-auto mb-6 pt-13">
        <h1 className="font-medium text-xl" style={{ color: "#F9F4DA" }}>
          Assembly: Endgame
        </h1>
        <p className="text-sm" style={{ color: "#8E8E8E" }}>
          Guess the word in under 9 attempts to keep the programming world safe
          from Assembly!
        </p>
        <div
          className={`flex justify-center items-center h-15 rounded-sm ${textBg} mt-5 px-2`}
        >
          <span className={" m-auto"}> {message.content}</span>
        </div>
      </header>
      {/*Header text for introduction of hangman game*/}

      <section>
        <div className="container flex justify-center items-center flex-row gap-1 mx-auto">
          {lan.slice(0, 5).map((item) => (
            <Language
              content={item.name}
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
            <Language
              content={item.name}
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

      <WordRow
        onWrongGuess={handleWrongGuess}
        onCorrectGuess={handleWinner}
        gameOver={gameOver}
        resetTrigger={resetTrigger}
      />

      <div className={"flex justify-center items-center flex-col"}>
        {gameOver && (
          <button
            className={
              "mx-auto bg-green-500 text-3xl px-1.5 rounded-md hover:scale-105 duration-200"
            }
            onClick={resetGame}
          >
            New Game
          </button>
        )}
      </div>
    </>
  );
}

export default App;
