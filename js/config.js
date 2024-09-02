// import { key } from "./API_key.js";

export const options = {
  method: "GET",
  headers: { "X-Api-Key": process.env.API_KEY },
  contentType: "application/json",
  origin: "*",
};

export const API_URL = "https://api.api-ninjas.com/v1/exercises?muscle=";
