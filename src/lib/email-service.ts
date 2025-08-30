import { Resend } from 'resend'

// Initialize Resend with environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration from environment variables
const EMAIL_FROM = process.env.EMAIL_FROM || 'Portfolio Contact <noreply@resend.dev>'
const EMAIL_TO = process.env.EMAIL_TO || 'dhruvsarkhandia9@gmail.com'

export interface EmailData {
    name: string
    email: string
    message: string
}

// Beautiful HTML email template
export function createEmailTemplate(data: EmailData): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Message - Dhruv Sharma Portfolio</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .email-container {
                    background: white;
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    margin: 20px 0;
                }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-bottom: 30px;
                    border-bottom: 3px solid #f8f9fa;
                    position: relative;
                }
                .header::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 2px;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 8px;
                    letter-spacing: -0.5px;
                }
                .subtitle {
                    color: #6c757d;
                    font-size: 14px;
                    margin: 0;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .notification-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 30px;
                }
                .content {
                    margin-bottom: 40px;
                }
                .intro-text {
                    font-size: 18px;
                    color: #495057;
                    margin-bottom: 30px;
                    line-height: 1.7;
                    text-align: center;
                }
                .field {
                    margin-bottom: 25px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 20px;
                    border-left: 4px solid #667eea;
                }
                .field-label {
                    font-weight: 700;
                    color: #495057;
                    margin-bottom: 8px;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .field-value {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #333;
                    word-break: break-word;
                }
                .message-content {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e9ecef;
                    white-space: pre-wrap;
                    font-size: 16px;
                    line-height: 1.7;
                    color: #333;
                    font-family: inherit;
                }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 2px solid #f8f9fa;
                    color: #6c757d;
                    font-size: 13px;
                }
                .timestamp {
                    background: #e9ecef;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #495057;
                    display: inline-block;
                    margin-top: 15px;
                    font-weight: 500;
                }
                .highlight {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    display: inline-block;
                    margin-left: 8px;
                }
                .contact-info {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 30px;
                    text-align: center;
                }
                .contact-info h3 {
                    margin: 0 0 15px 0;
                    color: #495057;
                    font-size: 16px;
                    font-weight: 600;
                }
                .contact-info p {
                    margin: 5px 0;
                    color: #6c757d;
                    font-size: 14px;
                }
                @media (max-width: 600px) {
                    body {
                        padding: 10px;
                    }
                    .email-container {
                        padding: 25px;
                        margin: 10px 0;
                    }
                    .logo {
                        font-size: 24px;
                    }
                    .intro-text {
                        font-size: 16px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <div class="logo">Dhruv Sharma</div>
                    <p class="subtitle">Portfolio Contact Form</p>
                </div>
                
                <div class="content">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <span class="notification-badge">New Message Received</span>
                    </div>
                    
                    <p class="intro-text">
                        You have received a new message from your portfolio website! 
                        Someone is interested in connecting with you.
                    </p>
                    
                    <div class="field">
                        <div class="field-label">From</div>
                        <div class="field-value">
                            ${data.name} <span class="highlight">${data.email}</span>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Message</div>
                        <div class="message-content">${data.message}</div>
                    </div>
                </div>
                
                <div class="contact-info">
                    <h3>Quick Actions</h3>
                    <p>📧 Reply directly to: <strong>${data.email}</strong></p>
                    <p>👤 Contact name: <strong>${data.name}</strong></p>
                </div>
                
                <div class="footer">
                    <p>This message was sent from your portfolio contact form at dhruvsharma.dev</p>
                    <div class="timestamp">
                        📅 Sent on ${new Date().toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZoneName: 'short'
                        })}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `
}

// Send email using Resend
export async function sendEmailWithResend(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not found, using fallback email service')
            return sendEmailFallback(data)
        }

        const htmlContent = createEmailTemplate(data)

        const { data: result, error } = await resend.emails.send({
            from: EMAIL_FROM,
            to: [EMAIL_TO],
            subject: `New Contact Message from ${data.name} - Portfolio`,
            html: htmlContent,
            replyTo: data.email,
        })

        if (error) {
            console.error('Resend email error:', error)
            return {
                success: false,
                message: 'Failed to send email. Please try again.'
            }
        }

        console.log('📧 Email sent successfully via Resend:', result)
        return {
            success: true,
            message: 'Email sent successfully!'
        }

    } catch (error) {
        console.error('Resend email sending error:', error)
        return {
            success: false,
            message: 'Failed to send email. Please try again later.'
        }
    }
}

// Fallback email service for development/testing
export async function sendEmailFallback(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
        const htmlContent = createEmailTemplate(data)
        
        console.log('📧 New Contact Form Submission (Development Mode):')
        console.log('From:', data.name, `(${data.email})`)
        console.log('Message:', data.message)
        console.log('Timestamp:', new Date().toISOString())
        console.log('HTML Template Generated Successfully')
        console.log('--- Email Content Preview ---')
        console.log(htmlContent.substring(0, 500) + '...')
        console.log('--- End Preview ---')

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        return {
            success: true,
            message: 'Email sent successfully! (Development mode - check console for details)'
        }
    } catch (error) {
        console.error('Fallback email error:', error)
        return {
            success: false,
            message: 'Failed to send email. Please try again later.'
        }
    }
}

// Main email sending function
export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
    // Try Resend first, fallback to development mode
    return sendEmailWithResend(data)
} 