import React, { useState } from "react";
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { doSignInUserWithEmailAndPass } from "../firebase/auth"
import { Loader } from "react-feather"

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);

        if (email.trim() == "" || password.trim() == "") {
            setEmail("")
            setPassword("")
            return setErrorMsg("Invalid Input")
        }

        if (!isSignedIn) {
            setIsSignedIn(true)
            try {
                await doSignInUserWithEmailAndPass(email, password)
                navigate("/")
                toast.success("Successfully Login")
            } catch (error) {
                console.log(error.message)
                setErrorMsg("Invalid Email or Password")
                setEmail("")
                setPassword("")
            }
            finally{
                setIsSignedIn(false)
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {errorMsg && <p className="text-red-500 text-center text-md">{errorMsg}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password" />
                    </div>

                    <button type="submit" disabled={isSignedIn} className={`w-full flex items-center justify-center gap-2 
                            ${isSignedIn ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
                            text-white py-2 rounded-lg transition-colors`}>
                        {isSignedIn ? (
                            <>
                                <Loader className="animate-spin" size={18} />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                </form>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;







