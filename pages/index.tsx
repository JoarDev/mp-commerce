import { phoneList } from "@/utils/phoneList";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
              <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)"}}>
                {
                  phoneList.map((phone) => (
                    <div key={phone.id} style={{display: "flex", flexDirection: "column"}}>
                      {/* <img src={phone.img} /> */}
                      <div>{phone.name}</div>
                      <div>${phone.unit_price}</div>
                      <Link href={`product/${phone.id}`}>Comprar</Link>
                    </div>
                  ))
                }
              </div>
            </main>
        </>
    );
}
