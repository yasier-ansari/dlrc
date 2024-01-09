import { LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu"
import { SiTailwindcss } from "react-icons/si"
import { TbBrandFirebase, TbDeviceDesktopHeart } from "react-icons/tb"
import { FaLinkedinIn } from 'react-icons/fa'
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className="relative  font-bold pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-20  ">
            <div className="flex flex-col relative h-full max-w-6xl items items-stretch  w-full justify-center mx-auto gap-2  text-gray-800   ">
                <div className=" w-full flex  justify-end  items-center " >
                    <div className="  font-black text-2xl flex text-start " >
                        DLRC
                    </div>
                    {/* <div className="w-[70%] order-2 text-center md:w-[2px] h-[1px] md:h-[80%] bg-stone-300/70 " ></div> */}
                    <div className="flex justify-end w-full items-center gap-12 " >
                        <a href='https://twitter.com/MHSSCOE' target="_blank" rel="noreferrer" className="p-1" >
                            <LuTwitter className=" w-5 h-5 text-[#40916c] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </a>
                        <a href="https://www.linkedin.com/school/mhsscepage/" target="_blank" rel="noreferrer" className="p-1" >
                            <FaLinkedinIn className=" w-5 h-5 text-[#52b788] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </a>
                        <a href="https://www.instagram.com/mhssce/" target="_blank" rel="noreferrer" className="p-1" >
                            <LuInstagram className=" w-5 h-5 text-[#40916c] hover:text-[#1b4332] hover:scale-110 transition-all ease-linear sm:w-6 sm:h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 " />
                        </a>

                    </div>
                </div>
                <div className="w-[70%] mx-auto h-[1px] rounded-full bg-gray-400 my-6 "></div>
                <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-12  sm:space-y-0 " >
                    <div className=" flex justify-between items-center  " >
                        <div className="flex text-gray-700 items-center  gap-12 text-xs md:text-base "  >
                            <a href={'/rules'}>Rules</a>
                            <a href={'/about'}>About</a>
                            <a href={'/admin/login'}>Admin</a>
                            <a href={'/maintenance/login'}>Maintenance</a>
                        </div>
                    </div>
                    <div className=" flex justify-end items-center " >
                        {/* <p>Rules</p>
                            <p>FAQ</p>
                            <p>About</p> */}
                        <p className="flex text-xs items-center  " >Made with <TbDeviceDesktopHeart className="mx-2 w-5 h-5 md:w-6 md:h-6" /> by <span className="mx-2 font-[700]  text-[#40916c] italic  " >mubasshir</span> & <span className="mx-2 font-[700]  text-[#40916c] italic  " >yasier</span> </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer