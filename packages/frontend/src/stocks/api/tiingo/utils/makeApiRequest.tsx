import { API_KEY, API_URL } from "../constants";

export default async function makeApiRequest(
  action: string,
  args?: { [key: string]: string }
) {
  let queryString = "";
  if (args) {
    Object.entries(args).forEach(([k, v]) => (queryString += `&${k}=${v}`));
  }

  const response = await fetch(
    `${API_URL}${action}?token=${API_KEY}${queryString}`
  );
  const json = await response.json();

  return json;
}
