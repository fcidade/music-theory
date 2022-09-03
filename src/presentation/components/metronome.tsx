import { useEffect } from "react"
import * as Tone from "tone"
import { Button } from "."
import { useMetronome } from "../../usecases"

export const MetronomePulse = ({ pulsing }: { pulsing: boolean }) => (
    <div className={`h-${pulsing ? '12' : '4'} w-4 bg-indigo-600 transition-height`}></div>
)

export const Metronome = () => {

    const {
        playing,
        bpm,
        beat,
        beatsPerMeasure,
        onChangeBpmHandler,
        togglePlaying,
        increaseBpm,
        decreaseBpm,
    } = useMetronome()

    useEffect(() => {
        const synth = new Tone.Synth().toDestination();
        if (beat === 0) {
            synth.volume.value = -3
            synth.triggerAttackRelease("C5", "8n");
        } else {
            synth.volume.value = -4
            synth.triggerAttackRelease("D5", "8n");
        }
    }, [beat])

    return (
        <div className="flex flex-col justify-center items-center space-y-8 py-8">
            <div className="flex space-x-4 items-end h-12">
                {Array.from({ length: beatsPerMeasure }).map((_, i) => (
                    <MetronomePulse key={'pulse-' + i} pulsing={i === beat} />
                ))}
            </div>
            <div>
                <input
                    onChange={onChangeBpmHandler}
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