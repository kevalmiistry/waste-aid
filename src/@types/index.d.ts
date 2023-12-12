import type { Prisma } from "@prisma/client"

export interface WAPost {
    uuid: string
    title: string
    description: string | null
    address: string
    hasTarget: boolean
    targetAmount: number | null
    collectedAmount: number | null
    amountType: string | null
    hasDeadline: boolean
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    am_id: string
    metaData?: Prisma.JsonValue
    status: boolean

    donations: WAPostDonations[]
    PostImages: WAPostPostImages[]
    _count: WAPostPostDonationsCount
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
