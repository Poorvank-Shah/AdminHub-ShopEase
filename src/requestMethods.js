import axios from "axios";

// const BASE_URL = "http://localhost:5000/";
const BASE_URL = "https://store-api-6cny.onrender.com/";


// var TOKEN;
// export const setToken = () => {
//     TOKEN = localStorage.getItem("persist:root") === null ? null : 
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser === null ?  null : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
//   console.log(TOKEN);
// }


const TOKEN = localStorage.getItem("persist:root") === null ? null : 
JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser === null ?  null : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
}); 