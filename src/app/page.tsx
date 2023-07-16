import Image from "next/image";
import styles from "./page.module.css";

import { getProductsTabs } from "./services/test";

export default async function HomePage() {
  const data = await getProductsTabs();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        HOME
        {data.tabs.map((pro: any) => (
          <li key={pro.pt_id}>{pro.pt_name_gr}</li>
        ))}
      </div>
    </main>
  );
}
