import React from 'react'
import './Footer.css'
export default function Footer() {
    return (
       
        <div className="bg-white h-20 border-1 shadow-lg grid grid-cols inset-x-0 bottom-0">
            <div className="flex justify-center items-center space-x-4 font-semibold text-gray-600 font-inter">
                    <span>Home</span>
                    <span>About</span>
                    <span>Contact</span>
                    <span>Sign in</span>
                </div>
                <div className="text-xs">
                    <p>@ 2022 Company.All right reserved</p>
                </div>
        </div>

    )
}
