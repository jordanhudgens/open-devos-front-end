import axios from "axios";

if (process.env.NODE_ENV === "production") {
  const API_URL = "https://open-devos-api.herokuapp.com";
} else {
  const API_URL = "http://localhost:3000";
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.token
  }
});
