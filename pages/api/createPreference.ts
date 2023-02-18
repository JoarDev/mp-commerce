// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  integrator_id: process.env.INTEGRATOR_ID,
});

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const mpResponse = await createPreference(JSON.parse(req.body))
      res.status(200).json(mpResponse.response.id)
    } catch (error) {
      res.status(500).json({ message: 'Error' })
    }
  } else {
    res.status(200).json({ message: 'Sended correctly' })
  }
}

const createPreference = async ({title, unit_price, img}:{title:string, unit_price:number, img:string}) => {
  const preference = {
    items: [
      {
        id: "7319",
        title: title,
        description: "“Dispositivo móvil de Tienda e-commerce",
        picture_url: img,
        unit_price: unit_price,
        quantity: 1,
      },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_36961754@testuser.com",
      phone: {
        area_code: "351",
        number: 7530297,
      },
      address: {
        zip_code: "4600",
        street_name: "calle falsa",
        street_number: 123,
      },
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "visa",
        }
      ],
      installments: 6,
    },
    auto_return: "approved",
    notification_url: `${process.env.VERCEL_DOMAIN}/api/notifications`,
    back_urls: {
      success: `${process.env.VERCEL_DOMAIN}/success`,
      pending: `${process.env.VERCEL_DOMAIN}/pending`,
      failure: `${process.env.VERCEL_DOMAIN}/failure`,
    },
    external_reference: "joa193@hotmail.com",
  };
  
  return mercadopago.preferences.create(preference)
}