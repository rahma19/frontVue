<template>
  <div v-if="currentperson" class="edit-form">
    <h4>person</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentperson.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentperson.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentperson.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteperson"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateperson"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import dataService from "../services/DataService";

export default {
  name: "person",
  data() {
    return {
      currentperson: null,
      message: ''
    };
  },
  methods: {
    getperson(id) {
      dataService.get(id)
        .then(response => {
          this.currentperson = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateperson() {
      dataService.update(this.currentperson.id, this.currentperson)
        .then(response => {
          console.log(response.data);
          this.message = 'The person was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteperson() {
      dataService.delete(this.currentperson.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "persons" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getperson(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>