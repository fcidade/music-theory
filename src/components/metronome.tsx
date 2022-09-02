import { useEffect, useState } from "react"

type Props = {
    text: string
}

export const Button = ({ text }: Props) => (
    <button className="rounded py-1 px-3 bg-indigo-600 text-white text-md">{text}</button>
)

export const Metronome = () => {

    const [x, setX] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setX(prev => (prev + 1) % 4)
        }, 300)
        return () => {
            clearInterval(id)
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center space-y-8 py-8">
            <div className="flex space-x-4 items-end h-12">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div className={`h-${i === x ? '10' : '4'} w-4 bg-indigo-600 transition-height`}></div>
                ))}
            </div>
            <div className="text-6xl">
                120bpm
            </div>
            <div className="space-x-1">
                <Button text="-" />
                <Button text="Start" />
                <Button text="+" />
            </div>
        </div>
    )
}