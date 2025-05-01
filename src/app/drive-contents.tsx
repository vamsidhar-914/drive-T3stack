"use client"

import {  ChevronRight } from 'lucide-react';
import { FileRow, FolderRow } from "./file-row";
import type { files, folders } from "~/server/db/schema";
import Link from "next/link";
import { SignedOut ,SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from 'next/navigation';

type GoodleDriveCloneProps = {
  files: typeof files.$inferSelect[];
  folders: typeof folders.$inferSelect[];
  parents: typeof folders.$inferSelect[];
  currentFolderId: number
}

export default function DriveContents({ files,folders ,parents,currentFolderId}: GoodleDriveCloneProps) {

    const navigate = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/f/1" className="mr-2 text-gray-300 hover:text-white">My Drive</Link>
            {parents.map((folder) => ( 
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/f/${folder.id}`} className="text-gray-300 hover:text-white">{folder.name}</Link>
              </div>
            ))}
          </div>
         <div className="cursor-pointer">
         <SignedOut>
              <SignInButton />
          </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
         </div>
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
                <FolderRow key={folder.id} folder={folder}  />
              ))}
              {files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </ul>
        </div>  
          <UploadButton
          input={{
            folderId: currentFolderId
          }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              navigate.refresh()
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
        />
      </div>
    </div>
  )
}