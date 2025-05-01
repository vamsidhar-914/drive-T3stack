import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default async function SandboxPage() {
    const user = await auth()
    if(!user.userId){
        throw new Error("usernotfound")
    }
    const foldersSelect = await db.select().from(folders).where(eq(folders.ownerId , user.userId))

    console.log('folders',foldersSelect)
    return (
        <div className="flex flex-col gap-4">
            Seed function
            <form action={async () => {
                'use server';

                const user = await auth()
                if(!user.userId){
                    throw new Error("user not found")

                }
                const rootFolder = await db.insert(folders).values({
                    name:'root',
                    ownerId: user.userId,
                    parent: null
                }).$returningId()
                const insertableFolders = mockFolders.map((folder,index) => ({
                    name: folder.name,
                    parent: rootFolder[0]!.id,
                    ownerId: user.userId
                }))
                await db.insert(folders).values(insertableFolders)
                
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}