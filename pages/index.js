import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [coords, setCoords] = useState();
  const [range, setRange] = useState(3);

  const ranges = [300, 500, 1000, 2000, 3000].map((e, i) => ({
    range: e,
    value: i + 1,
  }));

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
      {ranges.map((e) => {
        return (
          <Link
            href={{
              pathname: "/result",
              query: {
                lat: coords?.latitude,
                lng: coords?.longitude,
                range: e.value,
              },
            }}
          >
            現在位置から{e.range}m以内で検索
          </Link>
        );
      })}
    </>
  );
}
