import React, { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {

    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const findBlog = async () => {
            let blogDetails = doc(db , "blogs" , id)
            let blogDoc = await getDoc(blogDetails);
            setTitle(blogDoc.data().title)
            setContent(blogDoc.data().content)
        }
        findBlog()
    }, [id])


    const handleUpdate = async () => {

        if (title.trim() == "" || content.trim() == "") {
            return setError("Invalid Input !")
        }

        try {
            let blogUpd = doc(db, "blogs", id)
            await updateDoc(blogUpd, { title, content, time: new Date().toLocaleString() })
            navigate("/my-blogs")
            toast.success("Updated Successfully")
        } catch (error) {
            toast.error("Edit Failed !")
            console.log(error.message);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Blog</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title"
                    className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-400"/>

                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your blog content..."
                    className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-400" rows={8} />

                <div className="flex justify-end gap-4">
                    <button onClick={() => navigate("/my-blogs")} className="px-5 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>

    )
}

export default EditBlog
