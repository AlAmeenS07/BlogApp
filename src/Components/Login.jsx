import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { doSignInUserWithEmailAndPass } from "../firebase/auth"
import { Loader } from "react-feather"
import { useReducer } from "react";

const Login = () => {

    const navigate = useNavigate()

    function redFn(prev , action){
        switch (action.type) {
            case "empty":
                return {...prev , password : "" , email : ""}
            case "error" :
                return {...prev , errorMsg : "Invalid entry !"}
            case "errorEmailPass" :
                return {...prev , errorMsg : "Invalid email or password !"}
            case "true" :
                return {...prev , isSignedIn : true}
            case "false" :
                return {...prev , isSignedIn :false}
            case "setEmail" :
                return {...prev , email : action.payload}
            case "setPass" :
                return {...prev , password : action.payload}
            default:
                break;
        }
    }

    const [state , dispach] = useReducer(redFn , {
        email : "",
        password : "",
        isSignedIn : false,
        errorMsg : ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", state.email, "Password:", state.password);

        if (state.email.trim() == "" || state.password.trim() == "") {
            dispach({type : "empty"})
            return dispach({type : "error"})
        }

        if (!state.isSignedIn) {
            dispach({type : "true"})
            try {
                await doSignInUserWithEmailAndPass(state.email, state.password)
                navigate("/")
                toast.success("Successfully Login")
            } catch (error) {
                console.log(error.message)
                dispach({type : "errorEmailPass"})
                dispach({type : "empty"})
            }
            finally{
                dispach({type : "false"})
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {state.errorMsg && <p className="text-red-500 text-center text-md">{state.errorMsg}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input id="email" type="email" value={state.email} onChange={(e) => dispach({type : "setEmail" , payload : e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input id="password" type="password" value={state.password} onChange={(e) => dispach({type : "setPass" , payload : e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password" />
                    </div>

                    <button type="submit" disabled={state.isSignedIn} className={`w-full flex items-center justify-center gap-2 
                            ${state.isSignedIn ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
                            text-white py-2 rounded-lg transition-colors`}>
                        {state.isSignedIn ? (
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


