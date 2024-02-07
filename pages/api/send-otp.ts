import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { validateRequest } from './auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.body
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

  try {
    if (!validateRequest(req.headers)) {
      return res.status(403).json({
        success: false,
        message: 'un-authorized',
      })
    }

    await client.verify.v2.services(process.env.TWILIO_VERIFY_SID as string).verifications.create({
      to: phone,
      channel: 'sms',
    })

    res.status(200).json({ success: true, message: 'OTP Sent, Please check your phone!' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
