import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
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

    listDonations: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.donations.findMany({
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
    }),
})
