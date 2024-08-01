type Props = {
    text: string
}

export const TypographyH1 = ({ text }: Props) => {
    return (
        <>
            <h1 className="scroll-m-20 text-2xl md:text-4xl font-bold tracking-tight text-white lg:text-5xl" >
                {text}
            </h1>
        </>
    )
}