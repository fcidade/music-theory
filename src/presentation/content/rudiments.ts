import { Annotation, StaveNote } from "vexflow";

const repeat = (arr: (() => StaveNote)[], repeats: number) =>
    [].concat(...Array.from({ length: repeats }, () => arr.map(a => a()) as never[]));

const right16th = () => new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R"));
const left16th = () => new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L"));
export const rudiments = [
    {
        id: "single_stroke",
        name: "Single Stroke",
        handOrder: "R L R L R L R L R L R L R L R L",
        bpmRecord: 0,
        staveNotes: repeat([right16th, left16th], 8),
    },
    {
        id: "single_stroke_l",
        name: "Single Stroke (L)",
        handOrder: "L R L R L R L R L R L R L R L R",
        bpmRecord: 0,
        staveNotes: repeat([left16th, right16th], 8),
    },
    {
        id: "double_stroke",
        name: "Double Stroke",
        handOrder: "R R L L R R L L R R L L R R L L",
        bpmRecord: 0,
        staveNotes: repeat([right16th, right16th, left16th, left16th], 4),
    },
    {
        id: "double_stroke_l",
        name: "Double Stroke (L)",
        handOrder: "L L R R L L R R L L R R L L R R",
        bpmRecord: 0,
        staveNotes: repeat([left16th, left16th, right16th, right16th], 4),
    },
    {
        id: "paradiddle",
        name: "Paradiddle",
        handOrder: "R L R R L R L L R L R R L R L L",
        bpmRecord: 0,
        staveNotes: repeat([right16th, left16th, right16th, right16th, left16th, right16th, left16th, left16th], 2),
    },
    {
        id: "paradiddle_l",
        name: "Paradiddle (L)",
        handOrder: "L R L L R L R R L R L L R L R R",
        bpmRecord: 0,
        staveNotes: repeat([left16th, right16th, left16th, left16th, right16th, left16th, right16th, right16th], 2),
    },
]