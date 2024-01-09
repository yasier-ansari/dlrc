import React, { useContext } from 'react'
// import { ListContext } from "../context/ListContext"
// import Paginator from "./Paginator";
import { Link } from "react-router-dom";

const List = () => {
    // let { apiData = [] } = useContext(ListContext);
    let apiData = [];
    return (
        <>
            <div className="flex flex-col rounded-md items-center justify-center " >
                {
                    apiData ? (
                        <table className=" table-auto w-full dark:border border-2 rounded-md border-black/30 max-w-7xl overflow-auto  " >
                            <thead className="text-base text-center font-medium md:text-lg rounded-md border-black/50 border-b bg-[#f9f9ff] " >
                                <tr className="rounded-md" >
                                    <th className="py-1 md:py-2 " >Name</th>
                                    <th className="py-1 md:py-2 md:table-cell hidden " >Email</th>
                                    <th className="py-1 md:py-2 " >Department</th>
                                    <th className="py-1 md:py-2 lg:table-cell hidden " >Sem</th>
                                    <th className="py-1 md:py-2 md:table-cell hidden " >Roll no.</th>
                                    {/* <th className="py-1 md:py-2  " >Requested On</th> */}
                                    {/* <th className="py-1 md:py-2 lg:table-cell hidden " >Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    apiData?.map((res, key) => {
                                        return (
                                            <tr key={key} className="dark:border-b  border-black/30  border-b-2 first:border-t-2 uppercase last:border-b-0 text-center hover:bg-purple-200 " >
                                                <td className=" flex ml-2 items-center space-x-1 py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4" >
                                                    <Link to={`/${res?.id}`} className="flex items-center justify-center" >
                                                        <p className="ml-2" >{res?.name}</p>
                                                    </Link>
                                                </td>
                                                <td className=" py-1 md:py-2 lg:py-3 px-2 font-medium sm:px-3 md:px-4 md:table-cell hidden " >
                                                    <p >
                                                        {res?.domain_id}
                                                    </p>
                                                </td>
                                                <td className="py-1 md:py-2 lg:py-3 px-2 sm:px-3 md:px-4" >  {res?.dept}</td>
                                                <td className="py-1 md:py-2 lg:py-3 px-2 sm:px-3 md:px-4 lg:table-cell hidden" >
                                                    {
                                                        res?.sem
                                                    }
                                                </td>
                                                <td className="py-1 md:py-2 lg:py-3 px-2 sm:px-3 md:px-4 lg:table-cell hidden" >
                                                    {
                                                        res?.number
                                                    }
                                                </td>
                                                {/* <td className={`${res?.market_cap_change_percentage_24h}` > 0 ? ' text-green-500 py-1 md:py-2 lg:py-3 font-semibold px-2 sm:px-3 md:px-4 md:table-cell hidden ' : ' text-red-400 py-1 md:py-2 lg:py-3 font-semibold px-2 sm:px-3 md:px-4 md:table-cell hidden '} >{res?.requested_on}% </td>
                                                <td className={`${res?.market_cap_change_percentage_24h}` > 0 ? ' text-green-500 py-1 md:py-2 lg:py-3 font-semibold px-2 sm:px-3 md:px-4 md:table-cell hidden ' : ' text-red-400 py-1 md:py-2 lg:py-3 font-semibold px-2 sm:px-3 md:px-4 md:table-cell hidden '} >{res?.status}% </td> */}

                                            </tr>
                                        )
                                    }
                                    )
                                }
                            </tbody>
                        </table>) : (
                        <div className="h-60 border border-gray-400 rounded-lg bg-purple-200/50 dark:bg-[#3a3a3a] w-full flex space-x-4 font-semibold justify-center items-center ">
                            <div className="h-6 w-6 bg-transparent animate-spin border-purple-500 rounded-full border-b-gray-400 border-4 "  ></div>
                            <p className="text-lg md:text-xl lg:text-2xl" >Searching...</p>
                        </div>
                    )
                }
                <div>
                    {/* <Paginator /> */}
                </div>
            </div>

        </>
    )
}

export default List;