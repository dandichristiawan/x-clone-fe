import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import '@/index.css';

type Props = {
  val: string;
  progress: number;
  loading: boolean;
  onCreatePost: () => void;
  onChangeVal: (val: string) => void;
};

export const CreatePostComponent = ({
  val,
  progress,
  loading,
  onChangeVal,
  onCreatePost,
}: Props) => {
  return (
    <>
      {loading && (
        <progress className="custom-progress" value={progress} max={100} />
      )}
      <div className="border border-gray-600 border-r-1 border-t-0 border-l-1 flex flex-row p-2 gap-2 w-2/5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <Textarea
            value={val}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChangeVal(e.target.value)
            }
            className="border-none bg-black text-2xl text-white font-medium"
            placeholder="What is happening?!"
          />
          <Separator className="my-4 border border-gray-600" />
          <div className="mb-2 flex justify-end">
            <>
              <Button
                disabled={val.length === 0 || loading}
                onClick={onCreatePost}
                className="bg-[#1a8cd8] rounded-full hover:bg-white hover:text-black"
              >
                Post
              </Button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
