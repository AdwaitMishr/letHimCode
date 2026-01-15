import Projects from '@/modules/home/components/Projects'
import Image from 'next/image'
import React from 'react'
import { WavyBackground } from '@/components/ui/wavy-background';
import  ProjectList  from "@/modules/home/components/ProjectList"

const Page = () => {
  return (
    <div className='flex flex-col w-full'>
      <WavyBackground
        className='max-w-4xl mx-auto pb-40 flex flex-col items-center justify-center gap-6'
        containerClassName='h-[40rem] -mt-20'
        colors={['#388e3c', '#fbc02d', '#1a1a1a', '#43a047']}
        backgroundFill='#1a1a1a'
        lightColors={['#4ade80', '#fcd34d', '#a3a3a3', '#22c55e']}
        lightBackgroundFill='#fafafa'
      >
          
        <div className='flex flex-col items-center pt-24'>
          <Image
            src={"/Logo.svg"}
            alt='Logo'
            width={200}
            height={200}
            className='hidden md:block'
          />
        </div>
        <h1 className='text-4xl md:text-7xl font-bold text-center text-gray-900 dark:text-white'>Let Him Code</h1>
        <p className='text-lg md:text-xl text-gray-600 dark:text-neutral-300 text-center'>
          Let Him Code with 99.1% purity while you go touch some grass.
        </p>
      </WavyBackground>
        
      <div className='max-w-5xl w-full mx-auto px-4 py-12 mb-5'>
        <Projects />
      </div>
      <ProjectList />
    </div>
  )
}

export default Page
