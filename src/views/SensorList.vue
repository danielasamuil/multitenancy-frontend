<template>
  <v-card>
    <router-link to="devices">
      <v-btn> Devices </v-btn>
    </router-link>
    <router-link to="users">
      <v-btn> Users </v-btn>
    </router-link>
    <router-link to="monitored-values">
      <v-btn> Monitored Values </v-btn>
    </router-link>
    <v-card-title>
      Sensors
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
      <v-btn @click="addSensor">Add</v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="sensors"
        :search="search"
        @click:row="editSensor"
    ></v-data-table>
    <SensorDialog
        :opened="dialogVisible"
        :sensor="selectedSensor"
        @refresh="refreshList"
    ></SensorDialog>
  </v-card>
</template>

<script>
import api from "../api";
import SensorDialog from "@/components/SensorDialog";

export default {
  name: "SensorList",
  components: {SensorDialog},
  data() {
    return {
      sensors: [],
      search: "",
      headers: [
        {
          text: "Description",
          align: "start",
          sortable: false,
          value: "description",
        },
        { text: "Address", value: "address" },
        { text: "Maximum Value", value: "maximumEnergyConsumption" },
        { text: "Average Value", value: "averageEnergyConsumption" },
        { text: "ID", value: "id" }
      ],
      dialogVisible: false,
      selectedSensor: {},
    };
  },
  methods: {
    editSensor(sensor) {
      this.selectedSensor = sensor;
      this.dialogVisible = true;
    },
    addSensor() {
      this.dialogVisible = true;
    },
    async refreshList() {
      this.dialogVisible = false;
      this.selectedSensor = {};
      this.sensors = await api.sensors.allSensors();
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped></style>
