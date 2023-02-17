// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  integrator_id: process.env.INTEGRATOR_ID,
});

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    console.log("req.body", req.body)
    try {
      const mpResponse = await createPreference(JSON.parse(req.body))  
      // console.log("response",mpResponse)
      res.status(200).json(mpResponse.response.id)
    } catch (error) {
      console.error(error)
    }
  } else {
    res.status(200).json({ name: 'John Doe' })
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
    external_reference: "joa193@hotmail.com",
  };
  
  return mercadopago.preferences.create(preference)
}