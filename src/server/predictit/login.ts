import { type PredictitAuth } from "@/types/predictit";

type Login = {
  email: string;
  password: string;
};

const login = async ({ email, password }: Login) => {
  const body = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
    password,
  )}&grant_type=password&rememberMe=false`;

  console.log(body);
  const data: PredictitAuth = await fetch(
    "https://www.predictit.org/api/Account/token",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
      },
      referrer: "https://www.predictit.org/",
      referrerPolicy: "origin-when-cross-origin",
      body,
      method: "POST",
      mode: "cors",
      credentials: "include",
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data as PredictitAuth;
    });
  return data;
};

export default login;
