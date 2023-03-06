import authHeader, { BASE_URL, HTTP } from "../http";

export default {
  allUsers() {
    return HTTP.get(BASE_URL + "/users", { headers: authHeader() }).then(
      (response) => {
        console.log(response);
        return response.data;
      }
    );
  },

  createUser(user) {
    return HTTP.post(BASE_URL + "/users", user, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteUser(id) {
    return HTTP.delete(BASE_URL + "/users/" + id, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteAllUsers() {
    return HTTP.delete(BASE_URL + "/users", { headers: authHeader() }).then(
      (response) => {
        return response.data;
      }
    );
  },

  editUser(user) {
    return HTTP.put(BASE_URL + "/users/" + user.id, user, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },
};
