import Head from "next/head";
import styles from "../styles/Home.module.css";

import fs from "fs";

// getStaticProps only runs in the Node side, so it is safe
// to use libraries from Node here
export async function getStaticProps() {
  const apiRoutes = fs
    .readdirSync("./pages/api")
    .map((file) => file.split(".")[0]);

  return {
    props: { apiRoutes },
  };
}

export default function Home({ apiRoutes }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>LaMetric Hub</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Available API Routes :</h1>

        <div className={styles.grid}>
          {apiRoutes.map((apiRoute: string) => (
            <a
              key={apiRoute}
              href={`${process.env.NEXT_PUBLIC_URL}/${apiRoute}`}
              className={styles.card}
            >
              <h2>/{apiRoute} ➡️</h2>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
