import { createUploadthing, type FileRouter } from "uploadthing/next-legacy"
import { UTApi } from "uploadthing/server"

export const utapi = new UTApi({
    fetch: globalThis.fetch,
    apiKey: process.env.UPLOADTHING_SECRET,
})

const f = createUploadthing()

export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 10 },
    }).onUploadComplete(() => console.log(`File Uploaded!`)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
