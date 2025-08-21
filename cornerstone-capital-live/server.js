const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const crypto = require("crypto")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use app-specific password for Gmail
  },
})

// Email template
const getVerificationEmailHTML = (userData, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Cornerstone Capital</title>
        <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 40px 30px; text-align: center; color: white; }
            .logo { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .content { padding: 40px 30px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; text-decoration: none; padding: 18px 40px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">CC</div>
                <h1>Welcome to Cornerstone Capital</h1>
                <p>Your Premier Investment Platform</p>
            </div>
            <div class="content">
                <h2>🎉 Account Created Successfully!</h2>
                <p>Dear <strong>${userData.title} ${userData.firstName} ${userData.lastName}</strong>,</p>
                <p>Thank you for choosing Cornerstone Capital. To complete your registration, please verify your email address:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" class="btn">Verify My Email Address</a>
                </div>
                <p>If the button doesn't work, copy this link: <br><a href="${verificationUrl}">${verificationUrl}</a></p>
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #065f46; margin: 0 0 10px;">🔒 Security Notice</h3>
                    <p style="color: #047857; margin: 0;">This link expires in 24 hours. If you didn't create this account, please ignore this email.</p>
                </div>
                <h3>What's Next?</h3>
                <ul>
                    <li>Verify your email address</li>
                    <li>Complete your investment profile</li>
                    <li>Fund your account</li>
                    <li>Start building wealth</li>
                </ul>
                <p>Need help? Contact us at <a href="mailto:support@cornerstonecapital.co.uk">support@cornerstonecapital.co.uk</a></p>
            </div>
            <div class="footer">
                <h3>Cornerstone Capital</h3>
                <p>25 Canada Square, Canary Wharf, London E14 5LQ</p>
                <p>FCA Authorized and Regulated</p>
                <p>© 2025 Cornerstone Capital. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `
}

// API Routes
app.post("/api/send-verification", async (req, res) => {
  try {
    const { userData, verificationToken } = req.body

    if (!userData || !userData.email || !verificationToken) {
      return res.status(400).json({
        success: false,
        error: "Missing required data",
      })
    }

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email.html?token=${verificationToken}&email=${encodeURIComponent(userData.email)}`

    const mailOptions = {
      from: {
        name: "Cornerstone Capital",
        address: process.env.EMAIL_USER,
      },
      to: userData.email,
      subject: "🔐 Verify Your Cornerstone Capital Account",
      html: getVerificationEmailHTML(userData, verificationUrl),
      text: `
Welcome to Cornerstone Capital!

Dear ${userData.title} ${userData.firstName} ${userData.lastName},

Your account has been created successfully. Please verify your email address by visiting:
${verificationUrl}

This link will expire in 24 hours for security reasons.

If you didn't create this account, please ignore this email.

Best regards,
The Cornerstone Capital Team

---
Cornerstone Capital
25 Canada Square, Canary Wharf, London E14 5LQ
FCA Authorized and Regulated
            `,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("Verification email sent:", info.messageId)

    res.json({
      success: true,
      messageId: info.messageId,
      message: "Verification email sent successfully",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    res.status(500).json({
      success: false,
      error: "Failed to send verification email",
      details: error.message,
    })
  }
})

app.post("/api/resend-verification", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      })
    }

    // Generate new verification token
    const newToken = crypto.randomBytes(32).toString("hex")
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email.html?token=${newToken}&email=${encodeURIComponent(email)}`

    const mailOptions = {
      from: {
        name: "Cornerstone Capital",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "🔐 New Verification Link - Cornerstone Capital",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e3a8a;">New Verification Link</h2>
                <p>You requested a new verification link for your Cornerstone Capital account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background: #1e3a8a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
                </div>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
            `,
      text: `New verification link: ${verificationUrl}`,
    }

    const info = await transporter.sendMail(mailOptions)

    res.json({
      success: true,
      messageId: info.messageId,
      message: "New verification email sent successfully",
    })
  } catch (error) {
    console.error("Resend email error:", error)
    res.status(500).json({
      success: false,
      error: "Failed to resend verification email",
    })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Cornerstone Capital Email Service",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email service running on port ${PORT}`)
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`)
})

module.exports = app
