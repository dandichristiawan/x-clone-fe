import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Props = {
    val: string
    onChangeVal: (val: string) => void
    onCreatePost: () => void
}

export const CreatePostComponent = ({ val, onChangeVal, onCreatePost }: Props) => {
    return (
        <div className="border border-gray-600 border-r-0 border-l-0 flex flex-row p-2 gap-2 w-full">
            <div className="rounded-full bg-gray-500 p-2 w-10 h-10"></div>
            <div className="flex flex-col w-full">
                <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        onChangeVal(e.target.value)
                    }
                    className="border-none bg-black"
                    placeholder="What is happening?!"
                />
                <Separator className="my-4 border border-gray-600" />
                <div className="mb-2 flex justify-end">
                    <Button
                        onClick={onCreatePost}
                        className="bg-[#1a8cd8] rounded-full"
                    >
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
