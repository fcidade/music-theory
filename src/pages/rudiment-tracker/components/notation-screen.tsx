import { useEffect, useState } from "react";
import Vex, { Annotation } from "vexflow";
/**
 * https://github.com/0xfe/vexflow/wiki/Tutorial
 */

export type Props = {
}

const dotted = (note: Vex.StaveNote) => {
    Vex.Dot.buildAndAttach([note]);
    return note;
}

export const NotationScreen = ({ }: Props) => {
    const staffId = 'staff-container';
    useEffect(() => {
        const { Renderer, Stave, StaveNote, Beam, Formatter } = Vex.Flow;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        const container = document.getElementById(staffId) as HTMLDivElement
        const renderer = new Renderer(container, Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(window.innerWidth, 100);
        const context = renderer.getContext();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new Stave(0, 0, window.innerWidth);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();

        const notes = [
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("R")),
            new StaveNote({ keys: ["C/5"], duration: "16" }).addModifier(new Annotation("L")),
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
        </div>
    )
};
