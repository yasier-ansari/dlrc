import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
// import { useSession } from "@/hooks/useSession"
import { Link } from "react-router-dom"
// import { AuthContext } from "@/hooks/AuthContext"
import { toast } from 'react-toastify';

const MaintRegisterComp = () => {
    const authType = 'register';
    // const { createUserWithEmail, loginUserWithEmail, createUserWithGithub, createUserWithGoogle, loginUserWithGithub, loginUserWithGoogle } = useSession()
    // const { authReady, userInfo } = useContext(AuthContext);
    const dept_options = ['CSE (AI - ML)', 'CSE (AI - DS)', 'COMPS', 'IT', 'Electrical', 'Mechanical', 'Civil', 'AutoMobile'];
    const sem_options = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    const [form, setForm] = useState({
        email: '', password: '', fullname: '', key: ''
    })
    const [errors, setErrors] = useState({
        email: '', password: '', fullname: '', key: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!form.fullname) {
            newErrors.name = 'Name is required';
            valid = false;
        } else {
            newErrors.name = '';
        }

        if (!form.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.domain_idemail)) {
            newErrors.email = 'College Domain Email required';
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

        setErrors(newErrors);
        return valid;
    };
    const submitHandler = async (e) => {
        if (authType === "Register") {
            await register(e)
        } else {
            await loginWithEmail(e);
        }
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
                        <div className="flex flex-col relative max-w-[450px] items-center py-12 px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-4 md:space-y-8 xl:space-y-10 ">
                            <div className="flex w-full flex-col ">
                                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center" >Register</h2>
                                <h6 className="text-sm mt-4 text-center" >
                                    Make sure that you already have a developer defined secret key with you
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
                                        pattern="[0-9]{20}"
                                        maxLength={20}
                                        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.fullname && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.fullname}</p>}
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

                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="key"
                                        required={true}
                                        placeholder="Secret Key"
                                        value={form.key}
                                        onChange={(e) => setForm({ ...form, key: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:outline-none focus:border-black placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.key && <p className="text-[#db3100] text-start text-sm ml-2 font-light ">{errors.key}</p>}
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

                                    <span>Already in Maintenance Team? </span>
                                    <a href="/maintenance/login" className="hover:font-medium text-green-700 font-bold ">
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

export default MaintRegisterComp