"use client";
import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import ProjectHeader from './ProjectHeader';
import MessageContainer from '../../messages/components/MessageContainer';
import { Shard } from '@prisma/client';
import { Code, CrownIcon, EyeIcon } from 'lucide-react';
import ShardWeb from './ShardWeb';
import { FileExplorer } from './FileExplorer';

const ProjectView = ({projectId} : {projectId : string}) => {
  const [activeShard, setActiveShard] = useState<Shard | null >(null);
  const [tabState, setTabState] = useState('preview');
  return (
    <div className='h-screen'>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={20} className='flex flex-col min-h-0'>
            <ProjectHeader projectId = {projectId} />
            <MessageContainer 
              projectId = { projectId }
              activeShard = { activeShard }
              setActiveShard = { setActiveShard }
            />

        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={65} minSize={50}> 
                <Tabs className='h-full flex flex-col' defaultValue='preview' value={tabState} onValueChange={(value) => setTabState(value)}>
                <div className='w-full flex items-center p-2 border-b gap-x-2'>
                  <TabsList className='h-8 p-0 border rounded-xl'>
                  <TabsTrigger value='preview' className='rounded-md px-3 flex items-center gap-x-2'>
                    <EyeIcon className='size-4' />
                    <span>Demo</span>
                  </TabsTrigger>

                  <TabsTrigger value='code' className='rounded-md px-3 flex items-center gap-x-2'>
                    <Code className='size-4' />
                    <span>Code</span>
                  </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-x-2">
                    <Button asChild size={"sm"}>
                    <Link href={'/pricing'}>
                    <CrownIcon className='size-4 mr-2'/> Upgrade
                    </Link>
                    </Button>
                  </div>
                </div>
                <TabsContent 
                value='preview'
                className='flex-1 h-[calc(100%-4rem)] overflow-hidden'
                >
                  {activeShard ? (
                    <>
                    <ShardWeb data={activeShard}/>
                    </>) :
                   (<div className='flex items-center justify-center h-full text-muted-foreground'>  
                    Select a shard to preview 
                    </div>
                  )}
                </TabsContent>
                <TabsContent 
                value='code'
                className='flex-1 h-[calc(100%-4rem)] overflow-hidden'
                >
                  {activeShard?.files ? (
                    <>
                    <FileExplorer files={activeShard.files as unknown as Record<string, string>} />
                    </>) : 
                   (<div className='flex items-center justify-center h-full text-muted-foreground'>  
                    Select a shard to preview code files 
                    </div>
                  )}
                </TabsContent>
                </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView
