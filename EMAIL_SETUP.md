# Email Service Setup Guide

This guide will help you set up email functionality for your portfolio contact form. The system supports multiple email providers with a beautiful HTML template.

## 🎨 Features

- **Beautiful HTML Email Template**: Professional, responsive design with your branding
- **Multiple Email Providers**: Support for Resend, SendGrid, and development fallback
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Development Mode**: Works without email service for testing

## 📧 Email Service Options

### Option 1: Resend (Recommended for Next.js)

Resend is a modern email API designed for developers. It's perfect for Next.js applications.

#### Setup Steps:

1. **Sign up for Resend**:
   - Go to [resend.com](https://resend.com)
   - Create a free account
   - Verify your email

2. **Get API Key**:
   - Go to your Resend dashboard
   - Navigate to API Keys
   - Create a new API key
   - Copy the key

3. **Add Environment Variable**:
   Create a `.env.local` file in your project root:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Verify Domain** (Optional but recommended):
   - Add your domain in Resend dashboard
   - Follow DNS verification steps
   - Update the `from` email in `src/lib/email-service.ts`:
   ```typescript
   from: 'Portfolio Contact <noreply@yourdomain.com>'
   ```

### Option 2: SendGrid

SendGrid is a popular email service with generous free tier.

#### Setup Steps:

1. **Sign up for SendGrid**:
   - Go to [sendgrid.com](https://sendgrid.com)
   - Create a free account
   - Verify your email

2. **Get API Key**:
   - Go to Settings > API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the key

3. **Add Environment Variable**:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Update Email Service**:
   Replace the Resend implementation in `src/lib/email-service.ts` with SendGrid:
   ```typescript
   import sgMail from '@sendgrid/mail'
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   ```

### Option 3: Development Mode (Current)

The current setup works in development mode without any external services. It logs email data to the console and simulates sending.

## 🚀 Usage

### Testing the Email Service

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Fill out the contact form** on your portfolio

3. **Check the console** for email data (in development mode)

4. **Check your email** (if using Resend/SendGrid)

### Email Template Customization

The email template is located in `src/lib/email-service.ts`. You can customize:

- **Colors**: Update the gradient colors in the CSS
- **Logo**: Change the "Dhruv Sharma" text
- **Layout**: Modify the HTML structure
- **Styling**: Update CSS classes and properties

### Environment Variables

Create a `.env.local` file in your project root:

```env
# Resend (recommended)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# SendGrid (alternative)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Other options
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=dhruvsarkhandia9@gmail.com
```

## 📋 Email Template Features

### Design Elements:
- **Responsive Design**: Works on all devices
- **Gradient Background**: Beautiful purple gradient
- **Professional Typography**: Clean, readable fonts
- **Card Layout**: Modern card-based design
- **Color-coded Sections**: Easy to scan information

### Content Sections:
- **Header**: Your name and "Portfolio Contact Form"
- **Notification Badge**: "New Message Received"
- **Contact Information**: Sender's name and email
- **Message Content**: The actual message
- **Quick Actions**: Reply information
- **Footer**: Timestamp and source information

### Styling Features:
- **Gradient Text**: Your name with gradient effect
- **Highlighted Email**: Email address with background highlight
- **Bordered Sections**: Clean separation between content
- **Hover Effects**: Interactive elements
- **Mobile Responsive**: Optimized for mobile devices

## 🔧 Troubleshooting

### Common Issues:

1. **"RESEND_API_KEY not found"**:
   - Check your `.env.local` file
   - Restart the development server
   - Verify the API key is correct

2. **Email not sending**:
   - Check browser console for errors
   - Verify network connectivity
   - Check email service dashboard for errors

3. **Template not rendering**:
   - Check email client compatibility
   - Test with different email clients
   - Verify HTML syntax

### Debug Mode:

The system includes comprehensive logging. Check your console for:
- Email data being sent
- API responses
- Error messages
- Template generation status

## 📱 Email Client Compatibility

The template is tested and optimized for:
- **Gmail** (Web & Mobile)
- **Outlook** (Web & Desktop)
- **Apple Mail**
- **Thunderbird**
- **Mobile email apps**

## 🎯 Next Steps

1. **Choose an email service** (Resend recommended)
2. **Set up environment variables**
3. **Test the contact form**
4. **Customize the email template**
5. **Deploy to production**

## 📞 Support

If you need help setting up the email service:
1. Check the troubleshooting section
2. Review the email service documentation
3. Test with development mode first
4. Verify all environment variables are set correctly

---

**Note**: The current setup works in development mode and will log all email data to the console. For production, set up a real email service like Resend or SendGrid. 