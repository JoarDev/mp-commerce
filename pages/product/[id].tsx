import { phoneList } from "@/utils/phoneList";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const id_string = Array.isArray(id) ? id[0] : id || ""
  const phoneData = phoneList[parseInt(id_string)]

  const handlePay = async () => {
    const response = await fetch("/api/createPreference", {
      method: "POST",
      body: JSON.stringify({
        ...phoneData
      })
    })
    const id = await response.json()

    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_TOKEN, {
      locale: 'es-AR'
    });
  
    mp.checkout({
      preference: {
        id: id
      },
    }).open();
  }

    return (
        <>
            <Head>
                <title>Tienda e-commerce</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <div>
                Tienda e-commerce
              </div>
              {
                phoneData ? (
                  <div style={{display: "flex", flexDirection: "column"}}>
                    {/* <img src={phoneData.img} /> */}
                    <div>{phoneData.name}</div>
                    <div>${phoneData.unit_price}</div>
                    <button onClick={handlePay}>Pagar la compra</button>
                  </div>
                ) : null
              }
            </main>
        </>
    );
}
