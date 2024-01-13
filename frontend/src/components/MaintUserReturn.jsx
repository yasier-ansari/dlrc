import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegHandPointDown } from "react-icons/fa"
import { LuUserCircle2 } from "react-icons/lu"
import { AuthContext } from "../context/AuthContext"
import { BsArrowsFullscreen } from "react-icons/bs";
import useAutosizeTextArea from "../context/AutoResizer";
import { TbUserSquareRounded } from "react-icons/tb";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
const MaintUserReturnComp = ({ flag, id }) => {
    const { setModalPopped, userType, token, setUserInfo } = useContext(AuthContext);
    const [form, setForm] = useState({ reason: '' });
    const [errors, setErrors] = useState({ reason: '' });
    const [userNotFound, setuserNotFound] = useState(false);
    const textAreaRef = useRef(null);
    const handleChange = (e) => {
        const val = e.target?.value;
        setForm({ ...form, reason: val });
    };
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
        if (!form?.reason) {
            newErrors.reason = 'Reason is required';
            valid = false;
        } else if (form?.reason?.split(/\s+/)?.length < 5) {
            newErrors.reason = 'Atleast 5 word long reason is required';
            valid = false;
        } else {
            newErrors.reason = '';
            valid = true;
        }
        setErrors(newErrors);
        return valid;
    }
    const SubmitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("returned")
        } else {
            console.log("give real ting")
        }
    }

    // useEffect(() => {
    //     const getUserInfo = async () => {
    //         const response = await fetch(`http://localhost:8000/api/v1/maintenance/request/${id}`, {
    //             method: "GET",
    //             credentials: "include",
    //             headers: { "Authorization": `Bearer ${token}` },
    //         });
    //         if (response.status === 200) {
    //             const res = await response.json();
    //             setUserInfo(res?.data);
    //         }
    //         else {
    //             setuserNotFound(true);
    //         }
    //     }
    //     getUserInfo();
    // }, [id])

    return (
        <>
            {
                !userNotFound ? <>
                    <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full">
                        <div className="flex items-center space-x-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl  justify-center w-full h-full mt-12 mb-16" >
                            <HiOutlineComputerDesktop className=" text-[#40916c] " />
                            <h1 className="font-bold  italic" >Return</h1>
                        </div>

                    </div>
                    <div className="flex items-center w-full justify-center mx-auto flex-col space-y-4 sm:space-y-6 md:space-y-8  max-w-6xl  mb-20" >
                        {/* <p>
                        To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                        Please note the given rules and regulations
                    </p> */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
                            <div className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full">
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white">Name</p>
                                <p className="truncate font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300">
                                    Yasier Zahir Ansari
                                </p>
                            </div>
                            <div className="flex items-start justify-center space-y-2 flex-col basis-[40%] w-full">
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white">Email</p>
                                <p className="truncate font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300">
                                    yasier.412007.cs@mhssce.ac.in
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 " >
                            <div className="flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Prn</p>
                                <p className="  font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >412007</p>
                            </div>
                            <div className="flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Dept</p>
                                <p className=" font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >CSE </p>
                            </div>
                            <div className="flex w-full sm:basis-[50%] md:basis-[20%] items-start justify-center space-y-2 flex-col " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Year</p>
                                <p className="  font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >TE </p>
                            </div>
                            <div className="flex w-full sm:basis-[50%] md:basis-[20%]  items-start justify-center space-y-2 flex-col " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Sem</p>
                                <p className=" font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >VII </p>
                            </div>
                        </div>
                        {/* <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  " >
                            <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Id Card</p>
                                <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                    <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                        <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                    </button>
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                                </div>

                            </button>
                            <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                                <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                    <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                        <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                    </button>
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                                </div>
                            </button>
                        </div> */}
                        {/* <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  " >
                            <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                                <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                    <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                        <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                    </button>
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                                </div>
                            </button>
                            <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                                <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                    <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                        <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                    </button>
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                                </div>
                            </button>
                            <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                                <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                    <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                        <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                    </button>
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                                </div>
                            </button>
                        </div> */}
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved Reason</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3  border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Yasier Zahir Ansari</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved By</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Nasheet Tarik</p>
                            </div>
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved On</p>
                                <p
                                    className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >21, Dec 2023</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued Reason</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3  border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Yasier Zahir Ansari</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued By</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Nasheet Tarik</p>
                            </div>
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                                <p
                                    className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >21, Dec 2023</p>
                            </div>
                        </div>
                        {/* <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Reason</p>
                                <textarea ref={textAreaRef}
                                    rows={3}
                                    id="review-text"
                                    onChange={handleChange}
                                    value={form?.reason} className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Yasier Zahir Ansari</textarea>
                                <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors.reason || '‎'}</p>
                            </div>
                        </div> */}
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Expected Return Date</p>
                                <input type="date"
                                    // max={maxDate}
                                    value={new Date().toISOString().split('T')[0]}
                                    className=" font-bold text-lg pl-4 rounded-lg py-2 px-3 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] " />
                            </div>
                            <div className="flex flex-col items-start justify-center space-y-2 w-full">
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white">
                                    Returned On
                                </p>
                                <input
                                    type="date"
                                    // min={minDate}
                                    className="w-full font-bold text-lg pl-4 rounded-lg py-2 px-3 border-2 bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] appearance-none"
                                />
                            </div>

                        </div>
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Laptop Condition</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3  border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >still in nice condition</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Feedback</p>
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3  border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Accha student, would give laptop again</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center text-white justify-between space-x-6 sm:space-x-8 md:space-x-12 mx-auto max-w-2xl  " >
                            <button onClick={(e) => { SubmitHandler(e) }} className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  "  >Returned</p>
                            </button>
                            {/* <button onClick={(e) => { SubmitHandler(e, "reject") }} className="flex items-start justify-center space-y-2 flex-col  w-full " >
                                <p className="font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-red-400 hover:scale-110 transition-all duration-300 ease-linear to-[#db3100]  "  >Reject</p>
                            </button> */}
                        </div>
                    </div>
                </> :
                    <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl ">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl" >
                            <TbUserSquareRounded className=" text-[#52b788] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3 " />
                        </h3>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold " >Oops!</h1>
                        <div className="text-base sm:text-lg md:text-lg lg:text-xl  py-4 sm:py-5 md:py-6 lg:py-8 font-bold flex items-center justify-center text-center mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl " >
                            <p>
                                No Student with id {`${id}`} Found 😥
                            </p>
                        </div>
                    </div>
            }
        </>
    )
}

export default MaintUserReturnComp 