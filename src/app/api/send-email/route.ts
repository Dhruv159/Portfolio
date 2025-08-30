import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email-service'

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json()

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Send email using our service
        const result = await sendEmail({ name, email, message })

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: result.message
            })
        } else {
            return NextResponse.json(
                { success: false, message: result.message },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('Email API Error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to send email. Please try again.' },
            { status: 500 }
        )
    }
} 