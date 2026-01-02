import { useEffect, useState } from "react"
import MyPostCard from "../components/MyPostCard"
import CreatePostForm from "../components/CreatePostForm"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { deleteBlog, getMyBlogs, publishBlog } from "../actions/post.action"

const MyPosts = () => {
  const [showForm, setShowForm] = useState(false)

  // dummy data (replace with API data)
  const token = useSelector((state: RootState) => state.auth.token)
  const [posts, setPosts] = useState<any[]>([]);
  if (!token) return null

  const fetchPosts = async () => {
    try {
      const res = await getMyBlogs(token)
      setPosts(res.myPosts)
    } catch (error) {
      console.error(error)
    }
  }

  const publishPost = async (postId: number)=>{
    try{
      await publishBlog({postId}, token)
      fetchPosts();

    }catch(error){
      console.error(error)
    }
  }
  const deletePost = async (postId: number)=>{
    try{
      await deleteBlog({postId}, token)
      fetchPosts();

    }catch(error){
      console.error(error)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [token])


  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Posts</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
        >
          + Create New Blog
        </button>
      </div>

      {/* Create Blog Form */}
      {showForm && <CreatePostForm onClose={() => setShowForm(false)} onCreated={fetchPosts} />}

      {/* Posts List */}
      <div className="mt-10 space-y-6 max-w-3xl">
        {posts.map((post) => (
          <MyPostCard
            key={post.id}
            title={post.title}
            content={post.content}
            published={post.published}
            onPublish={()=>publishPost(post.id)}
            onDelete={() => deletePost(post.id)}

          />
        ))}
      </div>
    </div>
  )
}

export default MyPosts

