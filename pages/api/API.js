export default async function handler(req, res) {
  const { lat, lng, range } = req.query;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&format=json`
  );
  if (response.status == 200) {
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.status(response.status);
  }
}
