export async function fetchYoutube(
  keyWord: string,
  resultAmount: number,
  YOUTUBE_API_KEY: string
) {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${resultAmount}&q=${encodeURIComponent(
    keyWord
  )}&key=${YOUTUBE_API_KEY}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}
