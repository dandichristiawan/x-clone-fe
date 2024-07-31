import { formatDateList } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import share from '@/assets/share.svg';
import chatBubble from '@/assets/chatbubble.svg';
import { useGetProfilePost } from '@/hooks/user/profile.hooks';
import { SpinnerMd } from '@/components/Spinner/md';

type Props = {
    fullName: string | undefined;
    username: string | undefined;
};

export const ProfilePosts = ({ username, fullName }: Props) => {

    const { data, isLoading } = useGetProfilePost(username);

    if (isLoading) return <SpinnerMd />;

    if (data)
        return (
            <>
                <div className="w-2/5 flex flex-col">
                    {data.map((val) => (
                        <div className=" border border-t-0 border-[#333639] p-4">
                            <div className="flex flex-row w-full gap-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-rw gap-2">
                                        <h1 className="font-semibold">{fullName}</h1>
                                        <Link to={`/user/${username}`}>
                                            <p className="text-gray-500 hover:underline">
                                                @{username}
                                            </p>
                                        </Link>
                                        <p className="text-gray-500">&middot;</p>
                                        <p className="text-gray-500">
                                            {formatDateList(val.createdAt)}
                                        </p>
                                    </div>
                                    <Link to={`/post/${val._id}`}>
                                        <p>{val.content}</p>
                                    </Link>
                                    <div className="flex flex-row justify-between mt-5 w-full">
                                        <div className="flex flex-row  items-center gap-2 w-full">
                                            <img
                                                src={chatBubble}
                                                alt="chat bubble"
                                                width={18}
                                                height={18}
                                            />
                                            {val.replies.length > 0 ? (
                                                <p className="text-gray-600 text-sm">
                                                    {val.replies.length}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-row items-center gap-2 w-full">
                                            <img
                                                src={repost}
                                                alt="chat bubble"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="flex flex-row  items-center gap-2 w-full">
                                            <img
                                                src={love}
                                                alt="chat bubble"
                                                width={18}
                                                height={18}
                                            />
                                            {val.likes > 0 ? (
                                                <p className="text-gray-600">{val.likes}</p>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-row  items-center gap-2 w-full">
                                            <img
                                                src={chart}
                                                alt="chat bubble"
                                                width={18}
                                                height={18}
                                            />
                                        </div>
                                        <div className="flex flex-row  items-center gap-2 w-full">
                                            <img
                                                src={bookmark}
                                                alt="chat bubble"
                                                width={18}
                                                height={18}
                                            />
                                            <img src={share} alt="share" width={18} height={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
};
