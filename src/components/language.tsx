interface Lan {
    onClick?: () => void;
    className?: string;
    content: string;
    fontColor?: string;
}


export default function Language (Lan: Lan) {


    return (
        <>
            <button className={`${Lan.className} rounded-sm p-1`} style={{"color": Lan.fontColor}}>
                {Lan.content}
            </button>
        </>
    )
}