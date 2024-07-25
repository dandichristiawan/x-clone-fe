import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PropsData } from '../home-types'


type Props = {
    data: PropsData[] | undefined
}

export const ListPostComponent = ({ data }: Props) => {
    return (
        <>
            {data?.map((i) => (
                <div key={i._id} className="flex flex-col border border-gray-600 border-t-0 border-l-0 border-r-0 border-b-1 p-5 lg:p-2">
                    <div className="flex flex-row gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h1 className="mb-2">@{i.user.username}</h1>
                            <p>{i.content}</p>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}
