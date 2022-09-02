import { useState } from "react"
import { Metronome } from "../../components"
import { NotationScreen } from "./components/notation-screen"
import { TrackerCheckbox } from "./components/tracker-checkbox"

const progressOptions = Array.from({ length: 10 }).map((_, i) => ({ bpm: i * 10 + 60 }))
const defaultProgressOptionsMap: Record<number, boolean> =
  progressOptions.reduce((prev, { bpm }) => ({ ...prev, [bpm]: false }), {})

export const RudimentTrackerPage = () => {
  const [checkboxes, setCheckboxes] = useState(defaultProgressOptionsMap)

  const onCheck = (bpm: number) => () => {
    setCheckboxes(prev => ({ ...prev, [bpm]: !prev[bpm] }))
  }

  const checkboxArray: Array<[number, boolean]> =
    Object.entries(checkboxes).map(([bpm, checked]) => [Number(bpm), checked])

  return (
    <div className="flex flex-col">
      <div className="pt-2 text-center font-bold text-indigo-600">
        Single Stroke
      </div>
      <NotationScreen />
      <div className="p-4 pt-0 flex flex-col space-y-4">
        <Metronome />
        <span className="text-md font-bold mb-4">Track your progress:</span>
        <div className="space-y-2">
          {checkboxArray.map(([bpm, checked]) => (
            <TrackerCheckbox key={bpm} checked={checked} onCheck={onCheck(bpm)} bpm={bpm} />
          ))}
        </div>
      </div>
    </div>
  )
}
