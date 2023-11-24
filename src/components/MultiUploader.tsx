// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import {
    type Dispatch,
    type SetStateAction,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react"
import type { TMultiUploaderHandle } from "~/components/PostAddUpdate/PostAddUpdate"
import type { FileWithPath } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useUploadThing } from "~/utils/uploadthing"
import { UploadCloud, X } from "lucide-react"
import { useDropzone } from "@uploadthing/react/hooks"
import { cubicBezier } from "~/utils/constants"
import { motion } from "framer-motion"

interface TProps {
    setImagesUploading: Dispatch<SetStateAction<boolean>>
}

export const MultiUploader = forwardRef<TMultiUploaderHandle, TProps>(
    function MultiUploader({ setImagesUploading }, ref) {
        const [files, setFiles] = useState<File[]>([])
        const [errMsg, setErrMsg] = useState("")

        const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
            setFiles((prev) => {
                const selectedFiles = [...prev, ...acceptedFiles]
                if (selectedFiles.length > 10) {
                    setErrMsg("Oops! You can't select more than 10 files.")
                    return prev
                } else {
                    setErrMsg("")
                    return selectedFiles
                }
            })
        }, [])

        const { startUpload, permittedFileInfo } = useUploadThing(
            "imageUploader",
            {
                onClientUploadComplete: (data) => {
                    if (data) {
                        setImagesUploading(false)
                        setFiles([])
                    }
                },
                onUploadError: (error) => {
                    setImagesUploading(false)
                    console.log("UT Error:", error)
                },
                onUploadBegin: () => {
                    setImagesUploading(true)
                },
                onUploadProgress: () => {
                    // console.log(count)
                },
            }
        )

        const fileTypes = permittedFileInfo?.config
            ? Object.keys(permittedFileInfo?.config)
            : []

        const { getRootProps, getInputProps } = useDropzone({
            onDrop,
            accept: fileTypes
                ? generateClientDropzoneAccept(fileTypes)
                : undefined,
        })

        const handleImageRemove = (idx: number) => {
            setFiles((prev) => {
                return prev.filter((_, i) => i !== idx)
            })
        }

        // function of type: () => void - to easily provide it to parent to call
        const uploadAll = async () => {
            return await startUpload(files)
        }

        // To give access of fn uploadAll() in ref.current
        useImperativeHandle(ref, () => {
            return {
                uploadAll: uploadAll,
            }
        })

        return (
            <>
                <div
                    {...getRootProps()}
                    className="min-h-[100px] w-full rounded-xl border-2 border-[#e5e7eb] p-3"
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
                        {errMsg && (
                            <small className="text-red-500">{errMsg}</small>
                        )}
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
                                  className="group sticky left-0 h-[120px] min-w-[120px] max-w-[120px] overflow-hidden rounded-md"
                                  style={{ translateX: `${idx * 10}px` }}
                              >
                                  <img
                                      src={URL.createObjectURL(file)}
                                      alt="img"
                                      className="h-full w-full rounded-md object-cover transition-all group-hover:scale-110"
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
            </>
        )
    }
)
