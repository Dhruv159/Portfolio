"use client"

import { useState } from "react"
import { Send } from 'lucide-react'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getPrimaryColor } from "@/lib/color-utils"

interface ContactFormProps {
    selectedColor?: string
}

export default function ContactForm({ selectedColor = "lavender" }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast.success("Message sent!", {
            description: "Thank you for reaching out. I'll get back to you soon.",
        })

        setFormData({
            name: "",
            email: "",
            message: "",
        })
        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="transition-all rounded-md text-black dark:text-white bg-white dark:bg-zinc-900 focus-visible:ring-primary"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="transition-all rounded-md text-black dark:text-white bg-white dark:bg-zinc-900 focus-visible:ring-primary"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] transition-all rounded-md text-black dark:text-white bg-white dark:bg-zinc-900 focus-visible:ring-primary resize-none"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden rounded-md px-5 py-2.5 transition-all duration-300 ease-out dark:text-black"
                style={{
                    backgroundColor: getPrimaryColor(selectedColor)
                }}
            >
                {isSubmitting ? (
                    "Sending..."
                ) : (
                    <span className="flex items-center justify-center">
                        Send Message <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                )}
            </Button>
        </form>
    )
}
