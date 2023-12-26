import type { NextRequest } from "next/server"
import { ImageResponse } from "@vercel/og"
import moment from "moment"

export const config = {
    runtime: "edge",
}

export default function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") ?? ""
    const description = searchParams.get("amp;description") ?? ""
    const am_name = searchParams.get("amp;am_name") ?? ""
    const postimg =
        searchParams.get("amp;postimg") ??
        "https://www.ct1.com/wp-content/plugins/js_composer/assets/vc/no_image.png"
    const ampfp = searchParams.get("amp;ampfp")
        ? `https://wsrv.nl/?url=${searchParams.get("amp;ampfp")}`
        : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
    const createdAt = searchParams.get("amp;createdAt") ?? ""

    return new ImageResponse(
        (
            <div tw="bg-white flex flex-col relative w-full h-full p-0">
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

                <div tw="pl-5 absolute top-0 left-0 z-10 flex flex-col">
                    <p tw="text-6xl font-semibold" style={{ width: "80%" }}>
                        {title.length > 50
                            ? title.substring(0, 50) + "..."
                            : title}
                    </p>
                    <p
                        tw="font-medium text-3xl text-gray-600"
                        style={{ width: "70%" }}
                    >
                        {description.length > 120
                            ? description.substring(0, 120) + "..."
                            : description}
                    </p>
                    <div tw="flex items-center mt-10">
                        <img
                            src={ampfp}
                            alt="pfp"
                            style={{ width: "100px", height: "100px" }}
                            tw="rounded-full border-2 border-[#96d905]"
                        />
                        <p tw="ml-5 text-4xl p-0">{am_name}</p>
                    </div>
                    {createdAt && (
                        <p tw="mt-6 text-2xl flex items-end text-gray-500">
                            Post on:
                            <span tw="ml-1 text-3xl text-gray-800">
                                {moment(createdAt).format("DD MMM YY")}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 628,
        }
    )
}
