import type { FC } from "react"
import Skeleton from "react-loading-skeleton"

interface IPostSkeleton {}
const PostSkeleton: FC<IPostSkeleton> = () => {
    return (
        <>
            <Skeleton className="aspect-[16/9] rounded-2xl" />
            <Skeleton className="mt-5 h-9" />
            <Skeleton className="mt-4" />
            <Skeleton className="" />
            <Skeleton className="w-1/2" />
            <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-7 w-28" />
            </div>
        </>
    )
}

export default PostSkeleton
