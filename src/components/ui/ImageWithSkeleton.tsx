import clsx from 'clsx'
import { useState } from 'react'

type ImageWithSkeletonProps = {
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  src: string
}

export function ImageWithSkeleton({
  alt,
  className,
  imageClassName,
  priority = false,
  src,
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className={clsx(
          'absolute inset-0 animate-pulse rounded-[inherit] bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.18),rgba(255,255,255,0.06))] bg-[length:200%_100%] transition-opacity duration-300',
          isLoaded ? 'opacity-0' : 'opacity-100',
        )}
      />
      <img
        alt={alt}
        className={clsx(
          'transition duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          imageClassName,
        )}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        src={src}
      />
    </div>
  )
}
