import React from 'react'

const Features = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Fast Delivery (Rwanda-wide)',
      description: 'Same-day delivery available across Rwanda. Your fresh produce arrives at your door within hours.',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: '🛡️',
      title: '100% Organic',
      description: 'All our products are certified organic and sourced from local farms.',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: '⏰',
      title: 'Always Fresh',
      description: 'Harvested daily to ensure maximum freshness and nutritional value.',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Yazoo?</h2>
          <p className="text-xl text-gray-600">Fresh produce, delivered across Rwanda with care</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl`}
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features