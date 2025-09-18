import React, { createContext, useContext, useEffect } from "react"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useReducer } from "react";

const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({ children })=>{

    function redFn(prev , action){
        switch (action.type) {
            case "user":
                return {...prev , currentUser : action.payload}
            case "false":
                return {...prev , loading : false}
            case "loggedTrue" :
                return {...prev , userLoggedIn : true}
            case "setUser" :
                return {...prev , currentUser : action.payload}
            case "null":
                return {...prev , currentUser : null}
            case "loggedFalse" :
                return {...prev , userLoggedIn : false}
            default:
                prev
        }
    }

    const [state , dispach] = useReducer(redFn , {
        currentUser : null,
        userLoggedIn : false,
        loading : true  
    })


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , initializeUser)
        return unsubscribe
    },[])

    async function initializeUser(user) {
        if(user){
            dispach({type : "setUser" , payload : {...user}})
            dispach({type : "loggedTrue"})
        }else{
            dispach({type : "null"})
            dispach({type : "loggedFalse"})
        }
        dispach({type : "false"})

    }

    const value = {
        currentUser : state.currentUser,
        userLoggedIn : state.userLoggedIn,
        loading : state.loading
    }

    return (
        <AuthContext.Provider value={value}>
            { !state.loading && children}
        </AuthContext.Provider>
    )

}

