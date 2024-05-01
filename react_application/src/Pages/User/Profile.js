import React from 'react';
import profile from '../../Assets/profil.png';
import phone from "../../Assets/phone.png"
import pluse from "../../Assets/plus.png"
import M from "../../Assets/Rectangle.png"
import pg from "../../Assets//P&G.png"
import face from '../../Assets/face1.png'
import face2 from '../../Assets/face2.png'

function Profile() {
    return (
        <div>
            <div className="mx-48 my-4 text-gray-500 text-sm flex space-x-2 font-inter">
                <p className="text-green-500 font-semibold ">Home</p>
                <p>></p>
                <p>Aron Jose</p>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-white w-9/12 shadow-xl h-[2024px]">
                    <div className="bg-white-400 grid grid-cols-2 px-4 py-4 border border-gary-500 ">
                        <div className="h-[250px] ">

                            <div className="flex items-center">
                                <img className="w-12 h-12" src={profile} />

                                <div className="px-4 text-gray-700">
                                    <p className="text-lg font-medium font-semibold font-inter flex justify-start">Aron Jose</p>
                                    <p className="text-xs text-gray-500 font-inter">Actor, Westminster, London</p>
                                </div>

                                <div className="flex items-center mx-4">
                                    <img className="w-12 h-12" src={phone} />
                                    <p className="text-green-800 font-extrabold	text-sm font-inter ">Phone Verified</p>
                                </div>

                            </div>

                            <div className="my-2 text-sm font-medium text-gray-700 tracking-wide font-inter flex justify-start">
                                <p>Hello, my name is Vogel and I’m 28 years old. I’m an actor,<br></br> singer and dancer and I love
                                    musical theatre! I also love to <br></br> take photos and read.</p>
                            </div>

                            <div>

                                <div className="flex space-x-8 ">
                                    <p className="font-bold text-gray-600 my-4 font-inter">Production House</p>

                                    <div className="flex space-x-2 py-4">
                                        <img className="w-4 h-4" src={pluse} />
                                        <p className="text-xs font-bold text-green-700 font-inter">Add</p>
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 space-x-6">

                                    <div className="flex space-x-2 ">
                                        <img className="w-12 h-12" src={M} />
                                        <div>
                                            <p className="font-semibold text-gray-600 font-inter ">Contiki Productions</p>
                                            <p className="text-xs text-gray-500 font-inter flex justify-start">Created Sep 27, 2022</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <img className="w-12 h-12" src={pg} />
                                        <div>
                                            <p className="font-semibold text-gray-600 font-inter">Columbia Pictures</p>
                                            <p className="text-xs text-gray-500 font-inter flex justify-start">Created Sep 27, 2022</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="h-[200px]">
                            <div className="flex justify-end ">
                                <p className="font-inter font-bold text-green-500  border-2 border-green-500 w-32 flex items-center justify-center rounded">
                                    EDIT PROFILE</p>
                            </div>
                            <div className="grid grid-cols-5 py-8">
                                <div>
                                    <p className="text-gray-400 font-inter">Gender</p>
                                    <p className="text-gray-600 text-sm font-semibold font-inter">Male</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-400 font-inter">Phone Number</p>
                                    <p className="text-gray-600 text-sm font-semibold font-inter">+91 9074484624</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-400 flex justify-start font-inter ">Address</p>
                                    <p className="text-gray-600 text-sm font-semibold font-inter">2972 Westheimer Rd. Santa <br></br>
                                        Ana, Illinois 85486</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-bold text-lg text-gray-600 flex justify-start px-12 pt-8 pb-2">Photos</p>

                    <div className="h-[500px] border border-gary-500 ">
                        <div className="grid grid-cols-2 ">
                            <div>
                                <img className="w-[540px] h-[450px]" src={face} />
                            </div>
                            <div>
                                <img className="w-[540px] h-[450px]" src={face2} />
                            </div>
                        </div>
                        <p className="font-semibold text-lg text-green-700 py-2 underline decoration-2 flex justify-center items-center  ">view all</p>
                    </div>
                    <div className="h-[550px] border border-gary-500 ">
                        <p className="font-bold text-lg text-gray-600 flex justify-start px-12 pt-8 pb-2">Videos</p>
                        <div className="grid grid-cols-2 ">
                            <video className="w-[540px] h-[450px]" controls>
                                <source src="" type="video/mp4" />
                            </video>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Profile
