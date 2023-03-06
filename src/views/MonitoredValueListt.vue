<template>
  <v-card>
    <router-link to="devices">
      <v-btn> Devices </v-btn>
    </router-link>
    <router-link to="sensors">
      <v-btn> Sensors </v-btn>
    </router-link>
    <router-link to="users">
      <v-btn> Users </v-btn>
    </router-link>
    <v-card-title>
      Monitored Values
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
      <v-btn @click="addMonitoredValue">Add</v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="monitoredValues"
        :search="search"
        @click:row="editMonitoredValue"
    ></v-data-table>
    <MonitoredValueDialog
        :opened="dialogVisible"
        :monitored-value="selectedMonitoredValue"
        @refresh="refreshList"
    ></MonitoredValueDialog>
  </v-card>
</template>

<script>
import api from "../api";
import MonitoredValueDialog from "@/components/MonitoredValuesDialog";

export default {
  name: "MonitoredValueListt",
  components: { MonitoredValueDialog },
  data() {
    return {
      monitoredValues: [],
      search: "",
      headers: [
        {
          text: "Value",
          align: "start",
          sortable: false,
          value: "value",
        },
        { text: "Timestamp", value: "timestamp" },
        { text: "ID Sensor", value: "id_sensor" },
        { text: "ID", value: "id" },
      ],
      dialogVisible: false,
      selectedMonitoredValue: {},
    };
  },
  methods: {
    editMonitoredValue(monitoredValue) {
      this.selectedMonitoredValue = monitoredValue;
      this.dialogVisible = true;
    },
    addMonitoredValue() {
      this.dialogVisible = true;
    },
    async refreshList() {
      this.dialogVisible = false;
      this.selectedMonitoredValue = {};
      this.monitoredValues = await api.monitoredValues.allMonitoredValues();
    },
  },
  created() {
    this.refreshList();
    this.timer = setInterval(this.refreshList, 5000);
  },
};
</script>

<style scoped></style>
