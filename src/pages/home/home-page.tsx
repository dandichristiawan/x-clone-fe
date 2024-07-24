import React from 'react';
import { MainLayout } from '@/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface PropsData {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

export const HomePage = () => {
  const [data, setData] = React.useState<PropsData[]>();

  React.useEffect(() => {
    async function get() {
      try {
        const res = await fetch('http://192.168.1.153:3000/api/getPosts', {
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
    get();
  }, []);

  return (
    <>
      <MainLayout>
        <main className="flex-1 max-w-7xl bg-black text-white border border-gray-600 border-t-0 border-b-0 border-r-1 border-l-1 p- justify-center items-center overflow-y-auto min-h-screen">
          {/* <nav className="bg-blue-600">asd</nav> */}
          <div className="border border-gray-600 border-r-0 border-l-0 flex flex-row p-2 gap-2 w-full">
            <div className="rounded-full bg-gray-500 p-2 w-10 h-10"></div>
            <div className="flex flex-col w-full">
              <Textarea
                className="border-none bg-black"
                placeholder="What is happening?!"
              />
              <Separator className='my-4 border border-gray-600'/>
              <div className="mb-2 flex justify-end">
                <Button className='bg-[#1a8cd8] rounded-full'>Post</Button>
              </div>
            </div>
          </div>
          {data?.map((i) => (
            <div className="flex flex-col border border-gray-600 border-t-0 border-l-0 border-r-0 border-b-1 p-2">
              <div className="flex flex-row gap-2">
                <div className="rounded-full bg-gray-500 p-2 w-10 h-10"></div>
                <div className="flex flex-col">
                  <h1 className="mb-2">@{i.user.username}</h1>
                  <p>{i.content}</p>
                </div>
              </div>
            </div>
          ))}
        </main>
      </MainLayout>
    </>
  );
};
