import { ChangeEvent, useEffect, useState } from "react";

export const useMetronome = () => {
    const [playing, setPlaying] = useState(false);
    const [beat, setBeat] = useState(0);
    const [bpm, setBpm] = useState(100);
    const [beatsPerMeasure] = useState(4);

    const play = () => setPlaying(true);
    const stop = () => setPlaying(false);
    const togglePlaying = () => setPlaying(prev => !prev);

    const increaseBpm = () => setBpm(prev => prev + 1);
    const decreaseBpm = () => setBpm(prev => prev - 1);

    const onChangeBpmHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBpm(Math.max(1, Math.min(500, Number(e.target.value))));
    };

    useEffect(() => {
        if (!playing)
            return;

        setBeat(0);
        const minuteInMs = 60000;
        const intervalBetweenBeats = Math.floor(minuteInMs / bpm);
        const id = setInterval(() => {
            setBeat(prev => (prev + 1) % beatsPerMeasure);
        }, intervalBetweenBeats);
        return () => {
            clearInterval(id);
        };
    }, [playing, bpm, beatsPerMeasure]);

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
        // Event handlers
        onChangeBpmHandler,
    };
};
