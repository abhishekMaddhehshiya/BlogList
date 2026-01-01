

const About = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            About BlogList
          </h1>
          <p className="text-gray-600 text-lg">
            A modern platform to write, share, and discover meaningful stories.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold">BlogList</span> is a simple and powerful
            blogging platform designed for creators who love to write.
            Whether you're sharing personal experiences, technical insights,
            or creative ideas, BlogList gives you the tools to publish with ease.
          </p>

          <p>
            Our goal is to provide a clean, distraction-free writing experience
            while making it easy for readers to discover quality content.
            We believe that everyone has a story worth sharing.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What You Can Do
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="bg-white p-4 rounded-lg shadow">
              ✍️ Write and publish your own blog posts
            </li>
            <li className="bg-white p-4 rounded-lg shadow">
              🔐 Secure authentication and private posts
            </li>
            <li className="bg-white p-4 rounded-lg shadow">
              🌍 Read and explore posts from others
            </li>
          </ul>
        </div>


        {/* Closing */}
        <div className="text-center text-gray-600">
          <p>
            Thank you for being a part of BlogList.  
            Keep writing. Keep sharing. 🚀
          </p>
        </div>

      </div>
    </section>
  )
}

export default About
