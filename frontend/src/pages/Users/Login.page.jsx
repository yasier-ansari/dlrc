import UserLogin from "../../components/UserLogin";
import AuthHeader from "../../components/AuthHeader";

const Login = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%]  " >
                <UserLogin />
            </main>
        </div>
    )
}

export default Login