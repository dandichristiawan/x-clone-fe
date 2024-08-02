import Cookies from 'js-cookie'

export const useLikeUnlikeHooks = () => {

    const likeUnlikePost = async (postId: string) => {
        try {
            const res = await fetch(`http://192.168.103.56:3000/api/post/like-events`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({ postId })
            })
            if (!res.ok) {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }



    return { likeUnlikePost }
}

