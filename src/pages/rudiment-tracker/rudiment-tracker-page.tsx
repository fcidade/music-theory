import { useState } from "react"
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
    <div className="p-4 flex flex-col space-y-4">
      <div>
        scoresheet
        <button>play</button>
      </div>
      <div className="flex flex-col">
        <span className="text-md font-bold mb-4">Track your progress:</span>
        <div className="space-y-2">
          {checkboxArray.map(([bpm, checked]) => (
            <TrackerCheckbox key={bpm} checked={checked} onCheck={onCheck(bpm)} bpm={bpm} />
          ))}
        </div>
      </div>
      <div>
        metronome
      </div>
    </div>
  )
}
