// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import type { FileWithPath } from "@uploadthing/react"
import { useDropzone } from "@uploadthing/react/hooks"
import { X } from "lucide-react"
import { useCallback, useState } from "react"
import { generateClientDropzoneAccept } from "uploadthing/client"

import { useUploadThing } from "~/utils/uploadthing"

export default function MultiUploader() {
    const [files, setFiles] = useState<File[]>([])
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])

    const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
        onClientUploadComplete: (data) => {
            console.log(data)
            setFiles([])
            // alert("uploaded successfully!")
        },
        onUploadError: (error) => {
            console.log("UT Error:", error)
            // alert("error occurred while uploading")
        },
        onUploadBegin: (data) => {
            // alert("upload has begun")
        },
        onUploadProgress: (count) => {
            console.log(count)
        },
    })

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : []

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    })

    const handleImageRemove = (idx: number) => {
        setFiles((prev) => {
            return prev.filter((_, i) => i !== idx)
        })
    }

    return (
        <>
            <div
                {...getRootProps()}
                className="m-3 min-h-[200px] w-full rounded-xl border-2 border-[#999] p-3"
            >
                <input {...getInputProps()} />
                {files?.length > 0 && (
                    <h4 className="text-center text-xl font-bold">
                        {files?.length} file(s) have selected!
                    </h4>
                )}
                <p className="text-center">Drop files here!</p>
            </div>

            {files.length > 0 && (
                <>
                    <div className="grid grid-cols-4 gap-2">
                        {files.map((file, idx) => (
                            <div
                                key={idx}
                                className="relative h-fit w-fit border"
                            >
                                <img src={URL.createObjectURL(file)} alt="" />
                                <X
                                    className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                                    onClick={() => handleImageRemove(idx)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="my-5 flex justify-center">
                        <button
                            className="btn-secondary text-center"
                            onClick={() => startUpload(files)}
                        >
                            Upload {files.length} files
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
