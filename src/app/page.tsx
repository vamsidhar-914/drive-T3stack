"use client"

import { useState } from "react";
import { type File, mockFiles } from "../lib/mock-data";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Folder,FileIcon,Upload, ChevronRight } from 'lucide-react';

export default function GoogleDriveClone(){
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  }

  console.log(getCurrentFiles());

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  }

  const getbreadcrumbs = () => {
    const breadcrumbs = [];
    let current = currentFolder;

    while(current) {
      const folder = mockFiles.find((folder) => folder.id === current);
      if (folder) {
        breadcrumbs.unshift(folder);
        current = folder.parent;
      } else {
        break;
      }
    }
    return breadcrumbs;
  }

  const handleUplaod = () => {
    alert("upload functionality not implemented yet");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button onClick={() => setCurrentFolder(null)} variant="ghost" className="text-gray-300 hover:text-white mr-2">
              My Drive
            </Button>
            {getbreadcrumbs().map((folder, index) => (
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
              {getCurrentFiles().map((file: File) => (
                <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-700">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center">
                      {file.type === "folder" ? (
                        <button onClick={() => handleFolderClick(file.id)} className="flex items-center text-gray-100 hover:text-blue-400">
                          <Folder className="mr-3" size={20} />
                        </button>
                      ) : (
                        <Link href={file.url || "#"} className="flex items-center text-gray-100 hover:text-gray-100 hover:text-blue-400">
                          <FileIcon className="mr-3" size={20} />
                          {file.name}
                        </Link>
                      )}
                    </div>
                    <div className="col-span-3 text-gray-400">
                      {file.type === "folder" ? "Folder" : "File"}
                    </div>
                    <div className="col-span-3 text-gray-400">
                      {file.type === "folder" ? "--" : "2MB"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </div>  
      </div>
    </div>
  )
}