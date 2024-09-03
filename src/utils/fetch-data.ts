import axios from "axios";

import { apiBaseUrl, apiToken } from "@/shared/flags";

const options = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
};

export const fetchData = async (endpoint: string, params?: string) => {
  const response = await axios.get(`${apiBaseUrl}${endpoint}?${params}`, options);
  return response.data;
};
