import { db } from "~/server/db";
import { files as filesSchema , folders as foldersSchema} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
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
  }
  

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}> }) {
    const params = await props.params;
    const parseFolderId = parseInt(params.folderId);
    if(isNaN(parseFolderId)) {
        return <div>Invalid folder</div>
    }
   
    const filesPromise = await db.select().from(filesSchema).where(eq(filesSchema.parent, parseFolderId));
    const foldersPromise = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parseFolderId));

    const parentPromise = getAllParents(parseFolderId);

    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentPromise]);
    return (
       <DriveContents files={files} folders={folders} parents={parents} />
    );
}