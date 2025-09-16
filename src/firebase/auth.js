
import { auth } from "./firebase"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth"


export const doCreateUserWithEmailAndPass = ( email , password)=>{
    return createUserWithEmailAndPassword(auth , email , password)
}

export const  doSignInUserWithEmailAndPass = (email , password)=>{
    return signInWithEmailAndPassword(auth , email , password)
}

export const doSignOut = ()=>{
    return auth.signOut()
}