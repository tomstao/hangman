interface LanguageProps {
    content: string;
    fontColor: string;
    className: string;
    id: string;
    disable?: boolean;
    onClick?: (id: string) => void;
}


export default function Language({ content, fontColor, className, id, onClick }: LanguageProps) {
    return (
        <button
            className={`px-3 py-1 rounded-sm text-sm font-semibold ${className}`}
            style={{ color: fontColor }}
            onClick={() => onClick?.(id)}
        >
            {content}
        </button>
    );
}