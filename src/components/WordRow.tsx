import Cell from "./Cell.tsx";
import {nanoid} from "nanoid";
import axios from 'axios'
import {useEffect, useState} from "react";
import Alphabet from "./Alphabet.tsx";
import * as React from "react";

export interface Hangman {
    char: string;
    display: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void; // accepts both button and div
    id: string;
}

export default function WordRow() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i)
    );
    const hangmanProcess = (word: string): Hangman[] => {
        return Array.from(word, (c) => (
            {
                char: c,
                display: true,
                id: nanoid(),
            }
        ));
    }
    // const handleAlphalKeys = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     setWord( preve => preve.map( (key) =>(
    //             key.char === value ?
    //                 {
    //                     ...key,
    //                     display: true,
    //                 } :
    //                 key
    //         )
    //     ))
    // }
    const handleAlphalKeys = (e: React.MouseEvent<HTMLElement>) => {
        const value = (e.currentTarget as HTMLButtonElement).value
        setWord(prev =>
            prev.map(key =>
                key.char.toUpperCase() === value.toUpperCase() ? { ...key, display: true } : key
            )
        )
        console.log(word)
    }
    const [word, setWord] = useState<Hangman[]>(hangmanProcess("loading."));
    const alphabets: Hangman[] = hangmanProcess(alphabet.join('')).map((word) => ({
        ...word,
        onClick: handleAlphalKeys
    }));
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://random-word-api.vercel.app/api?words=1&length=8&type=uppercase')
                setWord(hangmanProcess(res.data[0]).map((char) =>
                    (
                        {
                            ...char,
                            display: false   ,
                        }
                    )
                ))
                console.log(word)
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setError(`Error ${err.response.status}: ${err.response.statusText}`)
                    } else {
                        setError(err.message)
                    }
                } else {
                    setError('An unknown error occurred')
                }
            }
        }

        fetchData()
    }, [])

    if (error) {
        console.error(error)
    }



    return (
        <>
            <div className="grid grid-cols-8 gap-0 p-4 w-3/4 mx-auto">
                {
                    word.map((letter) => (
                        <Cell
                            key={letter.id}
                            character={letter.char}
                            display={letter.display}
                            className={"h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl font-bold text-white"}
                        />
                    ))
                }
            </div>

            <section className={"w-full mx-auto "}>

                <Alphabet  hangman={alphabets} />

            </section>

        </>

    );
}