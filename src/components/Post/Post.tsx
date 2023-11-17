import { AnimatePresence, motion } from "framer-motion"
import { useState, type FC } from "react"
import { cubicBezier } from "~/utils/constants"
import { Carousel } from "react-responsive-carousel"
import { Expand, Users2 } from "lucide-react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const URLS = [
    "https://utfs.io/f/4d9de025-b784-4404-90b6-b2ba94ab4690-e8n3y3.jpg",
    "https://uploadthing.com/f/653369ec-0e4f-4a5d-b4c8-0319f3da3f02-r2ds1x.jpeg",
    "https://utfs.io/f/f5f508ca-d291-474f-b655-8ed7c615bfd0-cejcs5.jpg",
]
interface IPost {}
const Post: FC<IPost> = () => {
    const [selectedItem, setSelectedItem] = useState(0)
    const [fullViewOpen, setFullViewOpen] = useState(false)

    return (
        <div className="border-b border-t border-[2] p-4 text-[#333]">
            {/* view full image in overlay */}
            <AnimatePresence>
                {fullViewOpen ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: cubicBezier, duration: 0.3 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[#000000BB]"
                        onClick={() => setFullViewOpen(false)}
                    >
                        <img
                            src={URLS[selectedItem]}
                            alt="img"
                            className="max-h-[80%] max-w-[80%] object-contain"
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <Carousel
                className="aspect-[16/9] overflow-hidden rounded-2xl"
                swipeable
                emulateTouch
                infiniteLoop
                showStatus={false}
                showThumbs={false}
                showArrows={false}
                showIndicators={false}
                selectedItem={selectedItem}
                onClickItem={(index) => setFullViewOpen(true)}
                onChange={(index) => setSelectedItem(index)}
            >
                {URLS.map((url, idx) => (
                    <div className="relative">
                        <img
                            key={idx}
                            src={url}
                            alt="img"
                            className="object-cover"
                        />
                        <Expand
                            className="absolute right-5 top-5 shadow-lg shadow-black"
                            color="#fff"
                            size={"1.25rem"}
                        />
                    </div>
                ))}
            </Carousel>

            {/* image carousel bullets */}
            <div className="mt-3 flex items-center justify-center gap-2 ">
                {URLS.map((_, idx) => (
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
