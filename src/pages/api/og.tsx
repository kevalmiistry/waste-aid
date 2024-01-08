import type { NextRequest } from "next/server"
import { ImageResponse } from "@vercel/og"
import moment from "moment"

export const config = {
    runtime: "edge",
}

const satoshiFontRegular = fetch(
    new URL("../../../public/fonts/Satoshi-Regular.otf", import.meta.url)
).then((res) => res.arrayBuffer())

const satoshiFontMedium = fetch(
    new URL("../../../public/fonts/Satoshi-Medium.otf", import.meta.url)
).then((res) => res.arrayBuffer())

const satoshiFontBold = fetch(
    new URL("../../../public/fonts/Satoshi-Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
    const satoshiFontRegularData = await satoshiFontRegular
    const satoshiFontMediumData = await satoshiFontMedium
    const satoshiFontBoldData = await satoshiFontBold

    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") ?? ""
    const description = searchParams.get("description") ?? ""
    const am_name = searchParams.get("am_name") ?? ""
    const postimg =
        searchParams.get("postimg") ??
        "https://www.ct1.com/wp-content/plugins/js_composer/assets/vc/no_image.png"
    const ampfp = searchParams.get("ampfp")
        ? `https://wsrv.nl/?url=${searchParams.get("ampfp")}`
        : "https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
    const createdAt = searchParams.get("createdAt") ?? ""

    return new ImageResponse(
        (
            <div tw="bg-white flex flex-col relative w-full h-full p-0">
                {/* Background Post-Image & Foreground White canvas split  */}
                <img
                    src={postimg}
                    alt="img"
                    tw="absolute bottom-0 -right-1/6"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
                <div
                    tw="bg-white absolute top-0 left-0 bottom-0 right-0"
                    style={{
                        width: "200%",
                        height: "200%",
                        transform:
                            "translateX(-63%) translateY(-18%) rotate(-45deg)",
                    }}
                />

                <div tw="pl-5 absolute top-0 left-0 z-10 bottom-0 flex flex-col text-[#333]">
                    {/* Title */}
                    <p
                        tw="text-6xl"
                        style={{ width: "80%", fontFamily: "Satoshi Bold" }}
                    >
                        {title.length > 50
                            ? title.substring(0, 50) + "..."
                            : title}
                    </p>

                    {/* Description */}
                    <p
                        tw="font-medium text-3xl text-gray-600"
                        style={{ width: "70%" }}
                    >
                        {description.length > 120
                            ? description.substring(0, 120) + "..."
                            : description}
                    </p>

                    {/* PRofile Pic & Name */}
                    <div tw="flex items-center mt-5">
                        <img
                            src={ampfp}
                            alt="pfp"
                            style={{ width: "100px", height: "100px" }}
                            tw="rounded-full border-2 border-[#96d905]"
                        />
                        <p
                            tw="ml-5 text-4xl p-0"
                            style={{ fontFamily: "Satoshi Medium" }}
                        >
                            {am_name}
                        </p>
                    </div>

                    {/* Post Creation Date */}
                    {createdAt && (
                        <p tw="mt-6 text-2xl flex items-end text-gray-500">
                            Post on:
                            <span
                                tw="ml-1 text-3xl text-gray-800"
                                style={{ fontFamily: "Satoshi Medium" }}
                            >
                                {moment(createdAt).format("DD MMM YY")}
                            </span>
                        </p>
                    )}

                    {/* WA Logo */}
                    <div
                        tw={"h-[70px] w-[288px] flex absolute left-5 bottom-5"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={"100%"}
                            height={"100%"}
                            fill="none"
                            viewBox="0 0 1864 454"
                        >
                            <path
                                fill="#000"
                                d="M580 42H40l110 393.5h105.5L311 235l54.5 200.5H470L580 42z"
                            />
                            <path
                                fill="#96D905"
                                stroke="#000"
                                strokeWidth="6"
                                d="M560 18H20l110 393.5h105.5L291 211l54.5 200.5H450L560 18z"
                            />
                            <path
                                fill="#111"
                                d="M639.4 432.7c-50.4 0-87.75-20.25-87.75-75.6v-8.55c0-49.5 31.95-71.55 72.45-71.55 15.3 0 27.45 1.8 38.7 4.05v-9c0-30.15-14.4-40.05-42.75-40.05h-37.8c-9.9 0-15.3-5.4-15.3-15.3v-13.05c0-9 4.5-14.85 14.85-16.65 16.2-3.15 26.55-3.6 38.25-3.6 49.95 0 94.95 13.5 94.95 88.2v126c0 12.15-3.15 20.25-15.3 25.2-19.35 7.65-43.2 9.9-60.3 9.9zm-2.7-44.1c6.75 0 14.85-.45 20.25-1.8 4.5-.9 5.85-1.8 5.85-4.95v-59.4c0-2.7-.9-3.6-4.05-4.5-7.65-1.8-15.3-2.25-22.05-2.25-20.7 0-32.85 9.45-32.85 32.85v7.65c0 23.4 12.6 32.4 32.85 32.4zm176.572 44.1c-14.4 0-27.9-.45-44.1-3.6-9.9-1.8-14.4-7.2-14.4-16.65v-13.5c0-9.45 5.4-14.85 15.3-14.85h42.3c21.15 0 27.9-8.55 27.9-19.8v-4.5c0-9.45-5.85-17.1-19.35-25.2l-19.8-11.7c-31.95-18.9-49.05-37.35-49.05-68.85v-2.25c0-45 28.8-68.4 80.55-68.4 13.5 0 26.55.45 43.2 3.6 10.35 1.8 14.4 7.2 14.4 16.65v13.5c0 9.45-5.4 14.85-15.3 14.85h-41.4c-21.15 0-27.9 8.55-27.9 19.8v2.7c0 9.45 5.85 17.1 19.35 25.2l19.8 11.7c31.95 18.9 49.05 36.45 49.05 67.95v5.4c0 44.55-28.8 67.95-80.55 67.95zm189.688 0c-43.199 0-71.549-15.75-71.549-78.3V168.1c0-12.6 7.2-19.8 19.8-19.8h12.6c12.6 0 19.8 7.2 19.8 19.8v18h29.249c9.45 0 14.85 4.95 14.85 15.3v16.2c0 10.35-5.4 15.3-14.85 15.3h-29.249v121.5c0 22.5 7.65 29.7 28.349 33.3l2.7.45c9.45 1.35 13.05 4.05 13.05 15.3v11.7c0 13.05-9.45 17.55-24.75 17.55zm145.14 0c-61.65 0-96.3-25.2-96.3-90.9v-67.05c0-73.35 35.1-91.35 81.45-91.35s81.9 18 81.9 91.35v31.95c0 15.3-8.1 22.5-23.85 22.5H1104v14.85c0 30.15 15.75 40.05 44.1 40.05h42.75c9.9 0 15.75 5.4 15.75 15.3v13.05c0 9-4.5 14.85-14.85 16.65-16.2 2.7-28.35 3.6-43.65 3.6zM1104 262.6v27.9h60.3v-27.9c0-27-11.7-34.65-29.7-34.65-18.9 0-30.6 7.65-30.6 34.65zm249.89 62.55h-86.85c-12.15 0-19.35-3.6-19.35-14.85v-7.65c0-11.25 7.2-14.85 19.35-14.85h86.85c12.6 0 19.35 3.6 19.35 14.85v7.65c0 11.25-6.75 14.85-19.35 14.85zM1424.44 430h-13.95c-10.8 0-17.55-4.95-17.55-17.55 0-2.25.45-4.95.9-7.65l46.35-267.75c2.7-14.85 11.7-22.05 27.45-22.05h41.85c15.3 0 24.75 7.2 27.45 22.05l45.9 267.75c.45 3.15.9 5.4.9 8.1 0 12.15-6.75 17.1-17.55 17.1h-13.95c-13.05 0-19.8-4.5-22.5-19.8l-10.8-63.9c-.45-2.7-.9-4.05-2.25-4.05h-56.25c-1.35 0-1.8.9-2.25 4.05l-11.25 63.9c-2.7 15.3-9.45 19.8-22.5 19.8zm40.5-130.95h47.25c.9 0 1.35-.45 1.35-1.35 0-.9-.45-3.15-.9-5.85l-21.15-129.6c-.45-3.15-.9-4.05-2.25-4.05h-1.35c-1.35 0-1.8.9-2.25 4.05l-21.15 129.6c-.45 2.7-.9 4.95-.9 5.85 0 .9.45 1.35 1.35 1.35zm176.51-134.55h-13.05c-12.6 0-19.35-7.65-19.35-20.25V132.1c0-12.15 6.75-19.8 19.35-19.8h13.05c12.6 0 19.8 7.65 19.8 19.8v12.15c0 12.6-7.2 20.25-19.8 20.25zm0 265.5h-13.05c-12.6 0-19.35-7.2-19.35-19.8V206.35c0-13.05 6.75-20.25 19.35-20.25h13.05c12.6 0 19.8 7.2 19.8 20.25V410.2c0 12.6-7.2 19.8-19.8 19.8zm146.29 2.7c-54 0-87.75-20.25-87.75-80.1v-89.1c0-59.85 27-80.1 71.1-80.1 14.85 0 27.9 2.25 39.15 5.4v-53.55c0-13.05 7.2-20.25 19.8-20.25h13.95c12.6 0 19.8 7.2 19.8 20.25V397.6c0 12.6-4.05 20.7-15.3 24.75-19.8 7.2-41.4 10.35-60.75 10.35zm-1.8-46.8c5.4 0 13.95 0 22.05-2.25 3.15-.9 3.6-1.8 3.6-4.95V236.95c0-2.7-.9-4.05-3.6-4.95-7.2-2.25-16.65-2.25-22.05-2.25-21.15 0-33.75 9.45-33.75 33.75v89.1c0 23.85 12.6 33.3 33.75 33.3z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 628,
            fonts: [
                {
                    name: "Satoshi Regular",
                    data: satoshiFontRegularData,
                    style: "normal",
                },
                {
                    name: "Satoshi Medium",
                    data: satoshiFontMediumData,
                    style: "normal",
                },
                {
                    name: "Satoshi Bold",
                    data: satoshiFontBoldData,
                    style: "normal",
                },
            ],
        }
    )
}
