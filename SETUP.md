# Portfolio Setup Guide

This guide will help you set up the portfolio project with all necessary configurations.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your actual values
# See Environment Variables section below
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔧 Environment Variables

### Required Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values:
   ```env
   # Get your API key from https://resend.com
   RESEND_API_KEY=re_your_actual_api_key_here
   
   # Your email where contact form messages will be sent
   EMAIL_TO=your-email@gmail.com
   
   # Optional: Customize the from address
   EMAIL_FROM=Portfolio Contact <noreply@resend.dev>
   ```

### Environment Variables Explained

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Your Resend API key for sending emails | Yes | `re_1234567890abcdef` |
| `EMAIL_TO` | Your email address for receiving contact form messages | Yes | `your-email@gmail.com` |
| `EMAIL_FROM` | The "from" address for emails | No | `Portfolio Contact <noreply@resend.dev>` |

### Getting Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key and paste it in `.env.local`

## 📁 File Structure

```
Portfolio/
├── .env.example          # Example environment variables (committed to git)
├── .env.local           # Your actual environment variables (ignored by git)
├── SETUP.md             # This setup guide
├── EMAIL_SETUP.md       # Detailed email service setup
└── src/
    ├── app/
    ├── components/
    └── lib/
        └── email-service.ts  # Email service configuration
```

## 🔒 Security Best Practices

### ✅ What's Committed to Git
- `.env.example` - Template with placeholder values
- `SETUP.md` - Setup instructions
- `EMAIL_SETUP.md` - Email service documentation

### ❌ What's NOT Committed to Git
- `.env.local` - Contains your actual API keys
- `node_modules/` - Dependencies
- `.next/` - Build files

### 🔐 Environment Variable Security

1. **Never commit `.env.local`** - It contains sensitive API keys
2. **Use `.env.example`** - Shows what variables are needed
3. **Document setup process** - This guide helps other developers
4. **Use different keys for dev/prod** - Keep production keys secure

## 🎨 Customization

### Color Themes
The portfolio supports multiple color themes:
- Lavender (default)
- Blue
- Green
- Purple
- Teal

### Email Template
Customize the email template in `src/lib/email-service.ts`:
- Colors and gradients
- Layout and styling
- Content and branding

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
1. Set environment variables in your hosting platform
2. Build and deploy the project
3. Test the contact form functionality

## 🐛 Troubleshooting

### Common Issues

1. **"RESEND_API_KEY not found"**
   - Check if `.env.local` exists
   - Verify the API key is correct
   - Restart the development server

2. **Emails not sending**
   - Check browser console for errors
   - Verify Resend API key is valid
   - Check email service dashboard

3. **Node.js version error**
   - Update to Node.js 18+ (required for Next.js 15)

### Development Mode
If email service isn't configured, the contact form will:
- Log email data to console
- Show success message
- Work for testing purposes

## 📞 Support

If you need help:
1. Check this setup guide
2. Review `EMAIL_SETUP.md` for email service details
3. Check the console for error messages
4. Verify all environment variables are set correctly

---

**Note**: This project requires Node.js version 18.18.0 or higher for Next.js 15 compatibility. 