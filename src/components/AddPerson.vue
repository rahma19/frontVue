<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="firstName">firstName</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="persons.firstName"
          name="firstName"
        />
      </div>

      <div class="form-group">
        <label for="lastName">lastName</label>
        <input
          class="form-control"
          id="lastName"
          required
          v-model="persons.lastName"
          name="lastName"
        />
      </div>

      <div class="form-group">
        <label for="email">email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="persons.email"
          name="email"
        />
      </div>

      <button @click="savepersons" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newpersons">Add</button>
    </div>
  </div>
</template>

<script>
import dataService from "../services/DataService";

export default {
  name: "add-persons",
  data() {
    return {
      persons: {
        id: null,
        firstName: "",
        lastName: "",
        email: ""
      },
      submitted: false
    };
  },
  methods: {
    savepersons() {
      var data = {
        firstName: this.persons.firstName,
        lastName: this.persons.lastName,
        email: this.persons.email
      };

      dataService.create(data)
        .then(response => {
          this.persons.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newpersons() {
      this.submitted = false;
      this.persons = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>