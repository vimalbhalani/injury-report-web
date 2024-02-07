import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { validateRequest } from './auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, otp } = req.body
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

  try {
    if (!validateRequest(req.headers)) {
      return res.status(403).json({
        success: false,
        message: 'un-authorized',
      })
    }
    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID as string)
      .verificationChecks.create({ to: phone, code: otp })
    console.log('response: ', response)
    if (response && response.status === 'approved') {
      res.status(200).json({ message: 'OTP Verified.' })
    } else {
      res.status(400).json({ error: 'Invalid OTP' })
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
