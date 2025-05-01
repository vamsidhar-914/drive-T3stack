import DriveContents from "../../drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries";


export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}> }) {
    const params = await props.params;
    const parseFolderId = parseInt(params.folderId);
    if(isNaN(parseFolderId)) {
        return <div>Invalid folder</div>
    }
   
    const filesPromise = getFiles(parseFolderId);
    const foldersPromise = getFolders(parseFolderId);
    const parentPromise = getAllParentsForFolder(parseFolderId);

    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentPromise]);
    return (
       <DriveContents files={files} folders={folders} parents={parents} />
    );
}