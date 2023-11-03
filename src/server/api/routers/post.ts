import { TRPCError } from "@trpc/server"
import { z } from "zod"
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
    // protectedProcedure,
} from "~/server/api/trpc"

export const postRouter = createTRPCRouter({
    createPost: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.ostring(),
                address: z.string(),
                hasTarget: z.boolean(),
                targetAmount: z.number().or(z.nan()).nullable().optional(),
                amountType: z.ostring().nullable(),
                hasDeadline: z.boolean(),
                startDate: z.ostring().nullable(),
                endDate: z.ostring().nullable(),
                status: z.boolean(),
                am_id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.post.create({
                    data: input,
                })

                return post
            } catch (error) {
                console.log("Error at: post.createPost")
                console.log(error)
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "something went wrong",
                })
            }
        }),

    deletePost: publicProcedure
        .input(z.object({ uuid: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.post.delete({ where: { uuid: input.uuid } })
        }),

    updatePost: publicProcedure
        .input(
            z.object({
                uuid: z.string(),
                title: z.string(),
                description: z.string(),
                address: z.string(),
                hasTarget: z.boolean(),
                amountType: z.string(),
                hasDeadline: z.boolean(),
                am_id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.post.update({
                    where: {
                        uuid: input.uuid,
                    },
                    data: input,
                })

                return post
            } catch (error) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "something went wrong",
                })
            }
        }),

    createDonation: publicProcedure
        .input(
            z.object({
                post_id: z.string(),
                donator_id: z.string(),
                reachedDate: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const donation = await ctx.prisma.donations.create({
                data: input,
            })
            return donation
        }),

    getAllPosts: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.post.findMany({
            include: {
                _count: {
                    select: {
                        donations: true,
                    },
                },
            },
        })
    }),

    getOnePost: publicProcedure
        .input(z.object({ pid: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.post.findUnique({
                where: {
                    uuid: input.pid,
                },
            })
        }),
})
