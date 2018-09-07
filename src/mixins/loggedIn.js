import axios from "axios";

const loggedIn = () => {
  let res;

  if (localStorage.getItem("token")) {
    res = axios
      .get("https://open-devos-api.herokuapp.com/logged_in", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.logged_in === true) {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        return false;
        console.log(error);
      });
  } else {
    return false;
  }

  return res;
};

export default loggedIn;
