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
          <v-text-field v-model="device.description" label="Description" />
          <v-text-field v-model="device.maximumValue" label="Maximum Value" />
          <v-text-field v-model="device.id_owner" label="ID of Owner" />
          <v-text-field v-model="device.id_sensor" label="ID of Sensor" />
        </v-form>
        <v-card-actions>
          <v-btn @click="persist">
            {{ isNew ? "Create" : "Save" }}
          </v-btn>
          <v-btn v-if="!isNew" @click="deleteDevice">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import api from "../api";

export default {
  name: "DeviceDialog",
  props: {
    device: Object,
    opened: Boolean,
  },
  methods: {
    persist() {
      if (this.isNew) {
        api.devices
            .createDevice({
              description: this.device.description,
              maximumValue: this.device.maximumValue,
              id_owner: this.device.id_owner,
              id_sensor: this.device.id_sensor,
            })
            .then(() => this.$emit("refresh"));
      } else {
        api.devices
            .editDevice({
              id: this.device.id,
              description: this.device.description,
              maximumValue: this.device.maximumValue,
              id_owner: this.device.id_owner,
              id_sensor: this.device.id_sensor,
            })
            .then(() => this.$emit("refresh"))
            .catch((error) => {
              alert(error.response.data);
            });
      }
    },

    deleteDevice() {
      api.devices.deleteDevice(this.device.id).then(() => this.$emit("refresh"));
    },
  },
  computed: {
    isNew: function () {
      return !this.device.id;
    },
  },
};
</script>

<style scoped></style>
