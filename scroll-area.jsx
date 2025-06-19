import React from 'react'
import { cn } from './utils'

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
      className
    )}
    {...props}
  >
    {children}
  </div>
))

ScrollArea.displayName = "ScrollArea"

export { ScrollArea }

