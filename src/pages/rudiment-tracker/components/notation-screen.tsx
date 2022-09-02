import { useEffect, useState } from "react";
import Vex from "vexflow";

export type Props = {
}

const dotted = (note: Vex.StaveNote) => {
    Vex.Dot.buildAndAttach([note]);
    return note;
}

export const NotationScreen = ({ }: Props) => {
    const staffId = 'staff-container';
    useEffect(() => {
        const { Renderer, Stave, Accidental, StaveNote, Beam, Formatter } = Vex.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        const container = document.getElementById(staffId) as HTMLDivElement
        const renderer = new Renderer(container, Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(500, 500);
        const context = renderer.getContext();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new Stave(10, 40, 400);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();

        const notes = [
            dotted(new StaveNote({ keys: ["e##/5"], duration: "8d" }).addModifier(new Accidental("##"))),
            new StaveNote({ keys: ["b/4"], duration: "16" }).addModifier(new Accidental("b")),
            new StaveNote({ keys: ["c/4"], duration: "8" }),
            new StaveNote({ keys: ["d/4"], duration: "16" }),
            new StaveNote({ keys: ["e/4"], duration: "16" }).addModifier(new Accidental("b")),
            new StaveNote({ keys: ["d/4"], duration: "16" }),
            new StaveNote({ keys: ["e/4"], duration: "16" }).addModifier(new Accidental("#")),
            new StaveNote({ keys: ["g/4"], duration: "32" }),
            new StaveNote({ keys: ["a/4"], duration: "32" }),
            new StaveNote({ keys: ["g/4"], duration: "16" }),
            new StaveNote({ keys: ["d/4"], duration: "q" }),
        ];

        const beams = Beam.generateBeams(notes);
        Formatter.FormatAndDraw(context, stave, notes);
        beams.forEach((b) => {
            b.setContext(context).draw();
        });

        // A helper function to add a dot to a note.

        return () => {
            const staff = document.getElementById(staffId) as HTMLDivElement
            staff.innerHTML = ""
        }
    }, [])
    return (
        <div>
            <div id={staffId} />
            <button>play</button>
        </div>
    )
};
