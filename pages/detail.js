import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(null);

  const [shopData, setShopData] = useState();

  useEffect(() => {
    if (router.isReady) {
      setQueryParams(router.query);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (queryParams) {
      (async () => {
        try {
          const response = await fetch(
            `/api/GetShopDetail?id=${queryParams.id}`
          );
          console.log(response);
          const result = await response.json();
          setShopData(result.results.shop[0]);
          console.log(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [queryParams]);

  console.log(shopData);

  return (
    <>
      <Typography>{shopData?.name}</Typography>
      <Typography>住所：{shopData?.address}</Typography>
      <Typography>営業時間：{shopData?.open}</Typography>
      <Box
        component="img"
        src={shopData?.photo?.pc?.l}
        alt="お店の写真"
        sx={{ width: "auto", height: "100px" }}
      />
    </>
  );
}
