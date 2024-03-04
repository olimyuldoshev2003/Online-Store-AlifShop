import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { destroyToken } from "../utils/token";

const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const GlobalBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await BaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    destroyToken();
  }
  return result;
};

export function providesList(resultsWithIds:any, tagType:any) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id}:any) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export default GlobalBaseQuery;
