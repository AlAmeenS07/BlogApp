import React from 'react'
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context';
import { doSignOut } from '../firebase/auth';
import { User } from 'react-feather';
import Swal from 'sweetalert2';


const Header = () => {
    const [open, setOpen] = useState(false);
    const { userLoggedIn, currentUser } = useAuth();
    const navigate = useNavigate()

    const first = currentUser?.email?.[0]?.toUpperCase()

    async function handleLogout() {
        Swal.fire({
            title : "Are you sure?",
            icon : "question",
            showCancelButton : true,
            confirmButtonText : "Yes , Logout"
        }).then(async(result)=>{
            if(result.isConfirmed){
                await doSignOut()
                navigate("/login")
            }
        })
    }
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600" >
                        <img src='/pisatLogo.png' alt="" className='w-32 h-8'/>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 text-lg font-medium hover:text-blue-500">Home</Link>
                        <Link to="/my-blogs" className="text-gray-700 text-lg font-medium hover:text-blue-500">My Blogs</Link>
                        <Link to="/create-blog" className="text-gray-700 text-lg font-medium hover:text-blue-500">
                            Write
                        </Link>

                        {
                            userLoggedIn ? <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={handleLogout}>
                                Logout
                            </button> :
                            <Link to='/login' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Login
                            </Link>
                        }

                        {
                            userLoggedIn ?
                                <div className="w-10 h-10 rounded-full text-xl font-bold flex justify-center items-center bg-blue-300 overflow-hidden cursor-pointer">
                                    {first}
                                </div>
                                :
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                                    <User className="text-gray-600" size={20} />
                                </div>
                        }
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setOpen(!open)} className="text-gray-700 focus:outline-none">
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
                    <Link to="/" className="block text-gray-700 text-xl hover:text-blue-500">Home</Link>
                    <Link to="/my-blogs" className="block text-gray-700 text-xl hover:text-blue-500">My Blogs</Link>
                    <Link to="/create-blog" className="block text-gray-700 text-xl hover:text-blue-500">Write</Link>


                    {
                        userLoggedIn ? (
                            <button onClick={handleLogout} className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 rounded">
                                Logout
                            </button>
                        ) : (
                            <Link to='/login' className="block w-20 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded">
                                Login
                            </Link>
                        )
                    }

                    {
                        userLoggedIn ?
                            <div className="w-10 h-10 rounded-full text-xl font-bold flex justify-center items-center bg-blue-300 overflow-hidden cursor-pointer">
                                {first}
                            </div>
                            :
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                                <User className="text-gray-600" size={20} />
                            </div>
                    }
                </div>
            )}

        </nav>
    );
}

export default Header