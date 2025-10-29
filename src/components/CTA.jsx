import React, { useState } from 'react'

const CTA = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (email) {
      alert(`Thanks for your interest! We'll send updates to ${email}`)
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-green-100 mb-10">
          Join thousands of happy customers enjoying fresh, organic produce delivered to their homes.
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
            />
            <button
              onClick={handleSubmit}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA