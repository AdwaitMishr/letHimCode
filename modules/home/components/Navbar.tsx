"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { SignedIn, SignInButton, SignedOut, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  return (
    <nav className='p-4 backdrop-blur-md bg-background/30 fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-white/10'>
        <div className='max-w-7xl mx-auto w-full flex justify-between items-center'>
             <Link href={"/"} className='flex items-center gap-2'> 
             <Image src={"/Logo.svg"} alt='Logo' width={55} height={55} className='shrink-0'>

             </Image>
             </Link>
             <SignedOut>
                <div className='flex gap-2'>
                    <SignInButton mode='modal'>
                        <Button variant={"outline"} size={"sm"}>
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button  size={"sm"}>
                            Get Started
                        </Button>
                    </SignUpButton>
                </div>
             </SignedOut>
             <SignedIn>
                <UserButton/>
             </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar
