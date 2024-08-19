

type ButtonProps = {
    onClick: () => void;
    text: string;
    styling?: string;
    disabled?: boolean
}

export const Button = ({onClick, text, styling, disabled} : ButtonProps) => {
    return (
        <button type="button" className={styling} onClick={onClick} disabled={disabled}> {text} </button>
    )
}   