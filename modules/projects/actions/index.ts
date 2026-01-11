"use server"
import { inngest } from "@/inngest/client"
import db from "@/lib/db"
import { getCurrentUser } from "@/modules/auth/actions"
import { MessageRole, MessageType } from "@prisma/client"
import { generateSlug }  from "random-word-slugs"

export const createProject = async(value: string) => {
    const user = await getCurrentUser();
    if(!user) throw new Error("Unauthorized");

    const newProject = await db.project.create({
        data : {
            name: generateSlug(2, {format:"camel"}),
            userId : user.id,
            messages: {
                create: {
                    content: value,
                    type: MessageType.RESULT,
                    role: MessageRole.USER
                }
            }
        }
    })

    await inngest.send({
        name:"codeAgent/run",
        data: {
            value: value,
            projectId: newProject.id
        }
    });

    return newProject;
}

export const getProjects = async() => {
    const user = await getCurrentUser();
    if(!user) throw new Error("Unauthorized");

    const project = await db.project.findMany({
        where: {
            userId : user.id
        },
        orderBy: {
            createdAt : "desc"
        }
    });
    return project;
}

export const getProjectById = async( projectId : string ) => {
     const user = await getCurrentUser();
    if(!user) throw new Error("Unauthorized");

    const project = await db.project.findUnique({
        where: {
            id: projectId,
            userId : user.id,
        },
    });
    return project;
}