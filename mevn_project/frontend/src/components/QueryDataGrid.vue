<!-- frontend/src/components/QueryDataGrid.vue -->

<template>
  <div>
    
    <!-- Name input field -->
    <label for="name">Name:</label>
    <input v-model="query.name" type="text" placeholder="Enter name" />

    <!-- Occupation selection dropdown -->
    <label for="occupation">Occupation:</label>
    <select v-model="query.occupation">
      <option disabled value="">Select Occupation</option>
      
      <!-- Loop through available occupations and display them as options -->
      <option
        v-for="occupation in occupations"
        :key="occupation"
        :value="occupation"
      >
        {{ occupation }}
      </option>
    </select>

    <!-- Income input field -->
    <label for="income">Income:</label>
    <input v-model="query.income" type="number" placeholder="Enter income" />

    <!-- Search button that triggers the fetchResults method -->
    <button @click="fetchResults">Search</button>

    <!-- Table displaying results if available -->
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
        
        <!-- Loop through results and display each item in a table row -->
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
      
      // Data model for the search query
      query: {
        name: "",       // The name entered by the user
        occupation: "", // The occupation selected by the user
        income: "",     // The income entered by the user
      },
      
      // Example occupations for the user to choose from
      occupations: ["software engineer", "astronaut", "professor"],
      
      // Array to store the results from the search
      results: [],
    };
  },
  methods: {
    
    // Fetch search results from the API based on the query data.
    async fetchResults() {
      try {
        
        // Send GET request with query parameters to the server
        const response = await axios.get("http://localhost:5000/api/search", {
          params: this.query, // Pass the query object as parameters
        });
        
        // Store the response data (search results)
        this.results = response.data;
      } catch (error) {
        
        // Handle error if the API request fails
        console.error("Failed to fetch results:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles to enhance the appearance of form fields, buttons, and tables */

/* Example: Add padding and margin to form elements */
label {
  margin-right: 10px;
}

input, select, button {
  margin-bottom: 15px;
  padding: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table th {
  background-color: #f4f4f4;
}
</style>
