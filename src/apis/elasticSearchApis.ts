import { config } from "../config/config";

const { baseURL, apiURL } = config.app;

type ElasticSearchResponseType = { data: any; error: string };
export const searchDocuments = async (
    idToken: string,
    query: string
): Promise<ElasticSearchResponseType> => {
    let results = await fetch(baseURL + apiURL + "/elasticsearch/search", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + idToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Elastic Search data >>>", data);
            return data;
        });

    return results as unknown as ElasticSearchResponseType;
};
