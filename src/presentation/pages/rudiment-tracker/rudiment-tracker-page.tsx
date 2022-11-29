import { useParams } from "react-router-dom"
import { useTracker } from "../../../usecases"
import { Metronome } from "../../components"
import { rudiments } from "../../content"
import { NotationScreen } from "./components/notation-screen"
import { TrackerCheckbox } from "./components/tracker-checkbox"

const progressOptions = Array.from({ length: 10 }).map((_, i) => (i * 10 + 60).toString())

export const RudimentTrackerPage = () => {
  const { id } = useParams()
  const { name, staveNotes } = rudiments.find(r => r.id === id)!

  const { items } = useTracker(`rudiment-tracker-${id}`, progressOptions)
  return (
    <div className="flex flex-col">
      <div className="pt-2 text-center font-bold text-indigo-600">
        {name}
      </div>
      <NotationScreen notes={staveNotes} />
      <div className="p-4 pt-0 flex flex-col space-y-4">
        <Metronome />
        <span className="text-md font-bold mb-4">Track your progress:</span>
        <div className="space-y-2">
          {items.map(({ name: bpm, checked, toggleCheck }) => (
            <TrackerCheckbox key={bpm} checked={checked} onCheck={toggleCheck} bpm={Number(bpm)} />
          ))}
        </div>
      </div>
    </div>
  )
}
