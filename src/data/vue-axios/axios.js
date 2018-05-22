import axios from "axios";

let API_URL = "https://open-devos-api.herokuapp.com";

if (process.env.NODE_ENV !== "production") {
  let API_URL = "http://localhost:3000";
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.token
  }
});
