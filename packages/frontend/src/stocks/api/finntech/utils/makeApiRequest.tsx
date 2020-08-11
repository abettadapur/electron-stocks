import { API_URL } from "../constants";

const actionToMethod = {
  quote: "GET",
};

export default async function makeApiRequest(
  action: keyof typeof actionToMethod,
  token: string,
  args?: { [key: string]: string }
) {
  const response = await fetch(
    `${API_URL}/${action}?token=${token}${
      args ? Object.entries(args).map(([k, v]) => `&${k}=${v}`) : ""
    }`,
    { method: actionToMethod[action] }
  );
  const responseJson = await response.json();
  return responseJson;
}
