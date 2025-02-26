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
            `/api/API?lat=${queryParams.lat}&lng=${queryParams.lng}&range=${queryParams.range}`
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
      {shops?.map((e) => {
        return <p key={e.id}>{e.name}</p>;
      })}
    </>
  );
}
