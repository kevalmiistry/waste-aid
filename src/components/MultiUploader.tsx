// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import type { FileWithPath } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useCallback, useState } from "react"
import { useUploadThing } from "~/utils/uploadthing"
import { UploadCloud, X } from "lucide-react"
import { useDropzone } from "@uploadthing/react/hooks"
import { cubicBezier } from "~/utils/constants"
import { motion } from "framer-motion"

export const MultiUploader = () => {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])

    const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
        onClientUploadComplete: (data) => {
            console.log(data)
            setFiles([])
        },
        onUploadError: (error) => {
            console.log("UT Error:", error)
        },
        onUploadBegin: (data) => {},
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
                className="m-3 min-h-[100px] rounded-xl border-2 border-[#999] p-3"
            >
                <input {...getInputProps()} />
                {files?.length > 0 && (
                    <h4 className="text-center text-xl font-bold">
                        {files?.length} file(s) have selected!
                    </h4>
                )}
                <div className="flex h-full flex-col items-center justify-center">
                    <UploadCloud color="#333" size={"2.15rem"} />
                    <p className="text-center">
                        Drop your images here! (Maximum 10)
                    </p>
                </div>
            </div>

            <div className={"custom-scrollbar flex overflow-x-auto py-2"}>
                {files.length > 0
                    ? files.map((file, idx) => (
                          <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                  delay: (idx * 0.5) / 10,
                                  ease: cubicBezier,
                              }}
                              key={idx}
                              className={`group sticky left-0 h-[120px] min-w-[120px] max-w-[120px] overflow-hidden`}
                              style={{ translateX: `${idx * 10}px` }}
                          >
                              <img
                                  src={URL.createObjectURL(file)}
                                  alt="img"
                                  className={`h-full rounded-md object-cover transition-all group-hover:scale-110`}
                              />
                              <X
                                  className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 scale-0 cursor-pointer rounded-full bg-red-500 p-1 text-white transition-all group-hover:scale-100"
                                  onClick={() => handleImageRemove(idx)}
                              />
                              <div className="absolute inset-0 z-[1] h-full w-full rounded-md bg-[#00000070] opacity-0 transition-all group-hover:opacity-100"></div>
                          </motion.div>
                      ))
                    : null}
            </div>

            {/* <div className="my-5 flex justify-center">
                <button
                    className="btn-secondary text-center"
                    onClick={() => startUpload(files)}
                >
                    Upload {files.length} files
                </button>
            </div> */}
        </>
    )
}
