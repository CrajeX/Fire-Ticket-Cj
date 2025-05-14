module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.example.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME', 'user@example.com'),
          pass: env('SMTP_PASSWORD', 'password'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'info@fireprotection.com'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'noreply@fireprotection.com'),
      },
    },
  },
});