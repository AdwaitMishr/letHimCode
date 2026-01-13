import React, { useEffect, useRef } from 'react'
import { useGetMessages, prefetchMessage } from '@/modules/messages/hooks/message'
import { MessageRole } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { Shard } from '@prisma/client'
import { Spinner } from '@/components/ui/spinner'
import  MessageCard   from './MessageCard'
import MessageForm from './MessageForm'
import MessageLoading from './MessageLoader'


const MessageContainer = ({projectId, activeShard, setActiveShard} : {projectId: string, activeShard: Shard | null,  setActiveShard: (shard: Shard | null) => void}) => {
    const queryClient = useQueryClient();
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastAssistantMessageIdRef = useRef<string | null>(null);
    const {data: messages, isPending, isError, error} = useGetMessages(projectId);
    useEffect(() => {
        if(projectId) {
            prefetchMessage(queryClient, projectId)
        }
    },[projectId, queryClient]);
    
    useEffect(() => {
        const lastAssistantMessage = messages?.findLast(
            (message) => message.role === MessageRole.ASSISTANT
        );

        if(lastAssistantMessage?.shards && lastAssistantMessage.id !== lastAssistantMessageIdRef.current) {
            setActiveShard(lastAssistantMessage?.shards)
            lastAssistantMessageIdRef.current = lastAssistantMessage.id;
        }
    }, [messages, setActiveShard])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages?.length])

    if(isPending) {
        return (
            <div className="flex items-center justify-center h-full">
        <Spinner className={"text-emerald-400"} />
      </div>
        );
    }

    if(isError) {
        return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error: {error?.message || "Failed to load messages"}
      </div>
    );
    }
    if(!messages || messages?.length === 0) {
        <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          No Messages yet. Start a conversation!
        </div>
        <div className="relative p-3 pt-1">
          <div className="absolute -top-6 left-0 right-0 h-6 bg-linear-to-b from-transparent to-background pointer-events-none" />
          <MessageForm projectId={projectId}/>
        </div>
      </div>
    }

    const lastMessage = messages[messages.length - 1];
    const isLastMessageUser = lastMessage.role === MessageRole.USER;

    return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {messages.map((message) => (
          <MessageCard 
          key={message.id}
          content={message.content}
          role={message.role}
          shard={message.shards}
          createdAt={message.createdAt}
          isActiveShard={activeShard?.id === message.shards?.id}
          onShardClick={()=>setActiveShard(message.shards)}
          type={message.type}
          />
        ))}
        {isLastMessageUser && <MessageLoading/>}
        <div ref={bottomRef}/>
      </div>

      <div className="relative p-2 pt-1">
           <div className="absolute -top-6 left-0 right-0 h-6 bg-linear-to-b from-transparent to-background pointer-events-none" />
           <MessageForm projectId={projectId}/>
      </div>
    </div>
  );
  
}

export default MessageContainer
