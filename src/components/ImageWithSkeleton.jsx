import React, { useState } from 'react'

const ImageWithSkeleton = ({ src, alt, width, height, className = '', rounded = 'rounded-xl' }) => {
  const [loaded, setLoaded] = useState(false)
  const dimStyles = { width, height }

  return (
    <div className={`relative mx-auto ${rounded}`} style={{ width, height }}>
      {!loaded && (
        <div
          className={`absolute inset-0 ${rounded} bg-gray-200 animate-pulse shadow-sm`}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${rounded} object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={dimStyles}
      />
    </div>
  )
}

export default ImageWithSkeleton
