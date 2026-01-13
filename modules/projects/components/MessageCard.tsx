import React from 'react';
import { MessageRole, MessageType, Shard } from '@prisma/client'; 
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { format } from 'date-fns'
import ShardCard from './ShardCard';

type AssistantMessageProps = {
  content: string;
  shard: Shard | null;
  createdAt: Date | string; 
  isActiveShard: boolean;
  onShardClick: (shard: Shard) => void;
  type: MessageType;
}

type MessageCardProps = {
  content: string;
  role: MessageRole;           
  type: MessageType;           
  createdAt: Date | string;             
  shard: Shard | null;      
  isActiveShard: boolean;   
  onShardClick: (shard: Shard) => void; 
};

const UserMessage = ({ content } : {content : string }) => {
    return(
        <div className='flex justify-end pb-4 pr-2 pl-10'>
            <Card className={"rounded-lg bg-muted p-2 shadow-none border-none max-w-[80%] wrap-break-words"}>
                {content}
            </Card>
        </div>
    )
}

const AssistantMessage = ({
    content,
    shard,
    createdAt,
    isActiveShard,
    onShardClick,
    type,
}: AssistantMessageProps ) => {
    return (    <div
    className={cn(
        "flex flex-col group px-2 pb-4",
        type === MessageType.ERROR && "text-red-700 dark:text-red-500"
    )}
    >
       <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
        src={"/Logo.svg"}
        alt='heisnberg'
        height={30}
        width={30}
        className='invert dark:invert-0'
        />
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(new Date(createdAt), "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>

      <div className='pl-10 flex flex-col gap-y-4'>
        <span>{content}</span>
        {
            shard && type === MessageType.RESULT && (
                <ShardCard
                     shard={shard}
            isActiveShard={isActiveShard}
            onShardClick={onShardClick}
                />
            )
        }
      </div>

    </div>)
}

const MessageCard = ({
  content,
  role,
  shard,
  createdAt,
  isActiveShard,
  onShardClick,
  type,
}: MessageCardProps) => { 
  if( role === MessageRole.ASSISTANT )  {
    return (
        <AssistantMessage 
        content = { content }
        shard = { shard }
        createdAt = { createdAt }
        isActiveShard = { isActiveShard }
        onShardClick = { onShardClick }
        type = { type }
        />
    )
  }

  return (
    <div className='mt-8'>
    <UserMessage content = { content } />
    </ div>
  )
}

export default MessageCard;