"use server"

import { inngest } from '@/inngest/client';

export const invokeAIAgent = async() => {
    await inngest.send({
        name: "agent/Jarvis",
    })
}