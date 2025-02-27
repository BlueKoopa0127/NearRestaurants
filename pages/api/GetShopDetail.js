export default async function handler(req, res) {
  const { id } = req.query;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&id=${id}&format=json`
  );
  if (response.status == 200) {
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.status(response.status);
  }
}
