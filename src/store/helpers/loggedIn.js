import axios from "axios";

export default (async function checkLoginStatus() {
  return await axios
    .get(`https://open-devos-api.herokuapp.com/logged_in`, {
      withCredentials: true
    })
    .then(response => {
      console.log("checking login", response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
});
