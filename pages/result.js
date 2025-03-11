import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(null);

  const [shops, setShops] = useState();
  const [pageMax, setPageMax] = useState(0);

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
            `/api/GetNearShops?lat=${queryParams.lat}&lng=${queryParams.lng}&range=${queryParams.range}&start=${queryParams.start}`
          );
          console.log(response);
          const result = await response.json();
          setShops(result.results.shop);
          setPageMax(result.results.results_available);
          console.log(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [queryParams]);

  console.log(shops);

  return (
    <>
      <PageComponent
        queryParams={queryParams}
        shops={shops}
        pageMax={pageMax}
      />
      <Box mt={1} />
      <Stack spacing={1}>
        {shops?.map((e) => {
          return (
            <div key={e.id}>
              <DisplayShop shop={e} />
            </div>
          );
        })}
      </Stack>
      <Box mt={1} />
      <PageComponent
        queryParams={queryParams}
        shops={shops}
        pageMax={pageMax}
      />
    </>
  );
}

function PageComponent({ queryParams, shops, pageMax }) {
  const start = parseInt(queryParams?.start);
  return (
    <Stack direction="row" spacing={1}>
      {1 <= start - 10 && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          as={Link}
          href={{
            pathname: "/result",
            query: {
              lat: queryParams?.lat,
              lng: queryParams?.lng,
              range: queryParams?.range,
              start: start - 10,
            },
          }}
        >
          前のページ
        </Button>
      )}
      <Typography>
        {start}~{start + shops?.length - 1}件を表示
      </Typography>
      {start + 10 <= pageMax && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          as={Link}
          href={{
            pathname: "/result",
            query: {
              lat: queryParams?.lat,
              lng: queryParams?.lng,
              range: queryParams?.range,
              start: start + 10,
            },
          }}
        >
          次のページ
        </Button>
      )}
    </Stack>
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
