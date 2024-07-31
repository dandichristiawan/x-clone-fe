import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCreatePost } from '@/hooks/home.hooks';
import { Button } from '../ui/button';
import '@/index.css';
type Props = {
  refetch?: () => void | undefined;
};

export const PostModal = ({ refetch }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { createPost, setCreatePost, Tweet, loadingPost, progress } =
    useCreatePost();

  const handlePost = async () => {
    await Tweet(createPost);
    setCreatePost('');
    if (refetch) {
      refetch();
    }
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-5/6 bg-[#1d9bf0] font-bold rounded-3xl mt-2 text-white p-2">
        Post
      </DialogTrigger>
      <DialogContent className="bg-[#000000] border-none">
        {loadingPost && (
          <progress
            className="custom-progress-modal"
            value={progress}
            max={100}
          />
        )}
        <div className="flex flex-row gap-2 mt-5 p-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Textarea
            value={createPost}
            placeholder="What is happening?!"
            className="border-none bg-black text-2xl text-white font-medium"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCreatePost(e.target.value)
            }
          ></Textarea>
        </div>
        <DialogFooter>
          <Button
            disabled={createPost.length < 1 || loadingPost}
            onClick={handlePost}
            className="rounded-full bg-[#1d9bf0] font-bold text-white"
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
