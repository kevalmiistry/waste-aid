import { useRef, type FC, Dispatch, SetStateAction } from "react"
import { useSearchParams } from "next/navigation"
import { MultiUploader } from "../MultiUploader"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
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
]

export type TMultiUploaderHandle = {
    uploadAll: () => void
}

const zPostSchema = z
    .object({
        title: z.string().min(2, { message: "Please write lil long title" }),
        description: z.ostring(),
        hasTarget: z.boolean({
            errorMap: () => ({ message: "Please select any one of these" }),
        }),
        targetAmount: z.number().or(z.nan()).nullable().optional(),
        collectedAmount: z.onumber().nullable(),
        amountType: z.ostring().nullable(),
        hasDeadline: z.boolean({
            errorMap: () => ({ message: "Please select any one of these" }),
        }),
        startDate: z.ostring().nullable(),
        endDate: z.ostring().nullable(),
        metaData: z.ostring().nullable(),
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
        ({ hasTarget, amountType }) => {
            if (hasTarget === true) {
                return !!amountType
            }
            return true
        },
        {
            message: "Please Select a Amount Type",
            path: ["amountType"],
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

export type PostTypes = z.infer<typeof zPostSchema>

interface IPostAddUpdate {
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>
}
const PostAddUpdate: FC<IPostAddUpdate> = ({ modalOpen, setModalOpen }) => {
    const uploaderRef = useRef<TMultiUploaderHandle | null>(null)

    // const router = useRouter()
    // console.log(router.query?.pid)
    const searchParams = useSearchParams()

    const getPost = api.post.getOnePost.useMutation()

    const fetchPostData = async () => {
        if (
            !searchParams.get("pid") ||
            typeof searchParams.get("pid") !== "string"
        )
            return {}

        const data = await getPost.mutateAsync({
            pid: searchParams.get("pid") as string,
        })

        return data || {}
    }

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        // setError,
        formState: { errors, isLoading },
    } = useForm<PostTypes>({
        // defaultValues: searchParams.get("pid") ? fetchPostData : {},
        resolver: zodResolver(zPostSchema),
    })

    const onSubmit = async (data: PostTypes) => {
        console.log(data)
    }

    // console.log(getValues())
    // console.log(errors)

    return (
        <>
            <div className="sticky top-0 flex items-center justify-between bg-white pb-3">
                <h2 className="text-lg font-medium">Create New Post</h2>
                <X
                    tabIndex={1}
                    className="cursor-pointer"
                    onClick={() => setModalOpen(false)}
                />
            </div>
            <div className="custom-scrollbar relative h-[80vh] w-[80vw] overflow-y-auto overflow-x-hidden pb-5 pr-3 sm:w-[600px]">
                <MultiUploader ref={uploaderRef} />
                <form
                    className="flex flex-col gap-3"
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
                            {errors?.title && errors?.title?.message}
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
                            {errors?.description &&
                                errors?.description?.message}
                        </small>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1" aria-label="input-group">
                            <label
                                htmlFor=""
                                className="text-sm font-medium text-[#333]"
                            >
                                Has Target?
                            </label>
                            <div className="flex gap-1">
                                <input
                                    type="radio"
                                    id="yes"
                                    className="w-[18px]"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setValue("hasTarget", true)
                                    }}
                                    checked={watch("hasTarget")}
                                />
                                <label
                                    htmlFor="yes"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    id="no"
                                    className="ms-3 w-[18px]"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setValue("hasTarget", false)
                                    }}
                                    checked={watch("hasTarget") === false}
                                />
                                <label
                                    htmlFor="no"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    No
                                </label>
                            </div>
                            <small className="text-red-500">
                                {errors?.hasTarget &&
                                    errors?.hasTarget?.message}
                            </small>
                        </div>

                        <div className="flex-1" aria-label="input-group">
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
                                        placeholder="Eg. 1000"
                                        {...register("targetAmount", {
                                            valueAsNumber: true,
                                        })}
                                    />
                                    <small className="text-red-500">
                                        {errors?.targetAmount &&
                                            errors?.targetAmount?.message}
                                    </small>
                                </>
                            )}
                        </div>
                        <div className="flex-1" aria-label="input-group">
                            {watch("hasTarget") && (
                                <>
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
                                        {errors?.targetAmount &&
                                            errors?.amountType?.message}
                                    </small>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                        <div className="flex-1" aria-label="input-group">
                            <label
                                htmlFor=""
                                className="text-sm font-medium text-[#333]"
                            >
                                Has Deadline?
                            </label>
                            <div className="flex gap-1">
                                <input
                                    type="radio"
                                    id="deadline_yes"
                                    className="w-[18px]"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setValue("hasDeadline", true)
                                    }}
                                    checked={watch("hasDeadline")}
                                />
                                <label
                                    htmlFor="deadline_yes"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    id="deadline_no"
                                    className="ms-3 w-[18px]"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setValue("hasDeadline", false)
                                    }}
                                    checked={watch("hasDeadline") === false}
                                />
                                <label
                                    htmlFor="deadline_no"
                                    className="text-sm font-medium text-[#333]"
                                >
                                    No
                                </label>
                            </div>
                            <small className="text-red-500">
                                {errors?.hasDeadline &&
                                    errors?.hasDeadline?.message}
                            </small>
                        </div>

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
                                {errors?.startDate &&
                                    errors?.startDate?.message}
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
                            {errors?.address && errors?.address?.message}
                        </small>
                    </div>

                    <div className="flex justify-end px-2">
                        <button
                            className="btn-secondary mt-5"
                            // onClick={() => uploaderRef.current?.uploadAll()}
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {/* <DevTool control={control} /> */}
        </>
    )
}

export default PostAddUpdate
