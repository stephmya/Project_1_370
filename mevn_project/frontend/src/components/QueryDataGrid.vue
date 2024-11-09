<template>
  <v-container>
    <!-- Card layout for search form -->
    <v-card class="mb-5" elevation="2">
      <v-card-title>Search for Users Based on Critera</v-card-title>
      <v-card-subtitle
        >Enter your criteria below, just clicking search will output all
        items.</v-card-subtitle
      >

      <v-card-text>
        <v-row>
          <!-- Name Search Field -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Name"
              v-model="query.name"
              placeholder="Type a name..."
              clearable
              outlined
            />
          </v-col>

          <!-- Email Search Field -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Email"
              v-model="query.email"
              placeholder="Type an email..."
              clearable
              outlined
            />
          </v-col>

          <!-- Occupation Dropdown with Search -->
          <v-col cols="12" md="6">
            <v-select
              :items="occupations"
              label="Occupation"
              v-model="query.occupation"
              placeholder="Select an occupation..."
              clearable
              outlined
              dense
              return-object
            />
          </v-col>

          <!-- Income Dropdown with Search -->
          <v-col cols="12" md="6">
            <v-select
              :items="incomes"
              label="Income"
              v-model="query.income"
              placeholder="Select an income..."
              clearable
              outlined
              dense
              return-object
            />
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Search Button -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="fetchResults" color="primary" block class="search-btn"
  
          > Search </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Data Table for Search Results -->
    <v-card elevation="2">
      <v-card-title>Search Results</v-card-title>
      <v-data-table
        :headers="headers"
        :items="results"
        class="elevation-1"
        :items-per-page="5"
        dense
        hide-default-footer
      >
        <template v-slot:[`item.name`]="{ item }">
          <span>{{ item.name || "-" }}</span>
        </template>
        <template v-slot:[`item.email`]="{ item }">
          <span>{{ item.email || "-" }}</span>
        </template>
        <template v-slot:[`item.occupation`]="{ item }">
          <span>{{ item.occupation || "-" }}</span>
        </template>
        <template v-slot:[`item.income`]="{ item }">
          <span>{{ item.income || "-" }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: {
        name: "",
        email: "",
        occupation: "",
        income: "",
      },
      occupations: [],
      incomes: [],
      results: [],
      headers: [
        { text: "Name", value: "name", align: "start" },
        { text: "Email", value: "email" },
        { text: "Occupation", value: "occupation" },
        { text: "Income", value: "income" },
      ],
    };
  },
  created() {
    this.fetchDropdownData();
  },
  methods: {
    async fetchDropdownData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dropdown-data"
        );
        this.occupations = response.data.occupations;
        this.incomes = response.data.incomes;
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    },
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

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
  padding-top: 20px;
}

.v-card {
  padding: 16px;
}

.v-btn {
  background-color: #3f51b5;
  color: white;
}
.search-btn {
  color: white !important;
}
.v-data-table {
  background-color: #f5f5f5;
}
</style>
