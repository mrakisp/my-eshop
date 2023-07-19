"use client";
import { useState, useEffect } from "react";
import { Button, Skeleton } from "@mui/material";

import { getProductsTabs } from "@/services/test";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // getProductsTabs().then((response: any) => {
    //   setIsLoading(false);
    //   setData(response.tabs);
    // });
  }, []);

  return (
    <>
      <div>dashboard</div>
      {isLoading ? (
        <Skeleton variant="rounded" width={210} height={40} />
      ) : (
        data.map((pro: any) => <li key={pro.pt_id}>{pro.pt_name_gr}</li>)
      )}
    </>
  );
}
