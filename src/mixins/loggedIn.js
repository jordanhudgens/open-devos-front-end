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
        console.log("from loggedIn", response.data.logged_in);
        if (response.data.logged_in === true) {
          console.log("from trueeeeee");

          return true;
        } else {
          console.log("from falseeeee");
          return false;
        }
      })
      .catch(error => {
        return false;
        console.log(error);
      });
  } else {
    console.log("from falseeeee");
    return false;
  }

  return res;
};

export default loggedIn;
