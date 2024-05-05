import React from 'react';
import './Header.css'
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie'

export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
    console.log(useCookies(['authToken']),"Token");
    
    const navigate=useNavigate()
    
    const logout = () => {
        removeCookie('authToken');
        navigate("/");
    }
    return (

        <nav className="bg-white grid grid-cols-4 h-16 shadow-lg">
            <div className="w-60 flex justify-end items-center  text-2xl">
                <img className="w-12 px-2" src="./Assets/img1.png" />
                <h2 className="font-bold text-gray-700 font-inter">Company</h2>
            </div>
            <div className="w-48 flex justify-center items-center">
                <input type="text" name="search" placeholder="Search" className="border border-gary-500 h-8 rounded-full px-2" />
            </div>
            <div className="col-span-2 w-auto flex justify-center items-center space-x-4 font-sans font-medium">
                <Link className='font-semibold text-gray-700 font-inter' to="/home"><span>Home</span></Link>
                <Link className='font-semibold text-gray-700 font-inter' to="/user"><span>Users</span></Link>
                <Link className='text-gray-700 font-semibold font-inter' to="/adduser"><span>Add-User</span></Link>
                <Link className='text-gray-700 font-semibold font-inter' to="/profile"><span>Profile</span></Link>
                <Link className='text-gray-700 font-semibold font-inter' to="/msg"> <span><i class='far fa-comments'></i></span></Link>

               
                <span onClick={logout} className="cursor-pointer text-gray-700 font-semibold font-inter">Logout</span>
            </div>

       
        </nav>

    )
}
