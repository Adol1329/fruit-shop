import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Yazoo</h1>
          <p className="text-xl text-gray-600">Bringing fresh, organic produce to your doorstep since day one</p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded with a simple mission: to connect families with the freshest, most nutritious 
                organic produce available. What started as a small local operation has grown into a 
                trusted source for premium fruits and vegetables.
              </p>
              <p>
                We work directly with local organic farmers who share our commitment to sustainable 
                agriculture and environmental stewardship. Every piece of produce is hand-selected 
                for quality and freshness.
              </p>
              <p>
                Today, we're proud to serve thousands of families, delivering farm-fresh goodness 
                right to their doors while supporting local agricultural communities.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-9xl mb-6">🌱</div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Farm to Table</h3>
              <p className="text-gray-600">Direct from our partner farms to your family table</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Organic</h3>
              <p className="text-gray-600">
                All our products are certified organic, grown without harmful pesticides or chemicals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery (Rwanda-wide)</h3>
              <p className="text-gray-600">
                Same-day delivery across Rwanda for orders placed before 2 PM.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                Supporting local farmers and building stronger, healthier communities together.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-12">
            Passionate about fresh produce and exceptional service
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">👨‍🌾</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">John Smith</h3>
              <p className="text-green-600 font-semibold mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Former organic farmer with 15 years of experience in sustainable agriculture.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">👩‍🔬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-green-600 font-semibold mb-2">Quality Director</p>
              <p className="text-gray-600 text-sm">
                Food scientist ensuring every product meets our strict quality standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🚛</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mike Chen</h3>
              <p className="text-green-600 font-semibold mb-2">Logistics Manager</p>
              <p className="text-gray-600 text-sm">
                Ensures fast, reliable delivery while maintaining product freshness.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Yazoo?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers enjoying fresh, organic produce delivered to their homes.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default About