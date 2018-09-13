import axios from "axios";

// TODO
// Call resolve for promise
const loggedIn = () => {
  var res;
  if (localStorage.getItem("token")) {
    axios
      .get("https://open-devos-api.herokuapp.com/logged_in", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.logged_in === true) {
          res = true;
          console.log("1 ressss", res);
          return true;
        } else {
          res = false;
          console.log("2 ressss", res);
          return false;
        }
      })
      .catch(error => {
        res = false;
        console.log("3 ressss", res);
        console.log(error);
        return false;
      });
  } else {
    res = false;
    console.log("4 ressss", res);
    return false;
  }

  console.log("5 ressss", res);
  return res;
};

export default loggedIn;
