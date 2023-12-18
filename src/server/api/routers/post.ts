import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const postRouter = createTRPCRouter({
    createPost: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.ostring(),
                address: z.string(),
                hasTarget: z.boolean(),
                targetAmount: z.number().nullable().optional(),
                amountType: z.ostring().nullable(),
                hasDeadline: z.boolean(),
                startDate: z.ostring().nullable(),
                endDate: z.ostring().nullable(),
                status: z.boolean(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.post.create({
                    data: { ...input, am_id: ctx.session.user.id },
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

    getAMPosts: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.post.findMany({
            include: {
                _count: {
                    select: {
                        donations: true,
                    },
                },
                PostImages: {
                    select: {
                        imageURL: true,
                        uuid: true,
                    },
                },
                donations: {
                    select: {
                        donator: {
                            select: {
                                image: true,
                            },
                        },
                    },
                    distinct: "donator_id",
                    take: 3,
                },
            },
            where: {
                am_id: ctx.session.user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })
    }),

    savePostImageURLs: protectedProcedure
        .input(
            z.array(
                z.object({
                    imageURL: z.string(),
                    post_id: z.string(),
                })
            )
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.postImages.createMany({
                data: input,
            })
        }),

    deletePost: protectedProcedure
        .input(z.object({ uuid: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.post.delete({ where: { uuid: input.uuid } })
        }),

    updatePost: protectedProcedure
        .input(
            z.object({
                uuid: z.string(),
                title: z.string(),
                description: z.ostring(),
                address: z.string(),
                hasTarget: z.boolean(),
                targetAmount: z.number().nullable().optional(),
                amountType: z.ostring().nullable(),
                hasDeadline: z.boolean(),
                startDate: z.ostring().nullable(),
                endDate: z.ostring().nullable(),
                status: z.boolean(),
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

    getOneAMPost: protectedProcedure
        .input(z.object({ pid: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.post.findFirst({
                where: {
                    AND: [
                        {
                            uuid: input.pid,
                        },
                        {
                            am_id: ctx.session.user.id,
                        },
                    ],
                },
            })
        }),

    getOnePost: protectedProcedure
        .input(z.object({ pid: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.post.findFirst({
                where: {
                    uuid: input.pid,
                },
                include: {
                    _count: {
                        select: {
                            donations: true,
                        },
                    },
                    PostImages: {
                        select: {
                            imageURL: true,
                            uuid: true,
                        },
                    },
                    donations: {
                        select: {
                            donator: {
                                select: {
                                    image: true,
                                },
                            },
                        },
                        distinct: "donator_id",
                        take: 3,
                    },
                },
            })
        }),

    getInfinitePost: protectedProcedure
        .input(
            z.object({
                limit: z.number().optional(),
                cursor: z
                    .object({ uuid: z.string(), createdAt: z.date() })
                    .optional(),
            })
        )
        .query(async ({ ctx, input: { cursor, limit = 4 } }) => {
            const posts = await ctx.prisma.post.findMany({
                take: limit + 1,
                orderBy: {
                    updatedAt: "desc",
                },
                cursor: cursor ? { createdAt_uuid: cursor } : undefined,
                include: {
                    _count: {
                        select: {
                            donations: true,
                        },
                    },
                    PostImages: {
                        select: {
                            imageURL: true,
                            uuid: true,
                        },
                    },
                    donations: {
                        select: {
                            donator: {
                                select: {
                                    image: true,
                                },
                            },
                        },
                        distinct: "donator_id",
                        take: 3,
                    },
                },
            })

            let nextCursor: typeof cursor | undefined

            if (posts.length > limit) {
                const lastItem = posts.pop()
                if (lastItem != null) {
                    nextCursor = {
                        uuid: lastItem.uuid,
                        createdAt: lastItem.createdAt,
                    }
                }
            }

            return { posts, nextCursor }
        }),
})
