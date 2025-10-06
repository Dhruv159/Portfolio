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
import { getPrimaryColor, getPrimaryLightColor, getGradientClass, getCalendlyColors } from "@/lib/color-utils"
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
    const [activeProjectTab, setActiveProjectTab] = useState("personal")
    const [activeSkillCategory, setActiveSkillCategory] = useState("automation")

    // Available colors for automatic theme switching
    const availableColors = ["lavender", "blue", "green", "teal"]

    // Load theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme')
        if (savedTheme) {
            setSelectedColor(savedTheme)
        }
    }, [])

    // Automatic theme switching every 30 minutes
    useEffect(() => {
        const interval = setInterval(() => {
        setSelectedColor(prevColor => {
            const currentIndex = availableColors.indexOf(prevColor);
            const nextIndex = (currentIndex + 1) % availableColors.length;
            const nextColor = availableColors[nextIndex];
            localStorage.setItem('portfolio-theme', nextColor);
            return nextColor;
        });
        }, 5 * 60 * 1000); // 5 minutes
    
        return () => clearInterval(interval);
    }, [availableColors]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about", "projects", "contact"]
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
        setIsMobileMenuOpen(false)
    }

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

    const handleCalendlyClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (typeof window !== 'undefined' && (window as any).Calendly) {
            const calendlyColors = getCalendlyColors(selectedColor);
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');

            const baseUrl = `https://calendly.com/dhruvsarkhandia9/30min?&month=${year}-${month}?hide_event_type_details=1&hide_gdpr_banner=1`;

            const colorParams = [
                `primary_color=${encodeURIComponent(calendlyColors.primary_color)}`,
                // `text_color=${encodeURIComponent(calendlyColors.text_color)}`,
                // `background_color=${encodeURIComponent(calendlyColors.background_color)}`
            ].join('&');
            
            (window as any).Calendly.initPopupWidget({
                url: `${baseUrl}&${colorParams}`
            });
        }
    }

    if (isLoading) {
        return <Loader onComplete={handleLoaderComplete} selectedColor={selectedColor} />
    }

    function withAlpha(color: string, alpha: number): string {
        const match = color.match(/^oklch\(([^)]+)\)$/);
        if (!match) return color;
      
        const parts = match[1].trim().split(/\s+/);
        if (parts.length === 3) {
          return `oklch(${parts[0]} ${parts[1]} ${parts[2]} / ${alpha})`;
        }
      
        return color;
      }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gradient-to-b dark:from-background dark:to-background mx-auto max-w-full">
            <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 px-6">
                <div className="container mx-auto flex h-16 items-center justify-between max-w-7xl">
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/" className="flex items-center space-x-2">
                            <span 
                                className="font-bold text-xl"
                                style={{ 
                                    backgroundImage: `linear-gradient(90deg, ${withAlpha(getPrimaryColor(selectedColor), 1)}, ${withAlpha(getPrimaryColor(selectedColor), 0.80)}, ${withAlpha(getPrimaryColor(selectedColor), 0.60)})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Dhruv Sharma
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex gap-10">
                            <button 
                                onClick={() => scrollToSection("about")}
                                className={`cursor-pointer group relative text-sm font-medium transition-colors hover:text-primary ${
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
                            </button>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className={`cursor-pointer group relative text-sm font-medium transition-colors hover:text-primary ${
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
                            </button>
                            <button 
                                onClick={() => scrollToSection("contact")}
                                className={`cursor-pointer group relative text-sm font-medium transition-colors hover:text-primary ${
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
                            </button>
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
                        <nav className="container mx-auto py-4 flex flex-col gap-4 max-w-7xl">
                            <button 
                                onClick={() => scrollToSection("about")}
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("about") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("about") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("projects") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("projects") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                Projects
                            </button>
                            <button 
                                onClick={() => scrollToSection("contact")}
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive("contact") ? "text-primary" : "text-muted-foreground"
                                }`}
                                style={{
                                    color: isActive("contact") ? getPrimaryColor(selectedColor) : undefined
                                }}
                            >
                                Contact
                            </button>
                        </nav>
                    </div>
                )}
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
                    {/* Gradient Background */}
                    <div 
                        className="absolute inset-0 -z-10"
                        style={{
                            background: `linear-gradient(135deg, ${getPrimaryLightColor(selectedColor)} 0%, transparent 50%, ${getPrimaryLightColor(selectedColor)} 100%)`
                        }}
                    ></div>
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-primary/20 dark:via-background dark:to-background"></div>
                    
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="flex flex-col justify-center space-y-6">
                                <div className="space-y-4">
                                    <div className="text-xl font-medium sm:text-4xl xl:text-5xl/none">
                                        <span>
                                            <p className="whitespace-nowrap">Software Engineer | Product-Focused</p>
                                        </span>
                                    </div>
                                    <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                                        Driving product excellence through thoughtful development, rigorous testing, and seamless software solutions.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                    <Button
                                        size="lg"
                                        className="group relative overflow-hidden rounded-md px-6 py-3 transition-all duration-300 ease-out border-2 cursor-pointer"
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderColor: getPrimaryColor(selectedColor),
                                            color: getPrimaryColor(selectedColor)
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = getPrimaryColor(selectedColor);
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = getPrimaryColor(selectedColor);
                                        }}
                                        onClick={() => scrollToSection("contact")}
                                    >
                                        <span className="flex items-center">
                                            Let's Connect
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Button>
                                </div>
                                
                                <div className="flex gap-4 mt-6 justify-center">
                                    <Link
                                        href="https://github.com/Dhruv159"
                                        className="rounded-full p-3 transition-all duration-300 hover:scale-105"
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
                                        className="rounded-full p-3 transition-all duration-300 hover:scale-105"
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
                                        className="rounded-full p-3 transition-all duration-300 hover:scale-105"
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
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="max-w-[58rem] mx-auto flex flex-col items-center justify-center gap-4 text-center">
                            <span 
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: getPrimaryLightColor(selectedColor),
                                    color: getPrimaryColor(selectedColor)
                                }}
                            >
                                About Me
                            </span>
                            <p className="text-xl font-medium sm:text-4xl xl:text-5xl/none">Experience & Expertise</p>
                        </div>
                        
                        <div className="mx-auto max-w-6xl mt-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <p className="text-xl font-semibold">Professional Journey</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground">
                                        As a Software Engineer at Keka Technologies with over 3 years of experience, I have been actively involved in designing, building, and enhancing core HRMS and billing solutions that serve a large and growing user base. My role has primarily focused on developing scalable applications, optimizing performance, and ensuring seamless integrations through APIs and automation.
                                    </p>
                                    <p className="text-muted-foreground">
                                        I have contributed to end-to-end feature development — from requirement analysis and system design to deployment and support — ensuring that the solutions align with both business goals and user needs. By applying principles of clean architecture and best coding practices, I’ve delivered modules that are maintainable, extensible, and aligned with industry standards.
                                    </p>
                                    <p className="text-muted-foreground">
                                        In addition, I have worked on performance tuning initiatives, reducing load times and improving system responsiveness to handle high-volume transactions effectively. My efforts in automating recurring processes and streamlining integrations have significantly minimized manual intervention, boosting efficiency for both internal teams and end users.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Collaboration has been at the heart of my work, as I’ve closely partnered with cross-functional teams including product managers, QA, and DevOps to ensure timely, high-quality releases. This team-driven approach, combined with a focus on continuous learning and adopting modern technologies, has consistently resulted in reliable software that enhances user experience, increases adoption, and drives business value.
                                    </p>
                                </div>
                            </div>

                            {/* Technical Skills Section */}
                            <div className="mt-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <p className="text-xl font-semibold">Technical Skills</p>
                                </div>

                                {/* Skill Category Navigation */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {[
                                    { id: "frontend", label: "Frontend" },
                                    { id: "backend", label: "Backend" },
                                    { id: "database", label: "Database" },
                                    { id: "languages", label: "Languages" },
                                    { id: "tools", label: "Tools & Monitoring" },
                                    { id: "cloud", label: "Cloud & DevOps" },
                                    // { id: "automation", label: "Automation & Testing" },
                                    ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSkillCategory(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        activeSkillCategory === tab.id
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        }`}
                                        style={{
                                        backgroundColor:
                                            activeSkillCategory === tab.id
                                            ? getPrimaryColor(selectedColor)
                                            : undefined,
                                        color: activeSkillCategory === tab.id ? "white" : undefined,
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                    ))}
                                </div>

                                {/* Active Skill Category Content */}
                                <div className="space-y-6">
                                    {activeSkillCategory === "frontend" && (
                                    <SkillCategory
                                        title="Frontend Development"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={[
                                        "React",
                                        "Angular 2+",
                                        "Next.js",
                                        "HTML5",
                                        "CSS3",
                                        "Tailwind CSS",
                                        "Material UI",
                                        "Bootstrap",
                                        ]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {activeSkillCategory === "backend" && (
                                    <SkillCategory
                                        title="Backend Development"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M10 2a8 8 0 00-8 8v4a4 4 0 004 4h8a4 4 0 004-4v-4a8 8 0 00-8-8zm1 14H9v-2h2v2zm0-4H9V6h2v6z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={[
                                        "Node.js",
                                        "Express.js",
                                        ".NET Core",
                                        "RESTful APIs",
                                        "GraphQL",
                                        "JWT Authentication",
                                        ]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {activeSkillCategory === "database" && (
                                    <SkillCategory
                                        title="Database"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M4 5c0-1.105 2.686-2 6-2s6 .895 6 2v10c0 1.105-2.686 2-6 2s-6-.895-6-2V5zm6 6c3.314 0 6-.448 6-1V8c0 .552-2.686 1-6 1s-6-.448-6-1v2c0 .552 2.686 1 6 1z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={["SQL Server", "PostgreSQL", "MySQL"]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {activeSkillCategory === "languages" && (
                                    <SkillCategory
                                        title="Programming Languages"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2h-5l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                        </svg>
                                        }
                                        skills={["JavaScript", "TypeScript", "C#"]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {activeSkillCategory === "tools" && (
                                    <SkillCategory
                                        title="Tools & Monitoring"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={[
                                        "Git",
                                        "GitHub",
                                        "VS Code",
                                        "Visual Studio",
                                        "Postman",
                                        "Grafana",
                                        "Azure Portal",
                                        ]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {activeSkillCategory === "cloud" && (
                                    <SkillCategory
                                        title="Cloud & DevOps Services"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M3 10a7 7 0 0114 0 3 3 0 010 6H6a3 3 0 01-3-3v-3z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={[
                                        "Microsoft Azure",
                                        "Azure DevOps",
                                        "CI/CD Pipelines",
                                        "Docker",
                                        "Kubernetes",
                                        "AWS (Basic)",
                                        ]}
                                        selectedColor={selectedColor}
                                    />
                                    )}

                                    {/* {activeSkillCategory === "automation" && (
                                    <SkillCategory
                                        title="Automation & Testing"
                                        icon={
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                            />
                                        </svg>
                                        }
                                        skills={[
                                        "WebdriverIO",
                                        "Playwright",
                                        "Postman",
                                        "JMeter",
                                        "Cucumber",
                                        "Page Object Model",
                                        "Azure DevOps",
                                        "CI/CD Pipelines",
                                        ]}
                                        selectedColor={selectedColor}
                                    />
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="max-w-[58rem] mx-auto flex flex-col items-center justify-center gap-4 text-center">
                            <span 
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: getPrimaryLightColor(selectedColor),
                                    color: getPrimaryColor(selectedColor)
                                }}
                            >
                                Projects
                            </span>
                            <h2 className="text-xl font-medium sm:text-4xl xl:text-5xl/none">Featured Projects</h2>
                            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                                Check out some of my recent work.
                            </p>
                        </div>
                        
                        {/* Project Filter Tabs */}
                        <div className="flex justify-center mt-8 mb-12">
                            <div className="inline-flex rounded-lg border border-border bg-muted p-1">
                                <button
                                    onClick={() => setActiveProjectTab("personal")}
                                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
                                        activeProjectTab === "personal" 
                                            ? "bg-background text-foreground shadow-sm" 
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                    style={{
                                        backgroundColor: activeProjectTab === "personal" ? getPrimaryColor(selectedColor) : undefined,
                                        color: activeProjectTab === "personal" ? "white" : undefined,
                                        borderColor: activeProjectTab === "personal" ? getPrimaryColor(selectedColor) : undefined
                                    }}
                                >
                                    Personal Projects
                                </button>
                                <button
                                    onClick={() => setActiveProjectTab("company")}
                                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
                                        activeProjectTab === "company" 
                                            ? "bg-background text-foreground shadow-sm" 
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                    style={{
                                        backgroundColor: activeProjectTab === "company" ? getPrimaryColor(selectedColor) : undefined,
                                        color: activeProjectTab === "company" ? "white" : undefined,
                                        borderColor: activeProjectTab === "company" ? getPrimaryColor(selectedColor) : undefined
                                    }}
                                >
                                    Company Projects
                                </button>
                            </div>
                        </div>

                        {/* Personal Projects */}
                        {activeProjectTab === "personal" && (
                            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <PersonalProjectCard
                                    category="Productivity App"
                                    title="Awesome quiz app"
                                    description="A dynamic and engaging quiz platform built to deliver personalized assessments with real-time scoring and analytics."
                                    technologies={["JavaScript", "HTML5", "CSS3"]}
                                    link="#"
                                />
                                {/* <PersonalProjectCard
                                    category="QueryEcho"
                                    title="Math Question Game"
                                    description="Educational game with multiple difficulty levels and progress tracking"
                                    technologies={["React", "TypeScript", "HTML5", "CSS3"]}
                                    link="#"
                                /> */}
                            </div>
                        )}

                        {/* Company Projects */}
                        {activeProjectTab === "company" && (
                            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8">
                                <CompanyProjectCard
                                    title="Pricing Plan & Subscription Management System"
                                    description="Developed an intelligent billing and subscription engine that empowers businesses to design, automate, and optimize recurring revenue models. It simplifies every step of the subscription lifecycle—from plan creation to payment collection—while offering full flexibility to customize pricing, features, and billing cycles for different customer segments."
                                    impact="Streamlined billing and increased revenue accuracy"
                                    benefits={[
                                        "Allow enterprise clients to personalize plans, add-on modules, and discounts based on negotiated terms.",
                                        "Enable smooth activation, renewal, upgrades, and cancellations through fully automated workflows.",
                                        "Identify failed payments, renewal lapses, and discrepancies early to reduce churn and recover potential losses.",
                                        "Generate invoices automatically, handle taxes, and monitor payments in real time for smooth cash flow."
                                    ]}
                                    link="#"
                                    selectedColor={selectedColor}
                                />
                                <CompanyProjectCard
                                    title="Client Support and Ticketing System"
                                    description="Enhance an internal ticketing and request management platform to streamline client communication, bug tracking, and feature request handling. The system ensures transparency, faster resolution cycles, and better collaboration between clients and internal teams."
                                    impact="30% reduction in client issue resolution time"
                                    benefits={[
                                        "Centralized tracking for client bugs, dev tasks, and feature requests.",
                                        "Automated status updates and workflow management.",
                                        "Integrated client side chatbots for instant client support.",
                                        "Enhanced client experience through real-time communication and visibility."
                                    ]}
                                    link="#"
                                    selectedColor={selectedColor}
                                />
                                <CompanyProjectCard
                                    title="Frontend Modernization & Migration"
                                    description="Migrated the legacy frontend codebase to the latest framework version, restructured the overall architecture for scalability and maintainability, ensured compatibility with all third-party integrations, and delivered a faster, more responsive user experience."
                                    impact="60% improvement in performance and developer efficiency"
                                    benefits={[
                                        "Upgraded outdated components and optimized UI rendering.",
                                        "Redesigned codebase structure for modularity and scalability.",
                                        "Ensured seamless integration with third-party libraries and tools.",
                                        "Enhanced load times and improved overall user interaction experience."
                                    ]}
                                    link="#"
                                    selectedColor={selectedColor}
                                />
                        </div>
                        )}
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 relative" id="contact">
                    <div className="absolute inset-0 -z-10 bg-white dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-primary/10 dark:via-background dark:to-background"></div>
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="max-w-6xl mx-auto">
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
                                <h2 className="text-xl font-medium sm:text-4xl xl:text-5xl/none">
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
                                            <a  onClick={handleCalendlyClick}
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
                <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © {new Date().getFullYear()} Dhruv Sharma. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

function PersonalProjectCard({ category, title, description, technologies, link }) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 dark:shadow-primary/5 dark:hover:shadow-primary/20 hover:-translate-y-1 dark:bg-background/80">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {category}
                    </span>
                    {/* <div className="h-5 w-5 rounded border border-muted-foreground/20 flex items-center justify-center">
                        <svg className="h-3 w-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div> */}
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, i) => (
                            <span
                                key={i}
                            className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                            {tech}
                            </span>
                        ))}
                </div>
                {/* <div className="mt-4">
                    <Link
                        href={link}
                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        View Demo
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

function CompanyProjectCard({ title, description, impact, benefits, link, selectedColor }) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 dark:shadow-primary/5 dark:hover:shadow-primary/20 hover:-translate-y-1 dark:bg-background/80">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div 
                            className="h-5 w-5 rounded-full flex items-center justify-center"
                            style={{
                                backgroundColor: getPrimaryLightColor(selectedColor)
                            }}
                        >
                            <svg 
                                className="h-3 w-3" 
                                style={{ color: getPrimaryColor(selectedColor) }}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-primary">Impact: {impact}</span>
                    </div>
                    <ul className="space-y-1">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="text-sm text-primary flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function SkillCategory({ title, icon, skills, selectedColor }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                    style={{
                        backgroundColor: getPrimaryLightColor(selectedColor)
                    }}
                >
                    <div style={{ color: getPrimaryColor(selectedColor) }}>
                        {icon}
                    </div>
                </div>
                <h4 className="font-semibold">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}


