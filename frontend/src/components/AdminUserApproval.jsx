import React, { useContext, useRef, useState } from 'react'
import { FaRegHandPointDown } from "react-icons/fa"
import { LuUserCircle2 } from "react-icons/lu"
import { AuthContext } from "../context/AuthContext"
import { BsArrowsFullscreen } from "react-icons/bs";
import useAutosizeTextArea from "../context/AutoResizer";
const AdminUserApprovalComp = () => {
    const { setModalPopped } = useContext(AuthContext);
    const [value, setValue] = useState("");
    const textAreaRef = useRef(null);
    console.log(textAreaRef, "ee");
    useAutosizeTextArea(textAreaRef, value);
    const handleChange = (evt) => {
        const val = evt.target?.value;
        setValue(val);
    };

    return (
        <>
            <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full">
                <div div className="flex items-center space-x-6 text-6xl justify-center w-full h-full mt-12 mb-16" >
                    <LuUserCircle2 className=" text-[#40916c] " />
                    <h1 className="font-bold  italic" >Application</h1>
                </div>

            </div>
            <div className="flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  mb-20" >
                {/* <p>
                        To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                        Please note the given rules and regulations
                    </p> */}
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Name</p>
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p>
                    </div>
                    <div className="flex items-start justify-center space-y-2 flex-col  basis-[40%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Email</p>
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >yasier.412007.cs@mhssce.ac.in</p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between space-x-3 " >
                    <div className="flex basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Prn</p>
                        <p className="  font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >412007</p>
                    </div>
                    <div className="flex basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Dept</p>
                        <p className=" font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >CSE </p>
                    </div>
                    <div className="flex basis-[20%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Year</p>
                        <p className="  font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >TE </p>
                    </div>
                    <div className="flex basis-[20%]  items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Sem</p>
                        <p className=" font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >VII </p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Id Card</p>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </div>

                    </button>
                    <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </div>
                    </button>
                </div>
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </div>
                    </button>
                    <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </div>
                    </button>
                    <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </div>
                    </button>
                </div>
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Reason</p>
                        <textarea ref={textAreaRef}
                            rows={3}
                            id="review-text"
                            onChange={handleChange}
                            value={value} className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] "  >Yasier Zahir Ansari</textarea>
                    </div>
                </div>
                <div className="w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-2xl  " >
                    <button className="flex flex-col items-start justify-center space-y-2  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  "  >Accept</p>
                    </button>
                    <button className="flex items-start justify-center space-y-2 flex-col  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-red-400 hover:scale-110 transition-all duration-300 ease-linear to-[#db3100]  "  >Reject</p>
                    </button>
                </div>
            </div>

        </>
    )
}

export default AdminUserApprovalComp