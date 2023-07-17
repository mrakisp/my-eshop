// import Image from "next/image";
import { getProductsTabs } from "@/services/test";

export default async function ProductPage() {
  const data = await getProductsTabs();
  return (
    <div>
      product
      {data.tabs.map((pro: any) => (
        <li key={pro.pt_id}>{pro.pt_name_gr}</li>
      ))}
    </div>
  );
}
