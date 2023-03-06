<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      :value="opened"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark>
          {{ isNew ? "Create Sensor" : "Edit Sensor" }}
        </v-toolbar>
        <v-form>
          <v-text-field v-model="sensor.description" label="Description" />
          <v-text-field v-model="sensor.address" label="Address" />
          <v-text-field v-model="sensor.maximumEnergyConsumption" label="Maximum Value" />
          <v-text-field v-model="sensor.averageEnergyConsumption" label="Average Value" />
        </v-form>
        <v-card-actions>
          <v-btn @click="persist">
            {{ isNew ? "Create" : "Save" }}
          </v-btn>
          <v-btn v-if="!isNew" @click="deleteSensor">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import api from "../api";
export default {
  name: "SensorDialog",
  props: {
    sensor: Object,
    opened: Boolean,
  },
  data() {
    return {
      connected: false,
    };
  },
  methods: {
    persist() {
      if (this.isNew) {
        api.sensors
            .createSensor({
              description: this.sensor.description,
              address: this.sensor.address,
              maximumEnergyConsumption: this.sensor.maximumEnergyConsumption,
              averageEnergyConsumption: this.sensor.averageEnergyConsumption,
            })
            .then(() => this.$emit("refresh"));
      } else {
        api.sensors
            .editSensor({
              id: this.sensor.id,
              description: this.sensor.description,
              address: this.sensor.address,
              maximumEnergyConsumption: this.sensor.maximumEnergyConsumption,
              averageEnergyConsumption: this.sensor.averageEnergyConsumption,
            })
            .then(() => this.$emit("refresh"))
            .catch((error) => {
              alert(error.response.data);
            });
      }
    },

    deleteSensor() {
      api.sensors.deleteSensor(this.sensor.id).then(() => this.$emit("refresh"));
    },
  },
  computed: {
    isNew: function () {
      return !this.sensor.id;
    },
  },
};
</script>

<style scoped></style>
