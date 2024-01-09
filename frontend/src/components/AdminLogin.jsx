import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'

const AdminLoginComp = () => {
    const { mainLoding, user, userType, setUserType, setUser, setToken_, setLoginData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
        if (!form.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };
    const loginHelper = async (email, password) => {
        const response = await fetch('http://localhost:8000/api/v1/admin/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.status === 200) {
            const res = await response.json();
            setLoginData(res?.data);
            toast.success('Login Successfull')
            // navigate('/admin')
        } else if (response?.status === 401) {
            setErrors({ email: '', password: "Input the correct password" })
        }
        else if (response?.status === 404) {
            setErrors({ password: '', email: "Email not registered yet" })
        } else {
            toast.error(`Login fail - "Some Error Ocurred"`, {
                position: "top-center"
            });
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await loginHelper(form?.email, form?.password);
        }
    }
    return (
        <div className="w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 " >
            {
                !mainLoding ?
                    <>
                        <div className="flex flex-col relative max-w-[450px] items-center py-12 px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-4 md:space-y-8 xl:space-y-10 ">
                            <div className="flex w-full flex-col ">
                                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center" >Log In</h2>
                            </div>
                            <div className="bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl" ></div>
                            <form className="flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center">
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="test"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={form?.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors?.email && <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs md:text-sm ml-2 font-light ">{errors?.email}</p>}
                                </div>
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        value={form?.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors?.password && <p className="text-[#db3100] text-start text-[0.7rem] sm:text-xs md:text-sm ml-2 font-light ">{errors?.password}</p>}
                                </div>
                                <div className="text-base md:text-lg md:p-2 pt-6 sm:pt-8 font-normal w-full">
                                    <button
                                        type="submit"
                                        onClick={submitHandler}
                                        className="bg-gradient-to-tr from-[#40916c] to-[#74c69d]  px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-bold italic w-full"
                                    >
                                        Log In
                                    </button>
                                </div>

                                <div className=" text-sm  font-normal w-full -mt-2 flex justify-center space-x-2 items-center">
                                    <span>Not an Admin? </span>
                                    <a href="/admin/register" className="hover:font-medium text-green-700 font-bold ">
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

export default AdminLoginComp