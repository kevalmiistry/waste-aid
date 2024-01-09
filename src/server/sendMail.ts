import { TokenVerifiedEmail } from "~/emails/TokenVerifiedEmail"
import { render } from "@react-email/render"
import nodemailer from "nodemailer"

interface sendTokenVerifiedMailArgs {
    name: string
    title: string
    description: string
    amount: number
    amountType: string
    post_link: string
    receiverEmail: string
}
export const sendTokenVerifiedMail = async ({
    amount,
    amountType,
    description,
    name,
    post_link,
    title,
    receiverEmail,
}: sendTokenVerifiedMailArgs) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        })

        const emailHtml = render(
            TokenVerifiedEmail({
                amount,
                amountType,
                description,
                name,
                post_link,
                title,
            }),
            { pretty: true }
        )

        const options = {
            from: '"Waste Aid" <emailverify.wasteaid@gmail.com>',
            to: receiverEmail,
            subject: "Donation Complete!!!",
            html: emailHtml,
            secure: true,
        }

        await transporter.sendMail(options)
    } catch (error) {
        console.log(error)
    }
}
