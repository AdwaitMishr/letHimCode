import { getAuthenticatedUser } from '@/modules/auth/actions';
import Navbar from '@/modules/home/components/Navbar';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  await getAuthenticatedUser();
  return (
    <main className=" flex flex-col min-h-screen relative overflow-x-hidden">
      <Navbar />
      <div className="fixed inset-0 -z-10 h-full w-full bg-background " />
      <div className="flex-1 w-full mt-20">
        {children}
      </div>
    </main>
  )
}


