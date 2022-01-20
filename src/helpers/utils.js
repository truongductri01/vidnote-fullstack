export async function fetchYoutube(keyWord, resultAmount, YOUTUBE_API_KEY) {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${resultAmount}&q=${encodeURIComponent(
    keyWord
  )}&key=${YOUTUBE_API_KEY}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}

export function retrieveSearchFromInput(inputElementId) {
  let targetElement = document.getElementById(inputElementId);
  return targetElement.value;
}

export function getNeccessaryInfo(result) {
  let data = [];
  for (let item of result.items) {
    data.push(item.snippet);
  }
  return data;
}
