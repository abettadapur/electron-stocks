import { API_URL } from "../constants";
import { API_KEY } from "../../finntech/constants";

export default async function makeApiRequest(args?: { [key: string]: string }) {
  let queryString = "";
  if (args) {
    Object.entries(args).forEach(([k, v]) => (queryString += `&${k}=${v}`));
  }
  const response = await fetch(
    `${API_URL}/query?apikey=${API_KEY}${queryString}`
  );
  const responseJson = await response.json();
  return responseJson;
}
