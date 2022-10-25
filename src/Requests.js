const BASE_URL = "http://localhost:3000";
const SIGN_IN_ENDPOINT = "/signin";
const CREATE_USER_ENDPOINT = "/createUser";
const GET_CUSTOM_TOKEN_ENDPOINT = "/getCustomToken";
const sendRequest = async ({ endpoint, method, body }) => {
  const url = `${BASE_URL}${endpoint}`;
  //console.log("url", url, endpoint);
  const res = fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return res;
};
const postRequest = async ({ endpoint, method, body }) => {
  try {
    const response = await sendRequest({ endpoint, method, body });
    const res = response || {};
    const { status } = res || {};
    if (status > 0) {
      return res;
    }
    return res;
  } catch (error) {
    return { error };
  }
};

export const requestUserSignin = async ({ email, password }) =>
  postRequest({
    endpoint: SIGN_IN_ENDPOINT,
    method: "post",
    body: { email, password },
  });

export const createUserEndpoint = async ({ email, password }) =>
  postRequest({
    endpoint: CREATE_USER_ENDPOINT,
    method: "post",
    body: { email, password },
  });
export const getCustomToken = async (uid) =>
  postRequest({
    endpoint: GET_CUSTOM_TOKEN_ENDPOINT,
    method: "post",
    body: { uid },
  });
