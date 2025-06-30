import Cell from "./Cell.tsx";
import { nanoid } from "nanoid";
import axios from "axios";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Alphabet from "./Alphabet.tsx";

export interface Hangman {
  char: string;
  display: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void; // accepts both button and div
  id: string;
}

export default function WordRow({
  onWrongGuess,
  onCorrectGuess,
  gameOver,
  resetTrigger,
}: {
  onWrongGuess: () => void;
  onCorrectGuess: () => void;
  gameOver: boolean;
  resetTrigger?: number;
}) {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const hangmanProcess = (word: string): Hangman[] => {
    return Array.from(word, (c) => ({
      char: c,
      display: true,
      id: nanoid(),
    }));
  };

  const [word, setWord] = useState<Hangman[]>(hangmanProcess("loading."));
  const [alphabets, setAlphabets] = useState<Hangman[]>([]);
  const [error, setError] = useState<string | null>(null);
  const gameOverRef = useRef(gameOver);

  // Update ref when gameOver changes
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  const handleAlphalKeys = (e: React.MouseEvent<HTMLElement>) => {
    console.log("handleAlphalKeys called, gameOver:", gameOverRef.current);
    if (gameOverRef.current) {
      console.log("Game is over, returning early");
      return;
    }
    console.log(word);
    const value = (e.currentTarget as HTMLButtonElement).value.toUpperCase();

    let correctGuess = false;

    setWord((prev) => {
      const updatedWord = prev.map((key) => {
        if (key.char.toUpperCase() === value) {
          correctGuess = true;
          return { ...key, display: true };
        }
        return key;
      });

      // Check win condition immediately after updating
      const allRevealed = updatedWord.every((w) => w.display);
      if (allRevealed) {
        // If user won, don't call onWrongGuess
        setTimeout(() => onCorrectGuess(), 0);
        return updatedWord;
      }

      // Only call onWrongGuess if user didn't win
      if (!correctGuess) {
        setTimeout(() => onWrongGuess(), 0);
      }

      return updatedWord;
    });
  };

  // Update alphabets when gameOver changes
  useEffect(() => {
    console.log("Updating alphabets, gameOver:", gameOver);
    const newAlphabets = hangmanProcess(alphabet.join("")).map((word) => ({
      ...word,
      onClick: handleAlphalKeys,
    }));
    setAlphabets(newAlphabets);
  }, [gameOver]);

  const fetchNewWord = async () => {
    try {
      const res = await axios.get(
        "https://random-word-api.vercel.app/api?words=1&length=8&type=uppercase"
      );
      console.log(res.data);
      setWord(
        hangmanProcess(res.data[0]).map((char) => ({
          ...char,
          display: false,
        }))
      );
      console.log(word);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.statusText}`);
        } else {
          setError(err.message);
        }
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // Add useEffect to check win condition whenever word changes
  useEffect(() => {
    if (word.length > 0 && word[0].char !== "l" && !gameOver) {
      // Skip the initial "loading" state
      const allRevealed = word.every((w) => w.display);
      if (allRevealed) {
        onCorrectGuess();
      }
    }
  }, [word, gameOver, onCorrectGuess]);

  useEffect(() => {
    fetchNewWord();
  }, [resetTrigger]);

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="grid grid-cols-8 gap-0 p-4 w-3/4 mx-auto">
        {word.map((letter) => (
          <Cell
            key={letter.id}
            character={letter.char}
            display={letter.display}
            className={
              "h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl font-bold text-white"
            }
          />
        ))}
      </div>

      <section className={"w-full mx-auto "}>
        <Alphabet
          hangman={alphabets}
          onWrongGuess={onWrongGuess}
          gameOver={gameOver}
        />
      </section>
    </>
  );
}
