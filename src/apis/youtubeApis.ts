import { apiURL, baseURL } from "./routes";

const youtube = {
  search: (q: string, maxResults: number) => {
    return apiURL + `/youtube/search?q=${q}&maxResults=${maxResults}`;
  },
  searchVideoById: (videoId: string) => {
    return apiURL + `/youtube/search-single?videoId=${videoId}`;
  },
};
export async function fetchYoutubeBackend(
  keyWord: string,
  resultAmount: number
) {
  let routeWithParam = youtube.search(
    encodeURIComponent(keyWord),
    resultAmount
  );
  let url: string = baseURL + routeWithParam;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}
export async function fetchYoutubeVideoByIdBackend(videoId: string) {
  let searchResult = await fetch(baseURL + youtube.searchVideoById(videoId))
    .then((res) => res.json())
    .then((data) => data);
  if ((searchResult.items as any[]).length > 0) {
    return searchResult.items[0];
  } else {
    return {};
  }
}
