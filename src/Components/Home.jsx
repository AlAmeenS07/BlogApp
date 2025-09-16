import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { Loader } from 'react-feather'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [blogLoad , setBlogLoad] = useState(false)

  const postCollection = collection(db, "blogs")

  useEffect(() => {
    const getPosts = async () => {
      setBlogLoad(true)
      try {
        let data = await getDocs(postCollection);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      } catch (error) {
        console.log(error.message)
      }finally{
        setBlogLoad(false)
      }
    }
    getPosts()
  }, [])

  if (blogLoad) {
    return (
      <div className="flex items-center justify-center h-screen gap-2 text-gray-600">
        <Loader className="animate-spin text-gray-600" size={24} />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Blogs</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((blog) => (blog.title ?
            <div key={blog.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition border">
              
              <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h2>
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
            :
            ""
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

