interface MyPostCardProps {
  title: string
  content: string
  published: boolean
  onDelete: () => void
  onPublish: () => void
}

const MyPostCard = ({
  title,
  content,
  published,
  onDelete,
  onPublish,
}: MyPostCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
      
      {/* Status */}
      <div className="flex justify-end mb-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            published
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {published ? "Published" : "Draft"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
        {title[0].toUpperCase() + title.slice(1)}
      </h2>

      {/* Content */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        {content
          ? content[0].toUpperCase() + content.slice(1, 120)
          : ""}
        ...
      </p>

      <div className="h-px w-full bg-gray-200 mb-4" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">5 min read</span>

        <div className="flex gap-3">
          {!published && (
            <button
              onClick={onPublish}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Publish
            </button>
          )}

          <button
            onClick={onDelete}
            className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyPostCard
