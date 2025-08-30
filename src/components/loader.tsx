"use client"

import { useState, useEffect } from "react"

interface LoaderProps {
    onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <h1 className="text-3xl font-bold text-foreground">Dhruv Sharma</h1>
                <p className="text-muted-foreground">Loading portfolio...</p>
                
                {/* Progress Bar */}
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                {/* Percentage */}
                <p className="text-muted-foreground font-medium">{Math.round(progress)}%</p>
                
                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        </div>
    )
} 