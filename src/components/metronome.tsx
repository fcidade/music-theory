import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "."

export const useMetronome = () => {
    const [playing, setPlaying] = useState(false)
    const [beat, setBeat] = useState(0)
    const [bpm, setBpm] = useState(100)
    const [beatsPerMeasure] = useState(4)

    const play = () => setPlaying(true)
    const stop = () => setPlaying(false)
    const togglePlaying = () => setPlaying(prev => !prev)

    const increaseBpm = () => setBpm(prev => prev + 1)
    const decreaseBpm = () => setBpm(prev => prev - 1)

    useEffect(() => {
        if (!playing) return

        setBeat(0)
        const minuteInMs = 60000
        const intervalBetweenBeats = Math.floor(minuteInMs / bpm)
        const id = setInterval(() => {
            setBeat(prev => (prev + 1) % beatsPerMeasure)
        }, intervalBetweenBeats)
        return () => {
            clearInterval(id)
        }
    }, [playing, bpm, beatsPerMeasure])

    return {
        playing,
        beat,
        bpm,
        beatsPerMeasure,
        setBpm,
        increaseBpm,
        decreaseBpm,
        play,
        stop,
        togglePlaying,
    }
}

export const MetronomePulse = ({ pulsing }: { pulsing: boolean }) => (
    <div className={`h-${pulsing ? '10' : '4'} w-4 bg-indigo-600 transition-height`}></div>
)

export const Metronome = () => {

    const {
        playing,
        bpm,
        beat,
        beatsPerMeasure,
        setBpm,
        togglePlaying,
        increaseBpm,
        decreaseBpm,
    } = useMetronome()

    const changeBpm = (e: ChangeEvent<HTMLInputElement>) => {
        setBpm(Math.max(1, Math.min(500, Number(e.target.value))))
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-8 py-8">
            <div className="flex space-x-4 items-end h-12">
                {Array.from({ length: beatsPerMeasure }).map((_, i) => (
                    <MetronomePulse key={'pulse-' + i} pulsing={i === beat} />
                ))}
            </div>
            <div>
                <input
                    onChange={changeBpm}
                    type="number"
                    className="text-center text-6xl outline-0 w-28"
                    value={bpm} />
                <span className="text-center text-3xl text-indigo-600">bpm</span>
            </div>
            <div className="space-x-1">
                <Button text="-" onClick={decreaseBpm} />
                <Button text={playing ? "Stop" : "Start"} onClick={togglePlaying} />
                <Button text="+" onClick={increaseBpm} />
            </div>
        </div >
    )
}