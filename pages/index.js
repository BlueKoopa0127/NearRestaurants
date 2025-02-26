import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [coords, setCoords] = useState();
  const [range, setRange] = useState(3);

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

  console.log(coords);

  return (
    <>
      <h1>こんにちは世界</h1>
      <Link
        href={{
          pathname: "/result",
          query: {
            lat: coords?.latitude,
            lng: coords?.longitude,
            range: range,
          },
        }}
      >
        検索画面
      </Link>
    </>
  );
}
