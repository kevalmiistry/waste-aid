/* eslint-disable @next/next/no-page-custom-font */
import * as React from "react"
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components"

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: `'Roboto', sans-serif`,
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    marginBottom: "64px",
    color: "#333",
}

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
}

const button = {
    backgroundColor: "#96d905",
    color: "#000",
    textDecoration: "none",
    textAlign: "center" as const,
    padding: "10px",
    display: "block",
}

interface TokenVerifiedEmail {
    name: string
    title: string
    description: string
    amount: number
    amountType: string
    post_link: string
    post_img_link: string
}
export const TokenVerifiedEmail = ({
    amount,
    amountType,
    description,
    name,
    post_link,
    post_img_link,
    title,
}: TokenVerifiedEmail) => (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin=""
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
                rel="stylesheet"
            />
        </Head>
        <Preview>Your donation reached the right place!</Preview>
        <Body style={main}>
            <Tailwind>
                <Container className="px-5" style={container}>
                    <Section className="py-5">
                        <Img
                            src={`https://utfs.io/f/6d72c53c-820c-4a20-8743-8b9e735c9cd9-n2rlq8.png`}
                            width="180"
                            alt="Waste-Aid Logo"
                            className="object-contain"
                        />
                        <Hr style={hr} />
                        <Text className="text-lg">
                            Hi <span className="font-medium">{name} 👋</span>
                        </Text>
                        <Text className="text-lg">
                            This is to inform you that your donation has been
                            reached its intended place and the{" "}
                            <span className="font-medium">Aid-Man</span> has
                            Received it ✨
                        </Text>

                        <Text className={"p-1"} />

                        <Text className="text-center text-lg">
                            The Post in which you donated 👇
                        </Text>

                        <Container className="pb-5">
                            <Link
                                href={post_link}
                                style={{
                                    textDecoration: "none",
                                    color: "#333",
                                }}
                            >
                                <Container
                                    className="rounded-2xl bg-slate-100 p-3"
                                    style={{
                                        border: "1px solid #333",
                                        maxWidth: "400px",
                                    }}
                                >
                                    <Img
                                        src={post_img_link}
                                        width={"380"}
                                        height={"260"}
                                        className="mx-auto block overflow-hidden rounded-xl object-cover"
                                        style={{
                                            border: "1px solid #333",
                                        }}
                                    />
                                    <Text>
                                        <span className="p-0 text-lg font-semibold">
                                            {title.length > 70
                                                ? title.substring(0, 70) + "..."
                                                : title}
                                        </span>
                                        <br />
                                        <span className="text-md w-fit p-0">
                                            {description.length > 100
                                                ? description.substring(
                                                      0,
                                                      100
                                                  ) + "..."
                                                : description}
                                        </span>
                                    </Text>
                                </Container>
                            </Link>

                            <Text className="text-center text-lg">
                                Your Contribution is:
                                <br />
                                <span className="rounded-md bg-gray-200 p-1 text-lg font-medium capitalize">
                                    {amount} {amountType}
                                </span>
                            </Text>
                        </Container>
                        <Container align="center" className="w-full">
                            <Button
                                style={button}
                                href={post_link}
                                target="_blank"
                                className="mx-auto w-[95%] rounded-lg text-lg font-medium"
                            >
                                View Post
                            </Button>
                        </Container>
                        <Text className="text-md mt-5">
                            Thanks,
                            <br />
                            Team Waste-Aid
                        </Text>
                    </Section>
                </Container>
            </Tailwind>
        </Body>
    </Html>
)

export default TokenVerifiedEmail
