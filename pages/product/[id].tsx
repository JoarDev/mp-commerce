import { phoneList } from "@/utils/phoneList";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const id_string = Array.isArray(id) ? id[0] : id || ""
  const phoneData = phoneList[parseInt(id_string)]

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
              <div style={{display: "flex", flexDirection: "column"}}>
                <img src={phoneData.image} />
                <div>{phoneData.name}</div>
                <div>${phoneData.price}</div>
                <button>Comprar</button>
              </div>
            </main>
        </>
    );
}
