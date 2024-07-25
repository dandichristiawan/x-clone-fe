import React from 'react'
import Cookies from 'js-cookie';
import { PropsData } from '@/features/home/home-types';
import { ListPostComponent } from '@/features/home/list-post/list';
import { CreatePostComponent } from '@/features/home/create-post/post';
import { SkeletonPosts } from './list-post/skeleton';

export const Home = () => {

    const isTokenExist = Cookies.get('token');

    const [data, setData] = React.useState<PropsData[]>();
    const [loadingData, setLoadingData] = React.useState<boolean>(false);

    const [createPost, setCreatePost] = React.useState<string>('');
    const [loadingPost, setLoadingPost] = React.useState<boolean>(false);

    async function get() {
        setLoadingData(true)
        try {
            const res = await fetch('http://192.168.1.153:3000/api/getPosts', {
                mode: 'cors',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await res.json();
            setData(data);
            setTimeout(() => {
                setLoadingData(false);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    async function tweet(content: string) {
        setLoadingPost(true);
        try {
            const res = await fetch('http://192.168.1.153:3000/api/createPost', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
                method: 'POST',
                body: JSON.stringify({ content }),
            });
            if (!res.ok) {
                throw new Error('Something went wrong!');
            }
            setLoadingPost(false);
        } catch (error) {
            console.error(error);
        }
    }



    React.useEffect(() => {
        get();
    }, []);

    const onCreatePost = async () => {
        await tweet(createPost);
        setCreatePost('');
        await get();
    };

    return (
        <main className="flex-1 md:max-w-lg lg:max-w-2xl 2xl:max-w-7xl bg-black text-white border border-gray-600 border-t-0 border-b-0 border-r-1 border-l-1 justify-center items-center overflow-y-auto min-h-screen">
            {/* <nav className="bg-blue-600">asd</nav> */}
            {isTokenExist ? (
                <>
                    <CreatePostComponent
                        val={createPost}
                        loading={loadingPost}
                        onChangeVal={setCreatePost}
                        onCreatePost={onCreatePost}
                    />
                </>
            ) : null}
            {loadingData ? (
                <SkeletonPosts data={data} />
            ) : (
                <ListPostComponent data={data} />
            )}
        </main>
    )
}
