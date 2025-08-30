// app/layout.tsx
import "@/app/globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
title: "Dhruv Sharma | Portfolio",
description: "Personal portfolio website showcasing my projects and skills",
}

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
<html lang="en" suppressHydrationWarning>
              <head>
                  <meta name="color-scheme" content="light dark" />
              </head>
              <body className={inter.className}>
                  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                      {children}<Toaster/>
                  </ThemeProvider>
              </body>
          </html>
      )
}