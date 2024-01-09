import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
// import { useSession } from "@/hooks/useSession"
import { Link } from "react-router-dom"
// import { AuthContext } from "@/hooks/AuthContext"
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";

const UserLogin = ({ authWork }) => {
    const [authType, setAuthType] = useState("login");
    const { user, setUser, setLoginData, mainLoading } = useContext(AuthContext);
    // const { createUserWithEmail, loginUserWithEmail, createUserWithGithub, createUserWithGoogle, loginUserWithGithub, loginUserWithGoogle } = useSession()
    // const { authReady, userInfo } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
        prn: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        prn: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
        if (!form.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.email)) {
            newErrors.email = 'College Domain Email required';
            valid = false;
        } else {
            newErrors.email = '';
            valid = true;
        }

        if (!form.prn) {
            newErrors.prn = 'PRN is required';
            valid = false;
        } else if (!/^[0-9]{6}$/.test(form.prn)) {
            newErrors.prn = 'PRN contains 6 numeric value';
            valid = false;
        } else {
            newErrors.email = '';
            valid = true;
        }
        setErrors(newErrors);
        return valid;
    };

    const loginHelper = async (email, prn, password) => {
        const response = await fetch('http://localhost:8000/api/v1/student/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain_id: email, prn, password }),
        });
        if (response.status === 200) {
            const res = await response.json();
            setLoginData(res?.data);
            toast.success('Login Successful')
            navigate('/profile')
        } else if (response?.status === 401) {
            setErrors({ prn: '', email: '', password: "Input the correct password" })
        }
        else if (response?.status === 404) {
            setErrors({ prn: '', password: '', email: "Email not registered yet" })
        } else if (response?.status === 403) {
            setErrors({ email: '', password: '', prn: "PRN not registered yet" })
        }
        else {
            toast.error(`Login fail - "Some Error Ocurred"`, {
                position: "top-center"
            });
        }

    }


    const loginUserHandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("doing");
            await loginHelper(form?.email, form?.prn, form?.password);
        }
    };
    return (
        <div className="w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 " >
            {
                !mainLoading ?
                    <>
                        <div className="flex flex-col relative max-w-[450px] items-center py-12 px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-6 md:space-y-8 xl:space-y-10 ">
                            <div className="flex w-full flex-col ">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center" >Log In</h2>
                                <h6 className="text-[0.8rem] sm:text-sm md:text-base mt-4 text-center" >
                                    continue your application or track your DLRC application status
                                </h6>
                            </div>
                            <div className="bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl  " ></div>
                            <form className="flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center">
                                <div className=" text-[0.8rem] sm:text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="prn"
                                        required={true}
                                        placeholder="PRN"
                                        value={form.prn}
                                        pattern="[0-9]{6}"
                                        onChange={(e) => setForm({ ...form, prn: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.prn && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.prn}</p>}
                                </div>
                                <div className=" text-[0.8rem] sm:text-base md:text-lg w-full">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.email && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.email}</p>}
                                </div>
                                <div className=" text-[0.8rem] sm:text-base md:text-lg w-full">
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="true"
                                        required
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.password && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.password}</p>}
                                </div>
                                <div className=" text-[0.8rem] sm:text-base md:text-lg md:p-2 pt-6 sm:pt-8 md:pt-10 font-normal w-full">
                                    <button
                                        type="submit"
                                        onClick={loginUserHandler}
                                        className="bg-gradient-to-tr from-[#40916c] to-[#74c69d]  px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-bold italic w-full z-40"
                                    >
                                        Log In
                                    </button>
                                </div>

                                <div className=" text-sm  font-normal w-full -mt-2 flex justify-center space-x-2 items-center">
                                    <span>No Account? </span>
                                    <a href="/user/register" className="hover:font-medium text-green-700 font-bold ">
                                        Register
                                    </a>
                                </div>
                            </form>
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

export default UserLogin