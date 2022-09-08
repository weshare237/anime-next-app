import sendgrid from '@sendgrid/mail'
import type { NextApiRequest, NextApiResponse } from 'next'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sendgrid.send({
      to: 'fopaduclair2000@gmail.com', // Your email where you'll receive emails
      from: 'fopaduclair2000@gmail.com', // your website email address here
      subject: `First Message`,
      html: `<div>You've got a mail</div>`,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ msg: 'success' })
}
