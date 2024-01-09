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
    fontFamily: '"Satoshi", sans-serif',
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
}
export const TokenVerifiedEmail = ({
    amount,
    amountType,
    description,
    name,
    post_link,
    title,
}: TokenVerifiedEmail) => (
    <Html>
        <Head>
            <link
                href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&display=swap"
                rel="stylesheet"
            />
        </Head>
        <Preview>Your donation reached the right place!</Preview>
        <Body style={main}>
            <Tailwind>
                <Container className="px-5" style={container}>
                    <Section className="py-5">
                        <Img
                            src={
                                "https://utfs.io/f/6d72c53c-820c-4a20-8743-8b9e735c9cd9-n2rlq8.png"
                            }
                            width="180"
                            alt="Waste-Aid Logo"
                            className="object-contain"
                        />
                        <Hr style={hr} />
                        <Text className="text-xl">
                            Hi <span className="font-medium">{name} 👋</span>
                        </Text>
                        <Text className="text-xl">
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
                                    className="rounded-2xl p-3"
                                    style={{
                                        border: "1px solid rgba(0,0,0,0.25)",
                                        maxWidth: "420px",
                                    }}
                                >
                                    <Img
                                        src="https://utfs.io/f/0b5eb8b2-1b76-4038-b12f-75b035f57205-nliseh.jpeg"
                                        width={"400"}
                                        height={"300"}
                                        className="mx-auto block overflow-hidden rounded-xl object-cover"
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
                                <span className="rounded-md bg-gray-200 p-1 text-xl font-medium capitalize">
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
                        <Text className="text-lg">
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
