import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(null);
  const [shops, setShops] = useState([]);
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
          const result = await response.json();
          setShops(result.results.shop || []);
          setPageMax(result.results.results_available || 0);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [queryParams]);

  const start = parseInt(queryParams?.start || 1);

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="md">
        <PageComponent
          start={start}
          queryParams={queryParams}
          shops={shops}
          pageMax={pageMax}
        />

        <Stack spacing={3} mt={3}>
          {shops.map((shop) => (
            <DisplayShop key={shop.id} shop={shop} queryParams={queryParams} />
          ))}
        </Stack>

        <Box mt={4}>
          <PageComponent
            start={start}
            queryParams={queryParams}
            shops={shops}
            pageMax={pageMax}
          />
        </Box>
      </Container>
    </Box>
  );
}

function PageComponent({ start, queryParams, shops, pageMax }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      {1 <= start - 10 && (
        <Button
          variant="contained"
          component={Link}
          href={{
            pathname: "/result",
            query: {
              ...queryParams,
              start: start - 10,
            },
          }}
        >
          前のページ
        </Button>
      )}
      <Typography variant="body1">
        {start} ~ {start + (shops?.length || 0) - 1} 件を表示
      </Typography>
      {start + 10 <= pageMax && (
        <Button
          variant="contained"
          component={Link}
          href={{
            pathname: "/result",
            query: {
              ...queryParams,
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

function DisplayShop({ shop, queryParams }) {
  return (
    <Card sx={{ display: "flex", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{
          width: 160,
          height: 120,
          objectFit: "cover",
          borderRadius: "12px 0 0 12px",
        }}
        image={shop?.photo?.pc?.l}
        alt="お店の写真"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            <Link
              href={{
                pathname: "/detail",
                query: { id: shop.id },
              }}
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              {shop.name}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shop.genre.catch}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            予算：{shop.budget.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            直線距離：
            {Math.round(
              haversineDistance(
                queryParams.lat,
                queryParams.lng,
                shop.lat,
                shop.lng
              )
            )}
            m
          </Typography>
          <Typography variant="body2" color="text.secondary">
            アクセス：{shop.access}
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            href={{
              pathname: "/detail",
              query: { id: shop.id },
            }}
          >
            詳細を見る
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => deg * (Math.PI / 180);
  const R = 6378137;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
