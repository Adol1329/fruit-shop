import React from 'react'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import Features from '../components/Features'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <Features />
      <CTA />
    </div>
  )
}

export default Home