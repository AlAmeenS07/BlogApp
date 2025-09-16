import Header from './Components/Header'
import Home from './Components/Home'
import { BrowserRouter as Router , Routes , Route , Link, Navigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import MyBlogs from './Components/MyBlogs'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useAuth } from './context'
import Write from './Components/Write'
import EditBlog from './Components/EditBlog'
import { useState } from 'react'

function App() {
    const { userLoggedIn } = useAuth()

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my-blogs' element={userLoggedIn ? <MyBlogs /> : <Navigate to='/login' />} />
            <Route path='/login' element={userLoggedIn ? <Navigate to="/"/> : <Login/>}/>
            <Route path='/register' element={userLoggedIn ? <Navigate to='/' /> : <Signup />}/>
            <Route path='/create-blog' element={userLoggedIn ? <Write /> : <Navigate to='/login' />} />
            <Route path='/edit/:id' element={<EditBlog />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
