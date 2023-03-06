<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      :value="opened"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark>
          {{ isNew ? "Create" : "Edit" }}
        </v-toolbar>
        <v-form>
          <v-text-field v-model="monitoredValue.value" label="Value" />
          <v-text-field v-model="monitoredValue.timestamp" label="TimeStamp ('yyyy-MM-ddThh-mm-ss.fff')" />
          <v-text-field
              v-model="monitoredValue.id_sensor"
              label="ID of Sensor"
          />
        </v-form>
        <v-card-actions>
          <v-btn @click="persist">
            {{ isNew ? "Create" : "Save" }}
          </v-btn>
          <v-btn v-if="!isNew" @click="deleteMonitoredValue"
          >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import api from "../api";

export default {
  name: "MonitoredValueDialog",
  props: {
    monitoredValue: Object,
    opened: Boolean,
  },
  methods: {
    persist() {
      if (this.isNew) {
        api.monitoredValues
            .createMonitoredValue({
              value: this.monitoredValue.value,
              timestamp: this.monitoredValue.timestamp,
              id_sensor: this.monitoredValue.id_sensor,
            })
            .then(() => this.$emit("refresh"));
      } else {
        api.monitoredValues
            .editMonitoredValue({
              id: this.monitoredValue.id,
              value: this.monitoredValue.value,
              timestamp: this.monitoredValue.timestamp,
              id_sensor: this.monitoredValue.id_sensor,
            })
            .then(() => this.$emit("refresh"))
            .catch((error) => {
              alert(error.response.data);
            });
      }
    },

    deleteMonitoredValue() {
      api.monitoredValues
          .deleteMonitoredValue({
            id: this.monitoredValue.id,
          })
          .then(() => this.$emit("refresh"));
    },
  },
  computed: {
    isNew: function () {
      return !this.monitoredValue.id;
    },
  },
};
</script>

<style scoped></style>
