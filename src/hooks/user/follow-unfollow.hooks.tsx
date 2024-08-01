import Cookies from 'js-cookie'
import React from 'react'

export const useFollowHook = () => {

    async function followUser(userIdToFollow: string) {
        try {
            const res = await fetch('http://192.168.1.153:3000/api/followUser', {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                method: 'POST',
                body: JSON.stringify({ userIdToFollow })
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function unfollowUser(userIdToUnfollow: string) {
        try {
            const res = await fetch('http://192.168.1.153:3000/api/unfollowUser', {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                method: 'POST',
                body: JSON.stringify({ userIdToUnfollow })
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return { followUser, unfollowUser }
}


export const useCheckFollowStatus = (userIdToCheck: string) => {

    const [status, setStatus] = React.useState<boolean>(false)

    async function isFollowing() {
        try {
            const req = await fetch(`http://192.168.1.153:3000/api/check-follow-status?userIdToCheck=${userIdToCheck}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })

            if (!req.ok) {
                throw new Error('Something went wrong')
            }

            const res = await req.json()
            setStatus(res.isFollowing)

        } catch (error) {
            console.error(error)
        }
    }

    const refetchStatus = () => {
        isFollowing()
    }


    React.useEffect(() => {
        if (userIdToCheck) {
            isFollowing()
        }
    }, [userIdToCheck])

    return { status, refetchStatus }
}
