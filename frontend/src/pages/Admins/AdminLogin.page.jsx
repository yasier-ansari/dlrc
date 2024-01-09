import AdminLoginComp from "../../components/AdminLogin"
import AuthHeader from "../../components/AuthHeader"

const AdminLogin = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%] items-center justfiy-center sm:items-start sm:justify-start px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 " >
                <AdminLoginComp />
            </main>
        </div>)
}

export default AdminLogin