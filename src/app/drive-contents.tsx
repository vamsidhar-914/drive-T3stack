"use client"

import { useMemo, useState } from "react";
import { mockFiles, mockFolders } from "../lib/mock-data";
import { Button } from "~/components/ui/button";
import { Upload, ChevronRight } from 'lucide-react';
import { FileRow, FolderRow } from "./file-row";
import type { files, folders } from "~/server/db/schema";

type GoodleDriveCloneProps = {
  files: typeof files.$inferSelect[];
  folders: typeof folders.$inferSelect[];
}

export default function DriveContents({ files,folders}: GoodleDriveCloneProps) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  // const getCurrentFiles = () => {
  //   return mockFiles.filter((file) => file.parent === currentFolder);
  // }
  // const getCurrentFolders = () => {
  //   return mockFolders.filter((folder) => folder.parent === currentFolder)
  // }

  // console.log(getCurrentFiles());
  // console.log(getCurrentFolders());

  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId);
  }

  const breadcrumbs =  useMemo(() => {
    const breadcrumbs = [];
    let current = currentFolder;

    while(current !== 1) {
      const folder = folders.find((folder) => folder.id === current);
      if (folder) {
        breadcrumbs.unshift(folder);
        current = folder.parent ?? 1
      } else {
        break;
      }
    }
    return breadcrumbs;
  },[currentFolder,folders]);

  const handleUplaod = () => {
    alert("upload functionality not implemented yet");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button onClick={() => setCurrentFolder(1)} variant="ghost" className="text-gray-300 hover:text-white mr-2">
              My Drive
            </Button>
            {breadcrumbs.map((folder) => ( 
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button onClick={() => handleFolderClick(folder.id)} variant="ghost" className="text-gray-300 hover:text-white">{folder.name}</Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUplaod} className="bg-blue-600 text-white hover:bg-blue-700">
            <Upload className="mr-2" size={20} />
            upload
          </Button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="px-6 py-4 border-gray-700">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-3">Size</div>
              </div>
            </div>
            <ul>
              {folders.map((folder) => (
                <FolderRow key={folder.id} folder={folder} handleFolderClick={() => {
                  handleFolderClick(folder.id)
                }} />
              ))}
              {files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </ul>
        </div>  
      </div>
    </div>
  )
}