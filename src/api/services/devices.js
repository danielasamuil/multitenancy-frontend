import authHeader, { BASE_URL, HTTP } from "../http";

export default {
  allDevices() {
    return HTTP.get(BASE_URL + "/devices", { headers: authHeader() }).then(
      (response) => {
        return response.data;
      }
    );
  },

  createDevice(device) {
    return HTTP.post(BASE_URL + "/devices", device, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteDevice(id) {
    return HTTP.delete(BASE_URL + "/devices/" + id, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteAllDevices() {
    return HTTP.delete(BASE_URL + "/devices", { headers: authHeader() }).then(
      (response) => {
        return response.data;
      }
    );
  },

  editDevice(device) {
    return HTTP.put(BASE_URL + "/devices/" + device.id, device, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  addNewDeviceToUser(device, user) {
    return HTTP.put(BASE_URL + "/devices/new-devices/" + device.id, user, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  addNewSensorToDevice(device, sensor) {
    return HTTP.put(BASE_URL + "/devices/new-sensor/" + device.id, sensor, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },
};
