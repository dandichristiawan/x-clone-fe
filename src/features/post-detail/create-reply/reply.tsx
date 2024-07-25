import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  val: string;
  loading: boolean;
  onCreateReply: () => void;
  onChangeVal: (val: string) => void;
};

// export const CreateReplyComponent = ({val, loading, onChangeVal, onCreateReply}:Props) => {
//   return (

//   )
  
// }