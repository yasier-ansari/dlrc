import { useContext, useState, useRef, useEffect } from "react";
import {
    LuInfo,
    LuChevronDown,
    LuBadgeInfo,
    LuMenu,
    LuX,
    LuAtom,
} from "react-icons/lu";
import { GrUserAdmin } from 'react-icons/gr'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { PiQuotesBold } from 'react-icons/pi'
const Header = () => {
    // const { login, session, logout } = useSession();
    // const {
    //     loading,
    //     userInfo,
    //     setIsModalVisible,
    //     isModalVisible,
    //     authReady,
    // } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
    const [menuBar, setMenuBar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const mediaDropdownRef = useRef(null);
    const mobileRef = useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMediaDropdownToggle = () => {
        setMediaDropdownOpen(!mediaDropdownOpen);
    };

    const handleClickOutside = (event, ref, setOpen) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
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
    const handleLogoutMobile = () => {
        setDropdownOpen(false);
        setMenuBar(false);
        logout();
        toast("Logged Out", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
        });
        router.push("/");
    };

    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            handleClickOutside(event, dropdownRef, setDropdownOpen);
        };

        const handleClickOutsideMediaDropdown = (event) => {
            handleClickOutside(event, mediaDropdownRef, setMediaDropdownOpen);
        };

        const handleClickOutsideMobile = (event) => {
            handleClickOutside(event, mobileRef, setMenuBar);
        };

        // document.addEventListener("mousedown", handleClickOutsideDropdown);
        document.addEventListener("mousedown", handleClickOutsideMediaDropdown);
        document.addEventListener("mousedown", handleClickOutsideMobile);

        return () => {
            // document.removeEventListener("mousedown", handleClickOutsideDropdown);
            document.removeEventListener("mousedown", handleClickOutsideMediaDropdown);
            document.removeEventListener("mousedown", handleClickOutsideMobile);
        };
    }, []);


    const loginHandler = async () => {
        await login();
        toast(" Logged In 👌", {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={` sticky top-0 z-40 font-medium  min-h-20 h-full text-gray-800 w-full ${isScrolled ? ' bg-[#081c15] text-white shadow-lg -top-2 ' : ' '} `}>
            <div className="flex justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6  w-full ">
                <a href="/" className="text-xl  lg:text-2xl font-bold ">
                    <span className="text-[#52b788]">DLRC</span>
                </a>
                <div className="flex flex-col font-sat -space-y-8 sm:hidden">
                    <button
                        className="transition-all z-50 duration-150 ease-in"
                        onClick={() => setMenuBar(!menuBar)}
                    >
                        {!menuBar && <LuMenu className="w-6 h-6 xs:w-7 xs:h-7" />}
                    </button>
                    {menuBar && (
                        <div className="fixed z-40 top-0 -left-0 w-full h-screen bg-white">
                            <button
                                className=" z-[99] absolute top-12 right-4 transition-all  duration-150 ease-in"
                                onClick={() => setMenuBar(!menuBar)}
                            >
                                <LuX className="w-9 h-9 xs:w-10 xs:h-10 stroke-2 fill-gray-700 text-gray-800 border-2 rounded-lg border-slate-500 p-2 " />
                            </button>
                            <div
                                ref={mobileRef}
                                className=" flex sm:hidden flex-col mx-auto items-center space-y-12 justify-start pt-40 text-gray-700 px-6 -py-6 w-full h-screen  bg-gradient-radial  from-purple-100/60 via-purple-100 to-purple-200  "
                            >
                                <div className=" flex flex-col space-y-12 items-center justify-center text-base ">
                                    <Link
                                        href={"/"}
                                        onClick={() => setMenuBar(false)}
                                        className="flex items-center text-lg  "
                                    >
                                        <LuBadgeInfo className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                        About
                                    </Link>
                                    <a
                                        href={"/rules"}
                                        onClick={() => setMenuBar(false)}
                                        className="flex items-center text-lg  "
                                    >
                                        <LuInfo className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                        Rules
                                    </a>
                                    <a
                                        href={"/#faq"}
                                        onClick={() => setMenuBar(false)}
                                        className="flex items-center text-lg  "
                                    >
                                        <PiQuotesBold className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                        FAQ
                                    </a>
                                    <a
                                        href={"admin/login"}
                                        onClick={() => setMenuBar(false)}
                                        className="flex items-center text-lg  "
                                    >
                                        <GrUserAdmin className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                        Admin
                                    </a>
                                </div>
                                <div className="flex flex-col space-y-6 items-center justify-between">
                                    {true ? (
                                        true ? (
                                            <div className="relative" >
                                                <button
                                                    onClick={handleDropdownToggle}
                                                    className="flex items-center "
                                                >

                                                    <LuAtom className="w-8 h-8 p-1 " />
                                                    <LuChevronDown
                                                        className={` w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${dropdownOpen ? "rotate-180" : ""
                                                            } `}
                                                    />
                                                </button>
                                                {dropdownOpen ? (
                                                    <div className="absolute left-[50%] top-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                                        <ul className="p-2 text-start">
                                                            <Link
                                                                to="/user/profile"
                                                                className="hover:bg-gray-800 cursor-pointer"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setDropdownOpen(false);
                                                                        setMenuBar(false);
                                                                    }}
                                                                    className="flex w-full px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700"
                                                                >
                                                                    profile
                                                                </button>
                                                            </Link>
                                                            <Link
                                                                to="/user/apply"
                                                                className="hover:bg-gray-800 cursor-pointer"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setDropdownOpen(false);
                                                                        setMenuBar(false);
                                                                    }}
                                                                    className="flex px-4 py-2 text-sm hover:bg-gray-200 w-full rounded-lg text-gray-700"
                                                                >
                                                                    apply
                                                                </button>
                                                            </Link>
                                                            <button
                                                                onClick={handleLogoutMobile}
                                                                className="flex w-full hover:bg-gray-200 rounded-lg cursor-pointer"
                                                            >
                                                                <span className="flex w-full px-4 py-2 text-sm text-red-600">
                                                                    logout
                                                                </span>
                                                            </button>
                                                        </ul>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col space-y-8 text-base font-semibold px-3 py-[4px] lg:px-4 ">
                                                <Link
                                                    to="/user/login"
                                                    className=" bg-purple-100 flex justify-center items-center text-gray-800 shadow-lg border-2 border-purple-400 shadow-stone-300 text-base rounded-xl px-3 py-1 md:py-2 lg:px-4 "
                                                >
                                                    Log In
                                                </Link>
                                                <Link
                                                    to={"/user/register"}
                                                    className=" bg-gradient-to-r from-purple-400  to-violet-600 text-white shadow-lg border-[0.005rem] border-purple-300 shadow-stone-300 text-base rounded-xl px-3 py-2 md:py-3 lg:px-4 "
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex items-center justify-center bg-white h-10 w-16 rounded-lg space-x-3 text-base  border-gray-700">
                                            <div className="animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-white border-violet-500">
                                                {" "}
                                                ‎{" "}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className=" hidden sm:flex space-x-12 items-center justify-center text-base ">
                    <Link
                        to={"/rules"}
                        className="flex items-center text-base hover:text-[#2d6a4f] md:text-lg  "
                    >
                        <LuInfo className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Rules
                    </Link>
                    <a
                        href={"/#faq"}
                        className="flex items-center text-base hover:text-[#2d6a4f] md:text-lg  "
                    >
                        <PiQuotesBold className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        FAQ
                    </a>
                    <a
                        href={"/admin/login"}
                        className="flex items-center text-base hover:text-[#2d6a4f] md:text-lg  "
                    >
                        <GrUserAdmin className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Admin
                    </a>
                    {/* <button onClick={() => setIsModalVisible(!isModalVisible)} className="flex items-center text-base hover:text-[#2d6a4f] md:text-lg " >
                        <LuGitPullRequest className="mr-2 w-4 h-4 md:w-5 md:h-5  " />
                        Search
                    </button> */}
                </div>
                <div className="hidden sm:flex items-center  justify-between">
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
                                        <ul ref={dropdownRef}
                                            className="p-2 text-start border border-gray-300 rounded-xl ">
                                            <Link
                                                to="/user/profile"
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
                                                to="/user/apply"
                                                className="hover:bg-gray-800 cursor-pointer"
                                            >
                                                <button
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className="flex px-4 py-2 text-sm md:text-base hover:bg-gray-200 w-full rounded-lg text-gray-700"
                                                >
                                                    apply
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
            </div>
        </div>
    );
};

export default Header;
