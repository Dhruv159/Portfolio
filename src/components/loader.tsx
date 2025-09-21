"use client"

import { useState, useEffect } from "react"
import { getPrimaryColor } from "@/lib/color-utils"

interface LoaderProps {
    onComplete: () => void
    selectedColor: string
}

export default function Loader({ onComplete, selectedColor }: LoaderProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer)
                    setTimeout(onComplete, 500) // Small delay before hiding loader
                    return 100
                }
                const increment = Math.random() * 10 + 5 // Random increment between 5-15
                const newProgress = Math.min(prevProgress + increment, 100)
                return newProgress
            })
        }, 200)

        return () => clearInterval(timer)
    }, [onComplete])

    // Get color variations based on selected color
    const getColorVariations = (baseColor: string) => {
        const colorMap: { [key: string]: string[] } = {
            lavender: [
                "oklch(0.7 0.1 280)", // Light teal/cyan
                "oklch(0.65 0.12 280)", // Slightly darker
                "oklch(0.6 0.14 280)", // Medium
                "oklch(0.55 0.16 280)", // Darker
                "oklch(0.5 0.18 280)" // Darkest
            ],
            blue: [
                "oklch(0.7 0.1 240)",
                "oklch(0.65 0.12 240)",
                "oklch(0.6 0.14 240)",
                "oklch(0.55 0.16 240)",
                "oklch(0.5 0.18 240)"
            ],
            green: [
                "oklch(0.7 0.1 140)",
                "oklch(0.65 0.12 140)",
                "oklch(0.6 0.14 140)",
                "oklch(0.55 0.16 140)",
                "oklch(0.5 0.18 140)"
            ],
            purple: [
                "oklch(0.7 0.1 300)",
                "oklch(0.65 0.12 300)",
                "oklch(0.6 0.14 300)",
                "oklch(0.55 0.16 300)",
                "oklch(0.5 0.18 300)"
            ],
            teal: [
                "oklch(0.7 0.1 180)",
                "oklch(0.65 0.12 180)",
                "oklch(0.6 0.14 180)",
                "oklch(0.55 0.16 180)",
                "oklch(0.5 0.18 180)"
            ]
        }
        return colorMap[baseColor] || colorMap.lavender
    }

    const colorVariations = getColorVariations(selectedColor)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center space-y-8">
                <h1 className="text-3xl font-bold text-foreground">Dhruv Sharma</h1>
                <p className="text-muted-foreground">Loading portfolio...</p>
                
                {/* Animated Dots - matching the image provided */}
                <div className="flex justify-center items-center space-x-3">
                    {colorVariations.map((color, index) => (
                        <div
                            key={index}
                            className="rounded-full animate-pulse"
                            style={{
                                width: `${12 + index * 4}px`, // Progressive sizing: 12px, 16px, 20px, 24px, 28px
                                height: `${12 + index * 4}px`,
                                backgroundColor: color,
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '1.5s'
                            }}
                        />
                    ))}
                </div>
                
                {/* Percentage */}
                <p className="text-muted-foreground font-medium">{Math.round(progress)}%</p>
            </div>
        </div>
    )
} 