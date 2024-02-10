import React from 'react'

const InfoListItems = ({ children }) => {
    return (
        <li className=" before:content-['0'] before:text-green-700 before:mr-2 ">
            {children}
        </li>
    )
}

export default InfoListItems