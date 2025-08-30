"use client"

import { useState } from "react"
import { Send } from 'lucide-react'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
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
          <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="name" className="text-left">Name</Label>
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

              <div className="grid gap-2">
                  <Label htmlFor="email" className="text-left">Email</Label>
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

              <div className="grid gap-2">
                  <Label htmlFor="message" className="text-left">Message</Label>
                  <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] transition-all rounded-md text-black dark:text-white bg-white dark:bg-zinc-900 focus-visible:ring-primary"
                  />
              </div>

              <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 group relative overflow-hidden rounded-md bg-primary px-5 py-2.5 transition-all duration-300 ease-out hover:bg-primary/90 dark:text-black"
                  style={{ cursor: 'pointer' }}
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
