'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react'

// Create a loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gray-900 flex items-center justify-center">
    <div className="text-white text-xl">Loading 3D Scene...</div>
  </div>
)

// Use React.lazy for client-side only loading
const HeroContent = lazy(() => import('@/components/HeroContent').then(mod => ({ default: mod.HeroContent })))

export function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <LoadingPlaceholder />
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <HeroContent />
    </Suspense>
  )
} 