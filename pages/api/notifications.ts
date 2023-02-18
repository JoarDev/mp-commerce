import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const notificationBody = JSON.parse(req.body)
    console.log("notification body:", notificationBody)
    res.status(200)
  } else {
    res.status(400)
  }
}