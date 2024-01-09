import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegHandPointDown } from "react-icons/fa"
import { LuFolderEdit, LuUserCircle2 } from "react-icons/lu"
import { AuthContext } from "../context/AuthContext"
import { BsArrowsFullscreen } from "react-icons/bs";
import useAutosizeTextArea from "../context/AutoResizer";
const UserProfile = () => {
    const { setModalPopped, user, token, setUser } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState();
    const dept_options = ['CSE (AI - ML)', 'CSE (IOT - BT)', 'COMPS', 'IT', 'Electrical', 'Mechanical', 'Civil', 'AutoMobile'];
    const sem_options = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const year_options = ['FE', 'SE', 'TE', 'BE'];
    const [form, setForm] = useState({
        fullname: user?.fullname || '', domain_id: user?.domain_id || '', prn: user?.prn || '', password: user?.password || '', department: user?.department || '', year: user?.year || '', sem: user?.sem || '', number: user?.number || '', idCard: user?.idCard || ''
    })
    const [errors, setErrors] = useState({
        fullname: '', domain_id: '', prn: '', password: '', department: '', year: '', sem: '', number: '', idCard: ''
    });
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!form.fullname) {
            newErrors.fullname = 'Name is required';
            valid = false;
        }

        if (!form.domain_id) {
            newErrors.domain_id = 'Email is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.domain_id)) {
            newErrors.domain_id = 'College Domain Email required';
            valid = false;
        }
        if (!form.prn) {
            newErrors.prn = 'PRN is required';
            valid = false;
        } else if (!/^[0-9]{6}$/.test(form.prn)) {
            newErrors.prn = 'PRN contains 20 numeric value';
            valid = false;
        }

        const fileSize = form?.idCard?.size / 1024;
        const allowedSize = 1024;
        if (!form?.idCard) {
            newErrors.idCard = 'ID card is mandatory';
            valid = false;
        } else if (!form?.idCard.type !== "image/jpeg") {
            newErrors.idCard = 'Image must be in JPEG/JPG format';
            valid = false;
        } else if (fileSize > allowedSize) {
            newErrors.idCard = 'Image size must be under 1MB';
            valid = false;
        }

        if (!form?.department) {
            newErrors.department = 'Department is required'
            valid = false;
        } else if (!dept_options.includes(form?.department)) {
            newErrors.department = 'Please select a valid department'
            valid = false;
        }
        if (!form?.sem) {
            newErrors.sem = 'Sem is required'
            valid = false;
        } else if (!sem_options.includes(form?.sem)) {
            newErrors.sem = 'Please Select a valid Sem'
            valid = false;
        }
        if (!form?.year) {
            newErrors.year = 'Year is required'
            valid = false;
        } else if (!year_options.includes(form?.year)) {
            newErrors.year = 'Please Select a valid Year'
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, idCard: file });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const SubmitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(form);
        }
    }
    useEffect(() => {
        if (token) {
            const fetchUserProfile = async (accessToken) => {
                try {
                    const response = await fetch("http://localhost:8000/api/v1/student/profile", {
                        method: "GET",
                        credentials: "include",
                        headers: { "Authorization": `Bearer ${accessToken}` },
                    });

                    if (response.ok) {
                        const userProfile = await response.json();
                        console.log(userProfile);
                        setUser(userProfile?.data);
                        setForm({ ...form, ...userProfile?.data });
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                }
            }
            fetchUserProfile(token);
        }
    }, [token]);

    return (
        <>
            <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full mx-auto">
                <div div className="flex items-center space-x-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full mt-12 mb-16 text-center mx-auto" >
                    <LuUserCircle2 className=" text-[#40916c] " />
                    <h1 className="font-bold italic" >Profile</h1>
                </div>

            </div>
            <div className="flex w-full items-center mx-auto flex-col space-y-4 max-w-6xl pb-20" >
                {/* <p>
                    To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                    Please note the given rules and regulations
                </p> */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs font-bold text-white" >Name</p>
                        <input value={form?.fullname} name="fullname" type="text" onChange={(e) => setForm({ ...form, fullname: e.target.value })} className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 " />
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors?.fullname || '‎'}</p>

                    </div>
                    <div className="flex items-start justify-center space-y-2 flex-col  basis-[40%] w-full " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Email</p>
                        <input
                            type="email"
                            name="prn"
                            value={form?.domain_id}
                            onChange={(e) => setForm({ ...form, domain_id: e.target.value })}
                            className="font-bold text-text-[0.8rem] sm:text-base md:text-lg-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 " />
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors.domain_id || '‎'}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-3 " >
                    <div className="flex  w-full sm:basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Prn</p>
                        <input
                            type="text"
                            name="prn"
                            value={form?.prn}
                            pattern="[0-9]{6}"
                            maxLength={6}
                            onChange={(e) => setForm({ ...form, prn: e.target.value })}
                            className="  font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 " />
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors.prn || '‎'}</p>

                    </div>
                    <div className="flex w-full sm:basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Dept</p>
                        <select
                            name="department"
                            placeholder="department"
                            value={form?.department}
                            onChange={(e) => setForm({ ...form, department: e.target.value })}
                            className="w-full caret-green-600 pl-4 py-2 px-3 sm:px-4 md:px-6 border-2 bg-green-100/20  border-zinc-300 outline-none focus:outline-none focus:border-black md:text-lg font-bold placeholder:text-gray-500 text-gray-800 rounded-lg p-2 "
                        >
                            <option value="" disabled hidden>
                                Select Department
                            </option>
                            {
                                dept_options?.map((el) => (
                                    <option value={el} key={el} >{el}</option>
                                ))
                            }
                        </select>
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors.department || '‎'}</p>

                    </div>
                    <div className="flex w-full sm:basis-[20%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Year</p>
                        <select name="year"
                            value={form?.year}
                            onChange={(e) => setForm({ ...form, year: e.target.value })}
                            className="  font-bold text-text-[0.8rem] sm:text-base md:text-lg-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300"  >
                            <option value="" disabled hidden>
                                Select Year
                            </option>
                            {
                                year_options?.map((el) => (
                                    <option value={el} key={el} >{el}</option>
                                ))
                            }
                        </select>
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors?.year || '‎'}</p>
                    </div>
                    <div className="flex w-full sm:basis-[20%]  items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Sem</p>
                        <select
                            name="sem"
                            placeholder="sem"
                            value={form?.sem}
                            onChange={(e) => setForm({ ...form, sem: e.target.value })}
                            className=" font-bold text-text-[0.8rem] sm:text-base md:text-lg-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >
                            <option value="" disabled hidden>
                                Select Sem
                            </option>
                            {
                                sem_options?.map((el) => (
                                    <option value={el} key={el} >{el}</option>
                                ))
                            }
                        </select>
                        <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors?.sem || '‎'}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Id Card</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage ? selectedImage : (user?.idCards || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-cover"
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-2 md:p-3 ">
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
                            <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold ">{errors?.idCard || '‎'}</p>
                        </div>
                    </div>
                </div >
                <div className="w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-lg  " >
                    <button onClick={SubmitHandler} className="flex flex-col items-start justify-center space-y-2  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-105 md:hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  "  >Update</p>
                    </button>
                </div>
            </div >
            <div className="flex items-center justify-center w-full bg-gray-400 h-[2px] rounded-full mt-12 "></div>
            <div className="flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  py-20 ">
                <div className="flex w-full h-full items-center justify-start mb-4 md:mb-6">
                    <h3 className=" w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl p-0 m-0 rounded-md md:self-start italic " >Requests</h3>
                    <div className="w-full h-full bg-[#74c69d90] ml-6 p-1 rounded-sm">‎</div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-green-600 ">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved By</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Admin Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >30, Dec 2023</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued By</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-sky-600 ">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved By</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Admin Name</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Approved On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >30, Dec 2023</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-sky-400 font-bold  transition-all duration-500 ease-linear to-sky-500 text-white rounded-xl mx-auto" >Issuance Pending</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-orange-300 ">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-orange-400 font-bold  transition-all duration-500 ease-linear to-orange-500 text-white rounded-xl mx-auto" >Approval Pending</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-red-600 ">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Applied On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >21, Dec 2023</p>
                        </div>
                        <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Duration</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Medium</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Pdc</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Dec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                        <button onClick={(e) => { setModalPopped("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images"); }} className="flex flex-col items-start justify-center space-y-2 basis-1/4 w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Rec</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Yasier Zahir Ansari</p> */}
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg ">
                                <div className="absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 ">
                                    <BsArrowsFullscreen className=" w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 md:stroke-[1.5] " />
                                </div>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images" className="w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg" />
                            </div>
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  " >
                        <div className="flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto " >
                            <p className="p-2 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-red-400 font-bold  transition-all duration-500 ease-linear to-red-500 text-white rounded-xl mx-auto" >Approval Rejected</p>
                            {/* <p className="font-text-[0.8rem] sm:text-base md:text-lg-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >Maint Name</p> */}
                        </div>
                        {/* <div className="flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full " >
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Issued On</p>
                            <p className="font-bold text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 "  >3, Jan 2024</p>
                        </div> */}
                    </div>
                </div>
            </div>



        </>
    )
}

export default UserProfile