import Cell from "./Cell.tsx";
import {nanoid} from "nanoid";
import axios from 'axios'
import {useEffect, useState} from "react";


export default function WordRow() {
    const [word, setWord] = useState("loading.");
    const [error, setError] = useState<string | null>(null);
    const [display, setDisplay] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://random-word-api.vercel.app/api?words=1&length=8&type=uppercase')
                setWord(res.data[0])
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
            } finally {
                setDisplay(false);
            }
        }

        fetchData()
    }, [display])

    if (error) {
        console.error(error)
    }
    return (
        <div className="grid grid-cols-8 gap-0 p-4">
            {Array.from(word, (v) => (
                <Cell
                    key={nanoid()}
                    character={v}
                    display={display}
                    className={"h-12 aspect-square rounded-sm border border-amber-50 justify-center flex text-4xl font-bold text-white"}
                />
            ))}
        </div>
    );
}