import React, { useContext, useRef, useState } from 'react'
import { LuFolderEdit, LuFileBarChart } from "react-icons/lu"
import { AuthContext } from "../context/AuthContext"
import { FiFileText } from "react-icons/fi";
const UserApplicationComp = () => {
    const [form, setForm] = useState({
        parents_Dec: '',
        students_Dec: '',
        faculty_Rec: '',
        pdc: ''
    })
    const [errors, setErrors] = useState({
        parents_Dec: '',
        students_Dec: '',
        faculty_Rec: '',
        pdc: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
        if (form?.parents_Dec) {
            const fileSize = form?.parents_Dec.size / 1024; // Size in KB
            const allowedSize = 1024; // 1MB

            if (fileSize > allowedSize) {
                newErrors.parents_Dec = 'Image size must be under 1MB';
                valid = false;
            } else if (!form?.parents_Dec.type !== "image/jpeg") {
                newErrors.parents_Dec = 'Image must be in JPEG/JPG format';
                valid = false;
            } else {
                newErrors.parents_Dec = '';
            }
        }
        if (form?.students_Dec) {
            const fileSize = form?.students_Dec.size / 1024; // Size in KB
            const allowedSize = 1024; // 1MB

            if (fileSize > allowedSize) {
                newErrors.students_Dec = 'Image size must be under 1MB';
                valid = false;
            } else if (!form?.students_Dec.type !== "image/jpeg") {
                newErrors.students_Dec = 'Image must be in JPEG/JPG format';
                valid = false;
            } else {
                newErrors.students_Dec = '';
            }
        }
        if (form?.faculty_Rec) {
            const fileSize = form?.faculty_Rec.size / 1024; // Size in KB
            const allowedSize = 1024; // 1MB

            if (fileSize > allowedSize) {
                newErrors.faculty_Rec = 'Image size must be under 1MB';
                valid = false;
            } else if (!form?.faculty_Rec.type !== "image/jpeg") {
                newErrors.faculty_Rec = 'Image must be in JPEG/JPG format';
                valid = false;
            } else {
                newErrors.faculty_Rec = '';
            }
        }
        if (form?.pdc) {
            const fileSize = form?.pdc.size / 1024; // Size in KB
            const allowedSize = 1024; // 1MB

            if (fileSize > allowedSize) {
                newErrors.pdc = 'Image size must be under 1MB';
                valid = false;
            } else if (!form?.pdc.type !== "image/jpeg") {
                newErrors.pdc = 'Image must be in JPEG/JPG format';
                valid = false;
            } else {
                newErrors.pdc = '';
            }
        }

        setErrors(newErrors);
        return valid;
    };
    const [selectedImage1, setSelectedImage1] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [selectedImage3, setSelectedImage3] = useState();
    const [selectedImage4, setSelectedImage4] = useState();

    const handleImageChange1 = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, parents_Dec: file })
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage1(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageChange2 = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, students_Dec: file })
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage2(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageChange3 = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, faculty_Rec: file })
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage3(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageChange4 = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, pdc: file })
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage4(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log(form);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 min-h-screen py-6 " >
            <div className="flex flex-col items-center justfiy-center max-w-4xl w-full h-full mx-auto">
                <div div className="flex items-center space-x-6 text-6xl justify-center w-full h-full mt-12 mb-8 text-center mx-auto" >
                    <FiFileText className=" text-[#40916c] " />
                    <h1 className="font-bold  italic" >Apply</h1>
                </div>
                <div className="mb-16" >
                    <p>
                        To borrow a laptop, you are required to fill the given application. Take heed that we will fetch your details from your profile and the form below to issue your laptop. If you wish, you can update your profile <a href="/user/profile" className="" >here.</a> You can the status of your application in your <a href="">profile</a>
                    </p>
                </div>
            </div>
            <form className="flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  pb-20" >
                {/* <p>
                        To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                        Please note the given rules and regulations
                    </p> */}
                <div className="w-full flex items-center justify-between space-x-6 cursor-not-allowed select-none text-[0.6rem]  " >
                    <div className="flex flex-col items-start justify-center space-y-2 basis-[60%] w-full " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Name</p>
                        <p className="font-bold text-xs md:text-sm  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300  "  >Yasier Zahir Ansari</p>
                    </div>
                    <div className="flex items-start justify-center space-y-2 flex-col  basis-[40%] w-full " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Email</p>
                        <p className="font-bold text-xs md:text-sm  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   "  >yasier.412007.cs@mhssce.ac.in</p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between space-x-6 cursor-not-allowed select-none text-[0.6rem]  " >
                    <div className="flex basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Prn</p>
                        <p className="  text-xs md:text-sm font-bold  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   "  >412007</p>
                    </div>
                    <div className="flex basis-[30%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Dept</p>
                        <p className=" font-bold text-xs md:text-sm  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   "  >CSE </p>
                    </div>
                    <div className="flex basis-[20%] items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Year</p>
                        <p className="  text-xs md:text-sm font-bold pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   "  >TE </p>
                    </div>
                    <div className="flex basis-[20%]  items-start justify-center space-y-2 flex-col " >
                        <p className="bg-[#40916c95] rounded-lg px-2 py-1 md:px-3 md:py-[5px]  font-bold text-white" >Sem</p>
                        <p className=" font-bold text-xs md:text-sm  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   "  >VII </p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Parent Decleration</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input1" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage1 ? selectedImage1 : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-2xl object-cover aspect-video "
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                        <LuFolderEdit className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                                    </div>
                                </label>
                                <input
                                    id="image-input1"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    name="Parents_Dec"
                                    onChange={handleImageChange1}
                                />
                            </div>
                            {errors.parents_Dec && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.parents_Dec}</p>}
                            {/* </input> */}
                        </div>

                    </div>
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Student Decleration</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input2" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage2 ? selectedImage2 : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-2xl object-cover aspect-video "
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                        <LuFolderEdit className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                                    </div>
                                </label>
                                <input
                                    id="image-input2"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    name="students_Dec"
                                    onChange={handleImageChange2}
                                />
                            </div>
                            {errors.students_Dec && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.students_Dec}</p>}
                        </div>

                    </div>
                </div >
                <div className="w-full flex items-center justify-between space-x-6  " >
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Faculty Recommendation</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input3" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage3 ? selectedImage3 : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-2xl object-cover aspect-video "
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                        <LuFolderEdit className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                                    </div>
                                </label>
                                <input
                                    id="image-input3"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    name="faculty_Rec"
                                    onChange={handleImageChange3}
                                />
                            </div>

                            {errors.faculty_Rec && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.faculty_Rec}</p>}
                        </div>

                    </div>
                    <div className="flex flex-col items-start justify-center space-y-2 w-full " >
                        <div className="flex items-start justify-start w-full h-full flex-col space-y-3 ">
                            <p className="bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white" >Post Dated Cheque</p>
                            <div className="flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg">
                                <label htmlFor="image-input4" className=" relative cursor-pointer">
                                    <img
                                        src={selectedImage4 ? selectedImage4 : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                        alt="Selected Image"
                                        className="w-full h-full rounded-2xl object-cover aspect-video "
                                        width={100}
                                        height={100}
                                    />
                                    <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                        <LuFolderEdit className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                                    </div>
                                </label>
                                <input
                                    id="image-input4"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    name="fourth"
                                    onChange={handleImageChange4}
                                />
                            </div>
                            {errors.pdc && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.pdc}</p>}
                        </div>
                    </div>
                </div >
                <div className="w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-lg  " >
                    <button onClick={handleSubmit} className="flex flex-col items-start justify-center space-y-2  w-full " >
                        <p className="font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  "  >Apply</p>
                    </button>
                </div>
            </form >
        </div>
    )
}

export default UserApplicationComp