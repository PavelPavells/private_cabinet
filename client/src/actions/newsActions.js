//import axios from "axios";
//import { GET_NEWS } from "./types";

const API_KEY = "2aced1b133264999b4dff057ca32a684";
export const ROOT_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

//export const getNews = () => {
//    const request = axios.get(ROOT_URL);
//    console.log(request);
//    return {
//        type: GET_NEWS,
//        payload: request
//    }
//}