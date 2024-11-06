<!-- frontend/src/components/QueryDataGrid.vue -->
<template>
  <div>
    <label for="name">Name:</label>
    <input v-model="query.name" type="text" placeholder="Enter name" />

    <label for="occupation">Occupation:</label>
    <select v-model="query.occupation">
      <option disabled value="">Select Occupation</option>
      <option
        v-for="occupation in occupations"
        :key="occupation"
        :value="occupation"
      >
        {{ occupation }}
      </option>
    </select>

    <label for="income">Income:</label>
    <input v-model="query.income" type="number" placeholder="Enter income" />

    <button @click="fetchResults">Search</button>

    <table v-if="results.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Occupation</th>
          <th>Income</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result._id">
          <td>{{ result.name }}</td>
          <td>{{ result.email }}</td>
          <td>{{ result.occupation }}</td>
          <td>{{ result.income }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: {
        name: "",
        occupation: "",
        income: "",
      },
      occupations: ["software engineer", "astronaut", "professor"], // Example values
      results: [],
    };
  },
  methods: {
    async fetchResults() {
      try {
        const response = await axios.get("http://localhost:5000/api/search", {
          params: this.query,
        });
        this.results = response.data;
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    },
  },
};
</script>
