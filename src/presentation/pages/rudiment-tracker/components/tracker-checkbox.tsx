import { ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";

export type Props = {
    bpm: number;
    checked: boolean;
    onCheck: () => void;
}

export const TrackerCheckbox = ({ bpm, checked, onCheck }: Props) => (
    <div
        onClick={onCheck}
        className={`${checked ? "border-indigo-600 border-2" : "border border-slate-300"} rounded`}>
        <div className="flex justify-between items-center space-x-2 py-2 px-4">
            <span className={checked ? "text-indigo-600 font-bold" : ""}>{bpm} bpm</span>
            {checked
                ? <SparklesIcon className="w-4 text-indigo-600" />
                : <ClockIcon className="w-4 text-slate-400" />}
        </div>
    </div>
);
