import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  val: string;
  progress: number;
  loading: boolean;
  onCreateReply: () => void;
  onChangeVal: (val: string) => void;
};

export const CreateReplyComponent = ({
  val,
  progress,
  loading,
  onChangeVal,
  onCreateReply,
}: Props) => {
  return (
    <>
      {loading && (
        <progress className="custom-progress" value={progress} max={100} />
      )}
      <div className="border border-gray-600 border-r-1 border-t-0 border-l-1 flex flex-row p-2 gap-2 w-2/5">
        <div className="flex flex-col w-full p-4">
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea
              value={val}
              placeholder="Post your reply"
              className="border-none bg-black"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChangeVal(e.target.value)
              }
            ></Textarea>
          </div>
          <div className="mt-2 mb-4 flex justify-end">
            <>
              <Button
                disabled={val.length === 0}
                onClick={onCreateReply}
                className="bg-[#1a8cd8] rounded-full hover:bg-white hover:text-black"
              >
                Reply
              </Button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
