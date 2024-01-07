import React, { useContext, useRef, useState } from 'react'
import { FaRegHandPointDown } from "react-icons/fa"
import { LuFolderEdit, LuUserCircle2 } from "react-icons/lu"
import { AuthContext } from "../context/AuthContext"
import { BsArrowsFullscreen } from "react-icons/bs";
import useAutosizeTextArea from "../context/AutoResizer";
const UserProfile = () => {
    const { setModalPopped } = useContext(AuthContext);
    const [value, setValue] = useState("");
    const textAreaRef = useRef(null);
    console.log(textAreaRef, "ee");
    const [selectedImage, setSelectedImage] = useState(null);
    useAutosizeTextArea(textAreaRef, value);
    const handleChange = (evt) => {
        const val = evt.target?.value;
        setValue(val);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClick = () => {
        // Logic to open file input when the image is clicked
        // You can use a hidden file input and trigger its click event programmatically
    };



    return (
        <>
            <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full mx-auto">
                <div div className="flex items-center space-x-6 text-6xl justify-center w-full h-full mt-12 mb-16 text-center mx-auto" >
                    <LuUserCircle2 className=" text-[#40916c] " />
                    <h1 className="font-bold  italic" >Profile</h1>
                </div>

            </div>
            <div className="flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  pb-20" >
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
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Id Card</p>
                            {/* <div className="flex items-center justify-center relative bg-indigo-500 p-1 w-8 h-8 rounded-md ">
                                <input accept="image/*"
                                    type="file" className="hidden w-full h-full z-10" />
                                <LuFolderEdit className="w-7 h-6 absolute flex items-center justify-center mx-auto  rounded-lg text-xs font-bold text-white" />
                            </div> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage ? selectedImage : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-2xl object-cover"
                                        onClick={handleClick}
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                        <LuFolderEdit className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                                    </div>
                                </label>
                                <input
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* </input> */}
                        </div>
                        {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                        {/* <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                            <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                            </button>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                        </button> */}
                    </div>

                </div >
                <div className="w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-lg  " >
                    <button className="flex flex-col items-start justify-center space-y-2  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  "  >Update</p>
                    </button>
                    {/* <button className="flex items-start justify-center space-y-2 flex-col  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-red-400 hover:scale-110 transition-all duration-300 ease-linear to-[#db3100]  "  >Reject</p>
                    </button> */}
                </div>
            </div >
            <div className="flex items-center justify-center w-full bg-gray-400 h-[2px] rounded-full mt-12 "></div>
            <div className="flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  py-20 ">
                <div className="flex w-full h-full items-center justify-start mb-4 md:mb-6">
                    <h3 className=" w-max font-bold text-[#2d6a4f] text-3xl p-0 m-0 rounded-md md:self-start italic " >Requests</h3>
                    <div className="w-full h-full bg-[#74c69d90] ml-6 p-1 rounded-sm">‎</div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-green-600 ">
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
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
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved By</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Admin Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >30, Dec 2023</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued By</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-sky-600 ">
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
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
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved By</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Admin Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >30, Dec 2023</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-sky-400 font-bold hover:bg-none hover:border-green-500 hover:border-2 transition-all duration-500 ease-linear to-sky-500 text-white rounded-xl mx-auto" >Issuance Pending</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-orange-300 ">
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
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
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-orange-400 font-bold hover:bg-none hover:border-green-500 hover:border-2 transition-all duration-500 ease-linear to-orange-500 text-white rounded-xl mx-auto" >Approval Pending</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-red-600 ">
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <button className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className="w-12 h-12 stroke-[1.5] " />
                                </button>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
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
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-red-400 font-bold hover:bg-none hover:border-green-500 hover:border-2 transition-all duration-500 ease-linear to-red-500 text-white rounded-xl mx-auto" >Approval Rejected</p>
                            {/* <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
            </div>



        </>
    )
}

export default UserProfile