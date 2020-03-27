<template>
  <div id="movie-filter">
    <h2>Filter results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter
        category="time"
        v-for="time in times"
        v-bind:key="time"
        v-bind:title="time"
      >
        {{ time }}
      </check-filter>
      <h3>By genre</h3>
      <check-filter
        category="genre"
        v-for="genre in genres"
        v-bind:key="genre"
        v-bind:title="genre"
      >
        {{ genre }}
      </check-filter>
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from './CheckFilter.vue'

export default {
  data: function() {
    return {
      genres,
      times
    }
  },
  components: {
    CheckFilter
  }
}
</script>