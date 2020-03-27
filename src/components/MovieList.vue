<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        v-bind:key="movie.id"
        v-bind:infos="movie.infos"
        v-bind:sessions="movie.sessions"
        v-bind:day="day"
        v-bind:time="time"
      />
    </div>
    <div v-else-if="movies.length" class="no-result">
      {{ noResults }}
    </div>
    <div v-else class="no-result">
      Loading...
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times'
import MovieItem from './MovieItem';

export default {
  props: ["movies", "genre", "time", "day"],
  methods: {
    filterByGenre: function(movie) {
      if(this.genre.length === 0) {
        return true;
      }

      const searchGenre = movie.infos.genre;
      let matched = false;
      this.genre.forEach(genre => {
        if(searchGenre.toLowerCase().includes(genre.toLowerCase())) {
          matched = true;
        }
      });
      return matched;
    },
    sessionPassesTimeFilter: function(session) {
      if (!this.day.isSame(this.$moment(session.time), "day")) {
        return false;
      } 
      
      if(this.time.length === 0 || this.time.length === 2) {
        return true
      }

      const currentHour = this.$moment(session.time).hour();
      return (this.time[0] === times.BEFORE_6PM)
          ? currentHour <= 18
          : currentHour >= 18;
    }
  },
  computed: {
    filteredMovies: function() {
      if (this.genre.length === 0 && this.time.length === 0) {
        return this.movies;
      }

      return this.movies
              .filter(this.filterByGenre)
              .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults: function() {
      const what = this.time.concat(this.genre).join(', ');
      return `No results for : ${what}.`;
    }
  },
  components: {
    MovieItem
  }
}
</script>