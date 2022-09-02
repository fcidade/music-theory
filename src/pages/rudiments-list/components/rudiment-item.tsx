import { SparklesIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

type Props = {
  name: string;
  handOrder: string;
  bpmRecord: number;
};

export const RudimentItem = ({ name, handOrder, bpmRecord, }: Props) => (
  <div
    className="drop-shadow-lg border border-slate-100 border-b-slate-200 rounded p-3 bg-white flex justify-between transition hover:-translate-y-1">
    <div className='space-y-2'>
      <div className="font-bold text-sm">
        {name}
      </div>
      <div className="text-gray-400">
        {handOrder}
      </div>
    </div>
    <aside className="text-purple-600 flex flex-col items-end justify-between">
      <div className='flex content-center text-right items-center space-x-1'>
        <SparklesIcon className="w-4 h-4" />
        <div>{bpmRecord} bpm</div>
      </div>
      <div>
        <SpeakerWaveIcon className="w-6 h-6" />
      </div>
    </aside>
  </div>
);
