<template>
  <v-card>
    <router-link to="devices">
      <v-btn> Devices </v-btn>
    </router-link>
    <router-link to="sensors">
      <v-btn> Sensors </v-btn>
    </router-link>
    <router-link to="monitored-values">
      <v-btn> Monitored Values </v-btn>
    </router-link>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
      <v-btn @click="addUser">Add</v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        @click:row="editUser"
    ></v-data-table>
    <UserDialog
        :opened="dialogVisible"
        :user="selectedUser"
        @refresh="refreshList"
    ></UserDialog>
  </v-card>
</template>

<script>
import api from "../api";
import UserDialog from "../components/UserDialog";

export default {
  name: "UserList",
  components: {UserDialog},
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {text: "Email", value: "email"},
        {text: "Roles", value: "roles[0].name"},
        { text: "ID", value: "id" }
      ],
      dialogVisible: false,
      selectedUser: {},
    };
  },
  methods: {
    editUser(user) {
      this.selectedUser = user;
      this.dialogVisible = true;
    },
    addUser() {
      this.dialogVisible = true;
    },
    async refreshList() {
      this.dialogVisible = false;
      this.selectedUser = {};
      this.users = await api.users.allUsers();
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<style scoped></style>
