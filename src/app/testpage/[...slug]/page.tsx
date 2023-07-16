import Image from "next/image";
// import styles from "./page.module.css";

import { getTest } from "../../services/test";

export default async function HomePage() {
  const data = await getTest();

  return <div>test</div>;
}
