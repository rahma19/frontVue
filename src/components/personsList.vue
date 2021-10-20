<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by firstName"
          v-model="firstName"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchfirstName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>persons List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(persons, index) in persons"
          :key="index"
          @click="setActivepersons(persons, index)"
        >
          {{ persons.firstName }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllpersons">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="person">
        <h4>persons</h4>
        <div>
          <label><strong>firstName:</strong></label> {{ person.firstName }}
        </div>
        <div>
          <label><strong>lastName:</strong></label> {{ person.lastName }}
        </div>
         <div>
          <label><strong>email:</strong></label> {{ person.email }}
        </div>
       
        <a class="badge badge-warning"
          :href="'/persons/' + person.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a persons...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "persons-list",
  data() {
    return {
      persons: [],
      person: null,
      currentIndex: -1,
      firstName: ""
    };
  },
  methods: {
    retrievepersons() {
      DataService.getAll()
        .then(response => {
          this.persons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievepersons();
      this.person = null;
      this.currentIndex = -1;
    },

    setActivepersons(persons, index) {
      this.person = persons;
      this.currentIndex = index;
    },

    removeAllpersons() {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchemail() {
      DataService.findByemail(this.email)
        .then(response => {
          this.persons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievepersons();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>