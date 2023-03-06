import authHeader, { BASE_URL, HTTP } from "../http";

export default {
  allSensors() {
    return HTTP.get(BASE_URL + "/sensors", {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  createSensor(sensor) {
    return HTTP.post(BASE_URL + "/sensors", sensor, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteSensor(id) {
    return HTTP.delete(BASE_URL + "/sensors/" + id, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteAllSensors() {
    return HTTP.delete(BASE_URL + "/sensors", {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  editSensor(sensor) {
    return HTTP.put(BASE_URL + "/sensors/" + sensor.id, sensor, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },
};
