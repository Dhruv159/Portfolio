"use client"
import Link from "next/link"
import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Mail, Menu, X, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import Loader from "@/components/loader"
import ColorPreference from "@/components/color-preference"
import IconBadge from "@/components/icon-badge"
import { getPrimaryColor, getPrimaryLightColor, getGradientClass } from "@/lib/color-utils"
import { ThemeToggle } from "@/components/theme-toggle"

type ContactCardProps = {
    icon: React.ReactNode
    title: string
    value: string
    href?: string
}

export default function Home() {
    const [activeSection, setActiveSection] = useState("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedColor, setSelectedColor] = useState("lavender")

    // Available colors for automatic theme switching
    const availableColors = ["lavender", "blue", "green", "purple", "teal"]

    // Load theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme')
        if (savedTheme) {
            setSelectedColor(savedTheme)
        }
    }, [])

    // Automatic theme switching every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedColor(prevColor => {
                const currentIndex = availableColors.indexOf(prevColor)
                const nextIndex = (currentIndex + 1) % availableColors.length
                const nextColor = availableColors[nextIndex]
                localStorage.setItem('portfolio-theme', nextColor)
                return nextColor
            })
        }, 100000) // 100 seconds

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about", "projects", "skills", "contact"]
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = (section: string) => activeSection === section

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleLoaderComplete = () => {
        setIsLoading(false)
    }

    const handleColorChange = (color: string) => {
        setSelectedColor(color)
        localStorage.setItem('portfolio-theme', color)
    }

    if (isLoading) {
        return <Loader onComplete={handleLoaderComplete} selectedColor={selectedColor} />
    }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gradient-to-b dark:from-background dark:to-background">
            <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 px-6">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/" className="flex items-center space-x-2">
                            <span 
                                className="font-bold text-xl bg-clip-text"
                                style={{ 
                                    backgroundImage: `linear-gradient(to right, ${getPrimaryColor(selectedColor)}, ${getPrimaryColor(selectedColor)}60)`
                                }}
                            >
                                Dhruv Sharma
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-6">
                            <Link 
                                href="#about" 
                                className={`group relative text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("about") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("about") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                About
                                <span 
                                    className={`absolute inset-x-0 -bottom-1 h-0.5 transition-transform ${
                                        isActive("about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                    style={{
                                        backgroundColor: getPrimaryColor(selectedColor)
                                    }}
                                ></span>
                            </Link>
                            <Link
                                href="#projects"
                                className={`group relative text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("projects") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("projects") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                Projects
                                <span 
                                    className={`absolute inset-x-0 -bottom-1 h-0.5 transition-transform ${
                                        isActive("projects") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                    style={{
                                        backgroundColor: getPrimaryColor(selectedColor)
                                    }}
                                ></span>
                            </Link>
                            <Link 
                                href="#skills" 
                                className={`group relative text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("skills") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("skills") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                Skills
                                <span 
                                    className={`absolute inset-x-0 -bottom-1 h-0.5 transition-transform ${
                                        isActive("skills") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                    style={{
                                        backgroundColor: getPrimaryColor(selectedColor)
                                    }}
                                ></span>
                            </Link>
                            <Link 
                                href="#contact" 
                                className={`group relative text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("contact") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("contact") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                Contact
                                <span 
                                    className={`absolute inset-x-0 -bottom-1 h-0.5 transition-transform ${
                                        isActive("contact") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                    style={{
                                        backgroundColor: getPrimaryColor(selectedColor)
                                    }}
                                ></span>
                            </Link>
                        </nav>
                        <div className="h-6 w-px bg-border" />
                        {/* <ColorPreference onColorChange={handleColorChange} currentColor={selectedColor} /> */}
                        <ThemeToggle/>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="md:hidden"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                
                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
                        <nav className="container py-4 flex flex-col gap-4">
                            <Link 
                                href="#about" 
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("about") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("about") ? getPrimaryColor(selectedColor) : undefined
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="#projects"
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("projects") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("projects") ? getPrimaryColor(selectedColor) : undefined
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Projects
                            </Link>
                            <Link 
                                href="#skills" 
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("skills") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("skills") ? getPrimaryColor(selectedColor) : undefined
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Skills
                            </Link>
                            <Link 
                                href="#contact" 
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("contact") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("contact") ? getPrimaryColor(selectedColor) : undefined
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-primary/20 dark:via-background dark:to-background"></div>
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    {/* <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                                        Available for freelance work
                                    </div> */}
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Hi, I&#39;m {''}
                                        <span className="bg-clip-text"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, ${getPrimaryColor(selectedColor)}, ${getPrimaryColor(selectedColor)}60)`
                                            }}
                                        >
                                            Dhruv Sharma
                                        </span>
                                    </h1>
                                    <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                                        I&#39;m a developer focused on building efficient, user-friendly, and visually polished web applications.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                    <Button
                                        size="lg"
                                        className="group relative overflow-hidden rounded-md px-5 py-2.5 transition-all duration-300 ease-out dark:text-black"
                                        style={{
                                            backgroundColor: getPrimaryColor(selectedColor)
                                        }}
                                    >
                                        <Link href="#contact" className="flex items-center">
                                            Let's Connect
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                                <div className="flex gap-4 mt-4 justify-center">
                                    <Link
                                        href="https://github.com/Dhruv159"
                                        className="rounded-full p-2 transition-colors hover:opacity-80"
                                        style={{
                                            backgroundColor: getPrimaryLightColor(selectedColor),
                                            color: getPrimaryColor(selectedColor)
                                        }}
                                    >
                                        <Github className="h-5 w-5" />
                                        <span className="sr-only">GitHub</span>
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/in/dhruv-sharma-635a1a209"
                                        className="rounded-full p-2 transition-colors hover:opacity-80"
                                        style={{
                                            backgroundColor: getPrimaryLightColor(selectedColor),
                                            color: getPrimaryColor(selectedColor)
                                        }}
                                    >
                                        <Linkedin className="h-5 w-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Link>
                                    <Link
                                        href="mailto:dhruvsarkhandia9@gmail.com"
                                        className="rounded-full p-2 transition-colors hover:opacity-80"
                                        style={{
                                            backgroundColor: getPrimaryLightColor(selectedColor),
                                            color: getPrimaryColor(selectedColor)
                                        }}
                                    >
                                        <Mail className="h-5 w-5" />
                                        <span className="sr-only">Email</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" className="w-full py-12 md:py-24 lg:py-32 relative">
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] dark:from-muted/80 dark:via-background dark:to-background"></div>
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                            <span 
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: getPrimaryLightColor(selectedColor),
                                    color: getPrimaryColor(selectedColor)
                                }}
                            >
                                About Me
                            </span>
                            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">The Person Behind the Code</h2>
                            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                                I&#39;m a passionate developer with a focus on creating intuitive and performant web applications. With
                                experience in both frontend and backend technologies, I enjoy bringing ideas to life through code.
                            </p>
                            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md dark:bg-background/80">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Education</h3>
                                    <p className="text-muted-foreground">B.Tech in Computer Science and Engineering</p>
                                    <p className="text-sm text-muted-foreground">SRM IST, 2019-2023</p>
                                </div>
                                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md dark:bg-background/80">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Experience</h3>
                                    <p className="text-muted-foreground">Software Engineer</p>
                                    <p className="text-sm text-muted-foreground">Keka HR, 2023-Present</p>
                                </div>
                                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md dark:bg-background/80">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Location</h3>
                                    <p className="text-muted-foreground">Punjab, India</p>
                                    <p className="text-sm text-muted-foreground">Available for remote work</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                            <span 
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: getPrimaryLightColor(selectedColor),
                                    color: getPrimaryColor(selectedColor)
                                }}
                            >
                                Projects
                            </span>
                            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Featured Projects</h2>
                            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                                Check out some of my recent work.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <ProjectCard
                                title="Project One"
                                description="A responsive web application built with React and Next.js"
                                image="/placeholder.svg?height=300&width=400"
                                link="#"
                                tags={["React", "Next.js", "Tailwind"]}
                            />
                            <ProjectCard
                                title="Project Two"
                                description="An e-commerce platform with payment integration"
                                image="/placeholder.svg?height=300&width=400"
                                link="#"
                                tags={["TypeScript", "Stripe", "MongoDB"]}
                            />
                            <ProjectCard
                                title="Project Three"
                                description="A mobile app built with React Native"
                                image="/placeholder.svg?height=300&width=400"
                                link="#"
                                tags={["React Native", "Firebase", "Redux"]}
                            />
                        </div>
                    </div>
                </section>
                <section id="skills" className="w-full py-12 md:py-24 lg:py-32 relative">
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-muted/80 dark:via-background dark:to-background"></div>
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                            <span 
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: getPrimaryLightColor(selectedColor),
                                    color: getPrimaryColor(selectedColor)
                                }}
                            >
                                Expertise
                            </span>
                            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Skills & Technologies</h2>
                            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                                Technologies and tools I work with.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-4">
                            <SkillCard name="React" level="Advanced" icon="⚛️" />
                            <SkillCard name="Next.js" level="Advanced" icon="▲" />
                            <SkillCard name="TypeScript" level="Advanced" icon="TS" />
                            <SkillCard name="JavaScript" level="Advanced" icon="JS" />
                            <SkillCard name="HTML/CSS" level="Advanced" icon="🌐" />
                            <SkillCard name="Tailwind CSS" level="Advanced" icon="🎨" />
                            <SkillCard name="Node.js" level="Intermediate" icon="🟢" />
                            <SkillCard name="Express" level="Intermediate" icon="🚂" />
                            <SkillCard name="MongoDB" level="Intermediate" icon="🍃" />
                            <SkillCard name="PostgreSQL" level="Intermediate" icon="🐘" />
                            <SkillCard name="Git" level="Advanced" icon="🔄" />
                            <SkillCard name="Docker" level="Beginner" icon="🐳" />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 relative" id="contact">
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-primary/10 dark:via-background dark:to-background"></div>
                    <div className="container px-4 md:px-6">
                        <div className="mx-auto max-w-6xl">
                            <div className="text-center mb-12">
                                <span 
                                    className="rounded-full px-3 py-1 text-sm font-medium mb-4 inline-block"
                                    style={{
                                        backgroundColor: getPrimaryLightColor(selectedColor),
                                        color: getPrimaryColor(selectedColor)
                                    }}
                                >
                                    Get in Touch
                                </span>
                                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                                    Let's Work Together
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Left Column - Contact Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 
                                            className="text-xl font-semibold mb-4"
                                            style={{ color: getPrimaryColor(selectedColor) }}
                                        >
                                            Contact Information
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            If you are seeking a dedicated professional to contribute creativity and expertise to your projects, I would be glad to discuss how I can add value to your team or organization.
                                            {/* I'm currently available for freelance work and full-time opportunities. If you have a project that needs some creative touch, I'd love to hear about it! */}
                                        </p>
                                        <p className="text-muted-foreground mb-6">
                                            Feel free to reach out via the contact form or through the channels provided below.
                                            {/* Feel free to reach out through the contact form or via the following channels: */}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <IconBadge 
                                                icon={<Mail className="h-5 w-5" />}
                                                selectedColor={selectedColor}
                                            />
                                            <a 
                                                href="mailto:dhruvsarkhandia9@gmail.com"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                dhruvsarkhandia9@gmail.com
                                            </a>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <IconBadge 
                                                icon={<Linkedin className="h-5 w-5" />}
                                                selectedColor={selectedColor}
                                            />
                                            <a 
                                                href="https://www.linkedin.com/in/dhruv-sharma-635a1a209"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                linkedin.com/in/dhruv-sharma
                                            </a>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <IconBadge 
                                                icon={<Github className="h-5 w-5" />}
                                                selectedColor={selectedColor}
                                            />
                                            <a 
                                                href="https://github.com/Dhruv159"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                github.com/Dhruv159
                                            </a>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <IconBadge 
                                                icon={<Calendar className="h-5 w-5" />}
                                                selectedColor={selectedColor}
                                            />
                                            <a 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (typeof window !== 'undefined' && (window as any).Calendly) {
                                                        (window as any).Calendly.initPopupWidget({
                                                            url: 'https://calendly.com/dhruvsarkhandia9/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=b09797&text_color=685959&primary_color=323539'
                                                        });
                                                    }
                                                }}
                                                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                            >
                                                Schedule time with me
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                
                                {/* Right Column - Contact Form */}
                                <div className="bg-background rounded-lg border p-6 shadow-sm">
                                    <ContactForm selectedColor={selectedColor} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t py-8 bg-muted/30 dark:bg-muted/10">
                <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2025 Dhruv Sharma. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

function ProjectCard({ title, description, image, link, tags }) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md dark:bg-background/80">
            <div className="aspect-video overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={300}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags &&
                        tags.map((tag, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                </div>
                <div className="mt-4">
                    <Link
                        href={link}
                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        View Project
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

function SkillCard({ name, level, icon }) {
    return (
        <div className="group flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 dark:bg-background/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                <span className="text-lg">{icon}</span>
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="mt-1 inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                {level}
            </div>
        </div>
    )
}

function ContactCard({ icon, title, value, href }: ContactCardProps) {
    return (
        <div className="group flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 dark:bg-background/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {href ? (
                <a
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {value}
                </a>
            ) : (
                <p className="text-sm text-muted-foreground">{value}</p>
            )}
        </div>
    )
}

