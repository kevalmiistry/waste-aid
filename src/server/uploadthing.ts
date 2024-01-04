import { createUploadthing, type FileRouter } from "uploadthing/next-legacy"

const f = createUploadthing()

export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 10 },
    }).onUploadComplete(() => console.log(`File Uploaded!`)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
