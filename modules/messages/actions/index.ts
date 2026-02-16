"use server";
import { MessageRole, MessageType } from "@prisma/client";
import db from "@/lib/db";
import { inngest } from "@/inngest/client";
import { checkAndIncrementRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/modules/auth/actions";

export const createMessage = async (value: string, projectId: string) => {
    const user = await getCurrentUser();

    if (!user) throw new Error("Unauthorized");

    const project = await db.project.findUnique({
        where: {
            id: projectId,
            userId: user.id,
        }
    });

    if (!project) throw new Error("Project Not Found");

    await checkAndIncrementRateLimit(user.id);

    const newMessage = await db.message.create({
        data: {
            projectId: projectId,
            content: value,
            role: MessageRole.USER,
            type: MessageType.RESULT,
        }
    });

    await inngest.send({
        name: "codeAgent/run",
        data: {
            value: value,
            projectId: projectId
        }
    });
    return newMessage;
}

export const getMessages = async (projectId: string) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const project = await db.project.findUnique({
        where: {
            id: projectId,
            userId: user.id,
        }
    });

    if (!project) throw new Error("Project Not Found");

    const messages = await db.message.findMany({
        where: {
            projectId: projectId
        },
        orderBy: {
            updatedAt: "asc"
        },
        include: {
            shards: true
        }
    });
    return messages;

}