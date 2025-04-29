import { FileIcon, Folder, Link } from "lucide-react";
import type { files, folders } from "~/server/db/schema";

type FileRowPropsType = {
    file: typeof files.$inferSelect;
}

export function FileRow({ file }: FileRowPropsType) {
    return(
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-700">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center">
                        <a href={file.url!} className="flex items-center text-gray-100 hover:text-gray-100 hover:text-blue-400" target="_blank">
                          <FileIcon className="mr-3" size={20} />
                          {file.name}
                        </a>
                    </div>
                    <div className="col-span-3 text-gray-400">
                      {"file"}
                    </div>
                    <div className="col-span-3 text-gray-400">
                      {file.size}
                    </div>
                  </div>
                </li>
    )

}

type FolderRowpropsType = {
    folder: typeof folders.$inferSelect,
    handleFolderClick: () => void
}

export function FolderRow({ folder , handleFolderClick}: FolderRowpropsType) {
    return(
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-700">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center">
                        <button onClick={() => handleFolderClick()} className="flex items-center text-gray-100 hover:text-blue-400">
                          <Folder className="mr-3" size={20} />
                          {folder.name}
                        </button>
                    </div>
                    <div className="col-span-3 text-gray-400">
                    </div>
                    <div className="col-span-3 text-gray-400">
                    </div>
                  </div>
                </li>
    )

}

