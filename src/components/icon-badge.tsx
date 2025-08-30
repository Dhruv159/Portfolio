import { ReactNode } from "react"
import { getPrimaryColor, getPrimaryLightColor } from "@/lib/color-utils"

interface IconBadgeProps {
    icon: ReactNode
    selectedColor?: string
    className?: string
}

export default function IconBadge({ icon, selectedColor = "lavender", className = "" }: IconBadgeProps) {
    return (
        <div 
            className={`flex h-10 w-10 items-center justify-center rounded-full ${className}`}
            style={{
                backgroundColor: getPrimaryLightColor(selectedColor),
                color: getPrimaryColor(selectedColor)
            }}
        >
            {icon}
        </div>
    )
} 