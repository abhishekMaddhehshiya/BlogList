import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { RootState } from "../store"
import { useCallback, useEffect, useState } from "react"
import { getBlog } from "../actions/post.action"

const BlogDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
    const [blog, setBlog] = useState<any>({});
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
  const token  = useSelector((state: RootState)=> state.auth.token);

  const getBlogDetails = useCallback(async ()=>{
     if (!token || !id) return
        try {
          setLoading(true)
          setError(null)
    
          const res = await getBlog(token, id)
          setBlog(res.post)
        } catch (err) {
          console.error(err)
          setError("Failed to load posts")
        } finally {
          setLoading(false)
        }
  }, [token])

  useEffect(()=>{
    getBlogDetails();
  }, [getBlogDetails])



  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      {/* Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {blog.title}
        </h1>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {blog.content}
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-between items-center text-sm text-gray-500">
          <span>Blog ID: {id}</span>
          <button onClick={()=>
            navigate("/")
          } className="hover:text-black transition">
            ← Back to blogs
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails

