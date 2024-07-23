import React from 'react';
import { MainLayout } from '@/layout/main-layout';

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
        <main className="flex-1 mx-64 overflow-auto min-h-screen">
          {data?.map((i) => (
            <div className="flex flex-col border border-l-0 border-r-0 border-b-0 border-red-600">
              <div className="flex flex-row">
                <div className="rounded-full bg-gray-500 p-2 w-10">a</div>
                <div className="flex flex-col">
                  <h1 className="my-2">{i.user.username}</h1>
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
