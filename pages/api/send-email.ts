import fs from 'fs'
import { promisify } from 'util'
import * as formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { validateRequest } from './auth'
import sendMail from './helpers/emailHelper'

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFileAsync = promisify(fs.readFile)

const getHtmlTemplate = (templateData: Record<string, string | undefined | Buffer[]>) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    dateOfAccident,
    transportation,
    zipCode,
    painLevel,
    insurance,
    state,
    city,
    appointmentDate,
    appointmentTime,
    documents,
  } = templateData
  return `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <p style=" margin: 0 0 30px 0; font-weight: 600; font-size: 24px; text-align:center;">Incident Reports</p>
    <table style="border-collapse: collapse; text-align: left;">
        <tr style="border-bottom: 3px solid transparent;">
            <th>First Name:</th>
            <td>${firstName}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Last Name:</th>
            <td>${lastName}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Phone:</th>
            <td>${phone}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Email:</th>
            <td>${email}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>State of Accident:</th>
            <td>${state}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>City of Accident:</th>
            <td>${city}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Date of accident:</th>
            <td>${dateOfAccident ? new Date(dateOfAccident.toString()) : ''}</td>
        </tr>
         <tr style="border-bottom: 3px solid transparent;">
            <th>pain Level:</th>
            <td>${painLevel}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Insurance carrier:</th>
            <td>${insurance}</td>
        </tr>
        <tr style="border-bottom: 3px solid transparent;">
        <th>Best time for appointment :</th>
        <td>${appointmentDate} ${appointmentTime}</td>
      </tr>
        <tr style="border-bottom: 3px solid transparent;">
            <th>Zip code:</th>
            <td>${zipCode}</td>
        </tr>
         <tr style="border-bottom: 3px solid transparent;">
            <th>Transportation :</th>
            <td>${transportation}</td>
        </tr>
    </table>
    <img  style='display: flex; width: 150px; height: 150px; margin: 0 auto; padding-bottom: 20px; margin-top:50px'
      src='${process.env.BACKEND_URL}/logo.png' alt='Logo'/>
</body>
</html>`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!validateRequest(req.headers)) {
      return res.status(403).json({
        success: false,
        message: 'un-authorized',
      })
    }

    const adminEmail = process.env.SMTP_USERNAME as string
    const ownerEmail = process.env.OWNER_EMAIL_ADDRESS as string
    const replyTo = 'noreply@example.com'

    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const singleValueFields = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, value && value[0]]),
      )
      const fileKeys = Object.keys(files)
      const filePromises = fileKeys.map(async (key) => {
        const persistentFile = (files[key] as any)[0]
        if (!persistentFile) {
          throw new Error(`File not found`)
        }
        const filePath = persistentFile.filepath
        const fileBuffer = await readFileAsync(filePath)
        return { filename: persistentFile?.originalFilename, content: fileBuffer }
      })

      const fileAttachments = await Promise.all(filePromises)
      const templateData = { ...singleValueFields }

      let mailObj = {
        from: adminEmail,
        replyTo: replyTo,
        to: ownerEmail,
        subject: `${singleValueFields?.lastName} / ${singleValueFields?.city}`,
        htmlString: getHtmlTemplate(templateData),
        attachments: fileAttachments,
      }
      await sendMail(mailObj)
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      await client.messages.create({
        body: 'Thank you for requesting a legal consultation, a law firm will be contacting you shortly.',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: singleValueFields?.phone || '',
      })
      res.status(200).json({ success: true, message: 'Email sent successfully' })
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}
