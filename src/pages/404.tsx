import type { FC, ReactElement, SVGProps } from "react"
import { WAFullLogo } from "~/components/WALogos"
import Head from "next/head"

const PageNotFound = () => {
    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="relative flex min-h-[100dvh] flex-col items-center justify-start gap-10 overflow-hidden md:gap-2">
                <div className="ml-10 mt-6 w-full">
                    <WAFullLogo className="w-fit" />
                </div>
                <Asset404 className="h-full w-[90%]  md:w-1/3" />
                <h1 className="z-10 text-3xl font-semibold text-[#333] md:text-6xl">
                    Oops! Page not found :(
                </h1>

                <BGWaves className="z-1 absolute -bottom-7 left-0 right-0 aspect-[16/9] w-screen scale-[3] md:bottom-0 md:scale-110" />
            </main>
        </>
    )
}

PageNotFound.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>
}

const Asset404: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="289"
        fill="none"
        viewBox="0 0 400 289"
        {...props}
    >
        <path
            fill="#333"
            d="M78.666 32.954c-.018-3.4-3.144-6.412-6.602-6.362-3.094.046-6.01 2.792-5.988 5.64.06 7.956 12.63 8.682 12.59.722zm-9.712-.91c.154-3.742 6.68-3.094 6.61.682-.08 4.282-6.788 3.596-6.61-.682zM36.962 38.754c3.09.06 5.992-2.612 6.038-5.56.12-7.74-11.424-8.01-11.664-.424-.092 2.92 2.736 5.926 5.626 5.984zm.12-8.824c1.404-.096 2.662 1.238 2.712 2.87.116 3.75-5.12 3.912-5.374.188-.092-1.36 1.258-2.962 2.662-3.06v.002zM55.188 38.588c2.94-.004 5.644-2.746 5.606-5.68-.088-6.91-11.04-7.8-10.968.108.028 3.032 2.422 5.576 5.362 5.572zm3.09-5.922c-.032 4.376-6.55 4.53-6.508-.08.036-3.756 6.538-4.22 6.508.08z"
        />
        <path
            fill="#333"
            d="M366.152 17.71c-45.338-2.18-344.206.634-344.256.634-2.732.024-4.866-.07-5.16 7.64-.43 11.32-1.146 39.608-1.21 110.032-.074 81.752-.184 79.132.432 81.894.734 3.292 1.184 2.982 12.636 3.156 19.62.296 50.474.416 85.912.428 1.57-2.037 3.135-4.077 4.696-6.12-52.072.382-90.144.89-96.098 1.232-3.592.206-3.504 1.198-2.93-23.766 9.482.268 57.528.54 115.658.75 1.924-2.118 4.022-3.976 6.358-5.194-60.73-.364-111.808-.566-121.906-.34.514-23.258 1.228-65.3.35-141.16-.048-4.222.906-1.048 46.828-2.332 6.536-.182 251.06-2.34 312.842-2.388-.174 14.936-.796 135.274-.546 148.11-11.156-.194-65.868-.68-129.472-1.156a78.475 78.475 0 01-8.566 4.746c67.442.126 126.798.124 138.106-.1.426 21.676.336 21.634-4.174 21.586-61.114-.64-136.926-.61-202.64-.31-.838 1.89-2.028 3.98-3.584 6.382 99.518-.208 207.83-.934 208.586-1.006 2.878-.282 4.916-2.014 5.046-4.328 1.612-28.766 1.544-135.224 1.504-176.886-.022-21.62 3.89-21.616-18.412-21.504zm14.194 21.016c-38.51.14-333.674 2.214-355.29 3.11-4.634.192-4.614.096-4.68-4.476-.198-13.642-1.226-14.006 3.102-13.956 31.718.356 329.514-.722 355.796-.722.946 1.118 1.166 4.68 1.072 16.044z"
        />
        <path
            fill="#96D905"
            d="M122.556 147.282c2.322.382-.074 10.182 2.138 27.972.914 7.35 7.756 6.814 14.854 4.708 1.374-.408 2.148-1.558 2.338-3.156.462-3.866.244-12.748.236-12.798l.082-1.382c-8.738-14.988-11.584-31.46-9.664-47.154-14.722-.058-5.376 19.72-10.882 19.43-7.658-.4-19.014-.84-25.986-.744 1.636-4.116 19.958-39.532 21.302-42.812 2.758-6.728 1.67-10.752-5.154-13.268-6.498-2.396-8.932 3.248-11.768 7.354-12.484 18.07-19.346 32.922-23.3 40.53-2.69 5.174-7.208 15.75-1.944 18.262 7.936 3.79 46.284 2.928 47.746 3.056l.002.002zM285.27 114.42c5.272-10.416 10.826-21.32 11.544-23.074 2.758-6.728 1.67-10.752-5.154-13.268-6.498-2.396-8.932 3.248-11.768 7.354a259.923 259.923 0 00-2.482 3.66 76.46 76.46 0 017.86 25.326v.002zM329.29 137.782c-4.078-3.846-6.934-1.212-6.942-3.738-.012-3.758-.34-7.516-1.088-11.174-.904-4.426-2.28-6.698-6.416-7.226-18.188-2.316-7.558 19.562-13.346 19.26a637.74 637.74 0 00-16.302-.646 78.378 78.378 0 01-2.816 12.904c10.198.224 19.316.06 20.016.122 2.322.382-.074 10.182 2.138 27.972.914 7.35 7.756 6.814 14.854 4.708 1.374-.408 2.146-1.558 2.338-3.156.462-3.866.246-12.748.236-12.798.988-16.47.124-16.744 2.156-16.852 5.066-.27 8.918-5.84 5.172-9.376zM335.316 81.61c-15.7-.462-18.886.752-18.57-2.384 1.232-12.254 8.168-5.912 9.43-9.016 1.578-3.882 5.394-6.43 9.48-6.378 2.33.03 2.148 2.078 5.498-.73 3.996-3.352 10.228-2.196 12.918 2.246.892 1.474 1.736 2.23 3.666 2.098 6.308-.438 8.968 5.95 8.616 10.32-.166 2.064-1.258 2.572-2.92 2.686-9.364.648-18.72 1.434-28.122 1.158h.004zm26.148-3.248c1.15 0 2.148-.278 1.96-1.724-.416-3.206-1.99-7.018-6.748-6.292-3.396.518-3.878-1.346-5.016-3.122-2.662-4.16-8.136-4.136-10.698.078-.784 1.292-1.756 1.582-2.782.532-3.024-3.098-9.432.436-9.83 3.982-.658 5.884-4.884-1.208-8.354 4.178-3.998 6.204 6.394 2.378 41.468 2.368zM48.756 89.46c-18.23-.454-18.882.894-18.242-3.594.79-5.544 4.248-7.42 7.65-6.71 1.076.224 1.478-.05 1.798-1.054 1.8-5.652 9.238-6.568 9.708-6.27 2.562 1.626 4.14-.372 6.238-1.362 4.22-1.992 9.786-1.982 12.358 3.612.512 1.112 1.134 1.52 2.372 1.338 9.422-1.39 12.076 12.66 6.594 13.026-9.414.628-18.806 1.258-28.474 1.018l-.002-.002v-.002zm26.514-3.116c4.722 0 .794-8.866-4.306-7.968-2.816.496-4.904-.868-5.838-3.572-1.2-3.468-8.698-3.328-10.298.054-.932 1.968-1.566 2.1-3.306.664-3.068-2.534-9.234 1.096-9.51 4.178-.552 6.192-4.982-1.354-8.322 4.332-3.63 6.18 5.166 2.296 41.58 2.312zM121.442 68.66c-16.352-.408-16.118.828-15.622-3.436.364-3.136 2.268-4.89 5.414-4.776 1.27.046 1.914-.328 2.466-1.504 1.65-3.502 5.738-5.122 9.476-3.85.636.216.926.096 1.382-.34 3.996-3.81 9.212-3.034 11.914 1.81.512.918 1.05.848 1.902.768 5.98-.566 8.134 5.028 7.624 9.056-.124.988-.934 1.25-1.886 1.328-7.778.64-15.544 1.12-22.672.94l.002.006v-.002zm2.3-1.996c1.736.032 15.888-.402 17.624-.452 2.01-.06 2.308-.416 2.014-2.184-.546-3.284-2.362-4.824-5.694-4.3-2.318.368-2.698-1.14-3.67-2.6-2.084-3.122-6.31-3.16-8.434-.044-.822 1.204-1.732 1.46-2.832.444-1.932-1.786-7.048-.25-7.77 3.832-.49 2.778-1.98 1.018-4.178 1.192-1.478.116-3.022 1.814-2.848 3.23.322 2.628 3.056.64 15.788.88v.002z"
        />
        <path
            fill="#333"
            d="M208.716 196.092c-22.524.166-30.924-8.836-32.186-6.524-4.786 8.766-9.896 12.442-8.392 14.788 3.898 6.08.51 10.414-17.296 34.296-5.366 7.196-11.672 13.604-17.458 20.444-9.572 11.316-16.244 23.91-27.544 19.226-13.918-5.768-13.316-18.112-10.004-23.482 6.838-11.086 15.024-19.524 39.724-53.054 5.25-7.126 9.396-11.3 15.004-9.576 1.516.466.778.354 9.41-13.994 1.06-1.76-5.85-4.66-13.234-17.636-15.54-27.308-11.626-58.64 4.978-80.236 31.904-41.488 95.384-36.284 120.332 9.21 26.01 47.43-7.412 106.128-63.334 106.538zm-67.176-72.064c-.252 35.638 28.342 67.202 67.268 67.264 36.564.058 66.582-29.044 66.814-66.878.224-36.276-28.616-66.644-66.23-67.064-36.804-.41-67.586 28.85-67.852 66.68v-.002zM97.568 263.246c.142 5.216 2.308 8.634 9.938 11.672 7.628 3.04 11.628-5 23.076-18.516 7.35-8.678 15.554-16.624 21.976-26.098 14.788-21.824 20.286-21.304-.856-32.652-3.974-2.134-6.346-1.782-9.318 1.5-11.428 12.616-16.166 21.348-22.682 29.724-20.48 26.328-22.302 28.146-22.134 34.37zm67.774-62.134c3.936-8.554 9.694-13.314 7.762-14.372-3.936-2.154-6.552-4.038-10.126-6.974-2.766 5.024-5.662 9.452-8.914 14.19 4.34 2.11 7.762 3.538 11.278 7.156z"
        />
        <path
            fill="#333"
            d="M266.268 125.42c-.466 31.574-25.098 56.404-56.288 57.196-33.968.862-57.862-26.344-59.1-55.034-1.492-34.616 26.622-59.386 55.594-60.42 34.042-1.216 60.278 25.3 59.792 58.256h.002v.002zm-58.364-54.55c-30.094.114-53.108 23.686-52.68 53.76.444 31.164 25.338 52.236 53.136 52.122 30.496-.124 53.66-24.962 52.858-54.07-.802-29.11-25.268-51.918-53.314-51.812z"
        />
        <path
            fill="#333"
            d="M233.412 138.786c-5.024 0-4.962.208-5.208 4.862-.374 7.084-1.058 13.186-5.996 16.108-3.11 1.84-7.238.568-9.082-2.678-1.3-2.288-1.554-4.816-1.798-7.35-.752-7.77-.054-8.152-1.936-7.5-18.656 6.464-23.492 13.422-24.962 11.582-.584-.732.07-1.408.502-1.94 12.366-15.216 47.86-19.744 53.726-15.992 1.142.73 1.432 1.972-.352 2.562-1.654.548-3.376.116-4.896.344l.002.002zm-12.524 6.224c.342 8.472-2.922 7.014-3.21-1.458-.124-3.626-.086-3.604-3.5-2.64-.606.168-.968.32-.86 1.056 1.264 8.552.532 13.478 3.932 14.882 6.986 2.884 6.804-9.32 7.188-14.94.184-2.7.192-2.61-2.55-2.268-1.728.216-1.196.526-1 5.368zM172.51 119.7c.034-.72 4.93-6.51 5.02-6.616 1.514-1.734.316-1.336-3.434-5.888-.64-.776-1.416-1.77-.452-2.728 2.304-2.292 6.604 5.594 8.414 3.52 4.562-5.236 5.428-5.68 6.512-4.868.896.672.842 1.532.196 2.38-1.246 1.632-2.316 3.402-3.812 4.84-1.312 1.256-.45 1.228 4.838 6.85 1.934 2.056-.252 4.226-2.342 2.608-6.028-4.67-5.608-5.708-6.914-4.19-3.664 4.264-5.934 6.794-7.454 5.91-.528-.308-.614-.852-.568-1.814l-.004-.004zM239.978 110.087c-1.532 1.486-.85 1.376 4.656 7.138 1.888 1.978-.264 4.126-2.276 2.628-6.056-4.51-5.62-5.89-7.06-4.198-1.538 1.806-5.868 7.322-7.582 5.684-1.18-1.126-.596-2.112 4.788-8.434 1.552-1.824-.8-1.566-3.836-6.026-1.502-2.206.154-3.602 2.156-2.326 7.104 4.534 3.064 6.362 10.472-1.146 1.544-1.566 5.718-.148-1.316 6.678l-.002.002z"
        />
    </svg>
)

const BGWaves: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="390"
        fill="none"
        viewBox="0 0 1440 390"
        {...props}
    >
        <g clipPath="url(#clip0_7_2)">
            <path
                fill="url(#paint0_linear_7_2)"
                fillOpacity="0.265"
                d="M0 400V60c37.898-3.479 75.797-6.958 124 0s106.711 24.354 153 23c46.289-1.353 80.36-21.456 117-25 36.64-3.544 75.849 9.47 120 13 44.151 3.53 93.244-2.425 135-8s76.177-10.769 115-13c38.823-2.23 82.049-1.498 129 1 46.951 2.498 97.626 6.763 146 2 48.37-4.762 94.45-18.551 141-16 46.55 2.551 93.59 21.443 137 28 43.41 6.557 83.21.778 123-5v340H0z"
            />
            <path
                fill="url(#paint1_linear_7_2)"
                fillOpacity="0.4"
                d="M0 400V140c38.73-1.995 77.462-3.99 127-7 49.538-3.011 109.884-7.037 154-1s72.001 22.137 108 19c35.999-3.137 80.111-25.511 132-28 51.889-2.489 111.556 14.906 155 15 43.444.093 70.667-17.115 107-26 36.333-8.885 81.777-9.447 126 2s87.225 34.903 133 33c45.78-1.903 94.32-29.166 138-33 43.68-3.834 82.48 15.762 125 24 42.52 8.238 88.76 5.119 135 2v260H0z"
            />
            <path
                fill="url(#paint2_linear_7_2)"
                fillOpacity="0.53"
                d="M0 400V220c52.77 9.89 105.542 19.779 145 26 39.458 6.22 65.603 8.772 109-7 43.397-15.772 104.044-49.868 154-46 49.956 3.867 89.219 45.697 128 45 38.781-.698 77.079-43.923 116-46 38.921-2.077 78.466 36.995 119 40 40.534 3.005 82.057-30.057 131-31 48.943-.944 105.3 30.232 149 41s74.73 1.13 118-4c43.27-5.13 98.79-5.752 146-8 47.21-2.249 86.1-6.124 125-10v180H0z"
            />
            <path
                fill="url(#paint3_linear_7_2)"
                d="M0 400V300c37.544-4.517 75.088-9.034 115-3 39.912 6.033 82.192 22.617 132 19 49.808-3.618 107.143-27.436 151-37s74.237-4.874 112 4c37.763 8.873 82.909 21.929 134 31 51.091 9.071 108.128 14.156 152 5 43.872-9.157 74.579-32.556 109-36 34.421-3.444 72.556 13.066 124 23 51.44 9.933 116.2 13.29 169 16 52.8 2.71 93.66 4.774 132 1 38.34-3.775 74.17-13.387 110-23v100H0z"
            />
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_7_2"
                x1="0"
                x2="131682"
                y1="19655.5"
                y2="-22098.6"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.05" stopColor="#96D905"></stop>
                <stop offset="0.95" stopColor="#96D905"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_7_2"
                x1="0"
                x2="125704"
                y1="16015.6"
                y2="-33134"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.05" stopColor="#96D905"></stop>
                <stop offset="0.95" stopColor="#96D905"></stop>
            </linearGradient>
            <linearGradient
                id="paint2_linear_7_2"
                x1="0"
                x2="110923"
                y1="11428.2"
                y2="-49982.3"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.05" stopColor="#96D905"></stop>
                <stop offset="0.95" stopColor="#96D905"></stop>
            </linearGradient>
            <linearGradient
                id="paint3_linear_7_2"
                x1="0"
                x2="79098"
                y1="7093"
                y2="-65063.2"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.05" stopColor="#96D905"></stop>
                <stop offset="0.95" stopColor="#96D905"></stop>
            </linearGradient>
            <clipPath id="clip0_7_2">
                <path fill="#fff" d="M0 0H1440V390H0z"></path>
            </clipPath>
        </defs>
    </svg>
)

export default PageNotFound