import React, { useState } from 'react'
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'

const Write = () => {

    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")
    const [error , setError] = useState("")

    let navigate = useNavigate()

    const postCollection = collection(db , "blogs")

    const handleSubmit = async ()=>{

        if(title.trim() == "" || content.trim() == ""){
            return setError("Input Invalid !")
        }

        try{
            await addDoc(postCollection , {title , content , time : new Date().toLocaleString() , user : {email : auth.currentUser.email , id : auth.currentUser.uid}})
            navigate("/")
            toast.success("Uploaded Successfully")
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mt-4 mb-4 text-gray-800">Write a Blog</h1>
                
            {error && <p className="text-red-500 text-center text-md">{error}</p>}

            <div className="mt-4 space-y-4">
                <input type="text" placeholder="Enter blog title" value={title} onChange={(e)=> setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />

                <textarea rows="8" placeholder="Write your blog here..." value={content} onChange={(e)=> setContent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>

                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Publish Blog
                </button>
            </div>
        </div>

    )
}

export default Write
