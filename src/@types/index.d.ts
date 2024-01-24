import type { Prisma } from "@prisma/client"

export interface WAPost {
    uuid: string
    title: string
    description: string | null
    address: string
    hasTarget: boolean
    targetAmount: number | null
    collectedAmount: number | null
    amountType: string
    hasDeadline: boolean
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    am_id: string
    aidman: WAPostAidMan
    metaData?: Prisma.JsonValue
    status: boolean

    donations: WAPostDonations[]
    PostImages: WAPostPostImages[]
    _count: WAPostPostDonationsCount
}

export interface WAPostAidMan {
    image: string | null
    name: string | null
}

export interface WAPostDonations {
    donator: {
        image: string | null
    }
}

export interface WAPostPostImages {
    imageURL: string
    uuid: string
}

export interface WAPostPostDonationsCount {
    donations: number
}

export type WADonationPost = Omit<
    WAPost,
    "donations" | "PostImages" | "_count" | "aidman"
>

export interface WADonation {
    uuid: string
    post_id: string
    donator_id: string
    donatedAmout: number | null
    reached: boolean
    createdAt: Date
    reachedDate: Date | null
    post: WADonationPost
}
