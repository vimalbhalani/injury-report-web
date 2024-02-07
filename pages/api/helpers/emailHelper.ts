import nodemailer from 'nodemailer'

interface MailData {
  from: string
  to: string
  replyTo: string
  subject: string
  htmlString: any
  attachments?: { filename: string; content: Buffer }[]
}

export default async function sendMail(mailData: MailData) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
    })

    await transporter.sendMail({
      from: mailData.from,
      to: mailData?.to,
      replyTo: mailData.replyTo,
      subject: mailData.subject,
      html: mailData?.htmlString,
      attachments: mailData?.attachments,
    })
  } catch (error) {
    throw error
  }
}
