import {
    type createTRPCContext,
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"
import type { Prisma } from "@prisma/client"
import { TRPCError, type inferAsyncReturnType } from "@trpc/server"
import { z } from "zod"

export const donationRouter = createTRPCRouter({
    createDonation: protectedProcedure
        .input(
            z.object({
                post_id: z.string(),
                donatedAmout: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.donations.create({
                data: {
                    ...input,
                    donator_id: ctx.session.user.id,
                },
            })
        }),

    verifyDonation: protectedProcedure
        .input(
            z.object({
                donation_id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const donationWithPost = await ctx.prisma.donations.findUnique({
                where: {
                    uuid: input.donation_id,
                },
                include: {
                    post: true,
                },
            })

            if (donationWithPost?.post.am_id !== ctx.session.user.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message:
                        "You're not the Aid-man of the Post this QR code is generated for!",
                })
            }
            if (donationWithPost?.reached === true) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "This token is already verified!",
                })
            }

            await ctx.prisma.donations.update({
                data: {
                    reached: true,
                    reachedDate: new Date(),
                },
                where: {
                    uuid: donationWithPost.uuid,
                },
            })

            const oldAmount = Number(donationWithPost.post.collectedAmount)
            const newAmount = oldAmount + Number(donationWithPost.donatedAmout)

            await ctx.prisma.post.update({
                data: {
                    collectedAmount: newAmount,
                },
                where: {
                    uuid: donationWithPost.post.uuid,
                },
            })

            return {
                oldAmount,
                newAmount,
                amountType: donationWithPost.post.amountType ?? "",
            }
        }),

    listInitialDonations: protectedProcedure.query(async ({ ctx }) => {
        const totalCount = await ctx.prisma.donations.count()

        const donations = await ctx.prisma.donations.findMany({
            take: 3,
            where: {
                donator_id: ctx.session.user.id,
            },
            include: {
                post: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        const remainingDonations = totalCount - donations.length

        return { remainingDonations, donations }
    }),

    listInfiniteDonations: protectedProcedure
        .input(
            z.object({
                limit: z.onumber(),
                cursor: z
                    .object({ uuid: z.string(), createdAt: z.date() })
                    .optional(),
            })
        )
        .query(async ({ ctx, input: { limit = 8, cursor } }) => {
            return await getInfiniteDonations({
                ctx,
                cursor,
                limit,
                whereClause: {
                    donator_id: ctx.session.user.id,
                },
            })
        }),
})

const getInfiniteDonations = async ({
    whereClause,
    ctx,
    limit,
    cursor,
}: {
    whereClause?: Prisma.DonationsWhereInput
    limit: number
    cursor: { uuid: string; createdAt: Date } | undefined
    ctx: inferAsyncReturnType<typeof createTRPCContext>
}) => {
    const donations = await ctx.prisma.donations.findMany({
        include: {
            post: true,
        },
        where: whereClause,
        cursor: cursor ? { createdAt_uuid: cursor } : undefined,
        orderBy: {
            createdAt: "desc",
        },
    })

    let nextCursor: typeof cursor | undefined

    if (donations.length > limit) {
        const lastItem = donations.pop()
        if (lastItem != null) {
            nextCursor = {
                uuid: lastItem.uuid,
                createdAt: lastItem.createdAt,
            }
        }
    }

    return { donations, nextCursor }
}
