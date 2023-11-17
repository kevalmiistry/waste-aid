import { Users2 } from "lucide-react"
import { useState, type FC } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const URL1 = "https://utfs.io/f/4d9de025-b784-4404-90b6-b2ba94ab4690-e8n3y3.jpg"
const URL2 =
    "https://uploadthing.com/f/653369ec-0e4f-4a5d-b4c8-0319f3da3f02-r2ds1x.jpeg"
interface IPost {}
const Post: FC<IPost> = () => {
    const [selectedItem, setSelectedItem] = useState(0)

    return (
        <div className="border-b border-t border-[2] p-4 text-[#333]">
            <Carousel
                className="aspect-[16/9] overflow-hidden rounded-2xl border"
                swipeable
                emulateTouch
                infiniteLoop
                showStatus={false}
                showThumbs={false}
                showArrows={false}
                showIndicators={false}
                selectedItem={selectedItem}
                onClickItem={(index) => console.log("Hii", index)}
                onChange={(index) => setSelectedItem(index)}
            >
                <img
                    src={URL1}
                    alt="img"
                    className="h-full w-full border border-red-600 object-cover"
                />
                <img
                    src={URL2}
                    alt="img"
                    className="h-full w-full border border-red-600 object-cover"
                />
            </Carousel>
            <div className="mt-3 flex items-center justify-center gap-2 ">
                {Array.from({ length: 2 }).map((_, idx) => (
                    <span
                        className={`inline-block h-[8px] w-[8px] rounded-full ${
                            selectedItem === idx ? "bg-black" : "bg-primary"
                        }`}
                        onClick={() => setSelectedItem(idx)}
                        key={idx}
                        role="button"
                        tabIndex={0}
                        aria-label={`image ${idx + 1}`}
                    ></span>
                ))}
            </div>
            <h2 className="mt-3 text-2xl font-semibold">This is the Title</h2>
            <p className="text-[#555]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
                accusamus culpa! Ut maiores id, necessitatibus repellendus iste
                nemo sed, dolore cumque, vel voluptas accusamus error...
            </p>

            <div className="mt-4 flex gap-4 text-lg">
                <div className="flex-1">
                    <p className="font-light text-[#888]">Collected</p>
                    <p className="font-satoshi text-2xl font-medium">
                        2500
                        <span className="text-base font-normal text-[#666]">
                            {" "}
                            / 3500 KG
                        </span>
                    </p>
                </div>
                <div className="flex-1">
                    <p className="font-light text-[#888]">By</p>
                    <p className="font-satoshi flex items-center gap-1 text-2xl font-medium">
                        20 <Users2 />
                    </p>
                </div>
            </div>
            <p className="mt-4 font-light text-[#888]">
                Last Date:{" "}
                <span className="font-satoshi font-medium text-[#333]">
                    31 MAR 23
                </span>
            </p>

            <div
                aria-label="footer"
                className="mb-3 mt-5 flex items-center justify-between"
            >
                <small className="font-satoshi">10 OCT 23</small>
                <button className="btn-primary rounded-full p-1 px-3 text-sm">
                    Know more!
                </button>
            </div>
        </div>
    )
}

export default Post
