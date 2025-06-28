interface Lan {
    onClick?: () => void;
    className?: string;
    content: string;
    fontColor?: string;
}


export default function Language (Lan: Lan) {


    return (
        <>
            <button className={`${Lan.className} rounded-sm px-1 hover:scale-110 duration-200`} style={{"color": Lan.fontColor}}>
                {Lan.content}
            </button>
        </>
    )
}