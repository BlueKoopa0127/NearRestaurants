import { Box, Stack, Typography, Divider, Button, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState(null);
  const [shopData, setShopData] = useState();
  const [coords, setCoords] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("このブラウザーは位置情報に対応していません");
    } else {
      console.log("位置情報を取得中…");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    }
  }, []);

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
          const result = await response.json();
          setShopData(result.results.shop[0]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [queryParams]);

  if (!shopData) return <Typography>読み込み中...</Typography>;

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 4 }} p={3} maxWidth={800} mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {shopData.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {shopData.genre.name} ・ {shopData.budget.name}
      </Typography>

      <Box
        component="img"
        src={shopData.photo?.pc?.l}
        alt="店舗写真"
        sx={{
          width: "auto",
          maxHeight: 300,
          height: "auto",
          objectFit: "cover",
          borderRadius: 2,
          mb: 2,
          mx: "auto",
        }}
      />

      <Typography variant="h6" fontWeight="bold">
        {shopData.genre.catch}
      </Typography>
      <Typography color="text.secondary" mb={2}>
        {shopData.catch}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={1}>
        <Typography>
          <strong>住所：</strong>
          {shopData.address}
        </Typography>
        <Typography>
          <strong>アクセス：</strong>
          {shopData.access}
        </Typography>
        <Typography>
          <strong>最寄り駅：</strong>
          {shopData.station_name}
        </Typography>
        <Typography>
          <strong>営業時間：</strong>
          {shopData.open}
        </Typography>
        <Typography>
          <strong>定休日：</strong>
          {shopData.close}
        </Typography>
        <Typography>
          <strong>予算：</strong>
          {shopData.budget.name}
        </Typography>
        <Typography>
          <strong>平均予算：</strong>
          {shopData.budget.average}
        </Typography>
        {shopData.budget_memo && (
          <Typography>
            <strong>予算メモ：</strong>
            {shopData.budget_memo}
          </Typography>
        )}
        <Typography>
          <strong>収容人数：</strong>
          {shopData.capacity}人
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        設備・サービス
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {shopData.free_drink && (
          <Chip label={`飲み放題：${shopData.free_drink}`} />
        )}
        {shopData.free_food && (
          <Chip label={`食べ放題：${shopData.free_food}`} />
        )}
        {shopData.private_room && (
          <Chip label={`個室：${shopData.private_room}`} />
        )}
        {shopData.charter && <Chip label={`貸切：${shopData.charter}`} />}
        {shopData.card && <Chip label={`カード利用：${shopData.card}`} />}
        {shopData.non_smoking && (
          <Chip label={`禁煙：${shopData.non_smoking}`} />
        )}
        {shopData.child && <Chip label={`お子様連れ：${shopData.child}`} />}
        {shopData.pet && <Chip label={`ペット：${shopData.pet}`} />}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          href={shopData.urls?.pc}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          ホットペッパーで詳しく見る
        </Button>

        <Button
          variant="contained"
          color="primary"
          href={`https://www.google.com/maps?q=${shopData.lat},${shopData.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          GoogleMapで見る
        </Button>
      </Stack>
    </Box>
  );
}
