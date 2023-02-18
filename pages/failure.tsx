import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()

    return (
        <>
            <main>
              <div>
                Tienda e-commerce
              </div>
              <div>
                <h1>Pago Rechazado</h1>
                <h3>Query Params:</h3>
                {
                  Object.entries(router.query).map(([key, value]) => (
                    <div key={key}>
                      {key}: {value}
                    </div>
                  ))
                }
              </div>
            </main>
        </>
    );
}
