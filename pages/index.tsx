import Head from "next/head";
import HomePostMain from "../components/HomePage/HomePostMain";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Week 3 Supabase</title>
        <meta name="description" content="Week 3 Supabase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePostMain />
    </div>
  );
}
