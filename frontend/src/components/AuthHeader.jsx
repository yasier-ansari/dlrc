import React, { useState } from 'react'
import {
    LuAtom,
    LuChevronDown
} from 'react-icons/lu';
import { Link } from 'react-router-dom'
const AuthHeader = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
        toast("Logged Out", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
        });
        router.push("/");
        // Perform logout logic here
    };
    return (
        <div className={`flex items-center ${props.val ? 'justify-between' : 'justify-start'} w-full max-w-7xl px-12 py-6 z-40  mx-auto`} >
            <a href="/" className="font-bold text-2xl text-green-700 " >
                DLRC
            </a>
            {
                props.val && (
                    <div className="flex items-center  justify-between">
                        {true ? (
                            true ? (
                                <div className="relative">
                                    <button
                                        onClick={handleDropdownToggle}
                                        className="flex items-center "
                                    >
                                        {/* <Image
                                        src={userInfo?.photoURL || Imag}
                                        width="40"
                                        height="40"
                                        alt="user image"
                                        className="rounded-full"
                                    /> */}
                                        <LuAtom className="w-8 h-8 p-1 " />
                                        <LuChevronDown
                                            className={` w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${dropdownOpen ? "rotate-180" : ""
                                                } `}
                                        />
                                    </button>
                                    {dropdownOpen ? (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                                        >
                                            <ul
                                                className="p-2 text-start border border-gray-300 rounded-xl ">
                                                <Link
                                                    href="/user/profile"
                                                    className="hover:bg-gray-800 w-full cursor-pointer"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setDropdownOpen(false);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="flex w-full md:text-base px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700"
                                                    >
                                                        profile
                                                    </button>
                                                </Link>
                                                <Link
                                                    href="/user/add-resource"
                                                    className="hover:bg-gray-800 cursor-pointer"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setDropdownOpen(false);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="flex px-4 py-2 text-sm md:text-base hover:bg-gray-200 w-full rounded-lg text-gray-700"
                                                    >
                                                        add resource
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full hover:bg-gray-200 rounded-lg cursor-pointer"
                                                >
                                                    <span className="flex w-full px-4 py-2 text-sm md:text-base text-red-600 font-bold">
                                                        logout
                                                    </span>
                                                </button>
                                            </ul>
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="flex  space-x-5 md:space-x-6 text-base font-semibold  ">
                                    <Link
                                        href="/login"
                                        className=" bg-purple-100 flex items-center justify-center text-gray-800 shadow-md border-2 border-purple-400 shadow-stone-400 text-base  rounded-xl px-3 py-1 md:py-2 lg:px-4 "
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={"/register"}
                                        className=" bg-gradient-to-r from-purple-400  to-violet-600 text-white shadow-md border-[0.005rem] border-purple-300 shadow-stone-400 text-base  rounded-xl px-3 py-1 md:py-2 lg:px-4 "
                                    >
                                        Register
                                    </Link>
                                </div>
                            )
                        ) : (
                            <div className="flex items-center justify-center bg-white shadow-xl shadow-purple-100 border-2 h-10 w-16 rounded-lg space-x-3 text-base  border-purple-100">
                                <div className="animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-white border-violet-500">
                                    {" "}
                                    ‎{" "}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default AuthHeader