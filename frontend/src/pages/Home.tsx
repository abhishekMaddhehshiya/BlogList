import { useCallback, useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getAllBlogs } from "../actions/post.action";


const Home = () => {
  const token = useSelector((state: RootState) => state.auth.token)
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchPosts = useCallback(async () => {
    if (!token) return
    try {
      setLoading(true)
      setError(null)

      const res = await getAllBlogs(token)
      setPosts(res.posts)
    } catch (err) {
      console.error(err)
      setError("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  return (
  <div className="min-h-screen bg-gray-50 py-10">
    <div className="max-w-6xl mx-auto px-4">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Latest Blogs
        </h1>
        <p className="text-slate-600 mt-2">
          Read the latest articles from our community
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1  gap-6">
        {
          posts.map((post)=>(
            <BlogCard key={post.id} id={post.id} title={post.title} content={post.content} authorName={post.author.name} />
          ))
        }
      </div>

    </div>
  </div>
)

}

export default Home
