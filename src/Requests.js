import axios from "axios";
import {
  BASE_URL,
  GET_MY_RELATIONSHIPS_ENDPOINT,
  SET_RELATIONSHIP_ENDPOINT,
} from "./Contants";
import { PromisedQb } from "./Quickblox";


async function axiosRequest({
  endpoint = "",
  method = "GET",
  params = undefined,
  data = undefined,
  useBaseUrl = false,
}) {
  const session = await PromisedQb.getSession();
  const { token } = session || {};
  return axios
    .request({
      method,
      params,
      data,
      baseURL: useBaseUrl ? BASE_URL : undefined,
      url: endpoint,
      headers: {
        "QB-Token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      if (res?.data) {
        return res.data;
      }
      return res;
    })
    .catch((e) => console.error(e));
}

export async function createRelationshipRequest({
  initiator_id = 0,
  opponent_id = 0,
}) {
  return axiosRequest({
    endpoint: SET_RELATIONSHIP_ENDPOINT,
    method: "POST",
    useBaseUrl: true,
    data: {
      initiator_id,
      opponent_id,
      status: 0,
    },
  });
}
export async function updateRelationship({ relationship_id = 0, status = -1 }) {
  return axiosRequest({
    method: "POST",
    endpoint: SET_RELATIONSHIP_ENDPOINT,
    useBaseUrl: true,
    data: {
      relationship_id,
      status,
    },
  });
}
export async function getMyRelationshipsRequest({ user_id = 0 }) {
  return axiosRequest({
    endpoint: GET_MY_RELATIONSHIPS_ENDPOINT,
    method: "POST",
    useBaseUrl: true,
    data: {
      user_id,
    },
  });
}

export async function getQuickbloxUserByEmailRequest({ email = "" }) {
  return axiosRequest({
    endpoint: "https://api.quickblox.com/users/by_email.json",
    params: { email },
    method: "GET",
  });
}
