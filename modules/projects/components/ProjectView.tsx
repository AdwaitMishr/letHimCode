"use client";
import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import ProjectHeader from './ProjectHeader';
import MessageContainer from '../../messages/components/MessageContainer';
import { Shard } from '@prisma/client';

const ProjectView = ({projectId} : {projectId : string}) => {
  const [activeShard, setActiveShard] = useState<Shard | null >(null);
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
                {/* Code and Files  */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView
