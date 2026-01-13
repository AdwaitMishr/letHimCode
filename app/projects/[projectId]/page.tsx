import ProjectView from '@/modules/projects/components/ProjectView';
import React from 'react'

interface PageProps {
    params : Promise<{
        projectId: string;
    }>;
}

const Page = async ({params} : PageProps) => {
    const {projectId} = await params;
  return (
    <ProjectView  projectId={projectId} />
   )
}

export default Page
