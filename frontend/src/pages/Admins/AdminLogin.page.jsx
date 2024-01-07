import AdminLoginComp from "../../components/AdminLogin"
import AuthHeader from "../../components/AuthHeader"

const AdminLogin = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%]  " >
                <AdminLoginComp />
            </main>
        </div>)
}

export default AdminLogin