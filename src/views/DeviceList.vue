<template>
  <v-card>
    <router-link to="users">
      <v-btn> Users </v-btn>
    </router-link>
    <router-link to="sensors">
      <v-btn> Sensors </v-btn>
    </router-link>
    <router-link to="monitored-values">
      <v-btn> Monitored Values </v-btn>
    </router-link>
    <v-card-title>
      Devices
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
      <v-btn @click="addDevice">Add</v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="devices"
        :search="search"
        @click:row="editDevice"
    ></v-data-table>
    <DeviceDialog
        :opened="dialogVisible"
        :device="selectedDevice"
        @refresh="refreshList"
    ></DeviceDialog>
  </v-card>
</template>

<script>
import api from "../api";
import DeviceDialog from "@/components/DeviceDialog";

export default {
  name: "DeviceList",
  components: {DeviceDialog},
  data() {
    return {
      devices: [],
      search: "",
      headers: [
        {
          text: "Description",
          align: "start",
          sortable: false,
          value: "description",
        },
        { text: "Maximum Value", value: "maximumValue" },
        { text: "ID Owner", value: "id_owner" },
        { text: "ID Sensor", value: "id_sensor" },
        { text: "ID", value: "id" }
      ],
      dialogVisible: false,
      selectedDevice: {},
    };
  },
  methods: {
    editDevice(device) {
      this.selectedDevice = device;
      this.dialogVisible = true;
    },
    addDevice() {
      this.dialogVisible = true;
    },
    async refreshList() {
      this.dialogVisible = false;
      this.selectedDevice = {};
      this.devices = await api.devices.allDevices();
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped></style>
