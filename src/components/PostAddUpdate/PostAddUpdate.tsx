import type { DefaultValues, SubmitHandler } from "react-hook-form"
import type { FC, Dispatch, SetStateAction } from "react"
import type { UploadFileResponse } from "uploadthing/client"
import { useRef, useState } from "react"
import { useNotifierStore } from "~/stores/notifier"
import { MultiUploader } from "../MultiUploader"
import { zodResolver } from "@hookform/resolvers/zod"
import { DevTool } from "@hookform/devtools"
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { api } from "~/utils/api"
import { X } from "lucide-react"
import { z } from "zod"
import RHFSelect from "../RHFSelect/RHFSelect"
import moment from "moment"

const amountTypeOptions = [
    { value: "kg", label: "KG" },
    { value: "mg", label: "MG" },
    { value: "ltr", label: "Ltr" },
    { value: "ml", label: "ML" },
    { value: "units", label: "Units" },
    { value: "other", label: "Other" },
]

export type TMultiUploaderHandle = {
    uploadAll: () => Promise<UploadFileResponse[] | undefined>
}

export type zPostTypes = z.infer<typeof zPostSchema>

interface IPostAddUpdate {
    setModalOpen: Dispatch<SetStateAction<boolean>>
    refetchPosts?: () => Promise<void>
    selectedPost: string | null
}
const PostAddUpdate: FC<IPostAddUpdate> = ({
    setModalOpen,
    refetchPosts = () => null,
    selectedPost,
}) => {
    const { notify } = useNotifierStore()
    const uploaderRef = useRef<TMultiUploaderHandle | null>(null)
    const [files, setFiles] = useState<File[]>([])

    const [imagesUploading, setImagesUploading] = useState(false)

    const getPost = api.post.getOneAMPost.useMutation()

    const { mutate: createPostMutate, isLoading: creatingPostLoading } =
        api.post.createPost.useMutation()

    const { mutate: updatePostMutate, isLoading: updatingPostLoading } =
        api.post.updatePost.useMutation()

    const { mutate: saveImageURLsMutate, isLoading: savingImageURLsLoading } =
        api.post.savePostImageURLs.useMutation()

    // fetch and set Post data in edit mode
    const fetchPostData = async () => {
        if (!selectedPost || typeof selectedPost !== "string") {
            return undefined
        }

        const data = await getPost.mutateAsync({
            pid: selectedPost,
        })

        if (data) {
            const {
                title,
                description,
                hasTarget,
                targetAmount,
                collectedAmount,
                amountType,
                hasDeadline,
                startDate,
                endDate,
                metaData,
                status,
                address,
            } = data

            return {
                title,
                description,
                hasTarget,
                targetAmount,
                collectedAmount,
                amountType,
                hasDeadline,
                startDate: startDate
                    ? moment(startDate).format("YYYY-MM-DD")
                    : null,
                endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
                metaData,
                status,
                address,
            } as DefaultValues<zPostTypes>
        } else {
            return undefined
        }
    }

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isLoading },
    } = useForm<zPostTypes>({
        defaultValues: fetchPostData as DefaultValues<zPostTypes>,
        resolver: zodResolver(zPostSchema),
    })

    const onSubmit: SubmitHandler<zPostTypes> = async (data) => {
        try {
            // upload all imgage & get response
            const uploadedFiles = await uploaderRef.current?.uploadAll()

            const payloadData = {
                title: data.title,
                description: data.description ?? "",
                address: data.address,
                hasTarget: data.hasTarget,
                targetAmount: data.hasTarget ? data.targetAmount : null,
                amountType: data.hasTarget ? data.amountType : null,
                hasDeadline: data.hasDeadline,
                startDate:
                    data.hasDeadline && typeof data.startDate === "string"
                        ? new Date(data.startDate).toISOString()
                        : null,
                endDate:
                    data.hasDeadline && typeof data.endDate === "string"
                        ? new Date(data.endDate).toISOString()
                        : null,
                status: true,
            }

            if (selectedPost) {
                const updatePayload = {
                    ...payloadData,
                    uuid: selectedPost,
                }
                updatePostMutate(updatePayload, {
                    async onSuccess() {
                        await refetchPosts()
                        notify({
                            show: true,
                            message: "Post Updated! :D",
                            status: "success",
                            duration: 5000,
                        })
                        reset()
                        setModalOpen(false)
                    },
                })
            } else {
                createPostMutate(payloadData, {
                    async onSuccess(data) {
                        if (uploadedFiles && uploadedFiles.length > 0) {
                            const imageURLsPayload = uploadedFiles.map(
                                (item) => ({
                                    imageURL: item.url,
                                    post_id: data.uuid,
                                })
                            )
                            saveImageURLsMutate(imageURLsPayload, {
                                onSuccess: (data) => {
                                    console.log(data)
                                },
                                onError(error) {
                                    console.log(error.message)
                                },
                            })
                        }
                        await refetchPosts()
                        notify({
                            show: true,
                            message: "New Post Created! :D",
                            status: "success",
                            duration: 5000,
                        })
                        reset()
                        setModalOpen(false)
                    },
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isSubmitting = () => {
        return (
            creatingPostLoading ||
            updatingPostLoading ||
            imagesUploading ||
            savingImageURLsLoading
        )
    }

    return (
        <>
            <div className="sticky top-0 flex items-center justify-between bg-white pb-3">
                <h2 className="text-lg font-medium">
                    {selectedPost !== null
                        ? "Update Post Details"
                        : "Create New Post"}
                </h2>
                <X
                    tabIndex={1}
                    className="mr-2 cursor-pointer"
                    onClick={() => setModalOpen(false)}
                />
            </div>
            <div className="custom-scrollbar relative h-[80vh] w-[88vw] overflow-y-auto overflow-x-hidden pb-5 pr-3 sm:w-[600px]">
                {isLoading ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <span className="loader loader-primary loader-xl"></span>
                        <p className="font-thin">Retrieving Post Details!</p>
                    </div>
                ) : (
                    <>
                        {!selectedPost && (
                            <>
                                <MultiUploader
                                    ref={uploaderRef}
                                    setImagesUploading={setImagesUploading}
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </>
                        )}
                        <form
                            className="flex flex-col gap-3 px-1"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="w-full" aria-label="input-group">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="w-full rounded-lg border-2 px-2 py-1 placeholder:text-sm placeholder:font-light placeholder:italic"
                                    placeholder="Eg. Collecting mango seeds for farmers"
                                    {...register("title")}
                                />
                                <small className="text-red-500">
                                    {errors?.title?.message ?? ""}
                                </small>
                            </div>
                            <div className="w-full" aria-label="input-group">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    className="w-full rounded-lg border-2 px-2 py-1 placeholder:text-sm placeholder:font-light placeholder:italic"
                                    placeholder="Eg. We're collecting dried up mango seeds to plant them and then donate them to poor farmers..."
                                    {...register("description")}
                                />
                                <small className="text-red-500">
                                    {errors?.description?.message ?? ""}
                                </small>
                            </div>

                            <div aria-label="input-group" className="w-1/2">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Amount Type
                                </label>
                                <RHFSelect
                                    control={control}
                                    name={"amountType"}
                                    options={amountTypeOptions}
                                />
                                <small className="text-red-500">
                                    {errors?.amountType?.message}
                                </small>
                            </div>

                            <div className="" aria-label="input-group">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Do you have a target?
                                </label>
                                <div className="flex gap-1">
                                    <label
                                        htmlFor="yes"
                                        className={twMerge(
                                            `flex-1 cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-[#333]`,
                                            watch("hasTarget")
                                                ? "border border-primary bg-primary-200 text-primary"
                                                : ""
                                        )}
                                    >
                                        Yes, <small>I have a target!</small>
                                        <input
                                            type="radio"
                                            id="yes"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setValue("hasTarget", true)
                                            }}
                                            checked={watch("hasTarget")}
                                        />
                                    </label>

                                    <label
                                        htmlFor="no"
                                        className={twMerge(
                                            `flex-1 cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-[#333]`,
                                            watch("hasTarget") === false
                                                ? "border border-primary bg-primary-200 text-primary"
                                                : ""
                                        )}
                                    >
                                        No,{" "}
                                        <small>
                                            I don&apos;t have a target!
                                        </small>
                                        <input
                                            type="radio"
                                            id="no"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setValue("hasTarget", false)
                                            }}
                                            checked={
                                                watch("hasTarget") === false
                                            }
                                        />
                                    </label>
                                </div>
                                <small className="text-red-500">
                                    {errors?.hasTarget?.message ?? ""}
                                </small>
                            </div>

                            <div className="w-1/2" aria-label="input-group">
                                {watch("hasTarget") && (
                                    <>
                                        <label
                                            htmlFor="description"
                                            className="text-sm font-medium text-[#333]"
                                        >
                                            Target Amount
                                        </label>
                                        <input
                                            type="number"
                                            id="title"
                                            className="w-full rounded-lg border-2 px-2 py-1 placeholder:text-sm placeholder:font-light placeholder:italic"
                                            onWheel={(e) =>
                                                e.currentTarget.blur()
                                            }
                                            placeholder="Eg. 1000"
                                            {...register("targetAmount", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        <small className="text-red-500">
                                            {errors?.targetAmount?.message ??
                                                ""}
                                        </small>
                                    </>
                                )}
                            </div>

                            <div className="flex-1" aria-label="input-group">
                                <label
                                    htmlFor=""
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Do you have a Deadline?
                                </label>
                                <div className="flex gap-1">
                                    <label
                                        htmlFor="deadline_yes"
                                        className={twMerge(
                                            `flex-1 cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-[#333]`,
                                            watch("hasDeadline")
                                                ? "border border-primary bg-primary-200 text-primary"
                                                : ""
                                        )}
                                    >
                                        Yes, <small>I have a deadline!</small>
                                        <input
                                            type="radio"
                                            id="deadline_yes"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setValue(
                                                        "hasDeadline",
                                                        true
                                                    )
                                            }}
                                            checked={watch("hasDeadline")}
                                        />
                                    </label>
                                    <label
                                        htmlFor="deadline_no"
                                        className={twMerge(
                                            `flex-1 cursor-pointer rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-[#333]`,
                                            watch("hasDeadline") === false
                                                ? "border border-primary bg-primary-200 text-primary"
                                                : ""
                                        )}
                                    >
                                        No,{" "}
                                        <small>
                                            I don&apos;t have a target!
                                        </small>
                                        <input
                                            type="radio"
                                            id="deadline_no"
                                            className="ms-3 hidden"
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setValue(
                                                        "hasDeadline",
                                                        false
                                                    )
                                            }}
                                            checked={
                                                watch("hasDeadline") === false
                                            }
                                        />
                                    </label>
                                </div>
                                <small className="text-red-500">
                                    {errors?.hasDeadline?.message ?? ""}
                                </small>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <div className="flex-[2]">
                                    <div className="flex gap-2">
                                        {watch("hasDeadline") && (
                                            <div
                                                className="flex-1"
                                                aria-label="input-group"
                                            >
                                                <label
                                                    htmlFor="startDate"
                                                    className="text-sm font-medium text-[#333]"
                                                >
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="startDate"
                                                    className="w-full rounded-lg border-2 px-2 py-1"
                                                    {...register("startDate")}
                                                />
                                            </div>
                                        )}
                                        {watch("hasDeadline") && (
                                            <div
                                                className="flex-1"
                                                aria-label="input-group"
                                            >
                                                <label
                                                    htmlFor="endDate"
                                                    className="text-sm font-medium text-[#333]"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="endDate"
                                                    className="w-full rounded-lg border-2 px-2 py-1"
                                                    {...register("endDate")}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <small className="mt-1 block text-center text-red-500">
                                        {errors?.startDate?.message ?? ""}
                                    </small>
                                </div>
                            </div>
                            <div className="w-full" aria-label="input-group">
                                <label
                                    htmlFor="address"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    className="w-full rounded-lg border-2 px-2 py-1 placeholder:text-sm placeholder:font-light placeholder:italic"
                                    placeholder="Eg. 101, main street, Mumbai Maharastra, PIN: 40XXXX9"
                                    {...register("address")}
                                />
                                <small className="text-red-500">
                                    {errors?.address?.message ?? ""}
                                </small>
                            </div>

                            <div className="flex justify-end px-2">
                                <button
                                    type="submit"
                                    className={`mt-5 ${
                                        isSubmitting()
                                            ? "btn-secondary"
                                            : "btn-primary"
                                    }`}
                                    disabled={isSubmitting()}
                                >
                                    {isSubmitting() ? (
                                        <>
                                            <span className="loader mr-2" />
                                            Submitting
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
            <DevTool control={control} />
        </>
    )
}

const zPostSchema = z
    .object({
        PostImages: z.array(z.unknown()).nullable().optional(),
        title: z
            .string()
            .min(2, { message: "Please write lil long title" })
            .max(100, { message: "Title is too long" }),
        description: z.string().nullable().default(null),
        amountType: z
            .string()
            .min(1, { message: "Please Select a Amount Type" })
            .default(""),
        hasTarget: z.boolean({
            errorMap: () => ({ message: "Please select any one of these" }),
        }),
        targetAmount: z.number().or(z.nan()).nullable().default(null),
        collectedAmount: z.number().nullable().default(null),
        hasDeadline: z.boolean({
            errorMap: () => ({ message: "Please select any one of these" }),
        }),
        startDate: z.string().nullable().default(null),
        endDate: z.string().nullable().default(null),
        metaData: z.string().nullable().default(null),
        status: z.boolean().default(true),
        address: z
            .string()
            .min(2, { message: "Please write lil long address" }),
    })
    .refine(
        ({ hasTarget, targetAmount }) => {
            if (hasTarget === true) {
                return (
                    typeof targetAmount === "number" &&
                    !isNaN(targetAmount) &&
                    targetAmount > 0
                )
            }
            return true
        },
        {
            message: "Please Enter a Valid Amount",
            path: ["targetAmount"],
        }
    )
    .refine(
        ({ hasDeadline, startDate, endDate }) => {
            if (hasDeadline === true) {
                return startDate && endDate
            }
            return true
        },
        {
            message: "Please select both dates",
            path: ["startDate"],
        }
    )
    .refine(
        ({ hasDeadline, startDate, endDate }) => {
            if (hasDeadline === true) {
                return moment(startDate).diff(endDate, "hours") <= 0
            }
            return true
        },
        {
            message: "End date can't be before Start date",
            path: ["startDate"],
        }
    )
    .refine(({ hasDeadline, startDate, endDate }) => {
        if (hasDeadline === true) {
            if (startDate === "") {
                startDate = null
            }
            if (endDate === "") {
                endDate = null
            }
        }
        return true
    })

export default PostAddUpdate
