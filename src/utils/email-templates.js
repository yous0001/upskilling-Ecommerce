export function generateVerificationEmail({ firstName, verificationLink }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Upskilling</title>
    <style>
        /* Base styles */
        body {
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
        }
        
        /* Email container */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            padding: 40px 20px;
            text-align: center;
        }
        
        .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            text-decoration: none;
            letter-spacing: -0.5px;
        }
        
        /* Content */
        .content {
            padding: 40px;
        }
        
        h1 {
            color: #166534;
            margin-top: 0;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 20px;
        }
        
        p {
            margin-bottom: 24px;
            color: #4b5563;
            font-size: 16px;
        }
        
        a {
            color: #16a34a;
            text-decoration: none;
        }
        
        /* Button */
        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
            transition: all 0.3s ease;
        }
        
        .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
        }
        
        /* Divider */
        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
        }
        
        /* Footer */
        .footer {
            background-color: #ffffff;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #f3f4f6;
        }
        
        .social-links a {
            margin: 0 8px;
            text-decoration: none;
            color: #16a34a;
            font-weight: 500;
        }
        
        .address {
            margin-top: 20px;
            line-height: 1.5;
        }
        
        /* Responsive */
        @media screen and (max-width: 480px) {
            .content {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 22px;
            }
            
            .verify-button {
                padding: 14px 28px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <a href="https://www.upskilling.com" class="logo">Upskilling</a>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1>Almost There! Verify Your Email</h1>
            <p>Hello ${firstName},</p>
            <p>Welcome to Upskilling! We're thrilled you're joining our community of lifelong learners.</p>
            <p>To complete your registration and unlock access to our premium courses and resources, please verify your email address:</p>
            
            <div style="text-align: center;">
                <a href="${verificationLink}" class="verify-button">Verify My Email</a>
            </div>
            
            <div class="divider"></div>
            
            <p><strong>Didn't request this?</strong> If you didn't create an account with Upskilling, please ignore this email or <a href="mailto:support@upskilling.com">contact our support team</a>.</p>
            
            <p>This verification link expires in 24 hours for your security.</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="social-links">
                <a href="https://facebook.com/upskilling">Facebook</a>
                <a href="https://twitter.com/upskilling">Twitter</a>
                <a href="https://linkedin.com/company/upskilling">LinkedIn</a>
                <a href="https://instagram.com/upskilling">Instagram</a>
            </div>
            
            <div class="address">
                ${`© ${new Date().getFullYear()} Upskilling Inc.<br>
                123 Learning Boulevard, Suite 100<br>
                San Francisco, CA 94107`}
            </div>
            
            <div style="margin-top: 20px;">
                <a href="https://upskilling.com/privacy">Privacy Policy</a>
                <a href="https://upskilling.com/terms">Terms of Service</a>
                <a href="https://upskilling.com/unsubscribe">Unsubscribe</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
}
