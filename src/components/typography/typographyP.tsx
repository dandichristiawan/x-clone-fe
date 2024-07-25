type Props = {
    text: string
}

export const TypographyP = ({ text }: Props) => {
    return (
        <p className="text-white leading-7 [&:not(:first-child)]:mt-6">
            {text}
        </p>
    )
}
