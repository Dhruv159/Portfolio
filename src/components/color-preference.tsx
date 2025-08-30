"use client"

import { useState, useEffect, useRef } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ColorPreferenceProps {
    onColorChange: (color: string) => void
    currentColor: string
}

const colorOptions = [
    {
        name: "Default",
        value: "default",
        primary: "oklch(0.205 0 0)",
        primaryLight: "oklch(0.205 0 0 / 0.1)",
        primaryHover: "oklch(0.205 0 0 / 0.2)"
    },
    {
        name: "Lavender",
        value: "lavender",
        primary: "oklch(0.6 0.15 280)",
        primaryLight: "oklch(0.6 0.15 280 / 0.1)",
        primaryHover: "oklch(0.6 0.15 280 / 0.2)"
    },
    {
        name: "Blue",
        value: "blue",
        primary: "oklch(0.5 0.2 240)",
        primaryLight: "oklch(0.5 0.2 240 / 0.1)",
        primaryHover: "oklch(0.5 0.2 240 / 0.2)"
    },
    {
        name: "Green",
        value: "green",
        primary: "oklch(0.6 0.2 140)",
        primaryLight: "oklch(0.6 0.2 140 / 0.1)",
        primaryHover: "oklch(0.6 0.2 140 / 0.2)"
    },
    {
        name: "Purple",
        value: "purple",
        primary: "oklch(0.5 0.25 300)",
        primaryLight: "oklch(0.5 0.25 300 / 0.1)",
        primaryHover: "oklch(0.5 0.25 300 / 0.2)"
    },
    {
        name: "Teal",
        value: "teal",
        primary: "oklch(0.6 0.15 180)",
        primaryLight: "oklch(0.6 0.15 180 / 0.1)",
        primaryHover: "oklch(0.6 0.15 180 / 0.2)"
    }
]

export default function ColorPreference({ onColorChange, currentColor }: ColorPreferenceProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const currentColorOption = colorOptions.find(option => option.value === currentColor) || colorOptions[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
            >
                <Palette className="h-4 w-4" />
                <div 
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: currentColorOption.primary }}
                />
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                    <div className="p-2 space-y-1">
                        {colorOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onColorChange(option.value)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                    currentColor === option.value
                                        ? "bg-muted text-foreground"
                                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <div 
                                    className="w-4 h-4 rounded-full border border-border"
                                    style={{ backgroundColor: option.primary }}
                                />
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 