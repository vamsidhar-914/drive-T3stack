import "server-only";

import { eq } from "drizzle-orm";
import { db } from ".";
import { files as filesSchema , folders as foldersSchema} from "~/server/db/schema";

export const QUERIES = {
    getAllParentsForFolder: async function (folderId: number){
        const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));
  
      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
    },

    getFolders: async function (folderId: number) {
        return db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.parent, folderId));
    },

    getFiles: async function (folderId: number) {
        return db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parent, folderId));
    }
}

export type DB_File = typeof filesSchema.$inferSelect;
export type DB_Folder = typeof foldersSchema.$inferSelect;

export const MUTATIONS= {
  createFile: async function (input : {
    file: {
      name: string,
      size: number,
      url: string,
      parent: number
    },
    userId: string
  }){
    return await db.insert(filesSchema).values(input.file)
  }
}