import authHeader, { BASE_URL, HTTP } from "../http";

export default {
  allMonitoredValues() {
    return HTTP.get(BASE_URL + "/monitored-values", {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  createMonitoredValue(monitoredValue) {
    return HTTP.post(BASE_URL + "/monitored-values", monitoredValue, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteMonitoredValue(monitoredValue) {
    return HTTP.delete(BASE_URL + "/monitored-values/" + monitoredValue.id, {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  deleteAllMonitoredValues() {
    return HTTP.delete(BASE_URL + "/monitored-values", {
      headers: authHeader(),
    }).then((response) => {
      return response.data;
    });
  },

  editMonitoredValue(monitoredValue) {
    return HTTP.put(
      BASE_URL + "/monitored-values/" + monitoredValue.id,monitoredValue,
      {
        headers: authHeader(),
      }
    ).then((response) => {
      return response.data;
    });
  },
};
