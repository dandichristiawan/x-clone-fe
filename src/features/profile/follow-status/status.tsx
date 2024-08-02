import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { useCheckFollowStatus, useFollowHook } from '@/hooks/user/follow-unfollow.hooks'


type Props = {
    userId: string
    refetchProfile: () => void
}

export const FollowStatusComponent = ({ userId, refetchProfile }: Props) => {

    const curr = Cookies.get('userId')

    const { followUser, unfollowUser } = useFollowHook()

    const { status, refetchStatus } = useCheckFollowStatus(userId)

    const handleUnfollow = async () => {
        await unfollowUser(userId)
        refetchStatus()
        refetchProfile()
    }

    const handleFollow = async () => {
        await followUser(userId)
        refetchStatus()
        refetchProfile()
    }

    return (
        <>

            {curr !== userId ? (
                <>
                    {status ?
                        <>
                            <Button
                                onClick={handleUnfollow}
                                className='bg-white w-3/4 text-black font-bold hover:bg-gray-400 rounded-full absolute xl:left-96 bottom-3'
                            >
                                Unfollow
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                onClick={handleFollow}
                                className='bg-white w-3/4 text-black font-bold hover:bg-gray-400 rounded-full absolute xl:left-96 bottom-3'
                            >
                                Follow
                            </Button>
                        </>
                    }

                </>
            ) : (
                null
            )}
        </>

    )
}
