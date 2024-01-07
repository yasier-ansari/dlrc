import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
// import { useSession } from "@/hooks/useSession"
import { Link } from "react-router-dom"
// import { AuthContext } from "@/hooks/AuthContext"
import { toast } from 'react-toastify';
import { LuFolderEdit } from "react-icons/lu";

const UserRegister = () => {
    const authType = 'register';
    // const { createUserWithEmail, loginUserWithEmail, createUserWithGithub, createUserWithGoogle, loginUserWithGithub, loginUserWithGoogle } = useSession()
    // const { authReady, userInfo } = useContext(AuthContext);
    const dept_options = ['CSE (AI - ML)', 'CSE (IOT - BT)', 'COMPS', 'IT', 'Electrical', 'Mechanical', 'Civil', 'AutoMobile'];
    const sem_options = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const year_options = ['FE', 'SE', 'TE', 'BE'];
    const [form, setForm] = useState({
        fullname: '', domain_id: '', prn: '', password: '', department: '', year: '', sem: '', number: '', idCard: ''
    })
    const [errors, setErrors] = useState({
        fullname: '', domain_id: '', prn: '', password: '', department: '', year: '', sem: '', number: ''
    });
    const [selectedImage, setSelectedImage] = useState();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, idCard: e.target.files[0] });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!form.fullname) {
            newErrors.fullname = 'Name is required';
            valid = false;
        } else {
            newErrors.name = '';
        }

        if (!form.domain_id) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.domain_id)) {
            newErrors.email = 'College Domain Email required';
            valid = false;
        } else {
            newErrors.email = '';
        }

        if (!form.prn) {
            newErrors.prn = 'PRN is required';
            valid = false;
        } else if (!/^[0-9]{6}$/.test(form.prn)) {
            newErrors.prn = 'PRN contains 20 numeric value';
            valid = false;
        } else {
            newErrors.email = '';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(form.password)) {
            newErrors.password =
                'Password must be at least 6 characters long and should contain {aA-zZ,0-9}';
            valid = false;
        }

        if (form?.idCard) {
            const fileSize = form?.idCard.size / 1024; // Size in KB
            const allowedSize = 1024; // 1MB

            if (fileSize > allowedSize) {
                newErrors.image = 'Image size must be under 1MB';
                valid = false;
            } else if (!form?.idCard.type !== "image/jpeg") {
                newErrors.idCard = 'Image must be in JPEG/JPG format';
                valid = false;
            } else {
                newErrors.idCard = '';
            }
        }

        if (!form?.department || !dept_options.includes(form?.department)) {
            newErrors.department = 'Please select a valid department'
            valid = false;
        } else {
            newErrors.department = 'Department is required'
            valid = false;
        }
        if (!form?.sem || !sem_options.includes(form?.sem)) {
            newErrors.sem = 'Please Select a valid Sem'
            valid = false;
        } else {
            newErrors.sem = 'Sem is required'
            valid = false;
        }
        if (!form?.year || !year_options.includes(form?.year)) {
            newErrors.year = 'Please Select a valid Year'
            valid = false;
        } else {
            newErrors.year = 'Year is required'
            valid = false;
        }

        // console.log(form.idCard);

        setErrors(newErrors);
        return valid;
    };
    const submitHandler = async (e) => {
        await register(e)
    }
    const googleHandler = async (e) => {
        if (authType === "Register") {
            await registerGoogle(e);
            console.log("register google ")
        } else {
            await loginGoogle(e);
            console.log("login google ")
        }
    }
    const githubHandler = async (e) => {
        if (authType === "Register") {
            await registerGithub(e)
            console.log("register google ")
        } else {
            await loginGithub(e);
            console.log("login google ")
        }
    }



    const register = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await createUserWithEmail(form.fullname, form.domain_id, form.password, form.opted);
                setForm({
                    email: '',
                    password: '',
                    name: '',
                    opted: true
                });
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrors({ email: 'Email is already taken' });
                } else {
                    toast(`${error.message}`, { hideProgressBar: true, autoClose: 2000, type: 'error', });
                }
            }
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            await loginUserWithEmail(form.domain_id, form.password, setErrors)
            setForm({
                email: '',
                password: '',
                name: '',
                opted: true
            })
        }
    }
    const registerGoogle = async (e) => {
        e.preventDefault()
        await createUserWithGoogle()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    const loginGoogle = async (e) => {
        e.preventDefault()
        await loginUserWithGoogle()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    const registerGithub = async (e) => {
        e.preventDefault()
        await createUserWithGithub()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })

    }
    const loginGithub = async (e) => {
        e.preventDefault()
        await loginUserWithGithub()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    // useEffect(() => {
    //     if (authReady) {
    //         if (!userInfo) {
    //             console.log("persist")
    //         } else {
    //             redirect('/')
    //         }
    //     }
    // }, [authReady]);
    const [authReady, setAuthReady] = useState(true);
    return (
        <div className="w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 min-h-screen py-6 " >
            {
                authReady ?
                    <>
                        <div className="flex flex-col relative max-w-[500px] items-center py-12 px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-4 md:space-y-8 xl:space-y-10 ">
                            <div className="flex w-full flex-col ">
                                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center" >Register</h2>
                                <h6 className="text-sm mt-4 text-center" >
                                    Populate your user profile and start your application here
                                </h6>
                            </div>
                            <div className="bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl" ></div>
                            <form className="flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center">
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="fullname"
                                        required={true}
                                        placeholder="Full Name"
                                        value={form.fullname}
                                        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.fullname && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.fullname}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="prn"
                                        required={true}
                                        placeholder="PRN"
                                        value={form.prn}
                                        pattern="[0-9]{20}"
                                        maxLength={20}
                                        onChange={(e) => setForm({ ...form, prn: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.prn && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.prn}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={form.domain_id}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.email && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.email}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <select
                                        name="department"
                                        required={true}
                                        placeholder="department"
                                        value={form.department}
                                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                                        className="w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
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
                                    {errors.department && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.department}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <select
                                        name="sem"
                                        required={true}
                                        placeholder="sem"
                                        value={form.sem}
                                        onChange={(e) => setForm({ ...form, sem: e.target.value })}
                                        className="w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    >
                                        <option value="" disabled hidden>
                                            Select Sem
                                        </option>
                                        {
                                            sem_options?.map((el) => (
                                                <option value={el} key={el} >{el}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.sem && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.sem}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <select
                                        name="year"
                                        required={true}
                                        placeholder="(FE, SE, ...)"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        className="w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    >
                                        <option value="" disabled hidden>
                                            Select Year
                                        </option>
                                        {
                                            year_options?.map((el) => (
                                                <option value={el} key={el} >{el}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.year && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.year}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="prn"
                                        required={true}
                                        placeholder="PRN"
                                        value={form.prn}
                                        pattern="[0-9]{6}"
                                        onChange={(e) => setForm({ ...form, number: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.prn && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.prn}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    {/* <input
                                        type="file"
                                        accept="image/*"
                                        name="idCard"
                                        required
                                        placeholder="Image"
                                        value={form.idCard?.result || ''}
                                        onChange={(e) => setForm({ ...form, idCard: e.target.files[0] })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    /> */}
                                    <label htmlFor="image-input" className=" relative cursor-pointer">
                                        <img
                                            src={selectedImage ? selectedImage : ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images")}
                                            alt="Selected Image"
                                            className="w-full h-full rounded-2xl object-cover"
                                            width={100}
                                            height={100}
                                        />
                                        <div className="absolute top-0 right-0 bg-[#74c69d] rounded-2xl p-1 sm:p-2 md:p-3 ">
                                            <LuFolderEdit className="w-5 h-5 md:h-6 md:w-6" />
                                        </div>
                                    </label>
                                    <input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        name="idCard"
                                        onChange={handleImageChange}
                                    />
                                    {errors.idCard && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.idCard}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.password && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.password}</p>}
                                </div>
                                <div className="text-base md:text-lg p-2 font-normal w-full">
                                    <button
                                        type="submit"
                                        onClick={submitHandler}
                                        className="bg-gradient-to-tr from-[#40916c] to-[#74c69d]  px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-bold italic w-full"
                                    >
                                        Register
                                    </button>
                                </div>

                                <div className=" text-sm  font-normal w-full -mt-2 flex justify-center space-x-2 items-center">

                                    <span>Already have an Account? </span>
                                    <a href="/user/login" className="hover:font-medium text-green-700 font-bold ">
                                        Login
                                    </a>
                                </div>
                            </form>
                            <div className="absolute w-full h-full -bottom-2 left-2 rounded-2xl bg-[#74c69d] -z-30 "></div>
                        </div>
                    </> :
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
                        <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
                            <h2 className="text-lg font-semibold">Loading</h2>
                            <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
                        </div>
                    </div >
            }
        </div>
    )
}

export default UserRegister