import { useNavigate } from "react-router-dom"

const BlogCard = ({
  id,
  title,
  content,
  authorName,
}: {
  id: number
  title: string
  content: string
  authorName: string
}) => {
  const formattedAuthor =
    authorName?.length > 0
      ? authorName[0].toUpperCase() + authorName.slice(1)
      : "Anonymous"

  const navigate = useNavigate();    

  return (
    <div onClick={()=>{
          navigate(`/blog/${id}`)

        }}  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
      
      {/* Author */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
          {authorName?.length > 0 ? authorName[0].toUpperCase() : "U"}
        </div>

        <span className="text-sm text-slate-600">
          {formattedAuthor}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
        {title[0].toUpperCase() + title.slice(1)}
      </h2>

      {/* Content Preview */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        {content
          ? content[0].toUpperCase() + content.slice(1, 120)
          : ""}
        ...
      </p>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200" />

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
        <span>{Math.ceil(content.length/100)} min Read</span>
        <span className="text-blue-600 hover:underline">
          Read more →
        </span>
      </div>
    </div>
  )
}

export default BlogCard

