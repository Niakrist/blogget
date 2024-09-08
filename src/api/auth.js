import {
  URL_AUTH,
  CLIENT_ID,
  RANDOM_STRING,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE_STRING,
} from "./const";

// const API_URL = `${URL_AUTH}client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&
//     state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_STRING}`;

const searchParams = new URLSearchParams("");
searchParams.append("client_id", CLIENT_ID);
searchParams.append("response_type", RESPONSE_TYPE);
searchParams.append("state", RANDOM_STRING);
searchParams.append("redirect_uri", REDIRECT_URI);
searchParams.append("scope", SCOPE_STRING);

export const urlAuth = `${URL_AUTH}${searchParams.toString()}`;
export const bestPostsUrl = searchParams.toString();
