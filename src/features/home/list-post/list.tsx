import { PropsData } from '../home-types'
import love from "@/assets/love.svg"
import chart from "@/assets/chart.svg"
import repost from "@/assets/repost.svg"
import bookmark from "@/assets/bookmark.svg"
import share from "@/assets/share.svg"
import chatBubble from "@/assets/chatbubble.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'

type Props = {
    data: PropsData[] | undefined
}

export const ListPostComponent = ({ data }: Props) => {
    return (
        <>
            {data?.map((i) => (
                <Link to={`/post/${i._id}`}>
                    <div key={i._id} className="flex flex-col border border-gray-600 border-t-0 border-l-0 border-r-0 border-b-1 p-5 lg:p-2">
                        <div className="flex flex-row gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col w-full">
                                <h1 className="mb-2">@{i.user.username}</h1>
                                <p>{i.content}</p>
                                <div className="flex flex-row justify-between mt-5">
                                    <div className="flex flex-row  items-center gap-2">
                                        <img src={chatBubble} alt="chat bubble" width={18} height={18} />
                                        {i.replies.length > 0 ? <p className='text-gray-600 text-sm'>{i.replies.length}</p> : null}
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <img src={repost} alt="chat bubble" width={20} height={20} />
                                    </div>
                                    <div className="flex flex-row  items-center gap-2">
                                        <img src={love} alt="chat bubble" width={18} height={18} />
                                        {i.likes > 0 ? <p className='text-gray-600'>{i.likes}</p> : null}
                                    </div>
                                    <div className="flex flex-row  items-center gap-2">
                                        <img src={chart} alt="chat bubble" width={18} height={18} />
                                    </div>
                                    <div className="flex flex-row  items-center gap-2">
                                        <img src={bookmark} alt="chat bubble" width={18} height={18} />
                                        <img src={share} alt="share" width={18} height={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

        </>
    )
}
