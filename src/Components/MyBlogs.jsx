
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { useAuth } from '../context'
import { Loader } from 'react-feather'
import EditBlog from './EditBlog'
import { toast } from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'
import swal from "sweetalert2"

const MyBlogs = () => {
  const [posts, setPosts] = useState([])
  const [myBlogLoad, setMyBlogLoad] = useState(false)
  const { currentUser } = useAuth()

  const navigate = useNavigate()

  const postCollection = collection(db, "blogs")

  useEffect(() => {
    const getPosts = async () => {
      setMyBlogLoad(true)
      try {
        let data = await getDocs(postCollection);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error.message)
      }
      finally {
        setMyBlogLoad(false)
      }

    }
    getPosts()
  }, [])

  const handleDelete = async (blog) => {
    swal.fire({
      title: "Are you sure?",
      text: "This blog will permanently delete !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete !"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let delBlog = doc(db, "blogs", blog.id)
          await deleteDoc(delBlog)
          toast.success("Blog Deleted")
          navigate("/")
        } catch (error) {
          toast.error("Failed !")
          console.log(error.message);
        }
      }
    })
  }

  if (myBlogLoad) {
    return (
      <div className="flex items-center justify-center h-screen gap-2 text-gray-600">
        <Loader className="animate-spin text-gray-600" size={24} />
        <span>Loading...</span>
      </div>
    )
  }


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Blogs</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((blog) => (blog.title ?

            blog.user.email === currentUser?.email ?

              <div key={blog.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition border">

                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                      onClick={() =>  navigate(`/edit/${blog.id}`)} >
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={() => handleDelete(blog)}>
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-2">
                  {blog.content}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    ✍️ {blog.user?.email || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-400">
                    🕒 {blog.time || ""}
                  </span>
                </div>

              </div>
              : ""
            :
            ""
          ))}
        </div>
      )}

    </div>
  )
}

export default MyBlogs

