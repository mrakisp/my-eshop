import Button from "@mui/material/Button";
import { getProductsTabs } from "@/services/test";

export default async function Dashboard() {
  const data = await getProductsTabs();

  return (
    <>
      <div>dashboard</div>
      <Button variant="contained">BUUUTON</Button>
      {data.tabs.map((pro: any) => (
        <li key={pro.pt_id}>{pro.pt_name_gr}</li>
      ))}
    </>
  );
}
