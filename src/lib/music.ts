import { anyOf } from "./random";

export const intervalDictionary: Record<number, string> = {
  1: "Segunda menor",
  2: "Segunda maior",
  3: "Terça menor",
  4: "Terça maior",
  5: "Quarta justa",
  6: "Quinta diminuta",
  7: "Quinta justa",
  8: "Quinta aumentada",
  9: "Sexta",
  10: "Sétima menor",
  11: "Sétima maior",
};

export type Note =
  | "A"
  | "A#/Bb"
  | "B"
  | "C"
  | "C#/Db"
  | "D"
  | "D#/Eb"
  | "E"
  | "F"
  | "F#/Gb"
  | "G"
  | "G#/Ab";

export const notes: Note[] = [
  "A",
  "A#/Bb",
  "B",
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
];

export type AccidentDisplay = "flat_only" | "sharp_only" | "both" | "random";

export const formatNote = (
  note: Note,
  options: { accidentDisplay: AccidentDisplay },
) => {
  const [sharp, flat] = note.split("/");
  switch (options.accidentDisplay) {
    case "both":
      return note;
    case "flat_only":
      return flat;
    case "sharp_only":
      return sharp;
    case "random":
      return anyOf([flat, sharp]);
  }
};
