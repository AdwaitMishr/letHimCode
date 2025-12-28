"use server";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAuthenticatedUser = async() => {
 try{
    const clerkUser = await currentUser();
    if(!clerkUser) return {
        success : false,
        message : "No authenticated user found"
    }

    const {id, emailAddresses, firstName, lastName, imageUrl} = clerkUser;
    
    const newUser = await db.user.upsert({
        where: {
            clerkId : id
        },
        update:{},
        create:{
           clerkId : id,
           name : firstName && lastName ? `${firstName} ${lastName}` : firstName || "No Name",
           image : imageUrl || null,
           email : emailAddresses[0]?.emailAddress || "",
        }
    });
    return {
        success : true,
        user : newUser,
        messgae : "User authenticated"
    };
}  
 catch(error){
    console.error("Error in getAuthenticatedUser:", error);
    return {
        success : false,
        message : "Internal server error"
    };
 } 
}

export const getCurrentUser = async() => {
    try {
        const user = await currentUser();

        if(!user) return null;
        
        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select : {
                id: true,
                name: true,
                email: true,
                image: true,
                clerkId: true,
            }
        });
        return dbUser;
    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        return null;
    }
}