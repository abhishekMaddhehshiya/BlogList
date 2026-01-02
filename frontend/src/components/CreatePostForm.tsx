import { useState } from "react"
import { CreateBlog } from "../actions/post.action"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const CreatePostForm = ({ onClose,onCreated }: { onClose: () => void, onCreated: ()=> void },) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const token = useSelector((state: RootState)=>state.auth.token)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      title,
      content
    }
    if(!token) return
    await CreateBlog(data, token)

    // call API here
    onCreated()
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 max-w-3xl"
    >
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Create New Blog
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          required
        />

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreatePostForm
