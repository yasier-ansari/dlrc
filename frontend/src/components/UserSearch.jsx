import React, { useContext, useState } from 'react'
import debounce from "lodash.debounce"
import { HiOutlineSearch } from 'react-icons/hi'
// import { ListContext } from "../context/ListContext"
import { IoMdRefresh } from 'react-icons/io'

const SearchInput = (props) => {
    const [searchText, setSearchText] = useState('')
    let searchHandler = (e) => {
        e.preventDefault()
        let res = e.target.value;
        setSearchText(res);
        props.searchRefresh(res)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        props.searchRefresh(searchText)
        console.error("ad")
    }
    return (
        <>
            <form className="relative w-full py-2 lg:basis-[40%] lg:py-1 justify-center flex items-center rounded-md bg-slate-200 text-sm " >
                <button onClick={submitHandler}>
                    < HiOutlineSearch className="absolute w-4 h-4 md:w-6 md:h-6 top-[26%] left-3 md:left-4 md:top-[26%] lg:top-[20%] " />
                </button>
                <input onChange={searchHandler} value={searchText} type="text" placeholder="Search..." className="  block w-full pl-10  outline-none md:pl-12  lg:pl-12 sm:py-1 md:py-2 h-full rounded-md bg-slate-200  " />
            </form>
        </>
    )
}

const Search = () => {
    // const { getSearchData, setCurrency, setOrder, refreshPage } = useContext(ListContext)
    const searchRefresh = debounce(function (val) {
        getSearchData(val)
    }, 1000);
    const dept_options = ['CSE (AI - ML)', 'CSE (AI - DS)', 'COMPS', 'IT', 'Electrical', 'Mechanical', 'Civil', 'AutoMobile'];
    const sem_options = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

    return (
        <div className="flex flex-col w-[95%] md:w-[90%] mx-auto lg:flex-row p-1 sm:p-2 md:p-3 lg:p-4 justify-between items-center max-w-6xl relative">
            <SearchInput searchRefresh={searchRefresh} />
            <div className="flex text-xs md:text-base flex-col md:flex-row w-max mt-3 sm:mt-5 lg:mt-0 space-y-3 sm:space-y-5 justify-start items-center md:space-y-0 md:justify-end lg:space-x-12 last:space-x-6 " >
                <div className="flex items-center justify-center space-x-5  md:space-x-8 lg:space-x-3 text-sm" >
                    <div className="" >Department:</div>
                    <select onChange={(e) => setCurrency(e.target.value)} value={''} className=" text-black bg-slate-200 rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-1 md:py-2 outline-none " >
                        <option value="" disabled hidden>
                            Select Department
                        </option>
                        {
                            dept_options.map((cur, key) => {
                                return (<option value={cur} key={key} >{cur}</option>)
                            }
                            )
                        }
                    </select>
                </div>
                <div className="flex items-center justify-center space-x-5 md:space-x-8 lg:space-x-3 text-sm" >
                    <div className="" >Sem:</div>
                    <select onChange={(e) => setOrder(e.target.value)} value={''} className=" bg-slate-200  text-black rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-1 md:py-2 outline-none " >
                        <option value="" disabled hidden>
                            Select Sem
                        </option>
                        {
                            sem_options.map((cur, key) => {
                                return (<option value={cur} key={key} >{cur}</option>)
                            }
                            )
                        }
                    </select>
                    <button className="flex items-center justify-center" >
                        < IoMdRefresh className=" hover:fill-green-700 fill-green-600  w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6 lg:h-7 lg:w-7 " />
                    </button>
                </div>
            </div >
        </div >
    )
}

export default Search;