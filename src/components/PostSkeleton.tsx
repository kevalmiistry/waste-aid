import type { FC } from "react"
import Skeleton from "react-loading-skeleton"

interface IPostSkeleton {}
const PostSkeleton: FC<IPostSkeleton> = () => {
    return (
        <div className="border-b border-[2] pb-5">
            <Skeleton className="aspect-[16/9] md:rounded-2xl" />
            <div className="px-5 md:px-0">
                <Skeleton className="mt-5 h-9" />
                <Skeleton className="mt-4" />
                <Skeleton className="" />
                <Skeleton className="w-1/2" />
                <div className="mt-4 flex items-center justify-between">
                    <Skeleton className="h-7 w-28" />
                    <Skeleton className="h-7 w-28" />
                </div>
            </div>
        </div>
    )
}

export default PostSkeleton
