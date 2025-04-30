import { db } from "~/server/db";
import { files as filesSchema , folders as foldersSchema} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { z } from "zod";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}> }) {
    const params = await props.params;
    const parseFolderId = parseInt(params.folderId);
    if(isNaN(parseFolderId)) {
        return <div>Invalid folder</div>
    }
   
    const files = await db.select().from(filesSchema);
    const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parseFolderId));
    return (
       <DriveContents files={files} folders={folders} />
    );
}