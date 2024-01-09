import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from '../../public/hero-image.png'
import { FaRegHandPointDown } from "react-icons/fa"
const Rules = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white scroll-mt-2 ">
            <Header />
            <main className="flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full " >
                <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full">
                    <div div className="flex items-center space-x-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full pt-12 mb-8" >
                        <h1 className="font-bold  italic " >Rules</h1>
                        <FaRegHandPointDown className=" text-[#40916c] " />
                    </div>
                    <div>
                        <p className="text-[0.8rem] sm:text-sm md:text-base" >
                            To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                            Please note the given rules and regulations
                        </p>
                    </div>
                </div>

                <div className="flex flex-col  w-full h-full  max-w-4xl mt-16 mb-20">
                    <div className="flex w-full h-full items-center mb-4 md:mb-6">
                        <h3 className=" w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl pr-4 m-0 rounded-md md:self-start italic  " >Issuance</h3>
                        <div className="w-full h-full bg-[#74c69d90]  p-1 rounded-sm">‎</div>
                    </div>
                    <ol className="  flex flex-col items-start gap-4 text-[0.8rem] sm:text-sm md:text-base">
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, error?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, repellendus.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, animi?</li>
                    </ol>
                </div>
                <div className="flex flex-col  w-full h-full  max-w-4xl mb-20">
                    <div className="flex w-full h-full items-center justify-between mb-4 md:mb-6">
                        <div className="w-full h-full bg-[#74c69d90] p-1 rounded-sm basis-[58%] ">‎</div>
                        <h3 className="font-bold text-[#2d6a4f] text-2xl md:text-3xl ml-3 mr-0 rounded-md md:self-end flex w-full basis-[42%] italic " >Return</h3>
                    </div>
                    <ol className=" text-[0.8rem] sm:text-sm md:text-bases flex flex-col items-start gap-4">
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, error?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, repellendus.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, animi?</li>
                    </ol>
                </div>
                <div className="flex flex-col  w-full h-full  max-w-4xl mb-20">
                    <div className="flex w-full h-full items-center mb-4 md:mb-6">
                        <h3 className=" w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl pr-3 m-0 rounded-md md:self-start italic " >Website</h3>
                        <div className="w-full h-full bg-[#74c69d90]  p-1 rounded-sm">‎</div>
                    </div>
                    <ol className=" text-[0.8rem] sm:text-sm md:text-base flex flex-col items-start gap-4">
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, error?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, repellendus.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit.</li>
                        <li className=" before:content-['0'] before:text-green-700 before:mr-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, animi?</li>
                    </ol>
                </div>
            </main >
            <Footer />
        </div >
    )
}

export default Rules