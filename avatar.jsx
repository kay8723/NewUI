import React from 'react'
import { cn } from './utils'

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-blue-100 to-cyan-100",
      className
    )}
    {...props}
  />
))

const AvatarImage = React.forwardRef(({ className, src, alt, ...props }, ref) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  if (imageError || !src) {
    return null
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(
        "aspect-square h-full w-full object-cover",
        imageLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
      {...props}
    />
  )
})

const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium",
      className
    )}
    {...props}
  >
    {children}
  </div>
))

Avatar.displayName = "Avatar"
AvatarImage.displayName = "AvatarImage"
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

