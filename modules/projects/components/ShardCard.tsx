import { cn } from '@/lib/utils'
import { Shard } from '@prisma/client'
import { Code2Icon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

const ShardCard = ({shard, isActiveShard, onShardClick} : {shard: Shard, isActiveShard: boolean, onShardClick: (shard: Shard) => void}) => {
  return (
    <button
        className={cn(
         "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-2 hover:bg-secondary transition-colors",
         isActiveShard && "bg-primary text-primary-foreground border-primary hover:bg-primary"
        )}
        onClick={()=>onShardClick(shard)}
        >
            <Code2Icon className='size-4 mt-0.5'/>
            <div className='flex flex-col flex-1'>
            <span className='text-sm font-medium line-clamp-1'>
                {shard.title}
            </span>
            <span className='text-sm'>Preview</span>
            </div>
            <div className='flex items-center justify-center mt-0.5'>
            <span className='text-sm'>
                <ChevronRightIcon className='size-4'/>
            </span>
            </div>
        </button>
  )
}

export default ShardCard
