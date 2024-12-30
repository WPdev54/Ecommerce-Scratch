import { BackgroundLines } from "@/components/ui/background-lines";
import { Cover } from "@/components/ui/cover";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <div>
            <div className="md:flex items-center justify-center">
                <div className=" w-full">
                    <div className="border-cyan-200">
                        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl md:text-xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                                Zephyr<span className="text-green-400 border-0">.</span> <br /> Beyond Deals
                            </h2>
                            <p className="max-w-md mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                                Zephyr helps you sell online easily.  It's super fast, safe, and has tools to help you grow your business.
                            </p>
                            <div className="btns  gap-2 pt-8">
                                <button className="px-8 py-2 border-2 border-black dark:border-white uppercase bg-white
                                 text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] font-bold">
                                    &nbsp; Shop Now! &nbsp;
                                </button>
                                <button className="px-8 py-3  border-2 border-black dark:border-white uppercase bg-green-400 text-white font-bold transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)]">
                                    &nbsp; Explore The Shop! &nbsp;
                                </button>
                            </div>
                            {/* <div className="">
                                <Cover className="">Get Upto 60% Discount Using This Cuopon "WINTERSALES2025"</Cover>
                            </div> */}
                        </BackgroundLines>
                    </div>
                </div>
                <div className="w-full shadow-xl rounded-2xl">
                    <img src="/heroimg.png" alt="Hero" className="rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default Hero;
