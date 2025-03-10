import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(null);

  const [shops, setShops] = useState();
  const [page, setPage] = useState(1);

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
            `/api/GetNearShops?lat=${queryParams.lat}&lng=${queryParams.lng}&range=${queryParams.range}`
          );
          console.log(response);
          const result = await response.json();
          setShops(result.results.shop);
          console.log(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [page, queryParams]);

  console.log(shops);

  return (
    <>
      <Stack spacing={2}>
        {shops?.map((e) => {
          return (
            <div key={e.id}>
              <DisplayShop shop={e} />
            </div>
          );
        })}
      </Stack>
    </>
  );
}

function DisplayShop({ shop }) {
  return (
    <Box border={1}>
      <Box
        component="img"
        src={shop?.photo?.pc?.l}
        alt="お店の写真"
        sx={{ width: "auto", height: "100px" }}
      />
      <Link
        href={{
          pathname: "/detail",
          query: {
            id: shop.id,
          },
        }}
      >
        {shop.name}
      </Link>
      <Typography>{shop.access}</Typography>
    </Box>
  );
}
