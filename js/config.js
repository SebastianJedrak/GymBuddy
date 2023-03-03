import { key } from "./key.js";

export const options = {
  method: "GET",
  headers: { "X-Api-Key": key },
  contentType: "application/json",
};

export const API_URL = "https://api.api-ninjas.com/v1/exercises?muscle=";
