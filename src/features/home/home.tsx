import React from 'react'
import Cookies from 'js-cookie';
import { CreatePostApi } from '@/api';
import { CreatePostComponent } from './create-post/post';
import { PropsData } from '@/features/home/home-types';
import { ListPostComponent } from './list-post/list';

export const Home = () => {

    const isTokenExist = Cookies.get('token');
    const [data, setData] = React.useState<PropsData[]>();
    const [createPost, setCreatePost] = React.useState<string>('');

    async function get() {
        try {
            const res = await fetch('http://192.168.103.56:3000/api/getPosts', {
                mode: 'cors',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        get();
    }, []);

    const onCreatePost = async () => {
        await CreatePostApi(createPost);
        await get();
    };

    return (
        <main className="flex-1 md:max-w-lg lg:max-w-2xl xl:max-w-2xl 2xl:max-w-7xl bg-black text-white border border-gray-600 border-t-0 border-b-0 border-r-1 border-l-1 p- justify-center items-center overflow-y-auto min-h-screen">
            {/* <nav className="bg-blue-600">asd</nav> */}
            {isTokenExist ? (
                <>
                    <CreatePostComponent
                        val={createPost}
                        onChangeVal={setCreatePost}
                        onCreatePost={onCreatePost}
                    />
                </>
            ) : null}
            <ListPostComponent data={data} />
        </main>
    )
}
