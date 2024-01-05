import { LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu"
import { SiTailwindcss } from "react-icons/si"
import { TbBrandFirebase, TbDeviceDesktopHeart } from "react-icons/tb"
import { FaLinkedinIn } from 'react-icons/fa'
const Footer = () => {
    return (
        <footer className="relative  font-bold pb-12 ">
            <div className="flex flex-col relative h-full max-w-7xl items items-stretch  w-full justify-center mx-auto gap-2  text-gray-800   ">
                <div className=" w-full flex  justify-end  items-center " >
                    <div className="  font-black text-2xl flex text-start " >
                        DLRC
                    </div>
                    {/* <div className="w-[70%] order-2 text-center md:w-[2px] h-[1px] md:h-[80%] bg-stone-300/70 " ></div> */}
                    <div className="flex justify-end w-full items-center gap-12 " >
                        <div className="p-1" >
                            <LuTwitter className=" w-5 h-5 text-[#40916c] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </div>
                        <div className="p-1" >
                            <FaLinkedinIn className=" w-5 h-5 text-[#52b788] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </div>
                        <div className="p-1" >
                            <LuInstagram className=" w-5 h-5 text-[#40916c] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </div>

                    </div>
                </div>
                <div className="w-[70%] mx-auto h-[1px] rounded-full bg-gray-400 my-6 "></div>
                <div className="w-full flex justify-between items-center " >
                    <div className=" flex justify-between items-center " >
                        <div className="flex text-gray-700 items-center  gap-12 text-xs md:text-base "  >
                            <p>Rules</p>
                            <p>FAQ</p>
                            <p>About</p>
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className=" flex justify-end items-center " >
                        <div className="flex text-gray-700 items-center  gap-12 text-xs md:text-base "  >
                            {/* <p>Rules</p>
                            <p>FAQ</p>
                            <p>About</p> */}
                            <p className="flex " >Made with <TbDeviceDesktopHeart className="mx-2 w-5 h-5 md:w-6 md:h-6" /> by <span className="mx-2 font-[700] text-[#1b4332] italic " >mubasshir</span> & <span className="mx-2 font-[700] text-[#1b4332] italic " >yasier</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer