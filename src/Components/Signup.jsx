import { Link, useNavigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPass } from "../firebase/auth";
import { toast } from "react-toastify";
import { useReducer } from "react";

const Signup = () => {

  function redFn(prev , action){
      switch (action.type) {
        case "empty":
            return {...prev , name : "" , email : "" , password : "" , confirmPassword : "" }
        case "errorSpace" :
          return {...prev , error : "Input must be valid !"}
        case "errorEmail" :
          return {...prev , error : "Enter valid email !"}
        case "errorName" :
          return {...prev , error : "Name must be letter !"}
        case "errorPass" :
          return {...prev , error : "Password must be 6 or above!"}
        case "errorPassword" :
          return {...prev , error : "Password not match !"}
        case "true" :
          return {...prev , isRegister : true}
        case "false" :
          return {...prev , isRegister : false}
        case "setName" :
          return {...prev , name : action.payload}
        case "setEmail" :
          return {...prev , email : action.payload}
        case "setPass" :
          return {...prev , password : action.payload}
        case "setConfPass" :
          return {...prev , confirmPassword : action.payload}
        case "error" :
          return {...prev , error : action.payload}
        default:
          return prev
      }
  }


  const [state , dispach] = useReducer(redFn , {
      name : "",
      email : "",
      password : "",
      confirmPassword : "",
      isRegister : false,
      error : ""
  })

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if(state.name.trim() == "" || state.email.trim() == "" || state.password.trim() == "" || state.confirmPassword.trim() == ""){
        dispach({type : "empty"})
        return dispach({type : "errorSpace"});
    }

    if(!state.email.includes("@")){
        dispach({type : "empty"})
        return dispach({type : "errorEmail"})
    }

    if(/\d/.test(state.name)){
        dispach({type : "empty"})
        return dispach({type : "errorName"})
    }

    if(state.password.length < 6 || state.confirmPassword.length < 6){
        dispach({type : "empty"})
        return dispach({type : "errorPass"})
    }

    if (state.password !== state.confirmPassword) {
        dispach({type : "empty"})
      return dispach({type : "errorPassword"});
    }

    // dispach({type : "errorEmpty"});
    console.log("Name:", state.name, "Email:", state.email, "Password:", state.password);

    if(!state.isRegister){
        dispach({type : "true"})
        try{
            let signupUser = doCreateUserWithEmailAndPass(state.email , state.password)
            console.log(`User Registered :` , signupUser.user)
            navigate('/')
            toast.success("Successfully Signup")
        }catch(err){
            console.error("error : ", err.message)
            dispach({type : "error" , payload : err.message})
        }finally{
            dispach({type : "false"})
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {state.error && <p className="text-red-500 text-center text-md">{state.error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input id="name" type="text" value={state.name} onChange={(e) => dispach({type : "setName" , payload : e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name" />
          </div>

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

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input id="confirmPassword" type="password" value={state.confirmPassword} onChange={(e) => dispach({type : "setConfPass" , payload : e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password" />
          </div>

            <button type="submit" disabled={state.isRegister} className={`w-full flex items-center justify-center gap-2 
                    ${state.isRegister ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
                    text-white py-2 rounded-lg transition-colors`}>
                {state.isRegister ? (
                    <>
                        <Loader className="animate-spin" size={18} />
                        Signing in...
                    </>
                ) : (
                    "Sign Up"
                )}
            </button>

        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>

  );
};

export default Signup;









// import React, { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom'
// import { doCreateUserWithEmailAndPass } from "../firebase/auth";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isRegister , setIsRegister] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if(name.trim() == "" || email.trim() == "" || password.trim() == "" || confirmPassword.trim() == ""){
//         setName("")
//         setEmail("")
//         setPassword("")
//         setConfirmPassword("")
//         return setError("Input must be valid !");
//     }

//     if(!email.includes("@")){
//         setName("")
//         setEmail("")
//         setPassword("")
//         setConfirmPassword("")
//         return setError("Enter valid email !")
//     }

//     if(/\d/.test(name)){
//         setName("")
//         setEmail("")
//         setPassword("")
//         setConfirmPassword("")
//         return setError("Name must be letter !")
//     }

//     if(password.length < 6 || confirmPassword.length < 6){
//         setName("")
//         setEmail("")
//         setPassword("")
//         setConfirmPassword("")
//         return setError("password length must be 6 or above !")
//     }

//     if (password !== confirmPassword) {
//         setName("")
//         setEmail("")
//         setPassword("")
//         setConfirmPassword("")
//       return setError("Passwords do not match!");
//     }

//     setError("");
//     console.log("Name:", name, "Email:", email, "Password:", password);

//     if(!isRegister){
//         setIsRegister(true)
//         try{
//             let signupUser = doCreateUserWithEmailAndPass(email , password)
//             console.log(`User Registered :` , signupUser.user)
//             navigate('/')
//             toast.success("Successfully Signup")
//         }catch(err){
//             console.error("error : ", err.message)
//             setError(err.message)
//         }finally{
//             setIsRegister(false)
//         }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

//         {error && <p className="text-red-500 text-center text-md">{error}</p>}

//         <form onSubmit={handleSignup} className="space-y-4">

//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="name">
//               Full Name
//             </label>
//             <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your full name" />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="email">
//               Email
//             </label>
//             <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email" />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="password">
//               Password
//             </label>
//             <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password" />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Confirm your password" />
//           </div>

//             <button type="submit" disabled={isRegister} className={`w-full flex items-center justify-center gap-2 
//                     ${isRegister ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
//                     text-white py-2 rounded-lg transition-colors`}>
//                 {isRegister ? (
//                     <>
//                         <Loader className="animate-spin" size={18} />
//                         Signing in...
//                     </>
//                 ) : (
//                     "Sign Up"
//                 )}
//             </button>

//         </form>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>

//   );
// };

// export default Signup;






