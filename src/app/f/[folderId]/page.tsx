import DriveContents from "../../drive-contents";
import { QUERIES } from "~/server/db/queries";


export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}> }) {
    const params = await props.params;
    const parseFolderId = parseInt(params.folderId);
    if(isNaN(parseFolderId)) {
        return <div>Invalid folder</div>
    }
   
    const filesPromise = QUERIES.getFiles(parseFolderId);
    const foldersPromise = QUERIES.getFolders(parseFolderId);
    const parentPromise = QUERIES.getAllParentsForFolder(parseFolderId);

    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentPromise]);
    return (
       <DriveContents files={files} folders={folders} parents={parents} />
    );
}