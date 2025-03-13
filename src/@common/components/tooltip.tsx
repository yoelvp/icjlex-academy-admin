import { type ReactNode, useState, useRef, useEffect } from "react"
import classNames from "classnames"

type TooltipTrigger = "click" | "hover"

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  position?: "top" | "right" | "bottom" | "left"
  trigger?: TooltipTrigger
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  trigger = "click",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2"
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false)
    }
  }

  const handleTriggerClick = () => {
    if (trigger === "click") {
      setIsVisible(!isVisible)
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsVisible(true)
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (trigger === "hover") {
      const relatedTarget = e.relatedTarget as Node

      if (
        containerRef.current &&
        containerRef.current.contains(relatedTarget)
      ) {
        return
      }

      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (trigger === "click" && isVisible) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [trigger, isVisible])

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={classNames(
            "absolute z-[10000] px-3 py-2 text-sm text-white bg-primary-500 rounded-md shadow-lg text-nowrap",
            positionClasses[position],
            className
          )}
        >
          {content}
          <div
            className={classNames(
              "absolute w-2 h-2 bg-primary-500 transform rotate-45",
              { "top-full -translate-x-1/2 -mt-1 left-1/2": position === "top" },
              { "right-full -translate-y-1/2 -mr-1 top-1/2": position === "right" },
              { "bottom-full -translate-x-1/2 -mb-1 left-1/2": position === "bottom" },
              { "left-full -translate-y-1/2 -ml-1 top-1/2": position === "left" }
            )}
          />
        </div>
      )}
    </div>
  )
}
