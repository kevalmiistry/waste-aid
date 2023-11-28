import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { z } from "zod"

export const donationRouter = createTRPCRouter({
    createDonation: protectedProcedure
        .input(
            z.object({
                post_id: z.string(),
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

    listDonations: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.donations.findMany({
            where: {
                donator_id: ctx.session.user.id,
            },
        })
    }),
})
