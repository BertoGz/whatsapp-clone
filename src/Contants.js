import { isMobile } from "react-device-detect";
export const BASE_URL = "https://pure-lake-71547.herokuapp.com"; //"http://localhost:3000"; //"https://pure-lake-71547.herokuapp.com";
export const GET_MY_RELATIONSHIPS_ENDPOINT = "/get_my_relationships";
export const SET_RELATIONSHIP_ENDPOINT = "/set_relationship";
export const SYSTEM_MESSAGE_RELATIONSHIP_ACCEPT =
  "SYSTEM_MESSAGE_RELATIONSHIP_ACCEPT";

export const maxScreenHeight = isMobile ? window.innerHeight : "100vh";
export const profilepic =
"https://www.thesun.co.uk/wp-content/uploads/2022/05/309E522E-D141-11EC-BE62-1280C3EF198F.jpeg";
