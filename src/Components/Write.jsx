import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useReducer } from 'react'

const Write = () => {

    function redFn(prev , action){
        switch (action.type) {
            case "error":
                return {...prev , error : "Input Invalid !"}
            case "setTitle" :
                return {...prev , title : action.payload}
            case "setContent" :
                return {...prev , content : action.payload}
            default:
                break;
        }
    }


    const [state , dispach] = useReducer(redFn , {
        title : "",
        content : "",
        error : ""
    })

    let navigate = useNavigate()

    const postCollection = collection(db , "blogs")

    const handleSubmit = async ()=>{

        if(state.title.trim() == "" || state.content.trim() == ""){
            return dispach({type : "error"})
        }

        try{
            await addDoc(postCollection , {title : state.title , content : state.content , time : new Date().toLocaleString() , user : {email : auth.currentUser.email , id : auth.currentUser.uid}})
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
                
            {state.error && <p className="text-red-500 text-center text-md">{state.error}</p>}

            <div className="mt-4 space-y-4">
                <input type="text" placeholder="Enter blog title" value={state.title} onChange={(e)=> dispach({type : "setTitle" , payload : e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />

                <textarea rows="8" placeholder="Write your blog here..." value={state.content} onChange={(e)=> dispach({type : "setContent" , payload : e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>

                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Publish Blog
                </button>
            </div>
        </div>

    )
}

export default Write
