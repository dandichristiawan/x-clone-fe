import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    label: string
    typeProps: string
    valueProps: string
    nameProps: string
    placeholderProps: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputWithLabel = ({ label, typeProps, valueProps, nameProps, placeholderProps, onChange }: Props) => {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="email">{label}</Label>
            <Input
            className="rounded-xl"
                type={typeProps}
                value={valueProps}
                name={nameProps}
                onChange={onChange}
                placeholder={placeholderProps}
            />
        </div>
    )
}
