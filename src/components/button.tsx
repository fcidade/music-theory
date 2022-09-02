type Props = {
    text: string;
    onClick: () => void
};

export const Button = ({ text, onClick }: Props) => (
    <button onClick={onClick} className="rounded py-1 px-3 bg-indigo-600 text-white text-md">{text}</button>
);
