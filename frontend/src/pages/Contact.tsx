

const Contact = () => {
  return (
    <section className=" bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Have a question, feedback, or suggestion?  
              Whether you're facing an issue or just want to say hello,
              feel free to get in touch with us.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium">📧 Email</p>
                <p>support@bloglist.com</p>
              </div>

              <div>
                <p className="font-medium">🌍 Website</p>
                <p>www.bloglist.com</p>
              </div>

              <div>
                <p className="font-medium">📍 Location</p>
                <p>India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center text-gray-600">
          <p>
            We usually respond within 24–48 hours.  
            Thanks for reaching out! 💬
          </p>
        </div>

      </div>
    </section>

  )
}

export default Contact
